<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" class="text-p2 info--text px-0">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </v-col>

      <v-col cols="12" lg="7" class="px-0">
        <v-list-item class="text-right px-0">
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-p2 font-weight-bold">
              {{ plan.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2">
              {{ plan.numberOfUsers || 'Unlimited' }} Users
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-p2">
              {{ plan.numberOfTeamsPerSeason || 'Unlimited' }} Teams
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-p2">
              {{ plan.numberOfCompetitionsPerSeason || 'Unlimited' }} Competitions
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FxPlan',
  props: {
    /** @type {TariffPlan} */
    plan: {
      type: Object,
      required: true,
    },
  },
}
</script>
