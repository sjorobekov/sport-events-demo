<template>
  <div>
    <h1 class="text-h1 text-center primary--text mt-6 mb-9">
      Choose a Password
    </h1>

    <div class="mx-sm-auto sign-in-form">
      <v-form ref="form" v-async-form class="mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
        <label class="caption" for="password">Password</label>
        <v-text-field
          id="password"
          v-model="formData.password"
          v-async-validate
          :async-rules="[$rule.required, $rule.minLength(4)]"
          outlined
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          placeholder="Password"
          @click:append="showPass = !showPass"
        />

        <div>
          <label class="caption" for="password_confirm">Confirm Password</label>
          <v-text-field
            id="password_confirm"
            v-model="confirm"
            v-async-validate
            :async-rules="[$rule.required, $rule.equal(formData.password)]"
            outlined
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <v-btn
          type="submit"
          depressed
          color="brand3"
          dark
          height="50"
          :loading="loading"
          block
        >
          Next
        </v-btn>
      </v-form>

      <v-row class="mt-16">
        <v-col>
          <ul class="text-p2 info--text text--lighten-1">
            <li>8 characters minimum</li>
            <li>One number</li>
          </ul>
        </v-col>
        <v-col>
          <ul class="text-p2 info--text text--lighten-1">
            <li>One uppercase character</li>
            <li>One lowercase character</li>
          </ul>
        </v-col>
      </v-row>
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
    showPass: false,
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
