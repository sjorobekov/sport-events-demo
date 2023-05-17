<template>
  <span class="neutral--text" :class="dark ? 'text--lighten-3' : 'text--darken-4'">{{ name }}</span>
</template>

<script>
export default {
  name: 'FxUserDisplayName',
  props: {
    user: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    name () {
      if (this.user.displayName) {
        return this.user.displayName
      }

      return `${this.user.firstname} ${this.user.lastname}`
    },
  },
}
</script>
