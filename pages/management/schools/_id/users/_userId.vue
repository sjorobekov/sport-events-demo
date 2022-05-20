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
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <FxProfilePictureForm v-model="formData" />
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
          color="brand2"
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
              <v-btn color="info darken-1" outlined>
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
import FxProfilePictureForm from '@/components/FxProfilePictureForm'
import FxProfileForm from '@/components/FxProfileForm'
import FxUserRole from '@/components/admin/FxUserRole'
import { ADMIN } from '@/enum/UserRole'

export default {
  name: 'UserEditPage',
  components: {
    FxUserRole,
    FxAccountStatusForm,
    FxProfilePictureForm,
    FxProfileForm,
  },
  data: () => ({
    formData: {
      enabled: true,
      userRole: ADMIN,
    },
    user: {},
    loading: false,
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
  },
}
</script>
