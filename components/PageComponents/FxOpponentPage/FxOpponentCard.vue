<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-avatar color="white" size="44">
              <FxSchoolLogo :value="school.logo" :color="school.color" :size="44" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ school.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="school.portal"
                depressed
                outlined
                color="primary"
                link
                :href="school.portalUrl"
              >
                <v-icon>mdi-link-variant</v-icon>
                Sports Portal
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-icon class="mr-3">
              <v-icon>$vuetify.icons.calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ opponent.address }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Address
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-link-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ school.website }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Website
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FxOpponentCard',
  props: {
    opponentId: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    opponent: {},
  }),

  async fetch () {
    this.opponent = await this.$store.dispatch('api/opponents/fetch', { schoolId: this.contextSchoolId, id: this.opponentId })
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    school () {
      return this.opponent.opponentSchool || {}
    },
  },

  watch: {
    opponentId () {
      this.$fetch()
    },
  },
}
</script>
