<template>
  <div>
    <GuestLoginForm @signedIn="onSuccess">
      <template #content>
        <v-icon class="mb-8" color="info lighten-1" size="80">
          $vuetify.icons.padlock
        </v-icon>
        <h1 class="heading-text font-weight-bold info--text text--darken-4 mb-8">
          The Sports Portal is Password Protected
        </h1>
      </template>
      <template #buttonLabel>
        View Sports Portal
      </template>
    </GuestLoginForm>

    <div class="text-center mt-10">
      <nuxt-link class="signin-link font-weight-bold info--text text--darken-2" :to="{ name: 'signin', query: $route.query }">
        Have an account? Log In
      </nuxt-link>
    </div>
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
}

.signin-link {
  font-size: 18px;
}
</style>
