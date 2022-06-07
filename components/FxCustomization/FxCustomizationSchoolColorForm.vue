<template>
  <v-form ref="form" :disabled="disabled">
    <v-row>
      <v-col cols="4">
        <v-sheet rounded :color="color" height="100%" />
      </v-col>
      <v-col>
        <v-sheet rounded :color="color" class="pa-6">
          <div class="text-p1 white--text text-center">
            Please select a colour that you can easily read this text on.
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col cols="4" class="pt-0">
        <FxColorPicker
          :value="color"
          @input="$emit('input', $event)"
        >
          <template #activator="{on, attrs}">
            <label for="color">Hex Code</label>
            <v-text-field
              v-bind="attrs"
              id="color"
              readonly
              prepend-inner-icon="$vuetify.icons.colorPicker"
              :value="color"
              placeholder="Select Colour"
              dense
              outlined
              v-on="on"
            />
          </template>
        </FxColorPicker>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col class="d-flex pt-0">
        <v-spacer />
        <v-btn
          :loading="loading"
          depressed
          color="brand"
          dark
          class="ml-2"
          @click="$emit('save')"
        >
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FxCustomizationSchoolColor',
  events: ['save'],
  props: {
    value: {
      type: String,
      default: '',
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

  computed: {
    color () {
      return this.value || '#193F66'
    },
  },
}
</script>
