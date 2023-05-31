<template>
  <div>
    <h1 v-balance-text class="text-h3 branddark--text text-center mt-6 mb-2">
      Your Details
    </h1>
    <h2 class="text-p3 text-center branddark--text text--lighten-1 mb-6">
      We just need your name and email to get started.
    </h2>
    <v-form ref="form" v-async-form class="mx-4 mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0 pt-0">
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
        <v-col class="pb-0 pt-0">
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
      <v-row>
        <v-col cols="12" class="pb-0 pt-0">
          <label class="mt-1" for="email">Email</label>
          <v-text-field
            id="email"
            v-model="formData.email"
            v-async-validate
            outlined
            placeholder="name@school.com"
            maxlength="120"
            :async-rules="[$rule.required, $rule.email, $rule.nonAssociatedEmailDomain, $rule.nonStudentEmail, $rule.isEmailAvailable()]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-0 pt-0">
          <v-checkbox v-model="accept" v-async-validate :async-rules="[$rule.required]" color="brandgreen">
            <template #label>
              <div class="branddark--text">
                You have read and agree to
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <a
                      target="_blank"
                      href="https://fixturr.com/legal/terms-of-service/"
                      class="policy-link"
                      @click.stop
                      v-on="on"
                    >
                      Fixturr's Terms of Service
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>,
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <a
                      target="_blank"
                      href="https://fixturr.com/legal/privacy-policy/"
                      class="policy-link"
                      @click.stop
                      v-on="on"
                    >
                      Privacy Policy
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>
                and
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <a
                      target="_blank"
                      href="https://fixturr.com/legal/data-protection-policy/"
                      class="policy-link"
                      @click.stop
                      v-on="on"
                    >
                      Data Protection Policy
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>

      <v-btn
        type="submit"
        depressed
        color="brandgreen"
        dark
        height="50"
        :loading="loading"
        block
        class="mt-8 mb-4 sign-up-button"
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
    accept: false,
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
<style scoped>
.policy-link {
  color: var(--v-branddark-base)
}
</style>
