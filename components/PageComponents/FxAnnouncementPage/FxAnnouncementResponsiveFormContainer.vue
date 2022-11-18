<template>
  <div>
    <FxAnnouncementDialog v-if="modal" :value="true" :title="title" @click:back="$emit('click:back', $event)">
      <slot name="default" />
    </FxAnnouncementDialog>
    <FxAnnouncementFormCard v-else>
      <slot name="default" />
    </FxAnnouncementFormCard>
  </div>
</template>

<script>
import FxAnnouncementDialog from './FxAnnouncementDialog'
import FxAnnouncementFormCard from './FxAnnouncementFormCard'

export default {
  name: 'FxAnnouncementResponsiveFormContainer',
  components: {
    FxAnnouncementFormCard,
    FxAnnouncementDialog,
  },
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
}
</script>
