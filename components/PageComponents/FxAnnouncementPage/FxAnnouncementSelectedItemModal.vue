<template>
  <wrapped-component :wrap="modal">
    <template #wrapper>
      <FxAnnouncementDialog
        :value="!!item"
        @click:back="$emit('click:back', $event)"
      />
    </template>
    <FxAnnouncementSelectedItem :item="item">
      <template v-if="modal" #icon>
        <v-icon size="28" class="ml-1">
          mdi-bullhorn
        </v-icon>
      </template>
      <template v-if="!modal" #actions>
        <slot name="actions" />
      </template>
    </FxAnnouncementSelectedItem>
    <slot v-if="modal" name="actions" />
  </wrapped-component>
</template>

<script>
import FxAnnouncementSelectedItem from './FxAnnouncementSelectedItem'
import FxAnnouncementDialog from './FxAnnouncementDialog'

export default {
  name: 'FxAnnouncementSelectedItemModal',
  components: { FxAnnouncementDialog, FxAnnouncementSelectedItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
