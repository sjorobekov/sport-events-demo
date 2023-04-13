<template>
  <v-sheet
    :color="color"
    :height="height"
    @drop.prevent="drop"
    @dragover.prevent="hover"
    @dragleave.prevent="dragLeave"
  >
    <v-row
      align="center"
      justify="center"
      class="fill-height border"
      :class="{ 'hover': isHover }"
      no-gutters
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <slot v-bind="{ isHover, openSelectFile }" />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="info" min-width="200">
      Loading image...
      <v-progress-circular
        indeterminate
        color="brand"
      />
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  name: 'FxFileDragDrop',

  events: ['select'],

  props: {
    height: {
      type: [String, Number],
      default: 112,
    },
    color: {
      type: String,
      default: 'info lighten-5',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isHover: false,
    preview: null,
    file: null,
  }),

  computed: {
    snackbar () {
      return this.loading
    },
  },

  methods: {
    drop (ev) {
      if (this.disabled) {
        return
      }
      if (ev.dataTransfer.files[0]) {
        this.$emit('select', ev.dataTransfer.files[0])
      }
    },

    hover () {
      if (this.disabled) {
        return
      }
      this.isHover = true
    },

    dragLeave () {
      if (this.disabled) {
        return
      }
      this.isHover = false
    },

    openSelectFile () {
      if (this.disabled) {
        return
      }
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        this.$emit('select', e.target.files[0])
      }

      input.click()
    },
  },
}
</script>

<style scoped>
.border {
  border: 1px dashed var(--v-info-lighten2);
}
.border.hover {
  border: 2px dashed var(--v-info-lighten1);
}
</style>
