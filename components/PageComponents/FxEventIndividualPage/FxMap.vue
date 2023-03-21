<template>
  <FxEventItemCard>
    <template #title>
      Map
    </template>
      <v-container>
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="zoom"
          style="height: 250px"
          :options="mapOptions"
          class="event-map"
        >
          <GmapMarker
            clickable
            :position="coordinates"
          />
        </GmapMap>
      </v-container>
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

<style scoped>
.event-map {
  border-radius: 8px;
  overflow: hidden;
}
</style>
