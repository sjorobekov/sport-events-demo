<template>
  <v-list-item class="px-0 alert">
    <v-list-item-icon class="mr-3">
      <v-icon color="error darken-1">
        $vuetify.icons.alert
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="error--text text--darken-1 text-p2 font-weight-bold">
        <slot name="default" />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'FxFixtureConflictDialogAlert',
}
</script>

<style scoped>
.alert {
  width: 167px;
}
</style>
