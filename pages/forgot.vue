<template>
  <div>
    <h1 class="text-md-h1 text-h3s text-center mt-6">
      Forgot Password?
    </h1>
    <h2 class="text-p2 text-center info--text text--darken-2 mb-6">
      No worries, we will send you reset instructions.
    </h2>
    <v-form ref="form" v-async-form class="mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submit">
      <label>Email</label>
      <v-text-field
        v-model="formData.email"
        v-async-validate
        outlined
        dense
        placeholder="name@school.com"
        :async-rules="[$rule.required, $rule.email]"
      />

      <v-btn
        type="submit"
        depressed
        color="primary"
        dark
        height="50"
        :loading="loading"
        block
      >
        Send Reset Instructions
      </v-btn>

      <div class="text-center text-p2 mt-8">
        <nuxt-link class="text-decoration-none" :to="{ name: 'signin' }">
          <v-icon small class="mr-2">
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
  name: 'LoginPage',
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
