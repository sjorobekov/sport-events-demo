<template>
  <div>
    <h1 class="neutral--text text--darken-4 text-h4 py-3">
      Edit User
    </h1>

    <div v-if="$fetchState.error">
      <h1 class="text--disabled">
        An error occurred :(
      </h1>
    </div>

    <v-card v-else class="pb-8 px-6 pt-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Profile Picture
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-3 px-0 pr-5"
          >
            Choose a profile picture for this user. You can upload a file in jpeg, png, or webp format.
          </v-col>
          <v-col
            cols="12"
            lg="7"
          >
            <FxImageUploadForm :value="formData" :loading="uploading" @input="uploadAvatar">
              <template #icon>
                <FxAvatar class="mr-2" size="80" :value="user.avatar" />
              </template>
              <template #actions>
                <v-btn depressed outlined color="neutral darken-3" :disabled="uploading" @click="removeAvatar">
                  Remove
                </v-btn>
              </template>
            </FxImageUploadForm>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        General Information
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-3 px-0 pr-5"
          >
            Manage user information here. You can edit the name, display name, email address, phone number, job role, and account role.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0"
          >
            <FxProfileForm v-model="formData" :disabled="loading" />
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Display at Sports Contact
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-3 px-0 pr-5"
          >
            You can choose whether to make this user visible as a sports contact, and whether to display them as the main sports contact.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0"
          >
            <FxAccountSportContactForm v-model="formData" :disabled="loading" />
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Account Security
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-3 px-0 pr-5"
          >
          To reset the password for this user's account, click 'Send Password Reset'. They will receive an email with instructions on how to reset their password.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="text-right pr-0"
          >
            <v-btn color="neutral darken-3" outlined @click="reset()">
              <v-icon color="neutral darken-1">
                $vuetify.icons.resetPassword
              </v-icon> Send Password Reset
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="pt-0 pr-0 mt-8">
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="save"
        >
          Update User
        </v-btn>
      </v-card-actions>
    </v-card>

    <h3 class="text-p3 font-weight-bold neutral--text text--darken-4 mt-8 px-6 py-3">
      Delete User
    </h3>
    <v-divider class="mx-6" />
    <v-list-item class="px-0">
      <v-list-item-content class="neutral--text text--darken-3 text-p2 pr-5 px-6">
        Delete this user. Please note that this action cannot be undone.
      </v-list-item-content>
      <v-list-item-action>
        <v-btn color="error darken-1" class="mx-6" depressed @click="remove">
          Delete User
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxProfileForm from '@/components/FxProfileForm'
import { UserRole } from '@/enum'
import FxAvatar from '@/components/FxAvatar'
import FxImageUploadForm from '@/components/FxImageUploadForm'

export default {
  name: 'UserEditPage',
  components: {
    FxImageUploadForm,
    FxProfileForm,
    FxAvatar,
  },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageUsers'],
  },
  data: () => ({
    formData: {
      enabled: true,
      userRole: UserRole.ADMIN,
    },
    user: {},
    loading: false,
    uploading: false,
  }),

  async fetch () {
    this.user = await this.$store.dispatch('api/users/get', {
      id: this.userId,
      schoolId: this.schoolId,
    })

    this.formData = {
      ...this.user,
    }
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
    userId () {
      return this.$route.params.userId
    },
  },

  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('api/users/save', this.formData)
        .then((res) => {
          this.user = {
            ...res,
          }
          this.$toast.success('Updated!')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    uploadAvatar (file) {
      this.uploading = true
      this.$store.dispatch('api/users/uploadAvatar', {
        id: this.userId,
        schoolId: this.schoolId,
        file,
      }).then((res) => {
        this.user = res
        this.$toast('Profile picture has been updated!')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.uploading = false
      })
    },

    removeAvatar () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/users/removeAvatar', {
        id: this.userId,
        schoolId: this.schoolId,
      }).then((res) => {
        this.user = res
      })
    },

    remove () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/users/remove', this.user)
        .then(() => {
          this.$toast.info('User has been removed')
          this.$router.push({ name: 'management-schools-id-users' })
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
    },

    reset () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/users/sendResetPasswordEmail', this.user)
        .then(() => {
          this.$toast.info('Email has been sent')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
    },
  },
}
</script>
