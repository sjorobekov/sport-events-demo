<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                Sports Contacts
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-avatar class="mr-2">
              <FxAvatar size="22" />
            </v-list-item-avatar>
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
