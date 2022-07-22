<template>
  <FxEventItemCard>
    <template #title>
      Results
    </template>
    <template #actions>
      <v-btn outlined class="px-2">
        <v-icon>mdi-pencil-outline</v-icon>Edit Result
      </v-btn>
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <v-list class="py-0">
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
                  {{ result.results[0].score }}
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
                  {{ result.results[0].opponentScore }}
                </v-avatar>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </FxEventItemCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'

export default {
  name: 'FxEventExistingResult',
  components: { FxEventItemCard, FxSchoolLogo },
  data: () => ({
    formData: {
      results: [
        {},
      ],
    },
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      results: 'page/event/results',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
    }),
  },

  methods: {
    ...mapActions({
      storeResult: 'page/event/saveResult',
    }),
  },
}
</script>

<style scoped>
.team-item {
  height: 52px;
}
</style>
