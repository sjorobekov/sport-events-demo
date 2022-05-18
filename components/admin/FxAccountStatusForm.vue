<template>
  <v-form :disabled="disabled">
    <v-row class="fill-height" align="center" justify="center">
      <v-col>
        <label for="userEnabled">Account is <strong>{{ formData ? 'Enabled' : 'Disabled' }}</strong></label>
      </v-col>
      <v-col>
        <v-switch id="userEnabled" v-model="formData" class="float-right" color="success" inset />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'AccountStatusForm',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formData: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
