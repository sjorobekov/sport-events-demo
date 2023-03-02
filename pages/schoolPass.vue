<template>
  <div class="guest-form">
    <GuestLoginForm @signedIn="onSuccess">
      <template #content>
        <v-icon class="mb-4" color="neutral darken-3" size="88">
          $vuetify.icons.padlock
        </v-icon>
        <h1 class="heading-text font-weight-bold neutral--text text--darken-5 mb-6">
          The Sports Portal is <br> Password Protected
        </h1>
      </template>
      <template #buttonLabel>
        View Sports Portal
      </template>
    </GuestLoginForm>
    <v-btn
      depressed
      outlined
      color="neutral darken-3"
      dark
      :loading="loading"
      block
      height="50"
      class="mt-5 return-to-login-button"
      :ripple="false"
      :to="{ name: 'signin', query: $route.query }"
      >
      <v-icon size="24" class="mr-2" color="neutral darken-1">
            $vuetify.icons.key
          </v-icon>
      Have an account? Log In
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GuestLoginForm from '~/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm.vue'

export default {
  name: 'SinglePasswordPage',
  components: { GuestLoginForm },

  beforeRouteEnter (to, from, next) {
    if (to.query.redirectTo) {
      return next()
    }

    next(({ $router }) => {
      if (from.fullPath && !from.query.redirectTo) {
        $router.replace({ query: { redirectTo: from.fullPath } })
      }
    })
  },

  layout: 'startup',
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
    loading: false,
    showPass: false,
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),
  },

  methods: {
    onSuccess () {
      if (typeof this.$route.query.redirectTo === 'string') {
        this.$router.push(this.$route.query.redirectTo)
      } else {
        this.$router.push({ name: 'index' })
      }
    },
  },
}
</script>

<style scoped>
.heading-text {
  font-size: 24px;
  line-height: 32px;
  min-width: 320px;
}

.signin-link {
  font-size: 18px;
}

</style>
