<template>
  <v-row>
    <v-col>
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
import UserInviteForm from '@/components/FxUserInviteForm'

export default {
  name: 'UserInvitePage',
  components: { UserInviteForm },
  layout: 'admin',
  data: () => ({
    formData: {},
    loading: false,
  }),

  head: () => ({
    title: 'Invite User',
  }),

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/users/save', {
        schoolId: this.$route.params.id,
        ...this.formData,
      }).then((res) => {
        this.$router.push({ name: 'management-schools-id-users-userId', params: { id: res.schoolId, userId: res.id } })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
