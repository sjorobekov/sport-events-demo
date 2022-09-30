<template>
  <div>
    <div class="text-center pa-6">
      <v-icon size="40" color="info darken-1 mb-3">
        mdi-lock
      </v-icon>
      <div class="info--text text--darken-1 text-p1 mb-3">
        This Team Sheet is Password Protected.
      </div>

      <v-text-field
        v-model="password"
        outlined
        :loading="loading"
        class="mb-2"
        hide-details
        placeholder="Enter Password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      />

      <v-btn
        :loading="loading"
        large
        depressed
        color="primary"
        block
        class="mb-4"
        @click="view"
      >
        View Team Sheet
      </v-btn>
      <template v-if="school.email">
        <div class="info--text text--darken-1 text-p1">
          For password questions, please email:
        </div>
        <div class="info--text text--darken-1">
          <a class="text-p1 font-weight-bold primary--text" :href="`mailto:${school.email}`">{{ school.email }}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GuestLoginForm',
  data: () => ({
    showPass: false,
    password: '',
    loading: false,
  }),
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      school: 'context/school',
    }),
  },

  methods: {
    view () {
      this.loading = true
      this.$store.dispatch('context/guestSignIn', {
        password: this.password,
        schoolId: this.contextSchoolId,
      })
        .then(() => {
          this.$emit('signedIn')
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.$toast.error('Invalid Password')
          } else {
            this.$toast.error('Unknown Error')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
