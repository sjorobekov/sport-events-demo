<template>
  <div>
    <label>Upload Image</label>
    <v-file-input
      accept="image/*"
      outlined
      dense
      :prepend-icon="null"
      prepend-inner-icon="mdi-camera"
      @change="uploadHandler"
    />
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression'

export default {
  name: 'FxCustomizationHomePageImagesUploadForm',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    compressionOptions: () => ({
      maxSizeMB: 2,
      maxWidthOrHeight: 4032,
      useWebWorker: true,
    }),
  },

  methods: {
    uploadHandler (file) {
      imageCompression(file, this.compressionOptions)
        .then(async (compressedFile) => {
          this.update('file', compressedFile)
          this.preview = await this.readBlob(compressedFile)
        })
    },
  },
}
</script>
