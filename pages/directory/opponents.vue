<template>
  <div>
    <div class="d-flex">
      <h2>Opponents</h2>
      <v-spacer />
      <div v-if="canCreateOpponent">
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
      </div>
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
            <section v-if="item.opponentSchool">
              {{ item.opponentSchool.name }}
              <FxSchoolLogo :value="item.opponentSchool.logo" :color="item.opponentSchool.color" :size="44" />
            </section>
            <section v-else>
              {{ item.name }}
            </section>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-sm-none d-md-block" md="4" lg="3">
        <v-card>
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
      canCreateOpponent: 'user/acl/canCreateOpponent',
    }),
  },
}
</script>
