<template>
  <FxEventItemCard>
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
              <FxDateFormat :date="event.date" />
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
                <div v-if="me.meetTime" class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ me.meetTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Meet Time
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ event.startTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Start Time
                  </v-list-item-subtitle>
                </div>
                <div v-if="me.returnTime" class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ me.returnTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Return Time
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
              <FxLocationLabel :event="event" :me="me" />
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" class="pt-1 pb-0">
          <ListItem v-if="!me.noNeedTransport">
            <template #icon>
              <v-icon>$vuetify.icons.direction</v-icon>
            </template>
            <template #content>
              <div>
                <div class="d-inline-block pr-8">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ transportTo }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Transport To
                  </v-list-item-subtitle>
                </div>
                <div class="d-inline-block">
                  <v-list-item-title class="text-p2 info--text text--darken-4">
                    {{ transportFrom }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-p1 info--text">
                    Transport From
                  </v-list-item-subtitle>
                </div>
              </div>
            </template>
          </ListItem>
        </v-col>
      </v-row>
    </v-container>
  </FxEventItemCard>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransportType } from '@/enum'
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'

export default {
  name: 'FxInHouseEventDetails',
  components: {
    FxEventItemCard,
    ListItem,
    FxAvatar,
    FxLocationLabel,
  },
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      me: 'page/event/me',
      opponent: 'page/event/opponent',
      sport: 'page/event/sport',
      lead: 'page/event/lead',
    }),
    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }

      return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
    },

    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }

      return this.$t(`TRANSPORT_FROM.${this.me.transportTo}`)
    },
  },
}
</script>
