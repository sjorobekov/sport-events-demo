<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12"
      lg="7"
      class="pr-4"
    >
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
              <FxGroupedTeamSheetSelect v-model="sheet" :items="students" :recent="recentTeamSheet" :team-name="myTeam.name" />
            </v-col>
          </v-row>
        </v-container>
      </FxEventItemCard>
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="5">
      <FxEventItemCard>
        <template #title>
          Team Sheet
        </template>

        <template #actions>
          <div>
            <v-btn outlined link :to="{ name: 'events-eventId', params: { eventId: event.id } }" exact>
              Cancel
            </v-btn>
            <v-btn depressed color="primary" @click="save()">
              Confirm
            </v-btn>
          </div>
        </template>

        <v-container>
          <v-row>
            <v-col cols="12" class="pt-6">
              <v-sheet v-if="!sheet.length" height="216" color="info lighten-5">
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
                  </v-col>
                </v-row>
              </v-sheet>

              <template v-else>
                <div class="text-center text-p2 font-weight-bold info--text text--darken-2 py-4">
                  {{ $tc('page.FxTeamSheetEditPage.STUDENTS_SELECTED', sheet.length) }}
                </div>
                <v-simple-table class="sheet-table">
                  <draggable v-model="sheet" ghost-class="ghost" tag="tbody">
                    <tr v-for="(studentId, i) in sheet" :key="studentId">
                      <td style="width: 70px" class="text-center no-right-border">
                        <span class="info--text text-p3">{{ (i + 1).toString().padStart(2, '0') }}.</span>
                      </td>
                      <td class="pl-0">
                        <FxStudentListItem :student-id="studentId">
                          <template #icon>
                            <v-icon color="info lighten-2">
                              $vuetify.icon.dragVertical
                            </v-icon>
                          </template>
                          <template #action>
                            <v-btn icon color="info lighten-1" @click="remove(i)">
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
          <v-divider class="hidden-md-and-up my-4" />
          <v-row class="hidden-md-and-up">
            <v-col class="d-flex">
              <v-spacer />
              <v-btn outlined link :to="{ name: 'events-eventId', params: { eventId: event.id } }" exact class="mr-2">
                Cancel
              </v-btn>
              <v-btn depressed color="primary" @click="save()">
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </FxEventItemCard>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'
import FxGroupedTeamSheetSelect
  from '@/components/PageComponents/FxEventIndividualPage/FxTeamSheetPage/FxGroupedTeamSheetSelect'

export default {
  name: 'FxTeamSheetEditPage',
  components: { FxGroupedTeamSheetSelect, FxEventItemCard, draggable },

  data: () => ({
    sheet: [],
    loading: false,
    selectedStudent: null,
    students: [],
    recentTeamSheet: [],
    teamSheet: [],
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      event: 'page/event/event',
      myTeam: 'page/event/myTeam',
    }),
  },

  async created () {
    const { data } = await this.$store.dispatch('api/students/list', {
      schoolId: this.contextSchoolId,
      params: { limit: -1 },
    })

    this.recentTeamSheet = await this.$store.dispatch('api/teams/getLastSheet', {
      schoolId: this.contextSchoolId,
      id: this.myTeam.id,
    })

    this.teamSheet = await this.$store.dispatch('api/events/getTeamSheet', {
      schoolId: this.contextSchoolId,
      id: this.event.id,
    })

    this.students = data

    if (this.teamSheet) {
      this.sheet = [...this.teamSheet.map(item => item.id)]
    }
  },

  methods: {
    save () {
      this.loading = true

      this.$store.dispatch('api/events/saveTeamSheet', {
        schoolId: this.contextSchoolId,
        id: this.event.id,
        sheet: this.sheet,
      })
        .then(() => {
          this.$router.push({
            name: 'events-eventId',
            params: { eventId: this.event.id },
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
.list-item-border:first-child {

}
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

</style>
