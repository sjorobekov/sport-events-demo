<template>
  <v-card class="py-2 px-2 py-md-6 px-md-6">
    <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
      Home Page Images
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
          Upload images for the homepage of your portal. The first image will also double as the log-in page background.<br>
          <br>We recommend using JPEG, PNG, or WEBP formats, but SVG and GIF formats are also supported.
        </v-col>
        <v-col cols="12" lg="7">
          <label>Upload Image</label>
          <FxFileDragDrop
            :loading="imageUploading"
            :disabled="images.length >= 5"
            @select="uploadImageHandler"
          >
            <template #default="{ openSelectFile }">
              <v-icon size="30" color="neutral-darken-2">
                $vuetify.icons.image
              </v-icon>
              <br>
              <v-btn text class="text-p2 upload-button" :loading="imageUploading" @click="openSelectFile">
                Upload Image
              </v-btn>
            </template>
          </FxFileDragDrop>

          <FxCustomizationSchoolHomePageImagesList class="mt-4" :items="images" @remove="removeImageHandler" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
      School Logo
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-4">
          Customise your sports portal by uploading your school logo.<br>
          <br>We recommend using square images in transparent WEBP, PNG, or SVG formats. JPEG and GIF formats are also supported.
        </v-col>
        <v-col cols="12" lg="7">
          <FxImageUploadForm :value="logoFile" :loading="uploadingLogo" :stencil-props="stencil" :compression="compression" @input="uploadLogo">
            <template #icon>
              <v-avatar class="mr-6 school-logo" size="120">
                <v-img v-if="school.logo" :src="school.logo" />
                <span v-else class="neutral--text darken-2">No Logo</span>
              </v-avatar>
            </template>
            <template #actions>
              <v-btn text outlined color="neutral darken-3" :disabled="uploadingLogo" @click="removeLogo">
                Delete Logo
              </v-btn>
            </template>
          </FxImageUploadForm>
        </v-col>
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
      School Colour
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
          Customise your sports portal by selecting your school colour.
        </v-col>
        <v-col cols="12" lg="7">
          <FxCustomizationSchoolColorForm
            ref="colorForm"
            v-model="colorForm.color"
            :disabled="colorFormLoading"
            :loading="colorFormLoading"
            @save="saveColor"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import FxCustomizationSchoolColorForm from '@/components/FxCustomization/FxCustomizationSchoolColorForm'
import FxCustomizationSchoolHomePageImagesList from '@/components/FxCustomization/FxCustomizationHomePageImagesList'

export default {
  name: 'FxSchoolCustomisationPage',
  components: {
    FxCustomizationSchoolColorForm,
    FxCustomizationSchoolHomePageImagesList,
  },
  events: ['updated'],
  props: {
    school: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    colorForm: {},
    colorFormLoading: false,
    uploadingLogo: false,
    logoFile: null,
    imageUploading: false,
    images: [],
  }),

  async fetch () {
    this.images = await this.$store.dispatch('api/schools/getImages', this.school.id)
  },

  computed: {
    compression: () => ({ maxSizeMB: 1 }),
    stencil: () => ({ component: 'rectangle-stencil' }),
  },

  created () {
    this.colorForm = {
      ...this.school,
    }
  },

  methods: {
    saveColor () {
      this.colorFormLoading = true
      this.$store.dispatch('api/schools/saveColor', this.colorForm)
        .then((res) => {
          this.$emit('updated', res)
          this.$toast.success('Saved!')
        })
        .catch(() => {
          this.$toast.error('Unknown error')
        })
        .finally(() => {
          this.colorFormLoading = false
        })
    },

    uploadLogo (file) {
      this.uploadingLogo = true
      this.$store.dispatch('api/schools/saveLogo', {
        id: this.school.id,
        file,
      }).then((res) => {
        this.$emit('updated', res)
        this.$toast('School Logo has been updated!')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.uploadingLogo = false
      })
    },

    removeLogo () {
      if (!confirm('Are you sure?')) {
        return
      }
      this.$store.dispatch('api/schools/removeLogo', this.school.id).then((res) => {
        this.$emit('updated', res)
        this.$toast('School Logo has been removed')
      })
    },

    uploadImageHandler (file) {
      if (!file) {
        return
      }
      this.imageUploading = true
      this.$store.dispatch('api/schools/uploadImage', { id: this.school.id, file })
        .then((res) => {
          this.images = res
          this.$toast('Image has been uploaded!')
        })
        .catch(() => {
          this.$toast.error('Unknown error')
        })
        .finally(() => {
          this.imageUploading = false
        })
    },

    removeImageHandler (imageId) {
      if (!confirm('Are you sure?')) {
        return
      }
      this.$store.dispatch('api/schools/removeImage', {
        id: this.school.id,
        imageId,
      }).then((res) => {
        this.images = res
      }).catch(() => {
        this.$toast.error('Unknown error')
      })
    },
  },
}
</script>

<style scoped lang="scss">
.school-logo {
  border: var(--v-neutral-lighten1) 1px solid;
  border-radius: 4px;
}

.v-btn:before {
  opacity: 0!important
}
.upload-button {
  color: var(--v-neutral-darken3)!important;
}
.upload-button:hover {
  box-shadow: none!important;
  color: var(--v-primary-base)!important;
}
</style>
