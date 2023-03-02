<template>
  <div>
    <div class="text-center">
      <slot name="content">
        <v-icon size="40" color="info darken-1 mb-5">
          $vuetify.icons.padlock
        </v-icon>
        <div class="font-weight-bold neutral--text text--darken-4 text-p2 mt-2 mb-3">
          <slot name="subtitle">
            This Team Sheet is Password Protected.
          </slot>
        </div>
      </slot>

      <v-text-field
        v-model="password"
        outlined
        :loading="loading"
        class="mb-2"
        hide-details
        background-color="white"
        placeholder="Enter Password"
        :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      />

      <v-btn
        :loading="loading"
        large
        depressed
        color="primary"
        block
        class="mb-4"
        height="52"
        @click="view"
      >
        <slot name="buttonLabel">
          View Team Sheet
        </slot>
      </v-btn>
      <template v-if="school.email">
        <div class="neutral--text text--darken-3 text-p1">
          For password questions, please email:
        </div>
        <div class="info--text text--darken-1 email-link">
          <a class="text-p1 primary--text" :href="`mailto:${school.email}`">{{ school.email }}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GuestLoginForm',
  data: () => ({
    showPass: false,
    password: '',
    loading: false,
  }),
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      school: 'context/school',
    }),
  },

  methods: {
    view () {
      this.loading = true
      this.$store.dispatch('context/guestSignIn', {
        password: this.password,
        schoolId: this.contextSchoolId,
      })
        .then(() => {
          this.$emit('signedIn')
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.$toast.error('Invalid Password')
          } else {
            this.$toast.error('Unknown Error')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
.email-link {
  line-height: 1;
}
</style>
