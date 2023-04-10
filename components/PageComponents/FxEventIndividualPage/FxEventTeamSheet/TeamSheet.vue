<template>
  <div>
    <v-container v-if="!teamSheet.length">
      <v-row>
        <v-col cols="12" class="pt-6">
          <v-sheet height="216" color="background" class="radius-8">
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
                  <v-icon size="64" color="neutral darken-2">
                    $vuetify.icons.user-search
                  </v-icon>
                </div>
                <div class="text-p2 neutral--text text--darken-4 font-weight-bold mb-3">
                  No Students Selected
                </div>
                <v-btn
                  v-if="canManageTeamSheet"
                  depressed
                  color="primary"
                  :ripple="false"
                  link
                  :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }"
                >
                  <v-icon>$vuetify.icons.add-all</v-icon>Add Students
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-simple-table v-else>
      <thead>
        <tr style="background-color: var(--v-neutral-lighten3)">
          <th />
          <th class="text-left text-p2 neutral--text text--darken-4">
            Name
          </th>
          <th class="text-left text-p2 neutral--text text--darken-4">
            Year
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in teamSheet"
          :key="item.id"
        >
          <td class="text-right text-p2 neutral--text text--darken-3">
            {{ i + 1 }}.
          </td>
          <td class="text-p2 neutral--text text--darken-3">
            {{ item.firstname }} {{ item.lastname }}
          </td>
          <td class="text-p2 neutral--text text--darken-3">
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
<style scoped>
.radius-8 {
  border-radius: 8px!important;
}
</style>
