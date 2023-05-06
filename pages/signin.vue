<template>
  <div>
    <h1 class="text-sm-h2 text-h3s text-center mt-2 mt-sm-6 neutral--text text--darken-4 font-weight-bold">
      Welcome
    </h1>
    <v-form ref="form" v-async-form :disabled="loading" class="log-in-form" @submit.prevent="submit">
      <v-text-field
        v-model="formData.email"
        v-async-validate
        outlined
        :async-rules="[$rule.required, $rule.email]"
        hide-details
        height="56"
        class="mt-4 mt-md-8 mb-4 email-field"
        label="Email"
        placeholder="name@school.com"
        type="email"
      />
      <v-text-field
        v-model="formData.password"
        v-async-validate
        outlined
        placeholder="********************"
        :async-rules="[$rule.required]"
        :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
        :type="showPass ? 'text' : 'password'"
        height="56"
        hide-details
        class="mb-6"
        label="Password"
        @click:append="showPass = !showPass"
      />

      <v-row no-gutters>
        <v-col>
          <v-checkbox class="mt-0 ma-0 remember-checkbox shrink" label="Remember me" :ripple="false" />
        </v-col>
        <v-col class="text-right">
          <nuxt-link :to="{ name: 'forgot' }" class="text-p1 neutral--text text--darken-3">
            Forgot your password?
          </nuxt-link>
        </v-col>
      </v-row>

      <div class="d-flex flex-column align-center">
        <v-btn
          type="submit"
          depressed
          color="primary"
          dark
          :loading="loading"
          block
          height="50"
          class="font-weight-bold mt-2"
          :ripple="false"
        >
          Log In
        </v-btn>
        <v-btn
          depressed
          outlined
          color="neutral darken-3"
          dark
          block
          height="50"
          class="mt-4"
          :ripple="false"
          :to="{ name: 'schoolPass', query: $route.query }"
        >
          <v-icon size="24" class="mr-2" color="neutral darken-1">
            $vuetify.icons.key
          </v-icon>
          View Portal with School Password
        </v-btn>

        <v-btn
          fab
          elevation="0"
          style="opacity: 0.5"
          dark
          color="neutral darken-2"
          class="mt-4 hidden-sm-and-up"
          @click="$router.back()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',

  beforeRouteEnter (to, from, next) {
    if (to.query.redirectTo) {
      return next()
    }

    next(({ $router }) => {
      if (from.fullPath && !from.query.redirectTo) {
        $router.replace({ query: { redirectTo: from.fullPath } })
      } else if (from.name === 'forgot' && from.query.redirectTo) {
        $router.replace({ query: { redirectTo: from.query.redirectTo } })
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
    async submit () {
      try {
        this.loading = true
        const isValid = await this.$refs.form.validateAsync()
        if (!isValid) {
          this.loading = false
          return
        }
        await this.$store.dispatch('context/signIn', {
          ...this.formData,
          schoolId: this.contextSchool.id,
        })

        if (typeof this.$route.query.redirectTo === 'string') {
          await this.$router.push(this.$route.query.redirectTo)
        } else {
          await this.$router.push({ name: 'index' })
        }
      } catch (e) {
        this.loading = false

        if (e?.response?.status === 400) {
          this.$toast.error('Invalid email or password')
          return
        }
        this.$toast.error('Unknown Error')
      }
    },
  },
}
</script>
<style scoped lang="sass">
::v-deep .remember-checkbox .v-label
  font-size: 0.875rem!important
  color: var(--v-neutral-darken3)!important

.signin-link
  font-size: 16px
  text-decoration: none
  color: var(--v-neutral-darken3)

.log-in-form
  min-width: 320px

.school-password
  background: white
  border-radius: 4px
  border: solid 1px var(--v-neutral-lighten1)
  width: 100%

.school-password:hover
  border-color: var(--v-primary-base)
  color: var(--v-primary-base)!important

::v-deep .remember-checkbox .v-icon
  font-size: 20px!important

.v-application--is-ltr .v-input--selection-controls__input
  margin-right: 20px!important
</style>
