<template>
  <div>
    <v-row>
      <v-col lg="9">
        <div v-if="!isMobile">
          <v-card v-if="images.length">
            <v-carousel cycle hide-delimiters height="300px">
              <v-carousel-item v-for="(item, i) in images" :key="i" :src="item.image" />
              <div class="gradient-footer" />
              <v-row class="image-footer">
                <v-col class="pb-0">
                  <div class="text-h3">
                    Sports Portal
                  </div>
                </v-col>
              </v-row>
            </v-carousel>
          </v-card>
          <div v-else class="text-h3 neutral--text text--darken-4">
            Sports Portal
          </div>
          <div class="d-flex align-center mt-2 pt-sm-4">
            <div class="date-picker">
              <v-tabs v-model="tab" fixed-tabs class="week-tabs" show-arrows>
                <v-tabs-slider color="teal lighten-3" />
                <v-tab v-for="item in dates" :key="item.text" class="d-flex flex-column home-tab" style="width: 135px;" :ripple="false">
                  <div>
                    {{ item.day }}
                  </div>
                  <div>
                    {{ item.date }}
                  </div>
                </v-tab>
              </v-tabs>
            </div>
            <div>
              <v-menu ref="menu" offset-y :close-on-content-click="true">
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon size="32" color="neutral darken-1">
                      $vuetify.icons.calendar-1
                    </v-icon>
                  </v-btn>
                </template>
                <v-date-picker ref="picker" v-model="date" @change="onDateChange" />
              </v-menu>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-space-between align-center mr-4">
            <div class="custom-width disable-dbl-tap-zoom">
              <v-tabs v-model="tab" class="week-tabs" show-arrows>
                <v-tabs-slider color="teal lighten-3" />
                <v-tab v-for="item in dates" :key="item.text" class="d-flex flex-column home-tab" :ripple="false">
                  <div>
                    {{ item.day }}
                  </div>
                  <div>
                    {{ item.date }}
                  </div>
                </v-tab>
              </v-tabs>
            </div>
            <v-dialog v-model="showCalendar">
              <template #activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon size="32" color="neutral darken-1">
                    $vuetify.icons.calendar-1
                  </v-icon>
                </v-btn>
              </template>
              <v-date-picker ref="picker" v-model="date" class="disable-dbl-tap-zoom" full-width @change="onDateChange" />
            </v-dialog>
          </div>
        </div>

        <div class="pt-4">
          <template v-if="events.length > 0">
            <v-card v-for="item in fixtures" :key="item.id" class="mb-4 card-has-hover">
              <FxCalendarEvent :value="item" />
            </v-card>
          </template>
          <template v-else-if="!$fetchState.pending">
            <client-only>
              <div class="mt-12 d-flex flex-column justify-center align-center">
                <v-img width="100" :src="calendar" class="mb-2" />
                <div class="text-p2 font-weight-bold text-center neutral--text text--darken-3 mb-1">
                  No Events Today
                </div>
                <div class="text-p1 text-center neutral--text text--darken-3 mb-2" style="width:320px">
                  No events found on the selected day.<br> Please try changing the date or
                </div>
                <v-btn
                  link
                  outlined
                  :to="{ name: 'calendar' }"
                  class="text-p1 font-weight-bold neutral--text text--darken-3"
                  :ripple="false"
                >
                  Go to Calendar
                </v-btn>
              </div>
            </client-only>
          </template>
        </div>
      </v-col>

      <v-col lg="3" class="text-p1 info--text text--info-lighten1 hidden-md-and-down">
        <div class="d-flex justify-space-between">
          <h4 class="font-weight-regular home-heading mb-2">
            School Location
          </h4>
          <nuxt-link class="text-decoration-none home-link" :to="{ name: 'directory-sports-map' }">
            View All
          </nuxt-link>
        </div>
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="zoom"
          style="height: 160px"
          class="mb-2 home-map"
          :options="mapOptions"
        >
          <GmapMarker clickable :position="school.coordinates" />
        </GmapMap>
        <div class="font-weight-bold school-name-address">
          {{ school.name }}
        </div>
        <address class="mb-2 school-address">
          {{ school.street }} <br>
          {{ school.zip }} <br>
          <span v-if="school.city">{{ school.city }}, </span><fx-country-name :code="school.country" />
        </address>
        <div v-if="school.website">
          <v-icon size="18" class="home-icon">
            $vuetify.icons.link-1
          </v-icon> <a target="_blank" :href="school.website" class="link"> School Website</a>
        </div>

        <v-divider class="my-5" />

        <div class="d-flex justify-space-between">
          <h3 class="text-p1 mb-3 home-heading">
            Sports Contacts
          </h3>
          <nuxt-link class="text-decoration-none home-link" :to="{ name: 'directory-sports-contacts' }">
            View All
          </nuxt-link>
        </div>
        <FxContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" class="mb-5" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult, EventStatus } from '~/enum'
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent'
import calendar from '@/components/PageComponents/FxDashboardPage/calendar.svg'
import FxContactCard from '@/components/PageComponents/FxHomePage/FxContactCard'

