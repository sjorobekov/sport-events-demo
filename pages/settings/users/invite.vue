<template>
  <v-row>
    <v-col>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-h3">
            Invite User
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <UserInviteForm ref="form" v-model="formData" :disabled="loading" />
      <v-container class="mt-4 mb-8">
        <v-row>
          <v-spacer />
          <v-btn outlined @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="brand"
            dark
            class="ml-2"
            :loading="loading"
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
  data: () => ({
    formData: {},
    loading: false,
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
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
