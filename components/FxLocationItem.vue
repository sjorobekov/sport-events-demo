<template>
  <v-list-item class="px-2 py-2" @click="$emit('click', item)">
    <v-list-item-avatar class="mr-2">
      <v-icon color="primary lighten-1" size="40">
        $vuetify.icons.sports-location-1
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-p1 font-weight-bold neutral--text text--darken-4">
        {{ item.name }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-p1 neutral--text text--darken-3">
        {{ item.address }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <slot name="actions" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'FxLocationItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
