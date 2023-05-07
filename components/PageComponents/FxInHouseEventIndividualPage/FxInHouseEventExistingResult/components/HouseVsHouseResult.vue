<template>
  <v-list class="py-0">
    <div class="pl-3 pr-4">
      <v-list-item class="team-item">
        <v-list-item-avatar>
          <FxSchoolLogo :value="myTeam.logo" :color="myTeam.color" :alt="myTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            {{ myTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar width="60" rounded color="neutral lighten-2" class="neutral--text text--darken-4">
            {{ result.homeScore }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="team-item">
        <v-list-item-avatar>
          <FxSchoolLogo :value="opponentTeam.logo" :color="opponentTeam.color" :alt="opponentTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            {{ opponentTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar width="60" rounded color="neutral lighten-2" class="neutral--text text--darken-4">
            {{ result.awayScore }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
    </div>
    <template v-if="result.resultNotes">
      <v-list-item class="border-top pt-4" style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0">
          Notes
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="text-p2">
          {{ result.resultNotes }}
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'HouseVsHouseResult',
  components: {
    FxSchoolLogo,
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/inHouseEvent/myTeam',
      opponentTeam: 'page/inHouseEvent/opponentTeam',
      result: 'page/inHouseEvent/result',
      hasResult: 'page/inHouseEvent/hasResult',
    }),
  },
}
</script>
