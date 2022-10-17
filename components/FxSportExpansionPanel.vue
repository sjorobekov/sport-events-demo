<template>
  <v-expansion-panels>
    <v-expansion-panel :style="style" class="fx-box-shadow">
      <v-expansion-panel-header class="py-0 pl-2">
        <v-list-item class="px-0 ">
          <v-list-item-avatar tile>
            <v-img :src="item.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="subtitle">
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
</style>
