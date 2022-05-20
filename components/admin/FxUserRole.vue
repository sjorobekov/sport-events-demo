<template>
  <span>{{ roleName }}</span>
</template>

<script lang="ts">
import Vue from 'vue'

const role = {
  ADMIN: 'Admin',
  SPORTS_USER: 'Sports User',
  VIEW_ONLY: 'View Only',
} as {[key: string]: string;}

export default Vue.extend({
  name: 'FxUserRole',
  props: {
    role: {
      type: String,
      default: '',
    },
  },

  computed: {
    roleName (): string {
      return role[this.role] || ''
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-6 {
  border-radius: 6px!important;
}
</style>
