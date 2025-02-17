<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled || loading"
    :readonly="readonly"
  >
    <v-card class="py-3 px-3 py-md-6 px-md-6">
      <slot name="title" />
      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Password Protected
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
            You can password-protect your Fixturr portal or specific information, such as team sheets or announcements, to ensure only authorised users have access.
          </v-col>
          <v-col cols="12" lg="7" class="px-0">
            <v-container class="my-0 py-0">
              <v-row class="py-0 pt-3">
                <v-col cols="9" class="py-0 px-0">
                  <label for="portalProtected" class="text-p2 neutral--text text--darken-4">Sports Portal is <strong>{{ formData.portalProtected ? 'Private' : 'Public' }}</strong>
                  </label>
                </v-col>
                <v-col cols="3" class="py-0">
                  <v-switch
                    id="portalProtected"
                    class="my-0 float-right"
                    :input-value="formData.portalProtected"
                    color="success"
                    inset
                    hide-details
                    @change="update('portalProtected', $event)"
                  />
                </v-col>
              </v-row>
              <v-row class="py-0 pt-3">
                <v-col cols="9" class="py-0 px-0">
                  <label for="teamSheetsProtected" class="text-p2 neutral--text text--darken-4">Teams Sheets are <strong>{{ formData.teamSheetsProtected ? 'Password Protected' : 'Public' }}</strong></label>
                </v-col>
                <v-col cols="3" class="py-0">
                  <v-switch
                    id="teamSheetsProtected"
                    class="my-0 float-right"
                    :input-value="formData.teamSheetsProtected"
                    color="success"
                    inset
                    hide-details
                    :disabled="formData.portalProtected"
                    @change="update('teamSheetsProtected', $event)"
                  />
                </v-col>
              </v-row>
              <v-row class="py-3">
                <v-col cols="9" class="py-0 px-0">
                  <label for="announcementsProtected" class="text-p2 neutral--text text--darken-4">Announcements are <strong>{{ formData.announcementsProtected ? 'Password Protected' : 'Public' }}</strong></label>
                </v-col>
                <v-col cols="3" class="py-0">
                  <v-switch
                    id="announcementsProtected"
                    class="my-0 float-right"
                    :input-value="formData.announcementsProtected"
                    color="success"
                    inset
                    hide-details
                    :disabled="formData.portalProtected"
                    @change="update('announcementsProtected', $event)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Contact Email Address
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
            Set the email address to be displayed for password inquiries. This email address will be shown below the school access password form.
          </v-col>

          <v-col cols="12" lg="7" class="px-0">
            <label for="schoolEmail">Email</label>
            <v-text-field
              id="schoolEmail"
              v-async-validate
              outlined
              dense
              :value="formData.email"
              :async-rules="[$rule.email]"
              @input="update('email', $event)"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
        Access Password
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
            Set the school access password, which will grant users access to password-protected areas of the portal.
          </v-col>
          <v-col cols="12" lg="7" class="px-0">
            <label for="password">Password</label>
            <v-text-field
              id="password"
              v-async-validate
              :value="formData.password"
              :async-rules="[$rule.minLength(4)]"
              dense
              outlined
              :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
              :type="showPass ? 'text' : 'password'"
              maxlength="32"
              @input="update('password', $event)"
              @click:append="showPass = !showPass"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="px-0 pb-4">
        <v-spacer />
        <v-btn
          :loading="loading"
          depressed
          color="primary"
          dark
          class="ml-2"
          @click="$emit('save')"
        >
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'FxSchoolPrivacyForm',
  events: ['save'],
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    showPass: false,
  }),

  computed: {
    formData () {
      return {
        portalProtected: false,
        teamSheetsProtected: false,
        announcementsProtected: false,
        ...(this.value || {}),
      }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      if (key === 'portalProtected') {
        this.$emit('input', {
          ...this.formData,
          portalProtected: value,
          teamSheetsProtected: value,
          announcementsProtected: value,
        })

        return
      }

      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
