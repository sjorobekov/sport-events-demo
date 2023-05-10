<template>
  <div>
    <div class="mx-7">
      <h1 class="text-h3 text-center primary--text mt-6">
        Create School Profile
      </h1>
      <h2 class="text-p2 text-center primary--text mb-6">
        We couldn't match your email to a school in our database
      </h2>
    </div>
    <v-form ref="form" v-async-form class="mx-7 mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
      <label for="school_name">School Name</label>
      <v-text-field
        id="school_name"
        v-model="formData.name"
        v-async-validate
        :async-rules="[$rule.required]"
        placeholder="Enter School Name"
        outlined
        maxlength="120"
      />

      <label for="city">City</label>
      <v-text-field
        id="city"
        v-model="formData.city"
        placeholder="City"
        outlined
        maxlength="50"
      />

      <label class="caption" for="portal_address">Fixturr Portal Address</label>
      <v-text-field
        id="portal_address"
        v-model="formData.portalAddress"
        v-async-validate
        :async-rules="[$rule.required, $rule.alphaNumeric, $rule.isSubdomainAvailable(formData.id)]"
        outlined
        suffix=".fixturr.com"
      />

      <v-btn
        type="submit"
        class="mt-4"
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
  name: 'CreateSchoolProfile',

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    loading: false,
    formData: {},
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
