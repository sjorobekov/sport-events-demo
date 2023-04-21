<template>
  <span>{{ name }}</span>
</template>

<script>
export default {
  name: 'FxUserDisplayName',
  props: {
    user: {
      type: Object,
      required: true,
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
