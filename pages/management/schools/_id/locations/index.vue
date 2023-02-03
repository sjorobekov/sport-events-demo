<template>
  <div>
    <v-list-item class="px-0 mt-md-n4">
      <v-list-item-content>
        <h1 class="text-h4s text-md-h3">
          Sports Map
        </h1>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          v-if="canManageSportLocation"
          depressed
          dark
          color="primary"
          link
          :to="{ name: editLink, params: { locationId: 'add' } }"
        >
          <v-icon>$vuetify.icons.plusOutline</v-icon> Add Sports Location
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-row>
      <v-col sm="8">
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="zoom"
          style="height: 500px"
          :options="mapOptions"
        >
          <gmap-info-window
            v-if="selectedItem"
            :position="selectedItem.coordinates"
            :options="infoOptions"
            opened
          >
            <strong class="text-p3 font-weight-bold white--text">{{ selectedItem.name }}</strong>
          </gmap-info-window>
          <GmapMarker
            v-for="item in items"
            :key="item.id"
            clickable
            :position="item.coordinates"
            @click="toggleInfoWindow(item)"
          />
        </GmapMap>
      </v-col>
      <v-col sm="4" class="text-p1 info--text text--darken-1">
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
          <v-icon size="20">
            $vuetify.icons.link-1
          </v-icon> <a target="_blank" :href="school.website"> School Website</a>
        </div>

        <v-divider class="mt-4" />
        <h4 class="text-p1 info--text text--darken-1 mt-3 mb-2">
          Sports Locations
        </h4>
        <v-card v-for="item in items" :key="item.id" class="mb-3">
          <FxLocationItem :item="item" @click="handleClick">
            <template v-if="canManageSportLocation" #actions>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="info lighten-1">
                      $vuetify.icons.threeDots
                    </v-icon>
                  </v-btn>
                </template>
                <v-list class="grey lighten-3">
                  <v-list-item link :to="{ name: editLink, params: { locationId: item.id } }">
                    <v-list-item-content>
                      <v-list-item-title class="text--info text--darken-1">
                        Edit Location
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="remove(item)">
                    <v-list-item-content>
                      <v-list-item-title class="text--info text--darken-1">
                        Delete Location
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </FxLocationItem>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminSchoolEventsPage',

  data: () => ({
    items: [],
    center: {},
    infoWindowPos: null,
    infoWinOpen: false,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -30,
      },
    },
    selectedItem: null,
    currentMidx: null,
    mapCenter: { lng: 0, lat: 0 },
    zoom: 5,
  }),

  async fetch () {
    this.items = await this.$store.dispatch('api/locations/list', { schoolId: this.school.id })

    const item = this.items.find(item => item.coordinates.lat && item.coordinates.lng)
    if (item) {
      this.mapCenter = {
        ...item.coordinates,
      }
      this.zoom = 15
    }
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
      isSuperAdminSite: 'context/isSuperAdminSite',
      canManageSportLocation: 'user/acl/canManageSportLocation',
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

    editLink () {
      if (this.isSuperAdminSite) {
        return 'management-schools-id-locations-locationId'
      }
      return 'directory-sports-map-locationId'
    },
  },

  methods: {
    handleClick (item) {
      this.panTo(item.coordinates)
      this.zoom = 15
      this.selectedItem = item
    },

    panTo (location) {
      return this.$refs.mapRef.$mapPromise.then((map) => {
        return map.panTo(location)
      })
    },

    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/locations/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
        this.$toast('Location has been removed')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },

    toggleInfoWindow (item) {
      if (item === this.selectedItem) {
        this.selectedItem = null
      } else {
        this.selectedItem = item
      }
    },
  },
}
</script>

<style scoped>
/deep/ .gm-ui-hover-effect {
  display: none !important;
}

/deep/ .gm-style .gm-style-iw-d::-webkit-scrollbar-track,
/deep/ .gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece,
/deep/ .gm-style .gm-style-iw-c,
/deep/ .gm-style .gm-style-iw-t::after,
/deep/ .gm-style .gm-style-iw-tc::after {
  background: var(--v-primary-base);
}

</style>
