<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-container class="child-border">
      <v-row>
        <v-col class="d-flex pt-3 pb-0 px-6">
          <v-icon class="mr-9">
            $vuetify.icons.calendar-1
          </v-icon>
          <div class="max-width-137">
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
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex pb-0 d-flex px-6">
          <v-icon class="mr-9">
            $vuetify.icons.clock-1
          </v-icon>
          <div class="d-flex flex-column flex-sm-row">
            <div class="mr-2 max-width-137">
              <label for="startTime">Start Time</label>
              <FxTimePickerMenu
                id="startTime"
                :async-rules="[$rule.required]"
                :value="formData.startTime"
                @input="update('startTime', $event)"
              />
            </div>
            <div class="mr-2 max-width-137">
              <label for="finishTime">Finish Time</label>
              <FxTimePickerMenu
                id="finishTime"
                :value="formData.finishTime"
                @input="update('finishTime', $event)"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-1 pb-0 d-flex px-6">
          <v-icon class="mr-9">
            $vuetify.icons.user-1
          </v-icon>
          <div>
            <label for="lead">Lead Staff Member</label>
            <FxUserSelect
              id="lead"
              :school-id="schoolId"
              :value="formData.leadId"
              placeholder="Select Lead Staff Member"
              @input="update('leadId', $event)"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-1 pb-0 d-flex px-6">
          <v-icon class="mr-9">
            $vuetify.icons.location-1
          </v-icon>

          <div>
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
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-1 pb-0 d-flex px-6">
          <v-icon class="mr-9">
            $vuetify.icons.directory-outline
          </v-icon>

          <div class="flex-grow-1">
            <label for="info">Further Information</label>
            <v-textarea
              id="info"
              :value="formData.info"
              dense
              outlined
              placeholder="Enter any further information for this event."
              @input="update('info', $event)"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex">
          <v-spacer />
          <v-btn outlined class="mr-2" @click="$emit('cancel')">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" type="submit">
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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

<style scoped>
.max-width-137 {
  max-width: 137px;
}
</style>
