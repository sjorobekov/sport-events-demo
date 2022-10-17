<template>
  <v-list-item :style="style">
    <v-list-item-avatar tile>
      <v-img :src="item.icon" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="subtitle">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <slot name="actions" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'FxSportItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    subtitle: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    style () {
      return { borderLeft: `${this.item.color} 8px solid` }
    },
  },
}
</script>
