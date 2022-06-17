<template>
  <v-container fluid class="fill-height pa-0">
    <v-row align-sm="center" justify-sm="center" class="fill-height" no-gutters>
      <v-col
        cols="12"
        sm="5"
        md="5"
        lg="4"
        xl="3"
        :style="style"
        class="school-panel pa-0"
      >
        <v-row align="center" justify="center" class="fill-height" no-gutters>
          <v-col>
            <div>
              <v-avatar size="220" color="white" class="mt-8 mb-10 mx-auto d-block">
                <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" />
              </v-avatar>
              <h1 class="text-h1s white--text text-center">
                {{ contextSchool.name }}
              </h1>
              <h2 class="text-h1s white--text text-center d-none d-sm-block" style="margin-top: 334px">
                fixturr
              </h2>
              <h2 class="text-p1 font-weight-medium white--text text-center mt-4 d-block d-sm-none">
                Sports Portal
              </h2>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="7"
        md="7"
        lg="8"
        xl="9"
        class="pa-2"
      >
        <h1 class="text-h1 text-center mt-6">
          Welcome
        </h1>
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
              <nuxt-link to="" class="text-p1 info--text text--darken-4">
                Forgot your password?
              </nuxt-link>
            </v-col>
          </v-row>

          <v-btn
            type="submit"
            depressed
            color="brand"
            dark
            :loading="loading"
            block
          >
            Log In
          </v-btn>
          <p style="margin-top: 229px" class="text-center text-p1 info--text text--darken-2 d-none d-sm-block">
            By logging in to fixturr you accept our <nuxt-link to="" style="text-decoration: none" class="font-weight-bold">
              Terms & Conditions
            </nuxt-link>
          </p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'LoginPage',
  components: { FxSchoolLogo },
  layout: 'empty',
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

    style () {
      return {
        background: this.contextSchool.color,
      }
    },
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

<style lang="scss" scoped>
@media only screen and (min-width: 600px) {
  .school-panel {
    height: 100%;
  }
  .sign-in-form {
    max-width: 400px
  }
}
</style>
