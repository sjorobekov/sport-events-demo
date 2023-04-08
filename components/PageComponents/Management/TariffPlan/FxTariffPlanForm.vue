<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="name">Tariff Name</label>
        <v-text-field
          id="name"
          :value="formData.name"
          dense
          outlined
          disabled
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="period">Period</label>
        <v-text-field
          id="period"
          :value="formData.period"
          dense
          outlined
          disabled
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="period">Price</label>
        <v-text-field
          id="price"
          :value="formData.price.GBP"
          dense
          outlined
          disabled
          prepend-inner-icon="mdi-currency-gbp"
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="numberOfUsers">Number of Users</label>
        <v-text-field
          id="numberOfUsers"
          :value="formData.numberOfUsers"
          placeholder="Number of Users"
          dense
          outlined
          type="number"
          @input="update('numberOfUsers', $event)"
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="numberOfTeamsPerSeason">Number of Teams per Season</label>
        <v-text-field
          id="numberOfUsers"
          :value="formData.numberOfTeamsPerSeason"
          placeholder="Number of Teams per Season"
          dense
          outlined
          type="number"
          @input="update('numberOfTeamsPerSeason', $event)"
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="numberOfCompetitionsPerSeason">Number of Competitions per Season</label>
        <v-text-field
          id="numberOfCompetitionsPerSeason"
          :value="formData.numberOfCompetitionsPerSeason"
          placeholder="Number of Competitions per Season"
          dense
          outlined
          type="number"
          @input="update('numberOfCompetitionsPerSeason', $event)"
        />
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="12" md="8" class="py-0">
        <label for="integrations">Integrations</label>
        <v-switch
          id="integrations"
          :input-value="formData.integrations"
          class="float-right"
          color="success"
          inset
          @change="update('integrations', $event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxTariffPlanForm',
  events: ['input'],
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
  }),

  computed: {
    formData () {
      return this.value ? this.value : {}
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
    },
  },
}
</script>
