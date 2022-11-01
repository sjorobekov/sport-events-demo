<template>
  <div>
    <div class="d-flex">
      <h2>Opponents</h2>
      <v-spacer />
      <v-btn
        depressed
        outlined
        color="primary"
        link
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
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
        Add School
      </v-btn>
    </div>
    <v-row class="d-md-none">
      <v-col>
        <v-tabs icons-and-text centered fixed-tabs>
          <v-tab
            v-for="(item, i) in opponents"
            :key="i"
            link
            :to="{ name: 'directory-opponents-opponentId', params: { opponentId: item.id } }"
          >
            {{ item.opponentSchool.name }}
            <v-icon color="info lighten-1" v-text="item.opponentSchool.icon" />
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-sm-none d-md-block" md="4" lg="3">
        <v-card
          class="mx-auto"
          flat
          outlined
        >
          <v-list dense class="py-0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Select Opponent</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(item, i) in opponents"
              :key="i"
              link
              :to="{ name: 'directory-opponents-opponentId', params: { opponentId: item.id } }"
            >
              <v-list-item-avatar color="white" size="44">
                <FxSchoolLogo :value="item.opponentSchool.logo" :color="item.opponentSchool.color" :size="44" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text--info text--darken-1" v-text="item.opponentSchool.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="8" lg="9">
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
    }),
  },
}
</script>
