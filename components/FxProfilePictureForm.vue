<template>
  <v-form ref="form" v-async-form :disabled="disabled" lazy-validation>
    <v-row v-if="!file" class="fill-height" align="center">
      <v-col cols="12">
        <FxAvatar class="mr-2" size="80" />
        <v-file-input
          ref="file"
          v-model="file"
          style="display: none"
          accept="image/*"
          @change="uploadImage"
        />
        <v-btn depressed color="primary" class="mr-2" @click="reselect">
          <v-icon>$vuetify.icons.upload</v-icon>Upload
        </v-btn>
        <v-btn depressed outlined>
          Remove
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" sm="8">
        <cropper
          ref="cropper"
          class="custom-restrictions-cropper"
          :src="image"
          :stencil-size="stencilSize"
          :stencil-props="stencilProps"
          image-restriction="stencil"
          :min-height="limitations.minHeight"
          :min-width="limitations.minWidth"
          stencil-component="circle-stencil"
        />
      </v-col>
      <v-col cols="6" sm="8" class="text-right">
        <v-btn outlined @click="clear">
          Cancel
        </v-btn>
        <v-btn dark depressed color="brand2" @click="save">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import FxAvatar from '@/components/FxAvatar'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'AccountStatusForm',
  components: { FxAvatar, Cropper },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    file: null,
    image: null,
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
  }),

  methods: {
    _crop () {
      return new Promise((resolve) => {
        const { canvas } = this.$refs.cropper.getResult()
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/webp')
      })
    },

    uploadImage () {
      if (this.file) {
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(this.file)
      }
    },

    reselect () {
      this.clear()
      this.$nextTick(() => {
        this.$refs.file.$refs.input.click()
      })
    },

    clear () {
      this.file = null
      this.image = null
    },

    async save () {
      const result = await this._crop()
      this.$emit('input', result)
    },
  },
}
</script>
