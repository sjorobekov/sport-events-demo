<template>
  <v-chip
    class="ma-2"
    light
    :color="style.chipColor"
  >
    <v-icon :color="style.iconColor" left>
      {{ style.icon }}
    </v-icon>
    <span :class="style.color">{{ style.label }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import { PublishResult } from '~/enum'

export default Vue.extend({
  name: 'FxTeamPrivacyChipBig',
  props: {
    publishTeam: {
      type: Boolean,
      required: true,
    },
    publishResults: {
      type: String,
      required: true,
    },
  },

  computed: {
    style () {
      if (!this.publishTeam) {
        return {
          icon: 'mdi-alert-circle-outline',
          iconColor: 'error darken-3',
          color: 'error--text text--darken-3',
          chipColor: 'error lighten-5',
          label: 'Private',
        }
      }

      const result = {
        icon: '$vuetify.icons.public',
        iconColor: 'warning darken-3',
        color: 'warning--text text--darken-3',
        chipColor: 'warning lighten-5',
        label: '',
      }

      if (this.publishResults === PublishResult.RESULTS_SCORES) {
        result.color = 'success--text text--darken-3'
        result.iconColor = 'success darken-3'
        result.chipColor = 'success lighten-5'
        result.label = 'Public: Results & Scores'
        return result
      }

      if (this.publishResults === PublishResult.RESULTS) {
        result.label = 'Public: Results Only'
      } else if (this.publishResults === PublishResult.EVENTS) {
        result.label = 'Public: Events Only'
      } else {
        result.label = 'Unknown'
      }
      return result
    },
  },
})
</script>
