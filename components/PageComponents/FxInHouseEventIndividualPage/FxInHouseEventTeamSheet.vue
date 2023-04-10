<template>
  <FxEventItemCard>
    <template #title>
      {{ name }} Team Sheet
    </template>
    <template v-if="canManageTeamSheet && sheet.length" #actions>
      <v-btn
        outlined
        link
        :to="{ name: 'in-house-competitionId-matches-matchId-teams-teamId-sheet', params: {
          competitionId: inHouseEvent.inHouseCompetitionId,
          matchId: inHouseMatch.id,
          teamId: team.id,
        }}"
        color="neutral darken-3"
        :ripple="false"
      >
        <v-icon color="neutral darken-1">
          $vuetify.icons.pen
        </v-icon>Edit Team
      </v-btn>
    </template>
    <v-container v-if="!sheet.length">
      <v-row no-gutters>
        <v-col>
          <v-list-item class="px-0 text-h5 hidden-md-and-up info--text text--darken-2">
            <v-list-item-content>
              <v-list-item-title>{{ name }} Team Sheet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pt-3">
          <v-sheet height="216" color="background" class="radius-8">
            <v-row
              align="center"
              justify="center"
              class="fill-height"
            >
              <v-col
                class="text-center"
                cols="12"
              >
                <div class="mb-4">
                  <v-icon size="64" color="neutral darken-2">
                    $vuetify.icons.user-search
                  </v-icon>
                </div>
                <div class="text-p2 neutral--text text--darken-4 font-weight-bold mb-3">
                  No Students Selected
                </div>
                <v-btn
                  v-if="canManageTeamSheet"
                  depressed
                  color="primary"
                  link
                  :to="{ name: 'in-house-competitionId-matches-matchId-teams-teamId-sheet', params: {
                    competitionId: inHouseEvent.inHouseCompetitionId,
                    matchId: inHouseMatch.id,
                    teamId: team.id,
                  }}"
                  :ripple="false"
                >
                  <v-icon>$vuetify.icons.add-all</v-icon>Add Students
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <template v-else>
      <v-list-item class="px-3 text-h5 hidden-md-and-up info--text text--darken-2">
        <v-list-item-content>
          <v-list-item-title>{{ name }} Team Sheet</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="canManageTeamSheet">
          <v-btn
            icon
            link
            :to="{ name: 'in-house-competitionId-matches-matchId-teams-teamId-sheet', params: {
              competitionId: inHouseEvent.inHouseCompetitionId,
              matchId: inHouseMatch.id,
              teamId: team.id,
            }}"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-simple-table>
        <thead>
          <tr style="background-color: var(--v-neutral-lighten3)">
            <th />
            <th class="text-left text-p2 neutral--text text--darken-4">
              Name
            </th>
            <th class="text-left text-p2 neutral--text text--darken-4">
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in sheet"
            :key="item.id"
          >
            <td class="text-right text-p2 neutral--text text--darken-3">
              {{ i + 1 }}.
            </td>
            <td class="text-p2 neutral--text text--darken-3">
              {{ item.firstname }} {{ item.lastname }}
            </td>
            <td class="text-p2 neutral--text text--darken-3">
              <span v-if="item.yearGroup">Year {{ item.yearGroup }}</span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </template>
  </FxEventItemCard>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/FxEventItemCard'

export default {
  name: 'FxInHouseEventTeamSheet',
  components: { FxEventItemCard },
  props: {
    team: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      inHouseMatch: 'page/inHouseEvent/inHouseMatch',
      canManageTeamSheet: 'page/inHouseEvent/canManageTeamSheet',
      getTeamSheetByTeamId: 'page/inHouseEvent/getTeamSheetByTeamId',
    }),
    name () {
      return this.team.name
    },
    sheet () {
      return this.getTeamSheetByTeamId(this.team.id)
    },
  },
}
</script>
<style scoped>
.radius-8 {
  border-radius: 8px!important;
}
</style>
