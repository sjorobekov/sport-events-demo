<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" class="text-p2 neutral--text text--darken-3 px-0 pr-5">
        Your current Fixturr plan and the features it includes.
      </v-col>

      <v-col cols="12" lg="7" class="px-0">
        <v-list-item class="text-right px-0">
          <v-list-item-content class="py-0">
            <v-list-item-title class="text-p2 font-weight-bold neutral--text text--darken-4">
              {{ plan.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 neutral--text text--darken-3">
              {{ plan.numberOfUsers || 'Unlimited' }} Users
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-p2 neutral--text text--darken-3">
              {{ plan.numberOfTeamsPerSeason || 'Unlimited' }} Teams
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-p2 neutral--text text--darken-3">
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
