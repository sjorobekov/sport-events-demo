<template>
  <v-item-group
    :value="value"
    mandatory
    @change="$emit('input', $event)"
  >
    <FxSheetOption
      v-for="item in items"
      :key="item.value"
      :src="item.img"
      :text="item.text"
      :value="item.value"
    />
  </v-item-group>
</template>

<script>
import security from './security.svg'
import internet from './internet.svg'

export default {
  name: 'FxPublishTeamSelect',
  props: {
    value: {
      type: Boolean,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: true, text: 'Yes, Public', img: internet },
        { value: false, text: 'No, Private', img: security },
      ],
    },
  },

  computed: {
    selected: {
      set (val) {
        this.$emit('input', this.items[val].value)
      },
      get () {
        return this.items.findIndex(item => item.value === this.value)
      },
    },
  },
}
</script>
