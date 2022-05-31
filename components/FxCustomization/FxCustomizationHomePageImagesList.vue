<template>
  <v-row>
    <v-col
      v-for="item in items"
      :key="item.id"
      class="d-flex child-flex"
      cols="4"
    >
      <div>
        <v-btn
          style="z-index: 1"
          color="white"
          elevation="1"
          fab
          x-small
          class="ml-n3 mb-n3 d-block"
          @click="$emit('remove', item.id)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-img
          :src="item.image"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FxCustomizationHomePageImagesList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
