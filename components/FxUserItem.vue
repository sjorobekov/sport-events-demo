<template>
  <v-list-item v-bind="$props" class="px-0">
    <v-list-item-avatar class="mr-3 mb-1">
      <FxAvatar :value="item.avatar" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-p1 neutral--text text--darken-4 font-weight-bold mb-0">{{ item.firstname }} {{ item.lastname }}</v-list-item-title>
      <v-list-item-subtitle v-if="subtitle" class="neutral--text text--darken-2">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import FxAvatar from '@/components/FxAvatar'

export default {
  name: 'FxUserItem',

  components: {
    FxAvatar,
  },
  model: {
    prop: 'item',
  },

  props: {
    item: {
      type: Object,
      default: () => {},
    },
    link: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: undefined,
    },
    subtitle: {
      type: String,
      default: undefined,
    },
  },
}
</script>
