<template>
  <component :is="item[match.overallResult]" v-bind="$props" />
</template>

<script>
import NormalScore from './components/NormalScore.vue'
import SeeMatchNotes from './components/SeeMatchNotes.vue'
import { InHouseEventResult } from '~/enum'

export default {
  name: 'ExistingResult',
  components: {
    NormalScore,
    SeeMatchNotes,
  },
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    item: {
      [InHouseEventResult.HOME]: 'NormalScore',
      [InHouseEventResult.AWAY]: 'NormalScore',
      [InHouseEventResult.DRAW]: 'NormalScore',
      [InHouseEventResult.SEE_MATCH_NOTES]: 'SeeMatchNotes',
    },
  }),
}
</script>
