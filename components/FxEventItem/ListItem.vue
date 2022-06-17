<template>
  <v-list-item class="px-0">
    <v-list-item-icon class="mr-3">
      <slot name="icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <slot name="content">
        <v-list-item-title class="text-p2 info--text text--darken-4">
          <slot name="title" />
        </v-list-item-title>
        <v-list-item-subtitle class="text-p1 info--text">
          <slot name="subtitle" />
        </v-list-item-subtitle>
      </slot>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListItem',
}
</script>
