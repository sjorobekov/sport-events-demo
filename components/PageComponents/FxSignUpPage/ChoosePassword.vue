<template>
  <div>
    <h1 v-balance-text class="text-h3 text-center branddark--text mt-6 mb-6 mx-3">
      Choose a Password
    </h1>

    <div class="mx-3 mx-sm-auto sign-in-form">
      <v-form ref="form" v-async-form class="mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
        <label class="caption" for="password">Password</label>
        <v-text-field
          id="password"
          v-model="formData.password"
          v-async-validate
          :async-rules="[$rule.required, $rule.minLength(4)]"
          outlined
          :append-icon="showPass1 ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
          :type="showPass1 ? 'text' : 'password'"
          placeholder="Password"
          @click:append="showPass1 = !showPass1"
        />
        <label class="caption" for="password_confirm">Confirm Password</label>
        <v-text-field
          id="password_confirm"
          v-model="confirm"
          v-async-validate
          :async-rules="[$rule.required, $rule.equal(formData.password)]"
          :append-icon="showPass2 ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
          :type="showPass2 ? 'text' : 'password'"
          outlined
          placeholder="Confirm Password"
          @click:append="showPass2 = !showPass2"
        />

        <v-btn
          type="submit"
          depressed
          color="brandgreen"
          dark
          height="50"
          :loading="loading"
          block
          class="sign-up-button mt-4 mb-4"
        >
          Next
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoosePassword',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    loading: false,
    formData: {},
    showPass1: false,
    showPass2: false,
    confirm: '',
  }),

  created () {
    this.formData = {
      ...this.value,
    }
  },

  methods: {
    async submitHandler () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$emit('input', this.formData)
      this.loading = false
    },
  },
}
</script>
