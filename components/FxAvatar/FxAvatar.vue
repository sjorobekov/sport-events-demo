<template>
  <v-avatar :size="size" :color="color">
    <v-img
      :src="avatar"
      alt="John"
    />
  </v-avatar>
</template>

<script>
import defaultAvatar from './user.svg'

export default {
  name: 'FxAvatar',
  props: {
    value: {
      type: String,
      default: undefined,
    },
    size: {
      type: [String, Number],
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    avatar () {
      if (this.value) {
        return this.value
      }

      return defaultAvatar
    },
  },
}
</script>
