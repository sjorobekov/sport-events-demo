<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4">
          Privacy
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-alert v-if="partiallyPublic" color="#E8EDFB" class="alert partial-alert">
      <template #prepend>
        <div class="partial-alert-icon mr-3">
          <v-icon class="pa-1" size="18" color="white">
            mdi-alert-circle-outline
          </v-icon>
        </div>
      </template>
      <div class="text-p2 neutral--text text--darken-4">
        The Fixturr Portal is Public.
      </div>
      <div v-if="school.teamSheetsProtected" class="text-p2 neutral--text text--darken-4">
        Team Sheets are Password Protected.
      </div>
      <div v-if="school.announcementsProtected" class="text-p2 neutral--text text--darken-4">
        Announcements are Password Protected.
      </div>
    </v-alert>

    <v-alert v-else-if="fullyPublic" color="success" text class="alert public-alert">
      <template #prepend>
        <div class="public-alert-icon mr-3">
          <v-icon size="18" color="white" class="pa-1">
            mdi-alert-circle-outline
          </v-icon>
        </div>
      </template>
      <div class="text-p2 neutral--text text--darken-4">
        All pages in the Fixturr Portal are public.
      </div>
    </v-alert>

    <v-alert v-else-if="private" color="error" text class="alert private-alert">
      <template #prepend>
        <div class="private-alert-icon mr-3">
          <v-icon size="18" color="white" class="pa-1">
            mdi-alert-circle-outline
          </v-icon>
        </div>
      </template>
      <div class="text-p2 neutral--text text--darken-4">
        All pages in Fixturr Portal are password protected.
      </div>
    </v-alert>
    <div>
      <FxSchoolPrivacyForm ref="form" v-model="formData" :loading="loading" @save="save" />
    </div>
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
<style scoped>
.alert {
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1)!important;
}
.public-alert {
  background-color: #edf7ef!important;
  border-color: #b6deb9;
}

.public-alert-icon {
  background-color: #52AA59;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1);
}

.private-alert {
  background-color: #F7EEEB!important;
  border-color: #F1B6B3;
}
.private-alert-icon {
  background-color: #CC443D;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1);
}

.partial-alert {
  background-color: #e7eff9!important;
  border-color: #9dbaee!important;
}
.partial-alert-icon {
  background-color: #2D69DA;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1);
}
</style>
