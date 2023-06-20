<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4 font-weight-bold">
          Profile
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <div v-if="$fetchState.error">
      <h1 class="text--disabled font-weight-bold">
        An error occurred :(
      </h1>
    </div>

    <v-card v-else class="py-3 px-3 py-md-6 px-md-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-2">
        Profile Picture
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-2 px-0 pr-5"
          >
            Choose a profile picture for your account. You can upload a file in jpeg, png, or webp format.
          </v-col>
          <v-col
            cols="12"
            lg="7"
          >
            <FxImageUploadForm :value="formData" :loading="uploading" @input="uploadAvatar">
              <template #icon>
                <FxAvatar class="mr-2" size="80" :value="user.avatar" />
              </template>
              <template #actions>
                <v-btn depressed class="neutral--text text--darken-3" outlined :disabled="uploading" @click="removeAvatar">
                  Remove
                </v-btn>
              </template>
            </FxImageUploadForm>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="px-0 text-p3 font-weight-bold pb-2">
        General Information
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-2 px-0 pr-5"
          >
            Manage your user information here. You can edit your name, display name, phone number, job role, and user role.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0 px-0"
          >
            <FxProfileForm v-model="formData" :disabled="loading" disable-email disable-user-role />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pt-0 pr-0 mt-8 px-0">
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="save"
        >
          Update User
        </v-btn>
      </v-card-actions>
      <v-card-title class="px-0 text-p3 font-weight-bold pb-2">
        Display at Sports Contact
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-2 px-0 pr-5"
          >
            You can choose whether to make this user visible as a sports contact, and whether to display them as the main sports contact.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="px-0"
          >
            <FxAccountSportContactForm v-model="sportContactForm" :disabled="loading" @input="updateContactForm" />
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="px-0 text-p3 font-weight-bold pb-2">
        Account Security
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-2 px-0 pr-5"
          >
            To reset your account password, please enter your current password followed by your new password, and then confirm your new password.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="px-0"
          >
            <FxProfilePasswordChangeForm />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxProfileForm from '@/components/FxProfileForm'
import { UserRole } from '@/enum'
import FxAvatar from '@/components/FxAvatar'
import FxImageUploadForm from '@/components/FxImageUploadForm'

export default {
  name: 'UserEditPage',
  components: {
    FxImageUploadForm,
    FxProfileForm,
    FxAvatar,
  },
  data: () => ({
    formData: {
      enabled: true,
      userRole: UserRole.ADMIN,
    },
    sportContactForm: {
      displaySportsContact: false,
      mainSportsContact: false,
    },
    user: {},
    loading: false,
    uploading: false,
  }),

  async fetch () {
    this.user = await this.$store.dispatch('api/users/get', {
      id: this.userId,
      schoolId: this.schoolId,
    })

    this.formData = {
      ...this.user,
    }

    this.sportContactForm = {
      displaySportsContact: this.user.displaySportsContact,
      mainSportsContact: this.user.mainSportsContact,
    }
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      userId: 'context/myId',
    }),
  },

  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('api/users/save', this.formData)
        .then((res) => {
          this.user = {
            ...res,
          }
          this.$store.commit('context/me', res)
          this.$toast.success('Updated!')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    uploadAvatar (file) {
      this.uploading = true
      this.$store.dispatch('api/users/uploadAvatar', {
        id: this.userId,
        schoolId: this.schoolId,
        file,
      }).then((res) => {
        this.user = res
        this.$store.commit('context/me', res)
        this.$toast('Profile picture has been updated!')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.uploading = false
      })
    },

    updateContactForm () {
      this.$store.dispatch('api/users/save', {
        ...this.user,
        ...this.sportContactForm,
      }).then(() => {
        this.formData = {
          ...this.formData,
          ...this.sportContactForm,
        }
        this.user = {
          ...this.user,
          ...this.sportContactForm,
        }
      })
    },

    removeAvatar () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/users/removeAvatar', {
        id: this.userId,
        schoolId: this.schoolId,
      }).then((res) => {
        this.user = res
        this.$store.commit('context/me', res)
      })
    },

    reset () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/users/sendResetPasswordEmail', this.user)
        .then(() => {
          this.$toast.info('Email has been sent')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
    },
  },
}
</script>
