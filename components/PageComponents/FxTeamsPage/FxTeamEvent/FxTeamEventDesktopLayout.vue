<template>
  <v-container class="child-border">
    <v-row>
      <v-col cols="12" class="pt-1 pb-0">
        <slot name="date" />
      </v-col>
    </v-row>
    <slot name="default">
      <v-row class="d-flex flex-md-row flex-column justify-center no-border-bottom-sm-and-down">
        <v-col class="d-flex flex-md-row flex-column">
          <slot name="center">
            <div class="team-cell">
              <slot name="left" />
            </div>
            <div class="justify-center align-center score-cell">
              <slot name="score" />
            </div>
            <div class="team-cell">
              <slot name="right" />
            </div>
          </slot>
        </v-col>
      </v-row>
      <v-row class="hidden-sm-and-down">
        <v-col cols="12" md="6" lg="6" class="border-right pt-1 pb-0 d-flex justify-center align-center">
          <ListItem>
            <template #icon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
            <template #content>
              <slot name="time" />
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" md="6" lg="6" class="pt-1 pb-0 d-flex justify-center align-center">
          <ListItem>
            <template #icon>
              <v-icon>mdi-map-marker</v-icon>
            </template>
            <template #title>
              <slot name="location" />
            </template>
          </ListItem>
        </v-col>
      </v-row>
    </slot>
  </v-container>
</template>

<script>
import ListItem from '~/components/FxEventItem/ListItem.vue'

export default {
  name: 'FxTeamEventContainer',
  components: { ListItem },
}
</script>

<style scoped lang="sass">
@import '../../../../node_modules/vuetify/src/styles/styles'

$scoreWidth: 170px
$teamWidth: $scoreWidth / 2

.score-cell
  display: none

@media #{map-get($display-breakpoints, 'md-and-up')}
  .score-cell
    flex: $scoreWidth
    display: flex

  .team-cell
    width: calc(50% - #{$teamWidth})
</style>
