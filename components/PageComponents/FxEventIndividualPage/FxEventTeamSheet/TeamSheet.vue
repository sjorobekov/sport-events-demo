<template>
  <div>
    <v-container v-if="!teamSheet.length">
      <v-row>
        <v-col cols="12" class="pt-6">
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
                <v-btn v-if="canManageTeamSheet" depressed color="primary" link :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }">
                  <v-icon>mdi-plus-circle-outline</v-icon>Add Students
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" />
      </v-row>
    </v-container>
    <v-simple-table v-else>
      <thead>
        <tr style="background-color: var(--v-info-lighten4)">
          <th />
          <th class="text-left text-p2 info--text text--darken-1">
            Name
          </th>
          <th class="text-left text-p2 info--text text--darken-1">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in teamSheet"
          :key="item.id"
        >
          <td class="text-right text-p2 info--text text--darken-1">
            {{ i + 1 }}.
          </td>
          <td class="text-p2 info--text text--darken-2">
            {{ item.firstname }} {{ item.lastname }}
          </td>
          <td class="text-p2 info--text text--darken-1">
            <span v-if="item.yearGroup">Year {{ item.yearGroup }}</span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TeamSheet',
  props: {
    teamSheet: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      canManageTeamSheet: 'page/event/canManageTeamSheet',
    }),
  },
}
</script>
