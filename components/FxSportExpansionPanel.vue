<template>
  <v-expansion-panels>
    <v-expansion-panel :style="style" class="fx-box-shadow">
      <v-expansion-panel-header class="pl-4 py-1">
        <v-list-item class="px-0 ">
          <v-list-item-avatar tile>
            <v-img :src="item.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="neutral--text text--darken-4 text-h5s">
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="subtitle" class="neutral--text text--darken-2">
              {{ subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <slot name="actions" />
          </v-list-item-content>
        </v-list-item>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pa-0">
        <slot name="default" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'FxSportExpansionPanel',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    subtitle: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    style () {
      return { borderLeft: `${this.item.color} 8px solid` }
    },
  },
}
</script>

<style lang="sass">
.v-expansion-panel-content__wrap
  padding: 0!important

.v-expansion-panels
  border: 1px solid #E4E9EF
  overflow: hidden
  border-radius: 8px

.theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon
  color: var(--v-neutral-darken1)

.v-list-item__content
  overflow: visible!important
</style>
