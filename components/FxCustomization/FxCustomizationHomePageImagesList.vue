<template>
  <div
    class="d-flex align-start gap"
  >
    <div
      v-for="item in items"
      :key="item.id"
    >
      <v-icon
        x-small
        class="remove-button ml-n3 mb-n3 d-block elevation-0"
        color="neutral darken-3"
        @click="$emit('remove', item.id)"
      >
        mdi-close
      </v-icon>

      <v-avatar rounded size="80">
        <v-img
          :src="item.image"
          aspect-ratio="1"
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
      </v-avatar>
    </div>
  </div>
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

<style scoped>
.gap {
  gap: 12px;
}
.remove-button {
  z-index: 1;
  background-color: white;
  border-radius: 50%;
  border: 1px solid var(--v-neutral-base);
  width: 20px;
  height: 20px;
  padding-left: 1px;
  padding-top: 1px;
}
</style>
