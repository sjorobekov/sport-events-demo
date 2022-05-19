<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar color="brand">
                      <span class="white--text text-h5">1</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Name & Role</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar />
                  <v-list-item-content class="text--disabled">
                    Select the sport and event for this sports record.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <v-row>
                <v-col>
                  <label for="firstname">First Name</label>
                  <v-text-field
                    id="firstname"
                    v-async-validate
                    :value="formData.firstname"
                    placeholder="First Name"
                    :async-rules="[$rule.required]"
                    dense
                    outlined
                    maxlength="120"
                    @input="update('firstname', $event)"
                  />
                </v-col>
                <v-col>
                  <label for="lastname">Last Name</label>
                  <v-text-field
                    id="lastname"
                    v-async-validate
                    :value="formData.lastname"
                    placeholder="Last Name"
                    :async-rules="[$rule.required]"
                    dense
                    outlined
                    maxlength="120"
                    @input="update('lastname', $event)"
                  />
                </v-col>
              </v-row>
              <label for="jobRole">Job Role</label>
              <v-text-field
                id="jobRole"
                :value="formData.jobRole"
                placeholder="Job Role"
                dense
                outlined
                maxlength="120"
                @input="update('jobRole', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar color="brand">
                      <span class="white--text text-h5">2</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Contact Information</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar />
                  <v-list-item-content class="text--disabled">
                    Select the sport and event for this sports record.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <label for="email">Email Address</label>
              <v-text-field
                id="email"
                v-async-validate
                :value="formData.email"
                placeholder="Email Address"
                :async-rules="[$rule.required, $rule.email, $rule.isEmailAvailable()]"
                dense
                outlined
                maxlength="50"
                @input="update('email', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-avatar color="brand">
                      <span class="white--text text-h5">3</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>User Role</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar />
                  <v-list-item-content class="text--disabled">
                    Select the sport and event for this sports record.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <label for="email">Select User Role</label>
              <FxUserRoleSelect :value="formData.userRole" @input="update('userRole', $event)" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { ADMIN } from '@/enum/UserRole'
import FxUserRoleSelect from '@/components/FxUserRoleSelect'

export default {
  name: 'FxUserInviteForm',

  components: {
    FxUserRoleSelect,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formData () {
      return this.value ? this.value : { userRole: ADMIN }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
