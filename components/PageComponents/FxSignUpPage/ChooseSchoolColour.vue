<template>
  <div>
    <div class="mx-3">
      <h1 v-balance-text class="text-h3 text-center branddark--text mt-6 mb-2">
        Choose Your School Colour
      </h1>
      <h2 class="text-p3 text-center branddark--text text--lighten-1 mb-6">
        Customise Fixturr with your school colour.
      </h2>
    </div>
    <v-form ref="form" v-async-form class="mx-3 mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
      <FxColorPicker
        v-model="color"
      >
        <template #activator="{on, attrs}">
          <label for="color">Hex Code</label>
          <v-text-field
            v-bind="attrs"
            id="color"
            v-model="color"
            readonly
            prepend-inner-icon="$vuetify.icons.colorPicker"
            placeholder="Select Colour"
            dense
            outlined
            height="56"
            v-on="on"
          />
        </template>
      </FxColorPicker>

      <v-sheet rounded :color="color" class="pa-6 mb-6">
        <div class="text-p2 white--text text-center">
          Please select a colour that you can easily read this text on.
        </div>
      </v-sheet>

      <v-btn
        type="submit"
        depressed
        color="brandgreen sign-up-button mb-4"
        dark
        height="50"
        :loading="loading"
        block
      >
        Next
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ChooseSchoolColour',
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    loading: false,
    color: '',
  }),

  created () {
    this.color = this.value || '#333c4e'
  },

  methods: {
    async submitHandler () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$emit('input', this.color)
      this.loading = false
    },
  },
}
</script>
