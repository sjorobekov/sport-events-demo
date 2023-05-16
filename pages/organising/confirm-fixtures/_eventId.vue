<template>
  <div class="mt-4 mt-md-n1">
    <h1 class="text-h4s text-md-h3 mb-6 mt-16 neutral--text text--darken-4">
      Confirm Fixture Details
    </h1>

    <template v-if="step === 1">
      <v-card class="mb-3">
        <FxFixtureToConfirmItem :event="event" :opponent="opponent" :me="me" class="pb-7" />
      </v-card>

      <FxFixtureToConfirmForm
        ref="form"
        v-model="formData"
        :teams="teams"
        :event="event"
        :me="me"
        :opponent="opponent"
        :sport-locations="sportLocations"
      />

      <div class="d-flex">
        <v-btn depressed color="error darken-1" height="41" @click="reject">
          Reject Fixture
        </v-btn>
        <v-spacer />
        <v-btn outlined color="neutral darken-3" class="mr-3" height="41" @click="$router.back()">
          Cancel
        </v-btn>
        <v-btn depressed color="primary" width="89" height="41" @click="validate">
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </div>
    </template>
    <template v-else>
      <FxFixtureDetailsConfirmItem :sport="event.sport" :event="event" :opponent="opponent" :form-data="formData" :me="me">
        <template #actions>
          <FxFixtureConflictBadge :conflict="!!conflicts.length" />
        </template>

        <FxFixtureConflictAlert v-for="(conflict, idx) in conflicts" :key="`conflict-${conflict.eventId}`" :conflict="conflict">
          <FxFixtureConflictDialog :event-id="conflict.eventId" :conflict="conflict" @resolved="onConflictResolveHandler(idx)">
            <template #activator="{ on, attrs }">
              <v-btn depressed v-bind="attrs" color="white" v-on="on">
                <span class="error--text">View Details</span>
              </v-btn>
            </template>
          </FxFixtureConflictDialog>
        </FxFixtureConflictAlert>
      </FxFixtureDetailsConfirmItem>

      <div class="d-flex mt-8">
        <v-spacer />
        <v-btn outlined color="neutral darken-3" class="mr-3" height="41" @click="step = 1">
          Cancel
        </v-btn>
        <v-btn depressed color="primary" width="89" height="41" @click="accept">
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxFixtureToConfirmForm from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureToConfirmForm.vue'
import { EventStatus } from '~/enum'
import FxFixtureToConfirmItem
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureToConfirmItem.vue'
import FxFixtureDetailsConfirmItem
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureDetailsConfirmItem.vue'
import FxFixtureConflictDialog
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureConflictDialog/FxFixtureConflictDialog.vue'
import FxFixtureConflictAlert
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureConflictAlert.vue'

export default {
  name: 'ConfirmFixturePage',
  components: { FxFixtureConflictAlert, FxFixtureConflictDialog, FxFixtureDetailsConfirmItem, FxFixtureToConfirmItem, FxFixtureToConfirmForm },

  async asyncData ({ store, route }) {
    const schoolId = store.getters['context/schoolId']

    const [{ me, opponent, ...event }, sportLocations] = await Promise.all([
      store.dispatch('api/events/get', {
        schoolId,
        id: route.params.eventId,
      }),

      store.dispatch('api/locations/list', {
        schoolId,
      }),
    ])

    const season = store.getters['seasons/byDate'](event.date)

    const teams = await store.dispatch('api/teams/list', {
      schoolId,
      params: { seasonId: season.id },
    })

    return {
      event,
      me,
      opponent,
      teams: teams.filter(t => t.sportId === event.sportId),
      sportLocations,
    }
  },

  data: () => ({
    loading: false,
    event: {},
    me: {},
    opponent: {},
    teams: [],
    step: 1,
    conflicts: [],
    sportLocations: [],
    /** @type {Partial<EventConfirmationPayload>} */
    formData: {
      leadId: null,
      teamId: null,
      meetTime: null,
      returnTime: null,
      sportLocationId: null,
    },

    lead: {},
  }),

  head () {
    return {
      title: `Confirm Fixture with ${this.opponent.school.name}`,
    }
  },

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canConfirmFixtures'],
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },

  methods: {
    async checkConflict () {
      try {
        const { status, events } = await this.$store.dispatch('api/events/checkConflict', {
          eventId: this.event.id,
          schoolId: this.contextSchoolId,
          date: this.event.date,
          startTime: this.event.startTime,
          sportLocationId: this.formData.sportLocationId,
          teamId: this.formData.teamId,
          leadId: this.formData.leadId,
          meetTime: this.formData.meetTime,
          returnTime: this.formData.returnTime,
          endTime: this.event.endTime,
        })

        this.conflicts = status === 'CONFLICT' ? events : []
      } catch {
        this.conflicts = []
      }
    },

    onConflictResolveHandler (idx) {
      this.conflicts.splice(idx, 1)
    },

    async validate () {
      this.loading = true

      const isValid = await this.$refs.form.validateAsync()

      await this.checkConflict()
      this.loading = false

      if (!isValid) {
        return
      }

      this.step = 2
    },

    accept () {
      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        status: EventStatus.CONFIRMED,
        eventId: this.event.id,
        schoolId: this.contextSchoolId,
        ...this.formData,
      })
        .then(() => {
          this.$toast.success('The Event has been accepted!')
          this.$router.back()
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    reject () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/events/confirm', {
        status: EventStatus.REJECTED,
        schoolId: this.contextSchoolId,
        eventId: this.event.id,
      })
        .then(() => {
          this.$toast.info('The Event has been rejected!')
          this.$router.back()
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
