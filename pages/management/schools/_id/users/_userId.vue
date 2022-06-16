<template>
  <div>
    <div v-if="$fetchState.error">
      <h1 class="text--disabled">
        An error occurred :(
      </h1>
    </div>

    <v-card v-else flat outlined>
      <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
      <v-card-subtitle><FxUserRole :role="user.userRole" /></v-card-subtitle>
      <v-card-title>Account Status</v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="text--disabled py-0">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <FxAccountStatusForm v-model="user.enabled" :disabled="loading" @input="updateStatus" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-title>Profile Picture</v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="text--disabled py-0">
                    Select profile picture for the user. Supported formats: jpeg, png, webp.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <FxImageUploadForm :value="formData" :loading="uploading" @input="uploadAvatar">
                <template #icon>
                  <FxAvatar class="mr-2" size="80" :value="user.avatar" />
                </template>
                <template #actions>
                  <v-btn depressed outlined :disabled="uploading" @click="removeAvatar">
                    Remove
                  </v-btn>
                </template>
              </FxImageUploadForm>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-title>General Information</v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
              class="pb-0"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="text--disabled py-0">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
              class="pb-0"
            >
              <FxProfileForm v-model="formData" :disabled="loading" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pt-0 mt-0">
        <v-spacer />
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
      </v-card-actions>

      <v-card-title>Account Security</v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="text--disabled py-0">
                    Short descriptive text to go here
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
              class="text-right"
            >
              <v-btn color="info darken-1" outlined @click="reset()">
                <v-icon color="info darken-3">
                  $vuetify.icons.shield
                </v-icon> Send Reset Password
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-title>Delete User</v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="text--disabled py-0">
                    Short descriptive text to go here
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="text-right"
            >
              <v-btn color="error darken-1" depressed @click="remove">
                Delete User
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FxAccountStatusForm from '@/components/admin/FxAccountStatusForm'
import FxProfileForm from '@/components/FxProfileForm'
import FxUserRole from '@/components/admin/FxUserRole'
import { UserRole } from '@/enum'
import FxAvatar from '@/components/FxAvatar'
import FxImageUploadForm from '@/components/FxImageUploadForm'

export default {
  name: 'UserEditPage',
  components: {
    FxUserRole,
    FxAccountStatusForm,
    FxImageUploadForm,
    FxProfileForm,
    FxAvatar,
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
      id: this.$route.params.userId,
      schoolId: this.$route.params.id,
    })

    this.formData = {
      ...this.user,
    }
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
        id: this.$route.params.userId,
        schoolId: this.$route.params.id,
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
        id: this.$route.params.userId,
        schoolId: this.$route.params.id,
      }).then((res) => {
        this.user = res
      })
    },

    updateStatus () {
      this.loading = true

      this.$store.dispatch('api/users/updateStatus', this.user)
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
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
