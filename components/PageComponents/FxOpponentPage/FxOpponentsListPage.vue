<template>
  <div>
    <v-row class="d-flex">
      <v-col cols="12" sm="5" md="5">
        <h1 class="text-h4 text-md-h3 neutral--text text--darken-4 font-weight-bold">
          Opponents
        </h1>
      </v-col>
      <v-spacer />
      <v-col v-if="canCreateOpponent" class="d-none d-sm-flex">
        <v-btn
          depressed
          outlined
          color="neutral darken-3"
          link
          :to="{ name: 'directory-custom-add' }"
        >
          <v-icon color="neutral darken-1">
            $vuetify.icons.add-all
          </v-icon>
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
          <v-icon>$vuetify.icons.add-all</v-icon>
          Add School
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="canCreateOpponent" no-gutters class="d-sm-none mt-5">
      <v-col cols="6">
        <v-btn
          block
          depressed
          outlined
          color="neutral darken-3"
          link
          x-large
          :to="{ name: 'directory-custom-add' }"
        >
          <v-icon color="neutral darken-1">
            $vuetify.icons.add-all
          </v-icon>
          Custom Opponent
        </v-btn>
      </v-col>
      <v-col cols="6" class="pl-2">
        <v-btn
          block
          depressed
          dark
          color="primary"
          link
          x-large
          :to="{ name: 'directory-request-add' }"
        >
          <v-icon>$vuetify.icons.add-all</v-icon>
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
                <v-list-item-title class="neutral--text text--darken-3">
                  Select Opponent
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="item in opponents"
              :key="item.id"
              link
              :to="{ name: 'directory-opponents-opponentId', params: { opponentId: item.id } }"
            >
              <v-list-item-avatar size="44" class="overflow-visible">
                <FxSchoolLogo v-if="item.opponentSchool" :value="item.opponentSchool.logo" :color="item.opponentSchool.color" :size="44" class="overflow-visible" />
                <FxSchoolLogo v-else :size="44" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="neutral--text text--darken-4">
                  {{ item.opponentSchool ? item.opponentSchool.name : item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="hidden-sm-and-down" md="8">
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
<style scoped>
.overflow-visible {
  overflow:visible!important;
}
</style>
