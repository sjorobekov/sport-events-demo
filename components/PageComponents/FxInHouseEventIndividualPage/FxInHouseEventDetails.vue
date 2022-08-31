<template>
  <FxInHouseEventItemCard>
    <template #title>
      Details
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.calendar</v-icon>
            </template>
            <template #title>
              <FxDateFormat :date="match.date" />
            </template>
            <template #subtitle>
              Date
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
            <template #content>
              <div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ match.startTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Start Time
                  </v-list-item-subtitle>
                </div>
                <div v-if="match.finishTime" class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ match.finishTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Finish Time
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <ListItem>
            <template #icon>
              <FxAvatar :size="24" :value="lead.avatar" />
            </template>
            <template #title>
              {{ lead.firstname }} {{ lead.lastname }}
            </template>
            <template #subtitle>
              Lead Staff Member
            </template>
          </ListItem>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>mdi-map-marker</v-icon>
            </template>
            <template #title>
              <FxInHouseLocationLabel :match="match" />
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </v-col>
      </v-row>
    </v-container>
  </FxInHouseEventItemCard>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar'
import FxInHouseLocationLabel from '@/components/FxInHouseEventItem/FxInHouseLocationLabel'
import FxInHouseEventItemCard from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventItemCard'

export default {
  name: 'FxInHouseEventDetails',
  components: {
    FxInHouseEventItemCard,
    ListItem,
    FxAvatar,
    FxInHouseLocationLabel,
  },
  props: {
    match: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      sport: 'page/inHouseEvent/sport',
      lead: 'page/inHouseEvent/lead',
    }),
  },
}
</script>
