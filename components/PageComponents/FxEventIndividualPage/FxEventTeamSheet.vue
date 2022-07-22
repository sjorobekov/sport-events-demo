<template>
  <FxEventItemCard>
    <template #title>
      Team Sheet
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-6">
          <v-sheet height="216" color="info lighten-5">
            <v-row
              align="center"
              justify="center"
              class="fill-height"
            >
              <v-col
                class="text-center"
                cols="12"
              >
                <div class="mb-4">
                  <v-icon size="88" color="info darken-2">
                    mdi-account-group
                  </v-icon>
                </div>
                <div class="text-p2 info--text text--darken-2 font-weight-bold mb-2">
                  No Students Selected
                </div>
                <v-btn depressed color="primary">
                  <v-icon>mdi-plus-circle-outline</v-icon>Add Students
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </FxEventItemCard>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'

export default {
  name: 'FxEventTeamSheet',
  components: { FxEventItemCard },
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      me: 'page/event/me',
      opponent: 'page/event/opponent',
      sport: 'page/event/sport',
      lead: 'page/event/lead',
    }),
  },
}
</script>
