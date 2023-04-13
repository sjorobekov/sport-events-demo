<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <slot name="icon" />
      <v-file-input
        ref="file"
        v-model="selectedFile"
        style="display: none"
        accept="image/*"
        @change="selected"
      />
      <v-btn depressed color="primary" class="mr-2" :loading="loading" @click="reselect">
        <v-icon>$vuetify.icons.upload</v-icon>Upload
      </v-btn>
      <slot name="actions" />
      <FxImageCropModal ref="cropper" :stencil="stencilProps" />
      <v-snackbar v-model="snackbar" color="info" min-width="200">
        Loading image...
        <v-progress-circular
          indeterminate
          color="brand"
        />
      </v-snackbar>
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
    stencilProps: {
      type: Object,
      default: () => {},
    },
    compression: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    selectedFile: null,
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
    snackbar () {
      return this.loading
    },
  },

  methods: {
    ...mapActions({ readBlob: 'helper/readBlob', compressImage: 'helper/compressImage' }),

    async selected (file) {
      if (file.type === 'image/svg+xml') {
        this.file = file
        return
      }
      const base64Image = await this.readBlob(file)
      const croppedImage = await this.$refs.cropper.open(base64Image)
      if (croppedImage) {
        this.file = await this.compressImage({ file: croppedImage, ...this.compression })
      }
      this.selectedFile = null
    },

    reselect () {
      this.$nextTick(() => {
        this.$refs.file.$refs.input.click()
      })
    },
  },
}
</script>
