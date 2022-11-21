<template>
  <div>
    <v-row v-if="!isMobile">
      <v-col md="9">
        <v-card v-if="images.length">
          <v-carousel hide-delimiters height="320px">
            <v-carousel-item
              v-for="(item,i) in images"
              :key="i"
              :src="item.image"
            />
            <div class="gradient-footer" />
            <v-row class="portal-menu image-footer flex-nowrap">
              <v-col cols="3" xl="2">
                <div class="text-h3">
                  Sports Portal
                </div>
              </v-col>
              <v-spacer />
              <v-col cols="8">
                <v-tabs v-model="tab" class="week-tabs">
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
              <v-col class="d-flex justify-center" xl="1">
                <v-menu ref="menu" offset-y :close-on-content-click="false">
                  <template #activator="{ on }">
                    <a class="d-flex" v-on="on">
                      <v-icon>
                        mdi-calendar-month-outline
                      </v-icon>
                      <v-icon small>mdi-chevron-down</v-icon>
                    </a>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    @change="onDateChange"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-carousel>
        </v-card>

        <v-row v-else class="portal-menu flex-nowrap">
          <v-col cols="3" xl="2">
            <div class="text-h3">
              Sports Portal
            </div>
          </v-col>
          <v-spacer />
          <v-col cols="8">
            <v-tabs v-model="tab" class="week-tabs">
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
          <v-col class="d-flex justify-center" xl="1">
            <v-menu ref="menu" offset-y :close-on-content-click="false">
              <template #activator="{ on }">
                <a class="d-flex" v-on="on">
                  <v-icon>
                    mdi-calendar-month-outline
                  </v-icon>
                  <v-icon small>mdi-chevron-down</v-icon>
                </a>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                @change="onDateChange"
              />
            </v-menu>
          </v-col>
        </v-row>
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
    <div v-else>
      <div class="d-flex justify-space-between">
        <div class="text-h3">
          Sports Portal
        </div>
        <v-menu ref="menu" offset-y :close-on-content-click="false">
          <template #activator="{ on }">
            <a class="d-flex" v-on="on">
              <v-icon>
                mdi-calendar-month-outline
              </v-icon>
              <v-icon small>mdi-chevron-down</v-icon>
            </a>
          </template>
          <v-date-picker
            ref="picker"
            v-model="date"
            @change="onDateChange"
          />
        </v-menu>
      </div>
      <v-tabs v-model="tab" class="week-tabs" show-arrows>
        <v-tabs-slider color="teal lighten-3" />
        <v-tab v-for="item in dates" :key="item.text" class="d-flex flex-column">
          <div>
            {{ item.day }}
          </div>
          <div>
            {{ item.date }}
          </div>
        </v-tab>
      </v-tabs>
    </div>
    <v-row>
      <v-col md="9">
        <div>
          <h2 class="text-p2 font-weight-bold mb-2 info--text text--darken-3">
            Live Scores
          </h2>

          <FxSportExpansionPanel v-for="sport in liveSports" :key="sport.id" class="mb-4" :item="sport" :subtitle="subtitle(liveEventsBySport[sport.id].length)">
            <FxPortalEventItem v-for="event in liveEventsBySport[sport.id]" :key="event.id" :event="event" :me="event.me" />
          </FxSportExpansionPanel>
        </div>

        <div>
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Fixtures & Results
          </h2>
          <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport" :subtitle="subtitle(fixturesBySport[sport.id].length)">
            <FxPortalEventItem v-for="event in fixturesBySport[sport.id]" :key="event.id" :event="event" :me="event.me" />
          </FxSportExpansionPanel>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult, EventStatus } from '~/enum'
import FxPortalEventItem from '@/components/PageComponents/FxPortalPage/FxPortalEventItem.vue'

export default {
  name: 'PortalPage',
  components: {
    FxPortalEventItem,
  },

  middleware: ({ store, redirect }) => {
    if (store.getters['context/isLoggedIn']) {
      return redirect({ name: 'dashboard' })
    }
  },

  data: () => ({
    EventType,
    EventResult,
    images: [],
    sports: [],
    liveSports: [],
    fixturesBySport: {},
    liveEventsBySport: {},
    date: '',
    tab: 0,
    dates: [],
    today: DateTime.now().toFormat('yyyy-MM-dd'),
  }),

  async fetch () {
    this.images = await this.$store.dispatch('api/schools/getImages', this.school.id)
    await this.getEvents(this.today)
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
      contextSchoolId: 'context/schoolId',
      isMobileDevice: 'context/isMobile',
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

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },
  },

  watch: {
    async tab (index) {
      const date = this.dates[index].value
      if (date === this.date) {
        return
      }
      this.date = date
      await this.getEvents(this.date)
    },
  },

  created () {
    this.date = this.today
    this.dates = this.calculateWeekDays(this.today)
    this.tab = this.dates.findIndex(item => item.value === this.today)
  },

  methods: {
    async onDateChange () {
      this.dates = this.calculateWeekDays(this.date)
      this.tab = this.dates.findIndex(item => item.value === this.date)
      await this.getEvents(this.date)
    },
    calculateWeekDays (currentDate) {
      const start = DateTime.fromISO(currentDate).startOf('week')
      const res = []
      for (let i = 0; i < 7; i++) {
        const item = start.plus({ day: i })
        const isToday = item.toFormat('yyyy-MM-dd') === this.today
        res.push({
          value: item.toFormat('yyyy-MM-dd'),
          day: isToday ? 'Today' : item.toFormat('cccc'),
          date: item.toFormat('d MMMM'),
        })
      }
      return res
    },
    async getEvents (currentDate) {
      this.clearEvents()
      const { data: events } = await this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: {
          limit: 2000,
          orderDesc: 'false',
          from: currentDate,
          to: currentDate,
          status: EventStatus.CONFIRMED,
        },
      })
      this.updateEvents(events)
    },
    clearEvents () {
      this.fixturesBySport = {}
      this.liveEventsBySport = {}
      this.sports = []
      this.liveSports = []
    },
    updateEvents (events) {
      const sports = []
      const liveSports = []
      events.forEach((event) => {
        if (event.participants.some(item => item.overallResult === EventResult.LIVE)) {
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
  },
}
</script>

<style scoped>
.image-footer {
  position: absolute;
  bottom: 0;
  color: white;
  padding: 1em;
}
.portal-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.gradient-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom,  rgba(137,255,241,0) 0%,rgba(0,0,0,1) 100%);
}
</style>
<style>
.week-tabs.v-tabs > .v-tabs-bar {
  background: none;
}
</style>
