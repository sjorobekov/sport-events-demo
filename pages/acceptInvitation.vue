<template>
  <div>
    <h1 class="text-md-h1 text-h3s text-center mt-6">
      Welcome to Fixturr
    </h1>

    <v-form ref="nameForm" v-async-form :disabled="loading">
      <label for="email">Email</label>
      <v-text-field
        id="email"
        :value="$route.query.email"
        dense
        outlined
        readonly
      />

      <v-row>
        <v-col>
          <label for="firstname">First Name</label>
          <v-text-field
            id="firstname"
            v-model="formData.firstname"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
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
            dense
            :async-rules="[$rule.required]"
            outlined
            maxlength="120"
            placeholder="Last Name"
          />
        </v-col>
      </v-row>
    </v-form>

    <FxUserSetPasswordForm ref="form" v-model="formData" :disabled="loading" />
    <v-btn
      height="50"
      depressed
      block
      color="primary"
      :loading="loading"
      @click="send"
    >
      Accept
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AcceptInvitationPage',
  layout: 'startup',
  middleware: ({ error, route }) => {
    if (!route.query.signedUrl) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data: () => ({
    formData: { password: '', firstname: '', lastname: '' },
    loading: false,
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),
  },

  methods: {
    async send () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$axios.$post(this.$route.query.signedUrl, {
        ...this.formData,
      })
        .then(() => {
          this.$toast('Password has been set successfully!')
          this.$router.replace({ name: 'signin' })
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
