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
          v-async-validate
          :value="formData.firstname"
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
          :async-rules="[$rule.required]"
          dense
          outlined
          maxlength="120"
          @input="update('lastname', $event)"
        />
      </v-col>
    </v-row>

    <label for="displayName">Display Name</label>
    <v-text-field
      id="displayName"
      :value="formData.displayName"
      dense
      outlined
      maxlength="120"
      @input="update('displayName', $event)"
    />

    <label for="email">Email Address</label>
    <v-text-field
      id="email"
      v-async-validate
      :value="formData.email"
      :async-rules="[$rule.required, $rule.email, $rule.isEmailAvailable(formData.id)]"
      dense
      outlined
      maxlength="50"
      @input="update('email', $event)"
    />

    <label for="phone">Phone Number</label>
    <v-text-field
      id="phone"
      v-async-validate
      :value="formData.phone"
      :async-rules="[$rule.phone]"
      dense
      outlined
      maxlength="15"
      @input="update('phone', $event)"
    />

    <label for="jobRole">Job Role</label>
    <v-text-field
      id="jobRole"
      :value="formData.jobRole"
      dense
      outlined
      maxlength="120"
      @input="update('jobRole', $event)"
    />

    <label for="userRole">User Role</label>
    <v-select
      id="userRole"
      :value="formData.userRole"
      dense
      :items="userRoleOptions"
      outlined
      @input="update('userRole', $event)"
    />
  </v-form>
</template>

<script>
import { UserRole } from '@/enum'

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
        { value: UserRole.ADMIN, text: 'Admin' },
        { value: UserRole.SPORTS_USER, text: 'Sports User' },
        { value: UserRole.VIEW_ONLY, text: 'View Only' },
      ]
    },

    formData () {
      return this.value ? this.value : { userRole: UserRole.ADMIN }
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
