<template>
  <div>
    <v-row class="d-flex mt-4 mt-md-n1">
      <v-col cols="12" sm="5" md="5">
        <h1 class="text-h4s text-md-h3">
          Opponents
        </h1>
      </v-col>
      <v-spacer />
      <v-col v-if="canCreateOpponent" class="d-flex">
        <v-btn
          depressed
          outlined
          color="primary"
          link
          :to="{ name: 'directory-custom-add' }"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>
          Custom Opponent
        </v-btn>
        <v-btn
          depressed
          dark
          color="primary"
          link
          class="ml-2"
          :to="{ name: 'directory-request-add' }"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>
          Add School
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-list dense class="py-0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Select Opponent</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="item in opponents"
              :key="item.id"
              link
              :to="{ name: 'directory-opponents-opponentId', params: { opponentId: item.id } }"
            >
              <v-list-item-avatar v-if="item.opponentSchool" color="white" size="44">
                <FxSchoolLogo :value="item.opponentSchool.logo" :color="item.opponentSchool.color" :size="44" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text--info text--darken-1">
                  {{ item.opponentSchool ? item.opponentSchool.name : item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="hidden-sm-and-down" md="7">
        <NuxtChild />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OpponentsPage',
  data: () => ({
    opponents: [],
  }),
  async fetch () {
    this.opponents = await this.$store.dispatch('api/opponents/list', { schoolId: this.schoolId })
  },
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      canCreateOpponent: 'user/acl/canCreateOpponent',
    }),
  },
}
</script>
