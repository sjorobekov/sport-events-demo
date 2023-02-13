<template>
  <v-list-item v-bind="$props" :class="itemClass">
    <v-list-item-avatar class="mx-1">
      <FxSchoolLogo :alt="participant.name" :color="participant.color" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-p2 font-weight-bold px-2">
        {{ participant.name }}
      </v-list-item-title>
    </v-list-item-content>
    <slot name="action" />
  </v-list-item>
</template>

<script>
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxInHouseTeamListItem',
  components: { FxSchoolLogo },
  props: {
    participant: {
      type: Object,
      required: true,
    },
    itemClass: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    school: {},
    opponent: {},
  }),
}
</script>
