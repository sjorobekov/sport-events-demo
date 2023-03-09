<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-container class="child-border">
      <v-row>
        <v-col class="d-flex pt-3 pb-0 px-6">
          <v-icon class="mr-9">
            $vuetify.icons.calendar-1
          </v-icon>
          <div style="max-width: 137px">
            <label for="date">Date</label>
            <v-menu ref="menu" offset-y :close-on-content-click="true">
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
        <v-col class="pt-1 pb-0 d-flex px-6">
          <v-icon class="mr-9">
            $vuetify.icons.clock-1
          </v-icon>

          <div class="d-flex flex-column flex-sm-row">
            <div class="mr-2" style="max-width: 137px">
              <label for="startTime">Start Time</label>
              <FxTimePickerMenu
                id="startTime"
                :async-rules="[$rule.required]"
                :value="formData.startTime"
                @input="update('startTime', $event)"
              />
            </div>
            <div class="mr-2" style="max-width: 137px">
              <label for="endTime">End Time</label>
              <FxTimePickerMenu
                id="endTime"
                :async-rules="[$rule.required]"
                :value="formData.endTime"
                @input="update('endTime', $event)"
              />
            </div>
            <div v-if="!isTraining" class="mr-2" style="max-width: 137px">
              <label for="meetTime">Meet Time</label>
              <FxTimePickerMenu
                id="meetTime"
                :value="formData.meetTime"
                @input="update('meetTime', $event)"
              />
            </div>
            <div v-if="!isTraining" class="mr-2" style="max-width: 137px">
              <label for="returnTime">Return Time</label>
              <FxTimePickerMenu
                id="returnTime"
                :value="formData.returnTime"
                @input="update('returnTime', $event)"
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
              style="max-width: 269px"
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
            <FxEventLocationTypeSelect
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
            $vuetify.icons.transport-1
          </v-icon>

          <div class="flex-grow-1" style="max-width: 428px">
            <v-row>
              <v-col>
                <v-checkbox
                  :input-value="formData.noNeedTransport"
                  label="This event doesn't need transport information"
                  class="info--text mb-6"
                  hide-details
                  @change="update('noNeedTransport', $event)"
                />
              </v-col>
            </v-row>
            <v-expand-transition>
              <div v-if="!formData.noNeedTransport">
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="pr-sm-2">
                    <label for="transportTo">Transport To</label>
                    <v-select
                      id="transportTo"
                      v-async-validate
                      :async-rules="[$rule.required]"
                      dense
                      outlined
                      :value="formData.transportTo"
                      placeholder="Transport To"
                      :items="transportToOptions"
                      @input="update('transportTo', $event)"
                    />
                  </v-col>
                  <v-col v-if="formData.transportTo === TransportType.OTHER" cols="12" sm="6">
                    <label for="transportToOther">Transport Notes</label>
                    <v-text-field
                      id="transportToOther"
                      v-async-validate
                      :async-rules="[$rule.required]"
                      dense
                      outlined
                      :value="formData.transportToOther"
                      placeholder="Transport Notes"
                      @input="update('transportToOther', $event)"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="pr-sm-2">
                    <label for="transportFrom">Transport From</label>
                    <v-select
                      id="transportFrom"
                      v-async-validate
                      :async-rules="[$rule.required]"
                      dense
                      outlined
                      :value="formData.transportFrom"
                      placeholder="Transport From"
                      :items="transportFromOptions"
                      @input="update('transportFrom', $event)"
                    />
                  </v-col>
                  <v-col v-if="formData.transportFrom === TransportType.OTHER" cols="12" sm="6">
                    <label for="transportFromOther">Transport Notes</label>
                    <v-text-field
                      id="transportFromOther"
                      v-async-validate
                      :async-rules="[$rule.required]"
                      dense
                      outlined
                      :value="formData.transportFromOther"
                      placeholder="Transport Notes"
                      @input="update('transportFromOther', $event)"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-1 pb-0 d-flex  px-6">
          <v-icon class="mr-9">
            $vuetify.icons.directory-outline
          </v-icon>

          <div class="flex-grow-1" style="max-width: 462px">
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

          <v-btn outlined :ripple="false" class="mr-2" color="neutral darken-3" @click="$emit('cancel')">
            Cancel
          </v-btn>
          <v-btn depressed :ripple="false" color="primary" type="submit">
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventLocationType, TransportType, EventType } from '@/enum'
import FxInHouseEventLocationTypeSelect from '@/components/FxInHouseEventForm/FxEventLocationTypeSelect/FxInHouseEventLocationTypeSelect'
import FxEventLocationTypeSelect from '@/components/FxEventForm/FxEventLocationTypeSelect/FxEventLocationTypeSelect'

export default {
  name: 'FxEventDetailsEditForm',
  components: { FxEventLocationTypeSelect },
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
    TransportType,
    EventType,
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

    transportToOptions () {
      return Object.values(TransportType).map((type) => {
        return { value: type, text: this.$t(`TRANSPORT_TO.${type}`) }
      })
    },

    transportFromOptions () {
      return Object.values(TransportType).map((type) => {
        return { value: type, text: this.$t(`TRANSPORT_FROM.${type}`) }
      })
    },

    isTraining () {
      return this.formData.eventType === EventType.TRAINING
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
