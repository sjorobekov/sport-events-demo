<template>
  <div>
    <h3 class="text-h3 mb-6">
      Edit Sports Contact
    </h3>
    <FxSportsContactForm ref="form" v-model="formData" :disabled="loading" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined class="neutral--text text--darken-3" @click="cancel">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="save"
        >
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSportsContactForm from '~/components/FxSportsContactForm'

export default {
  name: 'RecordsCategoryEditPage',
  components: { FxSportsContactForm },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateSportsContacts'],
  },

  data: () => ({
    formData: {},
    loading: false,
  }),

  async fetch () {
    this.contact = await this.$store.dispatch('api/sportsContacts/get', {
      schoolId: this.schoolId,
      id: this.$route.params.id,
    })

    this.formData = {
      ...this.contact,
    }
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('api/sportsContacts/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'directory-sports-contacts' })
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
    cancel () {
      this.$router.push({ name: 'directory-sports-contacts' })
    },
  },
}
</script>
