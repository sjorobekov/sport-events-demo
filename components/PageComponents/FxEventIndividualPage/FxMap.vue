<template>
  <FxEventItemCard>
    <template #title>
      Map
    </template>
    <v-card>
      <v-container>
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="zoom"
          style="height: 250px"
          :options="mapOptions"
        >
          <GmapMarker
            clickable
            :position="coordinates"
          />
        </GmapMap>
      </v-container>
    </v-card>
  </FxEventItemCard>
</template>

<script>
import FxEventItemCard from '@/components/FxEventItemCard'
export default {
  name: 'FxMap',
  components: { FxEventItemCard },
  props: {
    coordinates: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({
    zoom: 15,
  }),

  computed: {
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
      return this.coordinates || { lng: 0, lat: 0 }
    },
  },
}
</script>
