<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <slot name="icon" />
      <v-file-input
        ref="file"
        style="display: none"
        accept="image/*"
        @change="selected"
      />
      <v-btn depressed color="primary" class="mr-2" :loading="loading" @click="reselect">
        <v-icon>$vuetify.icons.upload</v-icon>Upload
      </v-btn>
      <slot name="actions" />
      <FxImageCropModal ref="cropper" :compression="compression" />
    </v-col>
  </v-row>
</template>

<script>
import { Blob } from 'buffer'
import { mapActions } from 'vuex'
import FxImageCropModal from '@/components/FxImageCropModal'

export default {
  name: 'FxImageUploadForm',
  components: {
    FxImageCropModal,
  },
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
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    stencilSize: {
      width: 300,
      height: 300,
    },
    limitations: {
      minWidth: 300,
      minHeight: 300,
    },
    stencilProps: {
      handlers: {},
      movable: false,
      resizable: false,
      aspectRatio: 1,
    },
    compression: {
      maxSizeMB: 2,
      maxWidthOrHeight: 300,
    },
  }),

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
    ...mapActions({ readBlob: 'helper/readBlob' }),

    async selected (file) {
      const base64Image = await this.readBlob(file)
      this.file = await this.$refs.cropper.open(base64Image)
    },

    reselect () {
      this.$nextTick(() => {
        this.$refs.file.$refs.input.click()
      })
    },
  },
}
</script>
