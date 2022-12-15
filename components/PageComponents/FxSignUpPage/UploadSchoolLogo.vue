<template>
  <div>
    <h1 class="text-h1 text-center primary--text mt-6">
      Upload Your School Logo
    </h1>
    <h2 class="text-p2 text-center primary--text mb-6">
      SVG, WEBP, PNG, JPG and GIF files are allowed
    </h2>
    <v-form class="mx-sm-auto sign-in-form" @submit.prevent="submitHandler">
      <FxFileDragDrop v-if="!file" height="165" color="white" @select="select">
        <template #default="{ openSelectFile }">
          <v-icon size="30">
            mdi-cloud-upload-outline
          </v-icon>
          <div class="text-p2 font-weight-bold info--text text--darken-1">
            Drag file here <br> or
          </div>
          <v-btn color="#2972F3" text class="text-p2" @click="openSelectFile">
            browse
          </v-btn>
        </template>
      </FxFileDragDrop>

      <v-img v-else :src="preview">
        <v-row>
          <v-col class="d-flex pa-4">
            <v-spacer />
            <v-btn depressed class="mr-2" @click="reselect">
              Reselect
            </v-btn>
            <v-btn depressed @click="remove">
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-img>

      <v-btn
        class="mt-8"
        type="submit"
        depressed
        color="brand2"
        dark
        height="50"
        :loading="loading"
        block
      >
        Next
      </v-btn>

      <v-btn class="mt-3" text color="info" block @click="addLaterHandler">
        Add School Logo Later
      </v-btn>
    </v-form>

    <FxImageCropModal ref="cropper" :stencil="stencil" />
  </div>
</template>

<script>
import { Blob } from 'buffer'
import { mapActions } from 'vuex'

export default {
  name: 'UploadSchoolLogo',
  props: {
    value: {
      type: Blob,
      default: undefined,
    },
  },
  data: () => ({
    loading: false,
    formData: {},
    isHover: false,
    preview: null,
    file: null,
  }),

  computed: {
    compression: () => ({ maxSizeMB: 1 }),
    stencil: () => ({ component: 'rectangle-stencil' }),
  },

  watch: {
    async file (val) {
      if (val) {
        this.preview = await this.readBlob(val)
      } else {
        this.preview = null
      }
    },
  },

  methods: {
    ...mapActions({ readBlob: 'helper/readBlob', compressImage: 'helper/compressImage' }),

    remove () {
      this.file = null
    },

    reselect () {
      this.remove()
      this.openSelectFile()
    },

    async select (file) {
      if (file.type === 'image/svg+xml') {
        this.file = file
        return
      }
      const base64Image = await this.readBlob(file)
      const croppedImage = await this.$refs.cropper.open(base64Image)
      if (croppedImage) {
        this.file = await this.compressImage({ file: croppedImage, ...this.compression })
      }
    },

    submitHandler () {
      this.$emit('input', this.file)
    },

    addLaterHandler () {
      this.$emit('input', null)
    },
  },
}
</script>

<style scoped>
.v-application .brand2 {
    background-color: #4368FA !important;
}

</style>
