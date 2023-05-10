<template>
  <div>
    <h1 v-balance-text class="text-h3 primary--text text-center mt-6">
      Your Details
    </h1>
    <h2 class="text-p2 text-center primary--text mb-6">
      We just need your name and email to get started.
    </h2>
    <v-form ref="form" v-async-form class="mx-7 mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <label for="firstname">First Name</label>
          <v-text-field
            id="firstname"
            v-model="formData.firstname"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            maxlength="120"
            placeholder="First Name"
          />
        </v-col>
        <v-col>
          <label for="lastname">Last Name</label>
          <v-text-field
            id="lastname"
            v-model="formData.lastname"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            maxlength="120"
            placeholder="Last Name"
          />
        </v-col>
      </v-row>

      <label for="email">Email</label>
      <v-text-field
        id="email"
        v-model="formData.email"
        v-async-validate
        outlined
        placeholder="name@school.com"
        maxlength="120"
        :async-rules="[$rule.required, $rule.email, $rule.isEmailAvailable()]"
      />

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
  </div>
</template>

<script>
export default {
  name: 'YourDetails',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    loading: false,
    formData: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    },
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
