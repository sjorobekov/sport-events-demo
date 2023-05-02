<template>
  <v-row>
    <v-col>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-h4 neutral--text text--darken-4">
            Invite User
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-alert v-if="!canCreateUser" class="alert">
        <template #prepend>
          <div class="alert-icon mr-3">
            <v-icon size="18" color="white" class="pa-1">
              mdi-alert-circle-outline
            </v-icon>
          </div>
        </template>
        You have reached the user limit for your current plan. To add more users, please upgrade your plan.
      </v-alert>

      <UserInviteForm ref="form" v-model="formData" :disabled="loading || !canCreateUser" />
      <v-container class="mt-4 mb-8">
        <v-row>
          <v-spacer />
          <v-btn outlined color="neutral darken-3" @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="primary"
            class="ml-2"
            :loading="loading"
            :disabled="!canCreateUser"
            @click="save"
          >
            <v-icon>$vuetify.icons.save</v-icon>Save
          </v-btn>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import UserInviteForm from '@/components/FxUserInviteForm'

export default {
  name: 'UserInvitePage',
  components: { UserInviteForm },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canInviteUser'],
  },

  async asyncData ({ store }) {
    const schoolId = store.getters['context/schoolId']
    const currentSeason = store.getters['seasons/current']
    const { canCreateUser } = await store.dispatch('api/schools/getLimitations', {
      schoolId,
      seasonId: currentSeason.id,
    })
    return {
      canCreateUser,
    }
  },
  data: () => ({
    formData: {},
    loading: false,
    canCreateUser: true,
  }),

  head: () => ({
    title: 'Invite User',
  }),

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

      this.$store.dispatch('api/users/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then((res) => {
        this.$router.push({ name: 'settings-users-userId', params: { userId: res.id } })
      }).catch(({ response }) => {
        if (response?.data?.code === 'TARIFF_LIMIT') {
          this.$toast.error(response.data.message)
        } else {
          this.$toast.error('Unknown Error')
        }
      }).finally(() => {
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
  background-color: #e7eff9!important;
  border-color: #9dbaee!important;
}
.alert-icon {
  background-color: #2D69DA;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1);
}
</style>
