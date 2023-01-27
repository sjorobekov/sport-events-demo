<template>
  <div>
    <h1 class="text-md-h1 text-h6 text-center mt-2 mt-sm-6">
      Welcome
    </h1>
    <v-form ref="form" v-async-form :disabled="loading" @submit.prevent="submit">
      <label>Email</label>
      <v-text-field
        v-model="formData.email"
        v-async-validate
        outlined
        placeholder="name@school.com"
        :async-rules="[$rule.required, $rule.email]"
        hide-details
        height="56"
        class="mb-3"
      />
      <label>Password</label>
      <v-text-field
        v-model="formData.password"
        v-async-validate
        outlined
        placeholder="********************"
        :async-rules="[$rule.required]"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        height="56"
        hide-details
        class="mb-6"
        @click:append="showPass = !showPass"
      />

      <v-row no-gutters>
        <v-col>
          <v-checkbox class="mt-0 remember-checkbox" label="Remember me" />
        </v-col>
        <v-col class="text-right">
          <nuxt-link :to="{ name: 'forgot' }" class="text-p1 info--text text--darken-4">
            Forgot your password?
          </nuxt-link>
        </v-col>
      </v-row>

      <v-btn
        type="submit"
        depressed
        color="primary"
        dark
        :loading="loading"
        block
        height="50"
        class="font-weight-bold mt-2"
      >
        Log In
      </v-btn>
      <p style="margin-top: 120px" class="text-center text-p1 info--text text--darken-2 hidden-sm-and-down">
        By logging in to Fixturr you accept our <nuxt-link to="" style="text-decoration: none" class="font-weight-bold">
          Terms & Conditions
        </nuxt-link>
      </p>
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
  color: var(--v-info-darken4)!important
</style>
