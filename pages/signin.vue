<template>
  <div>
    <h1 class="text-h1 text-center mt-6">
      Welcome
    </h1>
    <v-form ref="form" v-async-form :disabled="loading" @submit.prevent="submit">
      <label>Email</label>
      <v-text-field
        v-model="formData.email"
        v-async-validate
        outlined
        dense
        placeholder="name@school.com"
        :async-rules="[$rule.required, $rule.email]"
      />
      <label>Password</label>
      <v-text-field
        v-model="formData.password"
        v-async-validate
        dense
        outlined
        placeholder="********************"
        :async-rules="[$rule.required]"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      />

      <v-row no-gutters>
        <v-col>
          <v-checkbox class="mt-0" label="Remember me" />
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
      >
        Log In
      </v-btn>
      <p style="margin-top: 229px" class="text-center text-p1 info--text text--darken-2 d-none d-sm-block">
        By logging in to fixturr you accept our <nuxt-link to="" style="text-decoration: none" class="font-weight-bold">
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
        await this.$router.push({ name: 'index' })
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
