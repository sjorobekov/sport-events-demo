<template>
  <v-toolbar dark :color="color" height="96" flat>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-toolbar-items>
      <v-icon @click="$emit('click:close')">
        mdi-close-circle-outline
      </v-icon>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'FxFixtureConflictDialogToolbar',
  props: {
    hasConflicts: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    title () {
      return this.hasConflicts ? 'Conflict Details' : 'Conflict Resolved'
    },

    color () {
      return this.hasConflicts ? 'error' : 'success'
    },
  },
}
</script>
