<template>
  <v-form ref="form" v-async-form :disabled="disabled" lazy-validation>
    <v-row class="fill-height" align="center">
      <v-col cols="12">
        <FxAvatar class="mr-2" size="80" />
        <v-file-input
          ref="file"
          style="display: none"
          accept="image/*"
          @change="uploadImage"
        />
        <v-btn
          depressed
          color="primary"
          class="mr-2"
          :loading="loading"
          @click="reselect"
        >
          <v-icon>$vuetify.icons.upload</v-icon>Upload
        </v-btn>
        <v-btn depressed outlined>
          Remove
        </v-btn>
      </v-col>
    </v-row>
    <FxImageCropModal ref="cropper" />
  </v-form>
</template>

<script>
import FxAvatar from '@/components/FxAvatar'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'AccountStatusForm',
  components: { FxAvatar },
  props: {
    value: {
      type: Object,
      default: () => {},
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
    file: null,
    image: null,
    preview: null,
    compression: {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 300,
    },
  }),

  methods: {
    async uploadImage (file) {
      if (!file) {
        return
      }

      const base64Image = await this.readBlob(file)

      const imageBlob = await this.$refs.cropper.open(base64Image)
      if (imageBlob) {
        this.$emit('input', {
          ...this.value,
          file: imageBlob,
        })
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

    readBlob (blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(blob)
      })
    },
  },
}
</script>
