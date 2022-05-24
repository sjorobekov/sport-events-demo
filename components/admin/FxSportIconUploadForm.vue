<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <slot name="icon" />
      <v-file-input
        ref="file"
        v-model="file"
        style="display: none"
        accept=".svg,image/*"
      />
      <v-btn depressed color="primary" class="mr-2" @click="reselect">
        <v-icon>$vuetify.icons.upload</v-icon>Upload
      </v-btn>
      <slot name="actions" />
    </v-col>
  </v-row>
</template>

<script>
import { Blob } from 'buffer'

export default {
  name: 'FxSportIconUploadForm',
  events: ['input'],
  props: {
    value: {
      type: Blob,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    file: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },

  methods: {
    reselect () {
      this.$nextTick(() => {
        this.$refs.file.$refs.input.click()
      })
    },
  },
}
</script>
