<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-row>
          <v-col cols="1" class="d-flex">
            <v-icon>$vuetify.icons.calendar</v-icon>
          </v-col>
          <v-col cols="3">
            <label for="date">Date</label>
            <v-menu ref="menu" offset-y :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-text-field
                  id="date"
                  v-async-validate
                  :value="formData.date"
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
              />
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-row>
          <v-col cols="1" class="d-flex">
            <v-icon>mdi-clock-outline</v-icon>
          </v-col>
          <v-col cols="4">
            <label for="startTime">Start Time</label>
            <FxTimePickerMenu
              id="startTime"
              :async-rules="[$rule.required]"
              :value="formData.startTime"
              @input="update('startTime', $event)"
            />
          </v-col>
          <v-col cols="4">
            <label for="finishTime">Finish Time</label>
            <FxTimePickerMenu
              id="finishTime"
              :value="formData.finishTime"
              @input="update('finishTime', $event)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-row>
          <v-col cols="1" class="d-flex">
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-col>
          <v-col cols="4">
            <label for="lead">Lead Staff Member</label>
            <FxUserSelect
              id="lead"
              :school-id="schoolId"
              :value="formData.leadId"
              placeholder="Select Lead Staff Member"
              @input="update('leadId', $event)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-row>
          <v-col cols="1" class="d-flex">
            <v-icon>mdi-clock-outline</v-icon>
          </v-col>
          <v-col cols="11">
            <label>Location</label>
            <FxInHouseEventLocationTypeSelect
              :value="formData.location"
              @input="update('location', $event)"
            />

            <template v-if="formData.location === EventLocationType.SPORTS_LOCATIONS">
              <label for="sportLocation">Sports Location</label>
              <v-autocomplete
                id="sportLocation"
                v-async-validate
                :async-rules="[$rule.required]"
                outlined
                dense
                :value="formData.sportLocationId"
                :items="locations"
                item-text="name"
                item-value="id"
                placeholder="Select Sports Location"
                @input="update('sportLocationId', $event)"
              />
            </template>
            <template v-else-if="formData.location === EventLocationType.OTHER">
              <label for="locationOther">Sports Location</label>
              <v-text-field
                id="locationOther"
                v-async-validate
                dense
                outlined
                placeholder="Enter Address"
                :async-rules="[$rule.required]"
                :value="formData.otherLocation"
                @input="update('otherLocation', $event)"
              />
            </template>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-row>
          <v-col cols="1" class="d-flex">
            <v-icon>mdi-information-outline</v-icon>
          </v-col>
          <v-col cols="11">
            <label for="info">Further Information</label>
            <v-textarea
              id="info"
              :value="formData.info"
              dense
              outlined
              placeholder="Enter any further information for this event."
              @input="update('info', $event)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-list-item class="px-0">
      <v-spacer />
      <v-list-item-action>
        <div>
          <v-btn outlined class="mr-2" @click="$emit('cancel')">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" type="submit">
            Confirm
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventLocationType } from '@/enum'
import FxInHouseEventLocationTypeSelect from '@/components/FxInHouseEventForm/FxEventLocationTypeSelect/FxInHouseEventLocationTypeSelect'

export default {
  name: 'FxInHouseEventDetailsForm',
  components: {},
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
    EventLocationType,
    FxInHouseEventLocationTypeSelect,
    locations: [],
  }),

  async fetch () {
    this.locations = await this.$store.dispatch('api/locations/list', {
      schoolId: this.schoolId,
    })
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
    formData () {
      return { ...this.value }
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
