<template>
  <FxSchoolPrivacyForm ref="form" v-model="formData" :loading="loading" @save="save">
    <template #title>
      <v-card-title class="text-h4s">
        Privacy
      </v-card-title>
    </template>
  </FxSchoolPrivacyForm>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'

export default {
  name: 'SchoolPrivacyPage',
  beforeRouteLeave (_to, _from, next) {
    if (!isEqual(this.original, this.formData)) {
      const answer = window.confirm('You have unsaved changes. Do you really want to leave?')
      if (!answer) {
        return false
      }
    }
    next()
  },
  layout: 'admin',
  data: () => ({
    formData: {},
    original: {},
    loading: false,
  }),

  computed: {
    ...mapGetters({
      school: 'context/school',
    }),
  },

  async created () {
    const password = await this.$store.dispatch('api/schools/getPassword', this.school.id)

    this.formData = {
      ...this.school,
      password,
    }

    this.original = {
      ...this.formData,
    }
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/schools/savePrivacy', this.formData).then((res) => {
        this.$store.commit('context/school', res)

        this.formData = {
          ...res,
          password: this.formData.password,
        }

        this.original = {
          ...this.formData,
        }

        this.$toast.success('Saved!')
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
