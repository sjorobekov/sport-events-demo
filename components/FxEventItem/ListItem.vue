<template>
  <div style="max-width: 100%;">
    <v-list-item class="px-0 d-inline-flex" style="max-width: 100%;">
      <v-list-item-icon class="mr-3 flex-grow-0 flex-shrink-1">
        <slot name="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <slot name="content">
          <v-list-item-title class="text-p2 neutral--text text--darken-4">
            <slot name="title" />
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
            <slot name="subtitle" />
          </v-list-item-subtitle>
        </slot>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
}
</script>
