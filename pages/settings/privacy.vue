<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Privacy
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-alert v-if="partiallyPublic" color="#E8EDFB" style="color: #173EAD">
      <template #prepend>
        <v-icon class="mr-3" size="18" color="#6183E4">
          mdi-alert-circle-outline
        </v-icon>
      </template>
      <div class="text-p1 font-weight-bold">
        The Fixturr Portal is Public.
      </div>
      <div v-if="school.teamSheetsProtected" class="text-p1 font-weight-bold">
        Team Sheets are Password Protected.
      </div>
      <div v-if="school.announcementsProtected" class="text-p1 font-weight-bold">
        Announcements are Password Protected.
      </div>
    </v-alert>

    <v-alert v-else-if="fullyPublic" color="success" text>
      <template #prepend>
        <v-icon class="mr-3" size="18" color="success darken-1">
          mdi-alert-circle-outline
        </v-icon>
      </template>
      <div class="text-p1 font-weight-bold success--text text--darken-1">
        All pages in the Fixturr Portal are public.
      </div>
    </v-alert>

    <v-alert v-else-if="private" color="error" text>
      <template #prepend>
        <v-icon class="mr-3" size="18" color="error darken-1">
          mdi-alert-circle-outline
        </v-icon>
      </template>
      <div class="text-p1 font-weight-bold error-text text--darken-1">
        All pages in Fixturr Portal are password protected.
      </div>
    </v-alert>
    <v-card>
      <FxSchoolPrivacyForm ref="form" v-model="formData" :loading="loading" @save="save" />
    </v-card>
  </div>
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

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSchoolPrivacy'],
  },

  data: () => ({
    formData: {},
    original: {},
    loading: false,
  }),

  computed: {
    ...mapGetters({
      school: 'context/school',
    }),

    fullyPublic () {
      return !this.school.portalProtected && !this.school.teamSheetsProtected && !this.school.announcementsProtected
    },

    partiallyPublic () {
      return !this.school.portalProtected && (this.school.teamSheetsProtected || this.school.announcementsProtected)
    },

    private () {
      return this.school.portalProtected
    },
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
