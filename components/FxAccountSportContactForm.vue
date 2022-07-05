<template>
  <v-form :disabled="disabled">
    <v-row class="fill-height" align="center" justify="center" no-gutters>
      <v-col>
        <label for="displaySportsContact"><strong>{{ formData.displaySportsContact ? 'Displayed' : 'Not displayed' }}</strong> as a Sports Contact</label>
      </v-col>
      <v-col>
        <v-switch
          id="displaySportsContact"
          class="float-right"
          color="success"
          inset
          :input-value="formData.displaySportsContact"
          @change="update('displaySportsContact', $event)"
        />
      </v-col>
    </v-row>

    <v-row class="fill-height" align="center" justify="center" no-gutters>
      <v-col>
        <label for="mainSportsContact">Main Sports Contact</label>
      </v-col>
      <v-col>
        <v-checkbox
          id="mainSportsContact"
          class="float-right"
          :disabled="!formData.displaySportsContact"
          :input-value="formData.mainSportsContact"
          @change="update('mainSportsContact', $event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'AccountSportContactForm',
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

  computed: {
    formData () {
      return this.value || { displaySportsContact: false, mainSportsContact: false }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      const payload = { ...this.formData, [key]: value }
      if (key === 'displaySportsContact' && value === false) {
        payload.mainSportsContact = false
      }
      this.$emit('input', payload)
    },
  },
}
</script>
