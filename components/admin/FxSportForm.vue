<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="6" class="py-0">
        <label for="displayName">Sport Name</label>
        <v-text-field
          id="name"
          v-async-validate
          :value="formData.name"
          placeholder="Sport Name"
          dense
          :async-rules="[$rule.required]"
          outlined
          maxlength="120"
          @input="update('name', $event)"
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="4" class="py-0">
        <label for="color">Hex Color</label>
        <FxColorPicker :value="formData.color" @input="update('color', $event)">
          <template #activator="{on, attrs}">
            <v-text-field
              id="color"
              v-async-validate
              readonly
              placeholder="#23395D"
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
      </v-col>
    </v-row>

    <label>Sport Icon</label>
    <FxSportIconUploadForm :value="formData.file" @input="update('file', $event)">
      <template #icon>
        <v-avatar color="info lighten-3 mr-2" size="80" tile>
          <v-img v-if="image" :src="image" />
          <v-icon v-else large>
            $vuetify.icons.image
          </v-icon>
        </v-avatar>
      </template>
      <template #actions>
        <v-btn v-if="formData.icon" depressed outlined @click="$emit('remove-icon')">
          Remove
        </v-btn>
      </template>
    </FxSportIconUploadForm>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import FxSportIconUploadForm from '@/components/admin/FxSportIconUploadForm'

export default {
  name: 'FxSportForm',
  events: ['input', 'remove-icon'],
  components: { FxSportIconUploadForm },
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
    preview: null,
  }),

  computed: {
    formData () {
      return this.value ? this.value : { color: '#ff0000', file: null }
    },
    image () {
      return (this.formData.file && this.preview) || this.formData.icon
    },
  },

  methods: {
    ...mapActions({
      readBlob: 'helper/readBlob',
    }),

    validateAsync () {
      return this.$refs.form.validateAsync()
    },

    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })

      if (key === 'file') {
        this.readBlob(value).then((data) => {
          this.preview = data
        })
      }
    },
  },
}
</script>