export default {
  name: 'PortalPage',
  components: {
    FxCalendarEvent,
    FxContactCard,
  },

  middleware: ({ store, redirect }) => {
    if (store.getters['context/isLoggedIn']) {
      return redirect({ name: 'dashboard' })
    }
  },

  async asyncData ({ store }) {
    const schoolId = store.getters['context/schoolId']
    const [images, contacts] = await Promise.all([
      store.dispatch('api/schools/getImages', schoolId),
      store.dispatch('api/sportsContacts/list', { schoolId }),
    ])

    return {
      images,
      contacts: contacts.slice(0, 3),
    }
  },

  data: () => ({
    EventType,
    EventResult,
    images: [],
    sports: [],
    date: '',
    tab: 0,
    dates: [],
    contacts: [],
    today: DateTime.now().toFormat('yyyy-MM-dd'),
    events: [],
    zoom: 15,
    calendar,
    showCalendar: false,
  }),

  async fetch () {
    await this.getEvents(this.today)
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
      contextSchoolId: 'context/schoolId',
      isMobileDevice: 'context/isMobile',
    }),

    mapOptions () {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
      }
    },

    mapCenter () {
      return this.school.coordinates || { lng: 0, lat: 0 }
    },

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
        return this.$vuetify.breakpoint.xsOnly
      }

      return this.isMobileDevice
    },

    fixtures () {
      return this.events.filter(event => event.overallResult !== EventResult.LIVE)
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
      this.showCalendar = !this.showCalendar
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
      const params = {
        limit: 2000,
        orderDesc: 'false',
        from: currentDate,
        to: currentDate,
        status: EventStatus.CONFIRMED,
      }

      const [{ data: events }, { data: inHouseMatches }] = await Promise.all([
        this.$store.dispatch('api/events/getBySchool', {
          schoolId: this.contextSchoolId,
          params,
        }),
        this.$store.dispatch('api/inHouseMatches/getBySchool', {
          schoolId: this.contextSchoolId,
          params,
        }),
      ])

      this.events = [...events, ...inHouseMatches].sort((a, b) => {
        return `${a.date}T${a.startTime}` > `${b.date}T${b.startTime}` ? 1 : -1
      })
    },
  },
}
</script>

<style scoped>
.custom-width {
  width: calc(100% - 15px);
}
.image-footer {
  position: absolute;
  bottom: 0;
  color: white;
  padding: 1em;
}

.date-picker {
  width: calc(100% - 35px)
}

.gradient-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, rgba(137, 255, 241, 0) 0%, rgba(0, 0, 0, 1) 100%);
}
</style>
<style>
.week-tabs.v-tabs>.v-tabs-bar {
  background: none;
}
.theme--light.v-tabs .v-tab:hover:before {
    opacity: 0;
}
.v-tab:before, .v-tabs-slider {
    background-color: currentColor;
    max-width: 64px;
    margin-left: auto;
    margin-right: auto;
}

.v-slide-group__next, .v-slide-group__prev {
  min-width: 24px;
}

.home-icon {
  color: var(--v-primary-lighten1)!important;
}

.school-name-address {
  color: var(--v-neutral-darken4);
  margin-bottom: 2px;
}

.home-map {
  border-radius: 6px;
  overflow: hidden;
  border: var(--v-neutral-lighten1) thin solid;
}

.school-address {
  font-style: normal;
  line-height: 1.3;
  color: var(--v-neutral-darken2);
}

.home-heading {
  color: var(--v-neutral-darken2);
}

.home-link {
  color: var(--v-neutral-darken2)!important;
}

.home-link:hover {
  color: var(--v-primary-base)!important;
}
.theme--light.v-divider {
  border-color: var(--v-neutral-lighten1);
  box-shadow: 0 1px 0 #ffffff;
}
.home-tab:hover {
  color: var(--v-primary-base)!important;
}
</style>
