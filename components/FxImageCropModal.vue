<template>
  <v-dialog v-model="isOpen" persistent max-width="400">
    <v-card flat>
      <v-toolbar outlined flat>
        <v-btn icon @click="cancel()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <cropper
          ref="cropper"
          class="custom-restrictions-cropper"
          :src="image"
          :stencil-size="stencilSize"
          :stencil-props="stencilProps"
          image-restriction="none"
          :min-height="limitations.minHeight"
          :min-width="limitations.minWidth"
          :stencil-component="stencilComponent"
          background-class="white-background"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn depressed color="primary" @click="crop">
          Crop
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'FxImageCropModal',
  components: {
    Cropper,
  },
  props: {
    stencil: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    isOpen: false,
    resolve: null,
    reject: null,
    visible: false,
    image: null,
    stencilSize: {
      width: 300,
      height: 300,
    },
    limitations: {
      minWidth: 300,
      minHeight: 300,
    },
  }),

  computed: {
    stencilProps () {
      return {
        handlers: {},
        movable: false,
        resizable: false,
        aspectRatio: 1,
        ...this.stencil,
      }
    },

    stencilComponent () {
      return this.stencil?.component || 'circle-stencil'
    },
  },

  methods: {
    crop () {
      const { canvas } = this.$refs.cropper.getResult()
      canvas.toBlob((blob) => {
        this.resolve(blob)
        this.close()
      }, 'image/webp')
    },

    open (image) {
      this.image = image
      this.isOpen = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    close () {
      this.isOpen = false
    },

    cancel () {
      this.close()
      this.resolve(null)
    },
  },
}
</script>

<style lang="scss">
.white-background {
  background: white;
}
</style>
