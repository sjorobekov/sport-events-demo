<template>
  <FxInHouseTeamSheetEditPage />
</template>

<script>
import FxInHouseTeamSheetEditPage from '@/components/PageComponents/FxInHouseEventIndividualPage/FxTeamSheetPage/FxTeamSheetEditPage'

export default {
  name: 'InHouseEventSheetPage',
  components: { FxInHouseTeamSheetEditPage },
  meta: {
    isAllowed: ({ getters }) => getters['page/event/canManageTeamSheet'],
  },
}
</script>
