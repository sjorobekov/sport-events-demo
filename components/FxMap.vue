<template>
  <FxEventItemCard>
    <template #title>
      Map
    </template>
    <FxMapCard />
  </FxEventItemCard>
</template>

<script>
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'
import FxMapCard from '@/PageComponents/FxOpponentPage/FxMapCard'
export default {
  name: 'FxMap',
  components: { FxEventItemCard, FxMapCard },
}
</script>
