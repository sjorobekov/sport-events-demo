<template>
  <v-list class="py-0">
    <div class="pl-3 pr-4">
      <v-list-item class="team-item">
        <v-list-item-avatar>
          <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" :alt="winner.name" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            {{ winner.name }} won
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <template v-if="result.resultNotes">
      <v-list-item class="border-top pt-4" style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0 neutral--text text--darken-2">
          Notes
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="text-p2 neutral--text text--darken-3">
          <!-- eslint-disable vue/no-v-html -->
          <div class="px-3" v-html="notes" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import xss from 'xss'

export default {
  name: 'AllHousesResult',
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      result: 'page/inHouseEvent/result',
      winner: 'page/inHouseEvent/winner',
    }),
    notes () {
      return xss(this.result.resultNotes)
    },
  },
}
</script>
