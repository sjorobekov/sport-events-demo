<template>
  <div>
    <section v-if="!showTabs">
      <v-row>
        <v-col
          cols="12"
          class="pr-lg-4 d-flex flex-column-reverse justify-end"
        >
          <slot name="details" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6">
          <slot name="contacts" />
        </v-col>
        <v-col cols="12" lg="6">
          <slot name="map" />
        </v-col>
      </v-row>
    </section>

    <template v-else>
      <v-card flat color="white" class="pl-6 card-border">
        <v-tabs v-model="currentItem" class="mobile-tabs" :show-arrows="false" active-class="active-mobile-tab">
          <v-tab class="font-weight-bold">
            Details
          </v-tab>
          <v-tab class="font-weight-bold">
            Contacts
          </v-tab>
          <v-tab v-if="$slots.map" class="font-weight-bold">
            Map
          </v-tab>
          <v-tab v-if="$slots.portal" class="font-weight-bold">
            Sports Portal
          </v-tab>
        </v-tabs>
      </v-card>

      <v-tabs-items v-model="currentItem" style="background: none">
        <v-tab-item class="px-2 pb-2 mt-2">
          <slot name="details" />
        </v-tab-item>
        <v-tab-item class="px-2 pb-2 mt-2">
          <slot name="contacts" />
        </v-tab-item>
        <v-tab-item v-if="$slots.map" class="px-2 pb-2 mt-2">
          <slot name="map" />
        </v-tab-item>
        <v-tab-item v-if="$slots.portal" class="px-2 pb-2 mt-2">
          <slot name="portal" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>

export default {
  name: 'FxOpponentTabulatedContent',
  props: {
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
  border-radius: 0;
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
  border-radius: 2px 2px 0 0;
}

.mobile-tabs /deep/ .v-tab--active:hover::before {
  opacity: 0;
}
</style>
