<template>
  <div>
    <v-row v-if="!showTabs">
      <v-col
        lg="7"
        class="pr-lg-4"
      >
        <slot name="select" />
      </v-col>
      <v-col lg="5">
        <slot name="sorting" />
      </v-col>
    </v-row>

    <template v-else>
      <v-card flat color="white" class="pl-6 card-border">
        <v-tabs v-model="currentItem" class="mobile-tabs" :show-arrows="false" active-class="active-mobile-tab">
          <v-tab class="font-weight-bold" :ripple="false">
            Search & Add
          </v-tab>
          <v-tab class="font-weight-bold" :ripple="false">
            Team Sheet
          </v-tab>
        </v-tabs>
      </v-card>

      <v-tabs-items v-model="currentItem" style="background: none" touchless>
        <v-tab-item class="px-2 pb-2">
          <slot name="select" />
        </v-tab-item>
        <v-tab-item class="px-2 pb-2">
          <slot name="sorting" />
        </v-tab-item>
      </v-tabs-items>

      <div class="hidden-md-and-up">
        <slot name="actions" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FxEventSheetTabulatedContent',
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
  border-radius: 12px 12px 0 0;
}

.mobile-tabs /deep/ .v-tab--active:hover::before {
  opacity: 0;
}
.theme--light.v-tabs .v-tab:hover:before {
    opacity: .00;
}
.v-tab:before, .v-tabs-slider {
    background-color: currentColor;
}
</style>
