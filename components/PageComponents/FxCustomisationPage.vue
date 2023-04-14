<template>
  <v-card class="py-2 px-2 py-md-6 px-md-6">
    <v-card-title class="text-p3 font-weight-bold">
      Home Page Images
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 info--text">
          JPEG, PNG and WEBP are recommended. SVG and GIF are also supported
        </v-col>
        <v-col cols="12" lg="7">
          <label>Upload Image</label>
          <FxFileDragDrop
            :loading="imageUploading"
            :disabled="images.length >= 5"
            @select="uploadImageHandler"
          >
            <template #default="{ openSelectFile }">
              <v-icon size="30" color="info">
                $vuetify.icons.image
              </v-icon>
              <br>
              <v-btn text class="text-p2 info--text" :loading="imageUploading" @click="openSelectFile">
                Upload Image
              </v-btn>
            </template>
          </FxFileDragDrop>

          <FxCustomizationSchoolHomePageImagesList class="mt-4" :items="images" @remove="removeImageHandler" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold">
      School Logo
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 info--text">
          Square images recommended <br>
          Transparent WEBP, PNG or SVG recommended. JPEG and GIF are also supported
        </v-col>
        <v-col cols="12" lg="7">
          <FxImageUploadForm :value="logoFile" :loading="uploadingLogo" :stencil-props="stencil" :compression="compression" @input="uploadLogo">
            <template #icon>
              <v-avatar class="mr-6 school-logo" size="120">
                <v-img v-if="school.logo" :src="school.logo" />
                <span v-else class="info--text lighten-2">No Logo</span>
              </v-avatar>
            </template>
            <template #actions>
              <v-btn text color="info darken-1" :disabled="uploadingLogo" @click="removeLogo">
                Delete Logo
              </v-btn>
            </template>
          </FxImageUploadForm>
        </v-col>
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold">
      School Colour
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" lg="5" class="text-p2 info--text">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
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

<style lang="scss">
.school-logo {
  border: var(--v-neutral-lighten1) 1px solid;
  border-radius: 4px;
}
</style>
