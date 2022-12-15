<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row class="fill-height" no-gutters>
          <v-col
            cols="12"
            sm="5"
            md="5"
            lg="4"
            xl="3"
            class="school-panel pa-0"
          >
            <v-row class="fill-height" no-gutters>
              <v-col class="pt-16">
                <div>
                  <v-img class="mx-auto" width="185" :src="require('/static/logo_new.svg')" />
                </div>
                <div class="pt-16">
                  <SignUpTimeline v-model="timelineStep[step]" />
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="7"
            md="7"
            lg="8"
            xl="9"
            style="padding-top: 150px"
          >
            <v-tabs-items v-model="step" style="background: none" touchless>
              <v-tab-item>
                <YourDetails v-model="formData.user" @input="checkSchoolByEmailDomain()" />
              </v-tab-item>
              <v-tab-item>
                <IsThisYourSchool
                  :user="formData.user"
                  :school="matchedSchool"
                  @accepted="step = STEP.REQUEST_SENT"
                  @decline="step = STEP.NOT_YOUR_SCHOOL"
                />
              </v-tab-item>
              <v-tab-item>
                <RequestSent :school="matchedSchool" />
              </v-tab-item>
              <v-tab-item>
                <CreateSchoolProfile v-model="formData.school" @input="step = STEP.UPLOAD_SCHOOL_LOGO" />
              </v-tab-item>
              <v-tab-item>
                <UploadSchoolLogo v-model="formData.file" @input="step = STEP.CHOOSE_SCHOOL_COLOR" />
              </v-tab-item>
              <v-tab-item>
                <ChooseSchoolColour v-model="formData.school.color" @input="step = STEP.CHOOSE_PASSWORD" />
              </v-tab-item>
              <v-tab-item>
                <ChoosePassword v-model="formData.user" @input="step = STEP.INVITE_YOUR_TEAM" />
              </v-tab-item>
              <v-tab-item>
                <InviteTeam v-model="formData.invites" @input="save" />
              </v-tab-item>
              <v-tab-item>
                <SignUpComplete :link="link" />
              </v-tab-item>
              <v-tab-item>
                <NotYourSchool />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import YourDetails from '@/components/PageComponents/FxSignUpPage/YourDetails'
import SignUpTimeline from '@/components/PageComponents/FxSignUpPage/SignUpTimeline'
import CreateSchoolProfile from '@/components/PageComponents/FxSignUpPage/CreateSchoolProfile'
import UploadSchoolLogo from '@/components/PageComponents/FxSignUpPage/UploadSchoolLogo'
import ChoosePassword from '@/components/PageComponents/FxSignUpPage/ChoosePassword'
import ChooseSchoolColour from '@/components/PageComponents/FxSignUpPage/ChooseSchoolColour'
import InviteTeam from '@/components/PageComponents/FxSignUpPage/InviteTeam'
import SignUpComplete from '@/components/PageComponents/FxSignUpPage/SignUpComplete'
import IsThisYourSchool from '@/components/PageComponents/FxSignUpPage/IsThisYourSchool'
import RequestSent from '@/components/PageComponents/FxSignUpPage/RequestSent'
import NotYourSchool from '@/components/PageComponents/FxSignUpPage/NotYourSchool'

const STEP = Object.freeze({
  YOUR_DETAILS: 0,
  IS_THIS_YOUR_SCHOOL: 1,
  REQUEST_SENT: 2,
  CREATE_SCHOOL_PROFILE: 3,
  UPLOAD_SCHOOL_LOGO: 4,
  CHOOSE_SCHOOL_COLOR: 5,
  CHOOSE_PASSWORD: 6,
  INVITE_YOUR_TEAM: 7,
  WELCOME_TO_FIXTURR: 8,
  NOT_YOUR_SCHOOL: 9,
})

export default {
  name: 'SignUpPage',
  components: {
    NotYourSchool,
    RequestSent,
    IsThisYourSchool,
    SignUpComplete,
    InviteTeam,
    ChooseSchoolColour,
    ChoosePassword,
    UploadSchoolLogo,
    CreateSchoolProfile,
    SignUpTimeline,
    YourDetails,
  },
  layout: 'empty',

  middleware: ({ store, error }) => {
    if (!store.getters['context/isSignUpSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data: () => ({
    STEP,
    step: 0,
    loading: false,

    timelineStep: {
      [STEP.YOUR_DETAILS]: 0,
      [STEP.CREATE_SCHOOL_PROFILE]: 1,
      [STEP.UPLOAD_SCHOOL_LOGO]: 1,
      [STEP.CHOOSE_SCHOOL_COLOR]: 1,
      [STEP.CHOOSE_PASSWORD]: 2,
      [STEP.INVITE_YOUR_TEAM]: 3,
      [STEP.WELCOME_TO_FIXTURR]: 3,
    },

    formData: {
      user: { },
      school: { color: '' },
      invites: [],
      file: null,
    },

    matchedSchool: null,
  }),

  computed: {
    link () {
      return this.$config.PORTAL_WILDCARD.replace('*', this.formData.school.portalAddress) + '/signin'
    },
  },

  methods: {
    async checkSchoolByEmailDomain () {
      const domain = this.formData.user.email.split('@')[1]
      const school = await this.$store.dispatch('api/signUp/checkSchoolByEmailDomain', domain)

      if (school) {
        this.matchedSchool = school
        this.step = STEP.IS_THIS_YOUR_SCHOOL
      } else {
        this.matchedSchool = null
        this.step = STEP.CREATE_SCHOOL_PROFILE
      }
    },

    save () {
      this.loading = true
      this.$store.dispatch('api/signUp/schoolSignUp', this.formData)
        .then(() => {
          this.step = STEP.WELCOME_TO_FIXTURR
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
@media only screen and (min-width: 600px) {
  .school-panel {
    height: 100%;
    background: var(--v-primary-base);
  }
  .sign-in-form {
    max-width: 400px
  }
}
</style>

<style scoped>

.theme--light.v-application {
    background: #F1F4FA;
}

</style>
