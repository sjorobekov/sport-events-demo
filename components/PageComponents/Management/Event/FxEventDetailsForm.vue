<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-row>
      <v-col>
        <v-menu ref="menu" offset-y :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <label for="date">Date</label>
            <v-text-field
              id="date"
              v-async-validate
              :value="formData.date"
              prepend-inner-icon="$vuetify.icons.calendarOutline"
              readonly
              outlined
              dense
              v-bind="attrs"
              placeholder="DD-MM-YYYY"
              :async-rules="[$rule.required]"
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            :value="formData.date"
            @input="update('date', $event)"
            @change="$refs.menu.save($event)"
          />
        </v-menu>
      </v-col>
      <v-col>
        <label for="startTime">Start Time</label>
        <v-text-field
          id="startTime"
          v-async-validate
          type="time"
          dense
          outlined
          placeholder="HH:MM"
          :async-rules="[$rule.required]"
          :value="formData.startTime"
          @input="update('startTime', $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label for="fixtureType">Fixture Type</label>
        <FxFixtureTypeSelect
          id="fixtureType"
          :value="formData.fixtureType"
          :async-rules="[$rule.required]"
          @input="update('fixtureType', $event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import FxFixtureTypeSelect from '@/components/FxEventForm/FxFixtureTypeSelect'

export default {
  name: 'FxEventDetailsForm',
  components: { FxFixtureTypeSelect },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    formData () {
      return {
        ...(this.value || {}),
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
