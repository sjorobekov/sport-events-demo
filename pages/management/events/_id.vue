<template>
  <div>
    <v-row>
      <v-col>
        <v-card class="pa-2">
          <v-row>
            <v-col class="d-flex justify-center align-center">
              <div class="text-center">
                <FxSchoolLogo class="mx-auto" size="53" :value="left.school.logo" :color="left.school.color" />
                <h5 class="text-h5 font-weight-bold">
                  {{ left.school.name }}
                </h5>
                <v-text-field
                  v-model="leftScore"
                  class="mt-6 mx-auto centered-input"
                  style="width: 269px"
                  height="52"
                  outlined
                  placeholder="0"
                />
              </div>
            </v-col>
            <v-col class="d-flex justify-center align-center">
              <div class="text-h1s px-9 py-4" style="background-color: var(--v-info-lighten5)">
                {{ sport.name }}
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <FxSchoolLogo class="mx-auto" size="53" :value="rightLogo" :color="rightColor" />
                <h5 class="text-h5 font-weight-bold">
                  {{ rightName }}
                </h5>
                <v-text-field
                  v-model="rightScore"
                  class="mt-6 mx-auto centered-input"
                  style="width: 269px"
                  height="52"
                  outlined
                  placeholder="0"
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Details</v-card-title>
          <v-divider />
          <FxEventDetailsForm ref="eventDetails" v-model="event" class="px-4 py-3" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Location</v-card-title>
          <v-divider />
          <FxEventLocationForm
            v-model="event"
            class="px-4 py-3"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ left.school.name }}</v-card-title>
          <v-divider />

          <FxEventParticipantForm ref="leftParticipant" v-model="left" class="px-4 py-3" :teams="leftTeams" />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ rightName }}</v-card-title>
          <v-divider />
          <FxEventParticipantForm ref="rightParticipant" v-model="right" class="px-4 py-3" :teams="rightTeams" />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-right">
        <v-btn depressed color="error" @click="remove">
          Delete Event
        </v-btn>
        <v-btn depressed color="primary" @click="save">
          <v-icon>$vuetify.icon.save</v-icon> Save
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
import FxEventDetailsForm from '@/components/PageComponents/Management/Event/FxEventDetailsForm'
import FxEventLocationForm from '@/components/PageComponents/Management/Event/FxEventLocationForm'
import FxEventParticipantForm from '@/components/PageComponents/Management/Event/FxEventParticipantForm'

export default {
  name: 'SuperAdminEventPage',
  components: { FxEventParticipantForm, FxEventLocationForm, FxEventDetailsForm, FxSchoolLogo },
  layout: 'admin',

  async asyncData ({ store, route }) {
    const event = await store.dispatch('api/management/events/get', route.params.id)

    const seasons = await Promise.all(event.participants.map((participant) => {
      if (!participant.schoolId) { return null }
      return store.dispatch('seasons/getBySchoolDate', { schoolId: participant.schoolId, date: event.date })
    }))

    const promises = seasons.filter(item => item).map(({ schoolId, id: seasonId }) => {
      return store.dispatch('api/teams/list', { schoolId, params: { seasonId } })
    })
    const [leftTeams, rightTeams] = await Promise.all(promises)

    return {
      event,
      leftTeams: leftTeams.filter(team => team.sportId === event.sportId),
      rightTeams: rightTeams?.filter(team => team.sportId === event.sportId) || [],
    }
  },

  data: () => ({
    loading: false,
    event: {},
    leftTeams: [],
    rightTeams: [],
  }),

  computed: {
    left: {
      get () {
        return this.event.participants[0]
      },
      set (val) {
        this.event.participants = [
          { ...val },
          this.event.participants[1],
        ]
      },
    },
    right: {
      get () {
        return this.event.participants[1]
      },
      set (val) {
        this.event.participants = [
          this.event.participants[0],
          { ...val },
        ]
      },
    },
    leftScore: {
      get () {
        return this.left.results?.length ? this.left.results[0].score : null
      },

      set (val) {
        this.left.results = [
          { score: val, opponentScore: this.rightScore },
        ]
        this.right.results = [
          { opponentScore: val, score: this.rightScore },
        ]
      },
    },
    rightScore: {
      get () {
        return this.left.results?.length ? this.left.results[0].opponentScore : null
      },

      set (val) {
        this.left.results = [
          { opponentScore: val, score: this.leftScore },
        ]
        this.right.results = [
          { score: val, opponentScore: this.leftScore },
        ]
      },
    },
    sport () {
      return this.event.sport
    },
    rightName () {
      return this.right?.school?.name || ''
    },
    rightLogo () {
      return this.right?.school?.logo || ''
    },
    rightColor () {
      return this.right?.school?.color || 'primary'
    },
  },

  methods: {
    async save () {
      this.loading = true

      const isValid = await Promise.all([
        this.$refs.eventDetails.validateAsync(),
        this.$refs.leftParticipant.validateAsync(),
        this.$refs.rightParticipant.validateAsync(),
      ])

      if (isValid.some(i => !i)) {
        return
      }

      this.$store.dispatch('api/management/events/save', this.event)
        .then(() => {
          this.$toast('Changes have been saved successfully')
        })
        .finally(() => {
          this.loading = false
        })
    },

    remove () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.loading = true
      this.$store.dispatch('api/management/events/remove', this.$route.params.id)
        .then(() => {
          this.$toast('Event has been removed successfully')
          this.$router.replace({ name: 'management-events' })
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

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>
