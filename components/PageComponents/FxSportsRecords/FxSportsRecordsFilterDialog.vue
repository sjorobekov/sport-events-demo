<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    content-class="dialog-margin-top"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }" />
    </template>

    <v-card tile>
      <v-toolbar flat>
        <v-btn
          icon
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title class="neutral--text text--darken-4 font-weight-bold ml-8">
          Filter
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            color="neutral darken-3"
            class="clear-all-button"
            @click="$emit('click:clear', $event)"
          >
            Clear All
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div class="px-4 pt-4">
        <FxSportsRecordsFilter
          :value="value"
          :sports="sports"
          :events="events"
          @input="$emit('input', $event)"
        />
      </div>
      <v-card-actions>
        <v-btn
          color="primary"
          depressed
          block
          x-large
          class="mt-8"
          @click="close()"
        >
          Apply Filter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FxSportsRecordsFilter from '@/components/PageComponents/FxSportsRecords/FxSportsRecordsFilter'
export default {
  name: 'FxSportsRecordsFilterDialog',
  components: { FxSportsRecordsFilter },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    events: {
      type: Array,
      default: () => [],
    },
    sports: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    isOpen: false,
  }),

  methods: {
    close () {
      this.isOpen = false
    },
  },
}
</script>

<style scoped>
/deep/ .dialog-margin-top {
  margin-top: 93px;
}
.v-btn:before {
  opacity: 0!important
}
.clear-all-button:hover {
  color: var(--v-primary-base);
  box-shadow: none!important;
}
</style>
