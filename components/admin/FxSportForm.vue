<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="displayName">Sport Name</label>
    <v-text-field
      id="name"
      v-async-validate
      :value="formData.name"
      dense
      :async-rules="[$rule.required]"
      outlined
      maxlength="120"
      @input="update('name', $event)"
    />

    <label for="color">Hex Color</label>
    <FxColorPicker :value="formData.color" @input="update('color', $event)">
      <template #activator="{on, attrs}">
        <v-text-field
          id="color"
          v-async-validate
          readonly
          prepend-inner-icon="$vuetify.icons.colorPicker"
          v-bind="attrs"
          :value="formData.color"
          :async-rules="[$rule.required]"
          dense
          outlined
          maxlength="7"
          v-on="on"
        />
      </template>
    </FxColorPicker>

    <v-row class="fill-height" align="center">
      <v-col cols="12">
        <v-avatar color="info lighten-3 mr-2" size="80">
          <v-img v-if="preview" :src="preview" />
          <v-icon v-else large>
            $vuetify.icons.image
          </v-icon>
        </v-avatar>
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
    <FxImageCropModal ref="cropper" :compression="compression" />
  </v-form>
</template>

<script>
import FxImageCropModal from '@/components/FxImageCropModal'

export default {
  name: 'FxSportForm',
  components: {
    FxImageCropModal,
  },
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
    preview: null,
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
      maxSizeMB: 0.5,
      maxWidthOrHeight: 300,
    },
  }),

  computed: {
    formData () {
      return this.value ? this.value : { color: '#ff0000', file: null }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },

    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    async uploadImage () {
      if (!this.file) {
        return
      }

      const base64Image = await this.readBlob(this.file)
      this.formData.file = await this.$refs.cropper.open(base64Image)
      if (this.formData.file) {
        this.preview = await this.readBlob(this.formData.file)
      }
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

    reselect () {
      this.clear()
      this.$nextTick(() => {
        this.$refs.file.$refs.input.click()
      })
    },

    clear () {
      this.file = null
      this.preview = null
    },
  },
}
</script>
