<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card class="fx-card-border-top-primary  mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                Season's Start and End
              </template>
              <template #content>
                Enter dates when season starts and ends
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="pt-8"
          >
            <v-row>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="start">Starts On</label>
                <v-menu ref="startMenu" offset-y :close-on-content-click="false">
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      id="start"
                      :value="start"
                      prepend-inner-icon="$vuetify.icons.calendarOutline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      placeholder="DD-MM-YYYY"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    ref="picker"
                    :value="formData.start"
                    @input="update('start', $event)"
                    @change="$refs.startMenu.save($event)"
                  />
                </v-menu>
              </v-col>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="end">Ends On</label>
                <v-menu ref="endMenu" offset-y :close-on-content-click="false">
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      id="end"
                      :value="end"
                      prepend-inner-icon="$vuetify.icons.calendarOutline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      placeholder="DD-MM-YYYY"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    ref="picker"
                    :value="formData.end"
                    :min="formData.start"
                    @input="update('end', $event)"
                    @change="$refs.endMenu.save($event)"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="fx-card-border-top-primary">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                2
              </template>
              <template #title>
                Season Name
              </template>
              <template #content>
                Please provide the name of the season.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12">
                <label for="name">Name</label>
                <v-text-field
                  id="name"
                  v-async-validate
                  :value="formData.name"
                  placeholder="Season Name"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="50"
                  @input="update('name', $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxSeasonAddForm',

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
      return {
        ...(this.value || {}),
      }
    },
    start () {
      return this.formData.start ? DateTime.fromISO(this.formData.start).toFormat('dd-MM-yyyy') : ''
    },
    end () {
      return this.formData.end ? DateTime.fromISO(this.formData.end).toFormat('dd-MM-yyyy') : ''
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      const data = {
        ...this.formData,
        [key]: value,
      }
      if (key === 'start') {
        data.end = DateTime
          .fromFormat(value, 'yyyy-MM-dd')
          .plus({ year: 1 })
          .minus({ day: 1 })
          .toFormat('yyyy-MM-dd')
        if (!data.name) {
          data.name = `${DateTime.fromFormat(data.start, 'yyyy-MM-dd').year}/${DateTime.fromFormat(data.end, 'yyyy-MM-dd').toFormat('yy')}`
        }
      }
      this.$emit('input', data)
    },
  },
}
</script>
