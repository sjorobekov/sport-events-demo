<template>
  <div>
    <v-row v-if="!showTabs">
      <v-col
        cols="12"
        lg="7"
        class="pr-lg-4 d-flex"
        :class="isPendingResult ? 'flex-column justify-start' : 'flex-column-reverse justify-end'"
      >
        <slot name="details" />
        <slot name="results" />
      </v-col>
      <v-col cols="12" lg="5">
        <slot name="teamSheet" />
        <slot name="map" />
      </v-col>
    </v-row>

    <template v-else>
      <v-tabs v-model="currentItem" class="mobile-tabs" :show-arrows="false" active-class="active-mobile-tab">
        <v-tab>Result</v-tab>
        <v-tab>Details</v-tab>
        <v-tab>Team Sheet</v-tab>
        <v-tab v-if="$slots.map">
          Map
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="currentItem" style="background: none">
        <v-tab-item class="px-2 pb-2">
          <slot name="results" />
        </v-tab-item>
        <v-tab-item class="px-2 pb-2">
          <slot name="details" />
        </v-tab-item>
        <v-tab-item class="px-2 pb-2">
          <slot name="teamSheet" />
        </v-tab-item>
        <v-tab-item v-if="$slots.map" class="px-2 pb-2">
          <slot name="map" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>

export default {
  name: 'FxEventTabulatedContent',
  props: {
    isPendingResult: {
      type: Boolean,
      default: false,
    },

    showTabs: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    currentItem: 0,
  }),
}
</script>

<style scoped>
.mobile-tabs /deep/ .v-slide-group__next,  .mobile-tabs /deep/ .v-slide-group__prev{
  display: none!important;
}

.mobile-tabs /deep/ .v-tabs-slider-wrapper {
  height: 4px!important;
}

.mobile-tabs {
  border-bottom: 16px solid var(--v-primary-base);
}

.mobile-tabs /deep/ .v-tab {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
</style>
