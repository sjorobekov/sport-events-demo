<template>
  <div>
    <v-card class="hidden-md-and-up" tile color="white">
      <h1 class="py-3 px-3 text-h6 info--text text--darken-2">
        {{ team.name }} Team Sheet
      </h1>
    </v-card>
    <FxEventSheetTabulatedContent :show-tabs="isMobile">
      <template #select>
        <FxEventItemCard>
          <template #title>
            Search & Add
          </template>
          <v-container>
            <v-row>
              <v-col>
                <label>Search Students</label>
                <FxStudentSelect
                  v-model="sheet"
                  :school-id="contextSchoolId"
                  placeholder="Type Student Name"
                  :items="students"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <FxGroupedTeamSheetSelect v-model="sheet" :items="students" :recent="recentTeamSheet" :team-name="team.name" />
              </v-col>
            </v-row>
          </v-container>
        </FxEventItemCard>
      </template>

      <template #sorting>
        <FxEventItemCard>
          <template #title>
            {{ team.name }} Team Sheet
          </template>

          <template #actions>
            <div>
              <v-btn
                outlined
                link
                exact
                class="neutral--text text--darken-3"
                :ripple="false"
                @click="$router.back()"
              >
                Cancel
              </v-btn>
              <v-btn depressed color="primary" :ripple="false" @click="save()">
                Confirm
              </v-btn>
            </div>
          </template>

          <v-container>
            <v-row>
              <v-col cols="12" class="pt-6">
                <v-sheet v-if="!sheet.length" height="216" color="background" class="radius-8">
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
                      <div class="text-p2 neutral--text text--darken-4 font-weight-bold mb-2">
                        No Students Selected
                      </div>
                    </v-col>
                  </v-row>
                </v-sheet>

                <template v-else>
                  <div class="text-center text-p2 font-weight-bold neutral--text text--darken-4 py-4">
                    {{ $tc('page.FxTeamSheetEditPage.STUDENTS_SELECTED', sheet.length) }}
                  </div>
                  <v-simple-table class="sheet-table">
                    <draggable v-model="sheet" ghost-class="ghost" tag="tbody" handle=".student-icon">
                      <tr v-for="(studentId, i) in sheet" :key="studentId">
                        <td style="width: 70px" class="text-center no-right-border">
                          <span class="neutral--text text--darken-1 text-p3">{{ (i + 1).toString().padStart(2, '0') }}.</span>
                        </td>
                        <td class="pl-0">
                          <FxStudentListItem :student-id="studentId">
                            <template #icon>
                              <v-icon color="neutral" class="draggable">
                                $vuetify.icon.dragVertical
                              </v-icon>
                            </template>
                            <template #action>
                              <v-btn icon color="neutral" class="remove-button" @click="remove(i)">
                                <v-icon>mdi-window-close</v-icon>
                              </v-btn>
                            </template>
                          </FxStudentListItem>
                        </td>
                      </tr>
                    </draggable>
                  </v-simple-table>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </FxEventItemCard>
      </template>

      <template #actions>
        <div class="d-flex px-2 pb-4">
          <v-spacer />
          <v-btn outlined color="neutral darken-3" class="mr-2" :ripple="false" @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" :ripple="false" @click="save()">
            Confirm
          </v-btn>
        </div>
      </template>
    </FxEventSheetTabulatedContent>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import FxGroupedTeamSheetSelect from './FxGroupedTeamSheetSelect'
import FxEventSheetTabulatedContent
  from '@/components/FxEventSheetTabulatedContent.vue'

export default {
  name: 'FxTeamSheetEditPage',
  components: { FxEventSheetTabulatedContent, FxGroupedTeamSheetSelect, draggable },

  data: () => ({
    sheet: [],
    loading: false,
    selectedStudent: null,
    students: [],
    recentTeamSheet: [],
    team: {},
    teamSheet: [],
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      inHouseMatch: 'page/inHouseEvent/inHouseMatch',
      teamSheets: 'page/inHouseEvent/teamSheets',
      teams: 'page/inHouseEvent/teams',
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
      getTeamSheetByTeamId: 'page/inHouseEvent/getTeamSheetByTeamId',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },
  },

  async created () {
    const { data } = await this.$store.dispatch('api/students/list', {
      schoolId: this.contextSchoolId,
      params: { limit: -1, orderBy: 'firstname', orderDesc: false },
    })
    this.team = this.teams.find(item => item.id === this.$route.params.teamId)

    this.recentTeamSheet = await this.$store.dispatch('api/inHouseTeams/getLastSheet', {
      schoolId: this.contextSchoolId,
      inHouseEventId: this.inHouseEvent.id,
      id: this.team.id,
    })

    this.students = data

    this.teamSheet = this.getTeamSheetByTeamId(this.team.id)

    if (this.teamSheet) {
      this.sheet = [...this.teamSheet.map(item => item.id)]
    }
  },

  methods: {
    save () {
      this.loading = true

      this.$store.dispatch('api/inHouseEvents/saveTeamSheet', {
        schoolId: this.contextSchoolId,
        inHouseCompetitionId: this.inHouseEvent.inHouseCompetitionId,
        inHouseTeamId: this.team.id,
        id: this.inHouseMatch.id,
        sheet: this.sheet,
      })
        .then(() => {
          this.$store.dispatch('page/inHouseEvent/fetchTeamSheets', { inHouseCompetitionId: this.inHouseEvent.inHouseCompetitionId, matchId: this.inHouseMatch.id })
          this.$router.push({
            name: 'in-house-competitionId-matches-matchId',
            params: { competitionId: this.inHouseEvent.inHouseCompetitionId, matchId: this.inHouseMatch.id },
          })
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    remove (index) {
      this.sheet.splice(index, 1)
    },
  },
}
</script>

<style scoped lang="scss">
.list-item-border {
  border: 1px var(--v-info-lighten3) solid;
}
.index-border {
  width: 70px;
  border-right: 1px solid var(--v-info-lighten3);
}

.sheet-table {
  td {
    border: 1px var(--v-info-lighten3) solid;
    border-bottom: none;
  }

  tr:last-child {
    td {
      border-bottom: 1px var(--v-info-lighten3) solid;
    }
  }

  .ghost {
    border-bottom: 1px var(--v-info-lighten3) solid;
  }

  .no-right-border {
    border-right: none;
  }
}
.radius-8 {
  border-radius: 8px!important;
}
.remove-button:hover {
  color: var(--v-error-base)!important;
}
.draggable {
    cursor: grab;
}
.draggable:active {
    cursor: grabbing!important;
}
</style>
