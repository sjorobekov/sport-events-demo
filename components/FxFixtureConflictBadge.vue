<template>
  <div class="d-flex align-center">
    <v-icon class="mr-2" :color="params.iconColor" v-text="params.icon" />
    <span class="alert-label" :class="params.textClass" v-text="params.label" />
  </div>
</template>

<script>
export default {
  name: 'FxFixtureConflictBadge',
  props: {
    conflict: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    params () {
      if (this.conflict) {
        return {
          icon: 'mdi-alert-circle-outline',
          iconColor: 'error',
          label: 'Event Conflict',
          textClass: 'error--text text--darken-1 font-weight-bold',
        }
      }

      return {
        icon: 'mdi-checkbox-marked-circle-outline',
        iconColor: 'success darken-2',
        label: 'No Event Conflict',
        textClass: 'success--text text--darken-2 ',
      }
    },
  },
}
</script>

<style scoped>
.alert-label {
  font-size: 14px;
  line-height: 17px;
}
</style>
