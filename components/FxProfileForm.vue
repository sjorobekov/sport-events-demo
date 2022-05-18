<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <v-row>
      <v-col>
        <label for="firstname">First Name</label>
        <v-text-field
          id="firstname"
          v-model="formData.firstname"
          v-async-validate
          :async-rules="[$rule.required]"
          dense
          outlined
          maxlength="120"
        />
      </v-col>
      <v-col>
        <label for="lastname">Last Name</label>
        <v-text-field
          id="lastname"
          v-model="formData.lastname"
          v-async-validate
          :async-rules="[$rule.required]"
          dense
          outlined
          maxlength="120"
        />
      </v-col>
    </v-row>

    <label for="displayName">Display Name</label>
    <v-text-field id="displayName" v-model="formData.displayName" dense outlined maxlength="120" />

    <label for="email">Email Address</label>
    <v-text-field
      id="email"
      v-model="formData.email"
      v-async-validate
      :async-rules="[$rule.required, $rule.email, $rule.isEmailAvailable(formData.id)]"
      dense
      outlined
      maxlength="50"
    />

    <label for="phone">Phone Number</label>
    <v-text-field
      id="phone"
      v-model="formData.phone"
      v-async-validate
      :async-rules="[$rule.phone]"
      dense
      outlined
      maxlength="15"
    />

    <label for="jobRole">Job Role</label>
    <v-text-field id="jobRole" v-model="formData.jobRole" dense outlined maxlength="120" />

    <label for="userRole">User Role</label>
    <v-select
      id="userRole"
      v-model="formData.userRole"
      dense
      :items="userRoleOptions"
      outlined
    />
  </v-form>
</template>

<script>
import { ADMIN, SPORTS_USER, VIEW_ONLY } from '@/enum/UserRole'

export default {
  name: 'FxProfileForm',
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
    userRoleOptions () {
      return [
        { value: ADMIN, text: 'Admin' },
        { value: SPORTS_USER, text: 'Sports User' },
        { value: VIEW_ONLY, text: 'View Only' },
      ]
    },

    formData: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', { ...val })
      },
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
  },
}
</script>
