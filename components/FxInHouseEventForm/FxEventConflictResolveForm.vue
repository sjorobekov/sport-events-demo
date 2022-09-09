<template>
  <v-container>
    <v-form v-async-form :disabled="loading" @submit.prevent="save">
      <v-row v-if="$fetchState.pending">
        <v-col>
          <v-skeleton-loader
            type="list-item-avatar-two-line, actions"
          />
        </v-col>
      </v-row>

      <template v-else>
        <v-row v-if="event.opponent">
          <v-col>
            <FxTeamListItem class="pl-0" :participant="event.opponent" :context-school-id="contextSchoolId" />
          </v-col>
        </v-row>
        <v-list-item class="px-0">
          <div class="d-flex">
            <v-list-item-icon class="mr-3">
              <v-icon>$vuetify.icons.calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <FxDateFormat :date="event.date" />
              </v-list-item-title>
              <v-list-item-subtitle>
                Date
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon class="ml-6 mr-3">
              <v-icon>mdi-clock-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div>
                <div v-if="event.me.meetTime" class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ event.me.meetTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Meet Time
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ event.startTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Start Time
                  </v-list-item-subtitle>
                </div>
                <div v-if="event.me.returnTime" class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ event.me.returnTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Return Time
                  </v-list-item-subtitle>
                </div>
              </div>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-avatar size="22">
                <v-img :src="sport.icon" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ sport.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Sport
              </v-list-item-subtitle>
            </v-list-item-content>
            <template v-if="event.age">
              <v-list-item-icon class="mr-3">
                <v-icon color="error darken-1">
                  $vuetify.icons.paper
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ event.age }}{{ event.ability }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Age & Ability
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </div>
        </v-list-item>

        <v-row class="mt-7">
          <v-col cols="12" sm="12" md="4" class="py-0">
            <label>Staff</label>
            <FxUserSelect
              v-model="formData.leadId"
              :school-id="contextSchoolId"
              placeholder="Select Lead Staff Member"
            />
          </v-col>
          <v-col cols="12" sm="12" md="4" class="py-0">
            <label>Location</label>
            <FxSportLocationSelect v-model="formData.sportLocationId" />
          </v-col>
          <v-col cols="12" sm="12" md="4" class="py-0">
            <label>Status</label>
            <FxEventResultSelect v-model="formData.status" :items="statusOptions" />
          </v-col>
        </v-row>
        <v-list-item class="px-0">
          <v-list-item-content />
          <v-list-item-action>
            <v-btn outlined type="submit">
              Update Event
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-form>
  </v-container>
</template>

<script>
import FxUserSelect from '@/components/FxUserSelect'
import FxEventResultSelect from '@/components/FxEventResultSelect'
import { EventResult } from '@/enum'

export default {
  name: 'FxEventConflictResolveForm',

  components: {
    FxUserSelect,
    FxEventResultSelect,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    event: null,
    sport: {},
    formData: {},
    loading: false,
  }),

  async fetch () {
    this.event = await this.$store.dispatch('api/events/get', {
      schoolId: this.contextSchoolId,
      id: this.eventId,
    })

    this.sport = await this.$store.dispatch('api/sports/fetch', this.event.sportId)

    this.formData = {
      leadId: this.event.me.leadId,
      sportLocationId: this.event.sportLocationId,
    }
  },

  computed: {
    statusOptions () {
      return [EventResult.CANCELLED, EventResult.POSTPONED].map((value) => {
        return {
          value,
          text: this.$t(`EVENT_RESULT.${value}`),
        }
      })
    },
  },

  methods: {
    save () {
      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        schoolId: this.contextSchoolId,
        eventId: this.eventId,
        ...this.formData,
      }).then(() => {
        this.$emit('updated')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="sass">
  [role="combobox"]
    background: white!important
</style>
