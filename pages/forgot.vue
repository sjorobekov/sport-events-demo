<template>
  <div>
    <h1 class="text-md-h3 text-h3s font-weight-bold text-center mt-6 neutral--text text--darken-4 mb-2">
      Forgot Password?
    </h1>
    <h2 class="text-p3 text-center neutral--text text--darken-2 mb-4 mb-sm-8">
      No worries, we will send you reset instructions.
    </h2>
    <v-form ref="form" v-async-form class="mx-sm-auto forgot-form" :disabled="loading" @submit.prevent="submit">
      <v-text-field
        v-model="formData.email"
        v-async-validate
        outlined
        height="56"
        placeholder="name@school.com"
        :async-rules="[$rule.required, $rule.email]"
        label="Email"
        hide-details
        class="mb-5"
      />
      <v-btn
        type="submit"
        depressed
        color="primary"
        dark
        height="50"
        :loading="loading"
        block
        class="font-weight-bold"
      >
        Send Reset Instructions
      </v-btn>

      <div class="text-center text-p2 mt-10">
        <nuxt-link class="text-decoration-none neutral--text text--darken-3" :to="{ name: 'signin' }">
          <v-icon size="20" class="mr-1">
            $vuetify.icons.arrowLeft
          </v-icon>Back to log in
        </nuxt-link>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ForgotPage',

  beforeRouteEnter (to, from, next) {
    if (to.query.redirectTo) {
      return next()
    }

    next(({ $router }) => {
      if (from.query.redirectTo) {
        $router.replace({ query: { redirectTo: from.query.redirectTo } })
      }
    })
  },

  layout: 'startup',

  data: () => ({
    formData: {
      email: '',
    },
    loading: false,
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
        await this.$store.dispatch('context/forgotPassword', {
          ...this.formData,
          schoolId: this.contextSchool.id,
        })
        await this.$router.push({ name: 'signin' })
        this.$toast.success('Email has been sent!')
      } catch (e) {
        this.loading = false
        this.$toast.error('Unknown Error')
      }
    },
  },
}
</script>
<style scoped lang="sass">
@import '~vuetify/src/styles/styles'
.forgot-form
  max-width: 320px
.return-to-login
  color: var(--v-neutral-darken3)!important

@media #{map-get($display-breakpoints, 'xs-only')}
  .forgot-form
    max-width: none

</style>
