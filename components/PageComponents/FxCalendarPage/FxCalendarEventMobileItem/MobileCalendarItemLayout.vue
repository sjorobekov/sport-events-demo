<template>
  <nuxt-link class="text-decoration-none" :to="to">
    <v-container :style="style" class="rounded">
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-avatar class="mr-3" tile size="22">
              <v-img :src="sport.icon" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p2">
                {{ sport.name }}
                <slot name="subtitle" />
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <slot name="actions" />
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <slot name="center">
          <v-col md="2" class="border-bottom pt-6 hidden-sm-and-down">
            <slot name="status" />
          </v-col>
          <v-col cols="12" md="3" class="border-bottom">
            <slot name="left" v-bind="{ compact }" />
          </v-col>
          <v-col md="2" class="hidden-sm-and-down pt-5 border-bottom text-center">
            <slot name="score">
              <slot name="scoreLeft" />
              <slot name="scoreRight" />
            </slot>
          </v-col>
          <v-col cols="12" md="5" class="border-bottom">
            <slot name="right" />
          </v-col>
        </slot>
      </v-row>
      <v-row class="hidden-sm-and-down">
        <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
            <template #content>
              <slot name="time" />
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">
          <ListItem v-if="lead">
            <template #icon>
              <FxAvatar :size="24" :value="lead.avatar" />
            </template>
            <template #title>
              {{ lead.firstname }} {{ lead.lastname }}
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">
          <ListItem>
            <template #icon>
              <v-icon>mdi-map-marker</v-icon>
            </template>
            <template #title>
              <slot name="location" />
            </template>
          </ListItem>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="py-0">
          <slot name="transport" />
        </v-col>
      </v-row>
    </v-container>
  </nuxt-link>
</template>

<script>
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxCalendarItemLayout',
  components: {
    FxAvatar,
    ListItem,
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
  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },
  },
}
</script>
