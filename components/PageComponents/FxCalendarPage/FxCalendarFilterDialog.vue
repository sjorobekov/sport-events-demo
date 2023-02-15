<template>
  <div>
    <v-expand-transition v-if="!mobile">
      <div v-if="value">
        <slot name="default" />
      </div>
    </v-expand-transition>

    <v-dialog
      v-else
      :value="value"
      fullscreen
      content-class="dialog-margin-top"
    >
      <v-card tile>
        <v-toolbar flat>
          <v-btn
            icon
            @click="close()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer />
          <v-toolbar-title>Filter</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              text
              @click="$emit('click:clearAll')"
            >
              Clear All
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />

        <div class="px-2 pt-6">
          <slot name="default" />
        </div>

        <v-card-actions class="px-2">
          <v-btn
            color="primary"
            depressed
            block
            @click="close()"
          >
            Apply Filter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'FxCalendarFilterDialog',
  props: {
    value: {
      type: [Boolean, Number],
      default: false,
    },

    mobile: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    close () {
      this.$emit('input', false)
    },
  },
}
</script>

<style scoped>
::v-deep .dialog-margin-top {
  margin-top: 93px;
}
</style>
