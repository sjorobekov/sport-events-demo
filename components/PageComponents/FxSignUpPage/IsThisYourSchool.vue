<template>
  <div>
    <h1 class="text-h1 text-center mt-6">
      {{ title }}
    </h1>

    <h2 class="text-p2 text-center info--text text--darken-2 mb-6">
      {{ subtitle }}
    </h2>

    <div class="sign-in-form mx-auto">
      <v-card class="py-8 px-12">
        <v-list-item>
          <v-list-item-avatar>
            <FxSchoolLogo :color="school.color" :value="school.logo" size="60" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p3 font-weight-bold info--text text--darken-2">
              {{ school.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 info--text text--darken-2">
              {{ school.city }},
              <FxCountryName :code="school.country" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-btn
        :loading="loading"
        depressed
        block
        color="brand2"
        dark
        class="mt-10"
        @click="submitHandler"
      >
        {{ acceptButtonTitle }}
      </v-btn>

      <v-btn
        :loading="loading"
        block
        text
        color="info"
        class="mt-1"
        @click="$emit('decline')"
      >
        No, that's not my school
      </v-btn>
    </div>
  </div>
</template>

<script>
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
export default {
  name: 'IsThisYourSchool',
  components: { FxSchoolLogo },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    school: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    loading: false,
    formData: {},
  }),

  computed: {
    canJoin () {
      return this.school.portal && this.school.hasAdmin
    },

    title () {
      return this.canJoin ? 'Is This Your School?' : 'Claim School'
    },

    subtitle () {
      return this.canJoin ? 'It looks like your email address matches this school' : 'Claim the Sports Portal For this school'
    },

    acceptButtonTitle () {
      return this.canJoin ? 'Yes, that is my school' : 'Claim School'
    },
  },

  methods: {
    async submitHandler () {
      this.loading = true

      try {
        if (this.canJoin) {
          await this.$store.dispatch('api/signUp/requestToJoin', {
            ...this.user,
            schoolId: this.school.id,
          })
        } else {
          await this.$store.dispatch('api/signUp/claimSchool', {
            ...this.user,
            schoolId: this.school.id,
          })
        }
        this.$emit('accepted')
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
