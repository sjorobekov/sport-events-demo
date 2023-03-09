<template>
  <v-card class="mt-4">
    <v-list-item class="event-item-heading border-bottom hidden-sm-and-down">
      <v-list-item-content>
        <v-list-item-title class="text-subheading font-weight-bold neutral--text text--darken-4">
          <slot name="title" />
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <slot name="actions" />
      </v-list-item-action>
    </v-list-item>
    <slot name="default" />
  </v-card>
</template>

<script>
export default {
  name: 'FxEventItemCard',
}
</script>

<style scoped>
.event-item-heading {
  height: 77px;
}
</style>
