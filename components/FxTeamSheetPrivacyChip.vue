<template>
  <v-chip
    color="neutral lighten-1"
    outlined
    dark
    label
    class="ml-1 pl-1 pr-2 radius-16 height-24"
  >
    <v-icon :color="color" small>
      $vuetify.icons.ellipse
    </v-icon><span class="neutral--text text--darken-3 text-caption">{{ label }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FxTeamSheetPrivacyChip',
  props: {
    protected: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    color (): string {
      if (this.protected) {
        return 'warning lighten-1'
      }

      return this.protected ? 'warning lighten-1' : 'success'
    },

    label (): string {
      return this.protected ? 'Password Protected' : 'Public'
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-16 {
  border-radius: 16px!important;
}
.height-24 {
  height: 24px!important;
}
</style>
