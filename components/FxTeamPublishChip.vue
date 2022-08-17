<template>
  <v-chip
    color="info lighten-2"
    outlined
    dark
    label
    class="pl-1 pr-3 radius-6 height-24"
  >
    <v-icon :color="color" class="mr-1" small>
      $vuetify.icons.ellipse
    </v-icon><span class="info--text text--darken-2 text-caption">{{ label }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FxTeamPublishChip',
  props: {
    publishTeam: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    color (): string {
      if (!this.publishTeam) {
        return 'warning lighten-1'
      }

      return 'success'
    },

    label (): string {
      if (!this.publishTeam) {
        return 'Private'
      }

      return 'Public'
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-6 {
  border-radius: 6px!important;
}
.height-24 {
  height: 24px!important;
}
</style>
