<template>
  <EventContainer :sport="sport" :to="to">
    <template #actions>
      <slot name="status" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <v-row class="no-border-bottom-sm-and-down">
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
      <v-col cols="12" md="6" lg="4" class="border-right pt-1 pb-0 d-flex justify-center align-center">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.clock-1</v-icon>
          </template>
          <template #content>
            <slot name="time" />
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" lg="4" class="hidden-md-and-down border-right pt-1 pb-0 d-lg-flex justify-center align-center">
        <ListItem v-if="lead">
          <template #icon>
            <v-icon>$vuetify.icons.user-1</v-icon>
          </template>
          <template #title>
            <FxUserDisplayName class="calendar-user-name" :user="lead" />
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" md="6" lg="4" class="pt-1 pb-0 d-flex justify-center align-center">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.location-1</v-icon>
          </template>
          <template #title>
            <slot name="location" />
          </template>
        </ListItem>
      </v-col>
    </v-row>
  </EventContainer>
</template>

<script>
import EventContainer from './EventContainer.vue'
import ListItem from '~/components/FxEventItem/ListItem.vue'

export default {
  name: 'FxCalendarItemLayout',
  components: {
    ListItem,
    EventContainer,
  },
  props: {
    sport: {
      type: Object,
      required: true,
    },
    lead: {
      type: Object,
      default: undefined,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles'

$scoreWidth: 170px
$teamWidth: $scoreWidth / 2

.score-cell
  display: none

.neutral--text.calendar-user-name
  color: var(--v-neutral-darken4) !important

@media #{map-get($display-breakpoints, 'md-and-up')}
  .score-cell
    flex: $scoreWidth
    display: flex

  .team-cell
    width: calc(50% - #{$teamWidth})
</style>
