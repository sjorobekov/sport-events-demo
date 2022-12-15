<template>
  <div>
    <h1 class="text-h1 text-center primary--text mt-6">
      Choose Your School Colour
    </h1>
    <h2 class="text-p2 text-center primary--text mb-6">
      Customise fixturr with your school colour.
    </h2>
    <v-form ref="form" v-async-form class="mx-sm-auto sign-in-form" :disabled="loading" @submit.prevent="submitHandler">
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
            v-on="on"
          />
        </template>
      </FxColorPicker>

      <v-sheet rounded :color="color" class="pa-6 mb-6">
        <div class="text-p1 white--text text-center">
          Please select a colour that you can easily read this text on.
        </div>
      </v-sheet>

      <v-btn
        type="submit"
        depressed
        color="brand3"
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
    this.color = this.value || '#193F66'
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
