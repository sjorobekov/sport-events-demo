<template>
  <div>
    <h3 class="text-h3 mb-6" v-text="title" />

    <div>
      <v-card
        v-for="(item, index) in items"
        :key="index"
        class="mb-3"
      >
        <FxEventItem
          :event="item.event"
          :context-school-id="schoolId"
          :me="item.me"
          :opponent="item.opponent"
        >
          <template #actions>
            <v-alert dense class="mb-0 float-right">
              <v-icon color="success darken-2">
                mdi-checkbox-marked-circle-outline
              </v-icon>
              <span class="success--text text--darken-2 text-p1">No Event Conflict</span>
            </v-alert>
          </template>
          <template v-if="item.me.info" #bottom>
            <v-row>
              <v-col class="py-0">
                <ListItem>
                  <template #icon>
                    <v-icon>mdi-information-outline</v-icon>
                  </template>
                  <template #content>
                    <v-list-item-title class="text-p1 info--text">
                      Further Information
                    </v-list-item-title>
                    <span class="text-p2 info--text text--darken-2">{{ item.me.info }}</span>
                  </template>
                </ListItem>
              </v-col>
            </v-row>
          </template>
        </FxEventItem>
      </v-card>
    </div>

    <FxEventForm
      v-if="formVisible"
      ref="form"
      :school-id="schoolId"
      :event.sync="formData.event"
      :me.sync="formData.me"
      :opponent.sync="formData.opponent"
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
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import FxEventForm from '@/components/FxEventForm/FxEventForm'
import { EventLocation, EventLocationType, EventType, FixtureType, TransportType } from '@/enum'
import ListItem from '@/components/FxEventItem/ListItem'
import FxEventItem from '@/components/FxEventItem/FxEventItem'

const CONFIRM_TITLE = {
  [EventType.FIXTURE]: 'Confirm Fixture',
  [EventType.MULTI_EVENT]: 'Confirm Multi-Event',
  [EventType.TOURNAMENT]: 'Confirm Tournament',
  [EventType.TRAINING]: 'Confirm Training',
}

export default {
  name: 'AdminEventPage',
  components: {
    ListItem,
    FxEventForm,
    FxEventItem,
  },
  layout: 'admin',
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
      },
    },
    items: [],
    loading: false,
    formVisible: true,
    EventType,
  }),

  head () {
    return this.title
  },

  computed: {
    ...mapGetters({
      schoolId: 'admin/page/school/id',
    }),

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
      },
      opponent: {},
      event: {
        fixtureType: FixtureType.FRIENDLY,
        location: EventLocationType.SPORTS_LOCATIONS,
      },
    }
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
        this.items.push(this.formData)
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
      this.$router.back()
    },

    goBack () {
      const [item] = this.items.splice(this.items.length - 1, 1)
      this.formData = {
        ...item,
      }
      this.formVisible = true
    },

    confirm () {
      this.loading = true

      this.$store.dispatch('api/events/createBatch', {
        events: this.items,
        schoolId: this.schoolId,
      }).then(() => {
        this.setSession('eventForm', null)
        this.setSession('eventItems', [])
        this.$router.push({ name: 'management-schools-id-events' })
      }).catch(() => {
        this.$toast.error('Something went wrong')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
