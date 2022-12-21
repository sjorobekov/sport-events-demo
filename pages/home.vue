<template>
  <div>
    <v-row class="pt-8">
      <v-col lg="9">
        <div v-if="!isMobile">
          <v-card v-if="images.length">
            <v-carousel hide-delimiters height="320px">
              <v-carousel-item
                v-for="(item,i) in images"
                :key="i"
                :src="item.image"
              />
              <div class="gradient-footer" />
              <v-row class="image-footer">
                <v-col>
                  <div class="text-h3">
                    Sports Portal
                  </div>
                </v-col>
              </v-row>
            </v-carousel>
          </v-card>
          <v-row v-else>
            <v-col cols="3" xl="2">
              <div class="text-h3">
                Sports Portal
              </div>
            </v-col>
          </v-row>

          <div class="d-flex align-center pt-sm-4">
            <div class="date-picker">
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
            <div>
              <v-menu ref="menu" offset-y :close-on-content-click="false">
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>
                      mdi-calendar-month-outline
                    </v-icon>
                  </v-btn>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  @change="onDateChange"
                />
              </v-menu>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-space-between">
            <div class="text-h3">
              Sports Portal
            </div>
            <v-menu ref="menu" offset-y :close-on-content-click="false">
              <template #activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>
                    mdi-calendar-month-outline
                  </v-icon>
                </v-btn>
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

        <div class="pt-6">
          <h2 class="text-p2 font-weight-bold mb-2 info--text text--darken-3">
            Fixtures & Results
          </h2>
          <v-card v-for="item in fixtures" :key="item.id">
            <FxCalendarEvent :value="item" />
          </v-card>
        </div>
      </v-col>

      <v-col lg="3" class="text-p1 info--text text--darken-1 hidden-md-and-down">
        <div class="d-flex justify-space-between">
          <h4 class="font-weight-regular mb-2">
            School Location
          </h4>
          <nuxt-link class="text-decoration-none" :to="{ name: 'directory-sports-map' }">
            View All
          </nuxt-link>
        </div>
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="zoom"
          style="height: 180px"
          class="mb-4"
          :options="mapOptions"
        >
          <GmapMarker
            clickable
            :position="school.coordinates"
          />
        </GmapMap>
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

        <div class="d-flex justify-space-between">
          <h3 class="text-p1 info--text text--darken-1 mb-4">
            Sports Contacts
          </h3>
          <nuxt-link class="text-decoration-none" :to="{ name: 'directory-sports-contacts' }">
            View All
          </nuxt-link>
        </div>
        <div v-for="contact in contacts" :key="contact.id" class="mb-4">
          <div class="d-flex text-p1">
            <FxAvatar :value="contact.avatar" />

            <div class="pa-2">
              <div class="text--darken-1 font-weight-bold">
                {{ contact.name }}
              </div>
              <div>{{ contact.role }}</div>
            </div>
          </div>
          <div class="my-1">
            <div v-if="contact.email" class="text-p1 mb-2">
              <v-icon small class="mr-2">
                mdi-email-outline
              </v-icon>
              <a class="info--text text--darken-2" :href="`mailto:${contact.email}`">
                {{ contact.email }}
              </a>
            </div>
            <div v-if="contact.phone" class="text-p1">
              <v-icon small class="mr-2">
                mdi-phone-in-talk
              </v-icon>
              <a class="info--text text--darken-2" :href="`tel:${contact.phone}`">
                {{ contact.phone }}
              </a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult, EventStatus } from '~/enum'
import FxAvatar from '@/components/FxAvatar/FxAvatar'
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent'

export default {
  name: 'PortalPage',
  components: {
    FxAvatar,
    FxCalendarEvent,
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
    date: '',
    tab: 0,
    dates: [],
    contacts: [],
    today: DateTime.now().toFormat('yyyy-MM-dd'),
    events: [],
    zoom: 15,
  }),

  async fetch () {
    const [images, contacts] = await Promise.all([
      this.$store.dispatch('api/schools/getImages', this.school.id),
      this.$store.dispatch('api/sportsContacts/list', {
        schoolId: this.contextSchoolId,
      }),
      this.getEvents(this.today),
    ])
    this.images = images
    this.contacts = contacts.slice(0, 3)
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

      this.events = events
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
.date-picker {
  width: calc(100% - 35px)
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
