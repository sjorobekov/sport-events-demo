<template>
  <div>
    <v-row>
      <v-col md="9">
        <v-card v-if="images.length">
          <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(item,i) in images"
              :key="i"
              :src="item.image"
            />
            <v-row class="image-footer flex-nowrap">
              <v-col md="2" sm="3">
                <div class="text-h3">
                  Sports Portal
                </div>
              </v-col>
              <v-col md="9" sm="8">
                <v-tabs>
                  <v-tab v-for="item in dates" :key="item.text" class="d-flex flex-column">
                    <div>
                      {{ item.day }}
                    </div>
                    <div>
                      {{ item.date }}
                    </div>
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-col>
                <v-icon>mdi-calendar-month-outline</v-icon>
              </v-col>
            </v-row>
          </v-carousel>
        </v-card>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title class="text-h3">
              Sports Portal
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-calendar-month-outline</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-col>

      <v-col md="3" class="text-p1 info--text text--darken-1">
        <h4 class="font-weight-regular mb-2">
          School Location
        </h4>
        <div class="text--darken-2 font-weight-bold">
          {{ school.name }}
        </div>
        <address class="mb-2">
          {{ school.street }} <br>
          {{ school.zip }} <br>
          <span v-if="school.city">{{ school.city }}, </span><fx-country-name :code="school.country" />
        </address>
        <div v-if="school.website">
          <v-icon>mdi-link-variant</v-icon> <a target="_blank" :href="school.website"> School Website</a>
        </div>

        <v-divider class="my-4" />

        <h3 class="text-p1 info--text text--darken-1 mb-4">
          Sports Contacts
        </h3>
        <FxUserItem :item="{ avatar: null }" />

        <div class="text-p1">
          <v-icon>mdi-email-outline</v-icon> <a class="info--text text--darken-2" :href="`mailto:`" />
        </div>
        <div class="text-p1">
          <v-icon>mdi-phone-in-talk</v-icon> <a class="info--text text--darken-2" :href="`tel:`" />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="9">
        <div>
          <h2 class="text-p2 font-weight-bold mb-2 info--text text--darken-3">
            Live Scores
          </h2>

          <FxSportExpansionPanel v-for="sport in liveSports" :key="sport.id" class="mb-4" :item="sport" :subtitle="subtitle(liveEventsBySport[sport.id].length)">
            <v-list class="py-0">
              <v-list-item v-for="event in liveEventsBySport[sport.id]" :key="event.id" style="border-bottom: 1px solid #F1F5F9">
                <v-list-item-content>
                  <v-list-item-title class="info--text text--darken-2 text-h5s">
                    {{ event.date }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="info--text">
                    {{ event.firstname }} {{ event.lastname }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </FxSportExpansionPanel>
        </div>

        <div>
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Fixtures & Results
          </h2>
          <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport" :subtitle="subtitle(fixturesBySport[sport.id].length)">
            <v-list class="py-0">
              <v-list-item v-for="event in fixturesBySport[sport.id]" :key="event.id" style="border-bottom: 1px solid #F1F5F9">
                <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
                  <v-row>
                    <v-col cols="12" md="6" class="border-bottom">
                      <FxTeamListItem class="pl-0" :participant="event.me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
                    </v-col>
                    <v-col cols="12" md="6" class="border-bottom">
                      <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="event.opponent" :context-school-id="contextSchoolId" />
                      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
                    </v-col>
                  </v-row>
                </nuxt-link>
              </v-list-item>
            </v-list>
          </FxSportExpansionPanel>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult } from '~/enum'

export default {
  name: 'PortalPage',
  components: {
  },

  middleware: ({ store, redirect }) => {
    if (store.getters['context/isLoggedIn']) {
      return redirect({ name: 'dashboard' })
    }
  },

  data: () => ({
    EventType,
    images: [],
    sports: [],
    liveSports: [],
    fixturesBySport: {},
    liveEventsBySport: {},
    date: {},
  }),

  async fetch () {
    await this.$store.dispatch('context/fetchSchool', this.contextSchoolId)
    this.images = await this.$store.dispatch('api/schools/getImages', this.school.id)
    const { data: events } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        limit: 2000,
        orderDesc: 'false',
        from: DateTime.now().toFormat('yyyy-MM-dd'),
        to: DateTime.now().plus({ month: 1 }).toFormat('yyyy-MM-dd'),
      },
    })

    const sports = []
    const liveSports = []
    events.forEach((event) => {
      if (event.participants.some(item => item.status === EventResult.LIVE)) {
        if (!this.liveEventsBySport[event.sportId]) {
          this.$set(this.liveEventsBySport, event.sportId, [])
        }
        this.liveEventsBySport[event.sportId].push(event)
        liveSports.push(event.sport)
      } else {
        if (!this.fixturesBySport[event.sportId]) {
          this.$set(this.fixturesBySport, event.sportId, [])
        }
        this.fixturesBySport[event.sportId].push(event)
        sports.push(event.sport)
      }
    })
    this.sports = [...new Map(sports.map(v => [v.id, v])).values()]
    this.liveSports = [...new Map(liveSports.map(v => [v.id, v])).values()]
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
      contextSchoolId: 'context/schoolId',
    }),
    subtitle: () => (number) => {
      if (number === 1) {
        return '1 Event'
      }
      if (number > 1) {
        return `${number} Events`
      }

      return 'No Events'
    },
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
    dates () {
      const start = DateTime.now().startOf('week')
      const res = []
      for (let i = 0; i < 7; i++) {
        const item = start.plus({ day: i })
        res.push({
          value: item,
          day: (item.hasSame(DateTime.now(), 'day')) ? 'Today' : item.toFormat('cccc'),
          date: item.toFormat('d MMMM'),
        })
      }
      return res
    },
  },
}
</script>

<style scoped>
.image-footer {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1em;
  color: white;
}
</style>
