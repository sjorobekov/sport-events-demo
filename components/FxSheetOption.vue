<template>
  <v-item
    v-slot="{ active, toggle }"
    class="d-inline-block mr-3 mb-3"
    :value="value"
  >
    <v-sheet width="156px" height="112" :class="active ? 'border active' : 'border'" @click="toggle">
      <v-container class="fill-height px-0">
        <v-row
          align="center"
          justify="center"
          class="px-0"
        >
          <v-col class="pb-0 pt-0 text-center select-box">
            <v-img class="mx-auto text--primary mb-4" width="50" :src="src" />
            <div class="label1">
              {{ text }}
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-btn class="float-right" icon :ripple="false" style="position: relative; bottom: 105px;">
        <v-icon v-if="active" dark color="primary">
          $vuetify.icons.tickFilled
        </v-icon>
      </v-btn>
    </v-sheet>
  </v-item>
</template>

<script>
export default {
  name: 'FxSheetOption',
  props: {
    src: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>

.border
  border-radius: 4px
  box-shadow: 0 0 0 1px var(--v-neutral-lighten1)
  &.active
    box-shadow: 0 0 0 2px var(--v-primary-base)
  .label1
    font-size: 1rem
    line-height: 1rem
    color: var(--v-neutral-darken3)
    height: 1rem
    display: flex
    justify-content: center
    align-items: center
.select-box
  cursor: pointer
.theme--light.v-btn.v-btn--icon:before
  opacity: 0
</style>
