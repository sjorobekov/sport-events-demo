<template>
  <div>
    <h3 class="text-h3 mb-6" v-text="title" />
    <v-form ref="confirmForm" lazy-validation>
      <v-card
        v-for="(item, index) in items"
        :key="index"
        class="mb-3"
      >
        <FxEventWithConflictItem
          ref="eventItem"
          :context-school-id="contextSchoolId"
          :me="item.me"
          :opponent="item.opponent"
          :event="item.event"
        />
      </v-card>
    </v-form>

    <FxEventForm
      v-if="formVisible"
      ref="form"
      :school-id="contextSchoolId"
      :event.sync="formData.event"
      :me.sync="formData.me"
      :opponent.sync="formData.opponent"
      :days.sync="formData.days"
      :hide-event-type="items.length > 0"
      @cancel="cancel"
      @save="save"
    />

    <v-container v-else class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined @click="goBack">
          Go Back
        </v-btn>
        <v-btn
          v-if="formData.event.eventType === EventType.FIXTURE"
          outlined
          class="ml-2"
          @click="addOneMore"
        >
          Add Another Fixture
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="confirm"
        >
          Confirm & Add Event
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import FxEventForm from '@/components/FxEventForm/FxEventForm'
import { EventLocation, EventLocationType, EventType, FixtureType, TransportType } from '@/enum'
import FxEventWithConflictItem from '@/components/FxEventItem/FxEventWithConflictItem'

const CONFIRM_TITLE = {
  [EventType.FIXTURE]: 'Confirm Fixture',
  [EventType.MULTI_EVENT]: 'Confirm Multi-Event',
  [EventType.TOURNAMENT]: 'Confirm Tournament',
  [EventType.TRAINING]: 'Confirm Training',
}

export default {
  name: 'FxEventAddPage',
  components: {
    FxEventWithConflictItem,
    FxEventForm,
  },
  props: {
    contextSchoolId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    DateTime,
    formData: {
      me: {
        eventLocation: EventLocation.HOME,
        transportTo: TransportType.VENUE,
        transportFrom: TransportType.VENUE,
      },
      opponent: {},
      event: {
        fixtureType: FixtureType.FRIENDLY,
        location: EventLocationType.SPORTS_LOCATIONS,
        repeats: false,
      },
      days: [],
    },
    items: [],
    override: [],
    loading: false,
    formVisible: true,
    EventType,
  }),

  head () {
    return this.title
  },

  computed: {
    title () {
      if (this.formVisible) {
        return 'Create New Event'
      }

      return CONFIRM_TITLE[this.formData.event.eventType]
    },
  },

  watch: {
    items: {
      handler (val) {
        this.setSession('eventItems', val)
      },
      deep: true,
    },
    formData: {
      handler (val) {
        this.setSession('eventForm', val)
      },
      deep: true,
    },
  },

  mounted () {
    this.items = this.getSession('eventItems') || []
    this.formData = this.getSession('eventForm') || {
      me: {
        eventLocation: EventLocation.HOME,
        transportTo: TransportType.VENUE,
        transportFrom: TransportType.VENUE,
        teamId: this.$route.query.teamId,
        leadId: this.$route.query.leadId,
      },
      opponent: {},
      event: {
        fixtureType: FixtureType.FRIENDLY,
        location: EventLocationType.SPORTS_LOCATIONS,
        sportId: this.$route.query.sportId,
        gender: this.$route.query.gender,
        ability: this.$route.query.ability,
        age: this.$route.query.age,
      },
    }

    this.$router.push({ query: {} })
  },

  beforeDestroy () {
    this.setSession('eventForm', null)
    this.setSession('eventItems', [])
  },

  methods: {
    setSession (key, val) {
      window.sessionStorage.setItem(key, JSON.stringify(val))
    },

    getSession (key) {
      return JSON.parse(window.sessionStorage.getItem(key))
    },

    async save () {
      this.loading = true

      try {
        const isValid = await this.$refs.form.validateAsync()
        if (!isValid) {
          this.loading = false
          return
        }

        this.formVisible = false
        if (this.formData.event.eventType === EventType.TRAINING && this.formData.days.length > 1) {
          this.items = this.formData.days.map((item) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { days, ...data } = this.formData
            return {
              ...data,
              event: {
                ...data.event,
                date: item.value,
              },
            }
          })
        } else {
          this.items.push({
            ...this.formData,
          })
        }
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },

    addOneMore () {
      this.formData = {
        ...this.formData,
        teamId: null,
      }

      this.formVisible = true
    },

    cancel () {
      this.setSession('eventForm', null)
      this.setSession('eventItems', [])
      this.$emit('cancel')
    },

    goBack () {
      const [item] = this.items.splice(this.items.length - 1, 1)
      this.formData = {
        ...item,
      }
      this.formVisible = true
    },

    confirm () {
      const isValid = this.$refs.confirmForm.validate()
      if (!isValid) {
        this.$toast.error('You need to resolve or override conflict')
        return
      }

      this.loading = true

      this.$store.dispatch('api/events/createBatch', {
        events: this.items,
        schoolId: this.contextSchoolId,
      }).then(() => {
        this.setSession('eventForm', null)
        this.setSession('eventItems', [])
        this.$emit('saved', this.formData.me.teamId)
      }).catch(() => {
        this.$toast.error('Something went wrong')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
