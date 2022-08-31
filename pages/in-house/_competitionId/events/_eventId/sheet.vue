<template>
  <FxTeamSheetEditPage />
</template>

<script>
import FxTeamSheetEditPage from '@/components/PageComponents/FxEventIndividualPage/FxTeamSheetPage/FxTeamSheetEditPage'

export default {
  name: 'EventSheetPage',
  components: { FxTeamSheetEditPage },
  meta: {
    isAllowed: ({ getters }) => getters['page/event/canManageTeamSheet'],
  },
}
</script>
