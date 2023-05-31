<template>
  <wrapped-component :wrap="modal">
    <template #wrapper>
      <FxOpponentDialog
        :value="!!item"
        @click:back="$emit('click:back', $event)"
      />
    </template>
    <FxOpponentSelectedItem>
      <template v-if="!modal" #actions>
        <slot name="actions" />
      </template>
    </FxOpponentSelectedItem>
    <slot v-if="modal" name="actions" />
  </wrapped-component>
</template>

<script>
import FxOpponentSelectedItem from './FxOpponentSelectedItem.vue'
import FxOpponentDialog from './FxOpponentDialog.vue'

export default {
  name: 'FxOpponentSelectedItemModal',
  components: { FxOpponentSelectedItem, FxOpponentDialog },
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
