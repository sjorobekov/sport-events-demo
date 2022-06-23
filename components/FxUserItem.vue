<template>
  <v-list-item v-bind="$props" class="px-0">
    <v-list-item-avatar>
      <FxAvatar :value="item.avatar" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ item.firstname }} {{ item.lastname }}</v-list-item-title>
      <v-list-item-subtitle v-if="subtitle">
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
