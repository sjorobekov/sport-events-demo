<template>
  <v-list-item v-bind="$props">
    <v-list-item-avatar class="overflow-visible">
      <FxSchoolLogo :value="item.logo" :alt="item.name" :color="color" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxSchoolItem',

  components: {
    FxSchoolLogo,
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
  },

  computed: {
    color () {
      return this.item.color || 'brand'
    },
  },
}
</script>
<style scoped>
.overflow-visible {
  overflow: visible;
}
</style>
