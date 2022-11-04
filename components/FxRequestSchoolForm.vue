<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                School Name
              </template>
              <template #content>
                Enter the school name
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="7"
            class="pt-8"
          >
            <label for="name">School Name</label>
            <v-text-field
              id="name"
              v-async-validate
              :value="formData.name"
              placeholder="Name"
              :async-rules="[$rule.required]"
              dense
              outlined
              maxlength="120"
              @input="update('name', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                2
              </template>
              <template #title>
                Address & Contact Details
              </template>
              <template #content>
                Enter the school address
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="7"
            class="pt-8"
          >
            <label for="street">Street</label>
            <v-text-field
              id="street"
              :value="formData.street"
              placeholder="Street"
              dense
              outlined
              maxlength="120"
              @input="update('street', $event)"
            />

            <label for="city">City</label>
            <v-text-field
              id="city"
              :value="formData.city"
              placeholder="City"
              dense
              outlined
              maxlength="50"
              @input="update('city', $event)"
            />

            <label for="zip">Zip</label>
            <v-text-field
              id="zip"
              placeholder="Zip Code"
              :value="formData.zip"
              dense
              outlined
              maxlength="15"
              @input="update('zip', $event)"
            />

            <label for="country">Country</label>
            <v-autocomplete
              id="country"
              :value="formData.country"
              dense
              :items="countries"
              outlined
              item-value="code"
              placeholder="Select Country"
              item-text="name"
              @input="update('country', $event)"
            />
            <label for="email">School Contact Email (Optional)</label>
            <v-text-field
              id="email"
              v-async-validate
              :value="formData.email"
              placeholder="Email"
              :async-rules="[$rule.email]"
              dense
              outlined
              @input="update('email', $event)"
            />
            <label for="website">School Website (Optional)</label>
            <v-text-field
              id="website"
              :value="formData.website"
              placeholder="Website"
              dense
              outlined
              @input="update('website', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxRequestSchoolForm',

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
    mapCenter: { lng: 0, lat: 0 },
  }),

  computed: {
    ...mapGetters({
      countries: 'countries/list',
    }),
    formData () {
      return {
        ...(this.value || { name: '', address: '' }),
      }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
