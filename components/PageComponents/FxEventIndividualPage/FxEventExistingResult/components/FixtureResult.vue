<template>
  <v-list class="py-0 px-3">
    <div v-for="(item, i) in result.results" :key="i">
      <v-list-item class="team-item pr-1">
        <v-list-item-avatar>
          <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" :alt="myTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ myTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar size="40" rounded color="#F1F5F9">
            {{ item.score }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="team-item pr-1">
        <v-list-item-avatar>
          <FxSchoolLogo :value="opponentTeam.logo" :color="opponentTeam.color" :alt="opponentTeam.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            {{ opponentTeam.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar size="40" rounded color="#F1F5F9">
            {{ item.opponentScore }}
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FixtureResult',
  components: {
    FxSchoolLogo,
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
    }),
  },
}
</script>
