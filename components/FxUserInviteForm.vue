<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard>
      <template #number>
        1
      </template>
      <template #title>
        Name & Role
      </template>
      <template #content>
        Please enter the name and job role for this user.
      </template>

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
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        2
      </template>
      <template #title>
        Contact Information
      </template>
      <template #content>
        Please enter the email address of the user. They will receive a link to activate their account and set up a password.
      </template>
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
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        3
      </template>
      <template #title>
        User Role
      </template>
      <template #content>
        Set the account role for this user.<br>
        <br>Admin users have full control over all tasks.<br>
        <br>Team Members can create and manage events and teams, but cannot modify settings.<br>
        <br>View-only users are limited to viewing information in the portal.
      </template>
      <label for="email">Select User Role</label>
      <FxUserRoleSelect :value="formData.userRole" @input="update('userRole', $event)" />
    </FxSteppedFormCard>
  </v-form>
</template>

<script>
import { UserRole } from '@/enum'
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
