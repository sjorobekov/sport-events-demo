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
      default: 'neutral lighten-3',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isHover: false,
    preview: null,
    file: null,
  }),

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
  border: 1px dashed var(--v-neutral-base);
  border-radius: 8px;
}
.border.hover {
  border: 2px dashed var(--v-neutral-base);
}
</style>
