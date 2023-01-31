<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <slot name="date" />
      </v-col>
    </v-row>
    <slot name="default">
      <v-row class="d-flex justify-center">
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
import ListItem from '@/components/FxEventItem/ListItem'

export default {
  name: 'FxTeamEventContainer',
  components: { ListItem },
}
</script>
