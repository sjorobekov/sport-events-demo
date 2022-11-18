<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <label for="subject">Announcement Subject</label>
    <v-text-field
      id="subject"
      v-async-validate
      :value="formData.subject"
      placeholder="Subject"
      :async-rules="[$rule.required]"
      dense
      outlined
      maxlength="120"
      @input="update('subject', $event)"
    />

    <label for="body">Announcement Text</label>
    <v-textarea
      id="body"
      v-async-validate
      :value="formData.body"
      placeholder="Enter your announcement"
      :async-rules="[$rule.required]"
      dense
      outlined
      @input="update('body', $event)"
    />
  </v-form>
</template>

<script>
export default {
  name: 'FxAnnouncementForm',

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
      return {
        ...(this.value || {}),
      }
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
