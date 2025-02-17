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
      <v-card flat color="white" class="pl-6 card-border">
        <v-tabs v-model="currentItem" class="mobile-tabs" :show-arrows="false" active-class="active-mobile-tab">
          <v-tab v-if="$slots.results" class="font-weight-bold" :ripple="false">
            Result
          </v-tab>
          <v-tab class="font-weight-bold" :ripple="false">
            Details
          </v-tab>
          <v-tab class="font-weight-bold" :ripple="false">
            Team Sheet
          </v-tab>
          <v-tab v-if="$slots.map" class="font-weight-bold" :ripple="false">
            Map
          </v-tab>
        </v-tabs>
      </v-card>

      <v-tabs-items v-model="currentItem" style="background: none">
        <v-tab-item v-if="$slots.results" class="px-2 pb-2">
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

.card-border {
  border-bottom: 16px solid var(--v-primary-base)!important;
  border-radius: 0!important;
}

.mobile-tabs /deep/ .v-tab {
  font-size: 1rem;
  line-height: 1.0625rem;
  letter-spacing: normal!important;
  padding: 0 12px;
  min-width: initial;
  margin-right: 8px;
}

.mobile-tabs /deep/ .v-tabs-slider {
  border-radius: 12px 12px 0 0;
}

.mobile-tabs /deep/ .v-tab--active:hover::before {
  opacity: 0;
}

.theme--light.v-tabs .v-tab:hover:before {
    opacity: 0;
}
.v-tab:before, .v-tabs-slider {
    background-color: currentColor;
}
</style>
