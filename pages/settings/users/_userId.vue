<template>
  <div>
    <h1 class="info--text text--darken-3 text-h4 mb-6">
      Edit User
    </h1>

    <div v-if="$fetchState.error">
      <h1 class="text--disabled">
        An error occurred :(
      </h1>
    </div>

    <v-card v-else flat outlined class="pb-8 px-6 pt-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Profile Picture
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            class="text-p2 info--text px-0"
          >
            Select profile picture for the user. Supported formats: jpeg, png, webp.
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

      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        General Information
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            class="text-p2 info--text px-0"
          >
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </v-col>
          <v-col
            cols="12"
            md="7"
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
            md="5"
            class="text-p2 info--text px-0"
          >
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </v-col>
          <v-col
            cols="12"
            md="7"
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
            md="5"
            class="text-p2 info--text px-0"
          >
            Short descriptive text to go here
          </v-col>
          <v-col
            cols="12"
            md="7"
            class="text-right pr-0"
          >
            <v-btn color="info darken-1" outlined @click="reset()">
              <v-icon color="info darken-3">
                $vuetify.icons.shield
              </v-icon> Send Reset Password
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

    <h3 class="text-p3 font-weight-bold info--text text--darken-3 mt-8">
      Delete User
    </h3>
    <v-divider />
    <v-list-item class="px-0">
      <v-list-item-content class="info--text text-p2">
        Short descriptive text to go here
      </v-list-item-content>
      <v-list-item-action>
        <v-btn color="error darken-1" depressed @click="remove">
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
