<template>
  <v-dialog v-model="dialog" width="320">
    <v-card flat outlined>
      <v-form ref="form" v-async-form :disabled="loading" @submit.prevent="submit">
        <v-card-title>Re-enter password</v-card-title>
        <v-card-text>
          <v-text-field
            :value="email"
            outlined
            hide-details
            height="56"
            class="mt-8 mb-4 email-field"
            label="Email"
            placeholder="name@school.com"
            type="email"
            readonly
          />
          <v-text-field
            v-model="formData.password"
            v-async-validate
            outlined
            placeholder="********************"
            :async-rules="[$rule.required]"
            :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
            :type="showPass ? 'text' : 'password'"
            height="56"
            hide-details
            class="mb-6"
            label="Password"
            @click:append="showPass = !showPass"
          />
        </v-card-text>
        <v-card-actions class="px-4">
          <v-spacer />
          <v-btn text class="neutral--text text--darken-3" @click="logOut">
            Not You?
          </v-btn>
          <v-btn
            type="submit"
            depressed
            color="primary"
            dark
            :loading="loading"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxAdditionalSecurityModal',
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
    loading: false,
    dialog: false,
    showPass: false,
    resolve: null,
    reject: null,
  }),
  computed: {
    ...mapGetters({
      me: 'context/me',
      school: 'context/school',
    }),
    email () {
      return this.me.email.replace(/^(.)(.*)(.@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '*') + c,
      )
    },
  },
  methods: {
    open () {
      this.formData = {
        email: this.me.email,
      }

      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
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
          schoolId: this.school.id,
        })
        this.resolve(true)
      } catch (e) {
        if (e?.response?.status === 400) {
          this.$toast.error('Invalid Password')
          return
        }
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },

    logOut () {
      this.$store.dispatch('context/logOut')
        .then(() => {
          window.location.reload()
        })
    },
  },
}
</script>
