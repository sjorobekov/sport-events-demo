<template>
  <EventContainer :sport="sport" :to="to">
    <template #actions>
      <slot name="status" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <v-row class="d-flex justify-center ">
      <slot name="center">
        <v-col class="border-bottom flex-grow-1 ">
          <slot name="left" />
        </v-col>
        <v-col
          class="flex-grow-0 flex-shrink-1 hidden-sm-and-down pt-5 border-bottom text-center"
        >
          <slot name="score" />
        </v-col>
        <v-col class="border-bottom flex-grow-1 ">
          <slot name="right" />
        </v-col>
      </slot>
    </v-row>
    <v-row class="hidden-sm-and-down">
      <v-col cols="12" md="6" lg="4" class="border-bottom border-right pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>mdi-clock-outline</v-icon>
          </template>
          <template #content>
            <slot name="time" />
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" lg="4" class="hidden-md-and-down border-bottom border-right pt-1 pb-0">
        <ListItem v-if="lead">
          <template #icon>
            <FxAvatar :size="24" :value="lead.avatar" />
          </template>
          <template #title>
            {{ lead.firstname }} {{ lead.lastname }}
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" md="6" lg="4" class="border-bottom border-right pt-1 pb-0">
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
  </EventContainer>
</template>

<script>
import EventContainer from '../EventContainer'
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxCalendarItemLayout',
  components: {
    FxAvatar,
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
