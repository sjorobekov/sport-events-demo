<template>
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
              <FxGroupedTeamSheetSelect v-model="sheet" :items="students" :recent="recentTeamSheet" :team-name="myTeam.name" />
            </v-col>
          </v-row>
        </v-container>
      </FxEventItemCard>
    </template>
    <template #sorting>
      <FxEventItemCard>
        <template #title>
          Team Sheet
        </template>

        <template #actions>
          <div>
            <v-btn
              outlined
              link
              :to="{ name: 'events-eventId', params: { eventId: event.id } }"
              exact
              class="neutral--text text--darken-3"
              :ripple="false"
            >
              Cancel
            </v-btn>
            <v-btn
              depressed
              color="primary"
              :ripple="false"
              @click="save()"
            >
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
                    <tr v-for="(studentId, i) in sheet" :key="`student-id-${studentId}`" class="pa-1">
                      <td style="width: 72px" class="text-center no-right-border">
                        <span class="info--text text-p3">{{ (i + 1).toString().padStart(2, '0') }}.</span>
                      </td>
                      <td class="pl-0">
                        <FxStudentListItem :student-id="studentId">
                          <template #icon>
                            <v-icon color="neutral lighten-1" class="draggable">
                              $vuetify.icon.dragVertical
                            </v-icon>
                          </template>
                          <template #action>
                            <v-btn icon color="neutral" :ripple="false" class="remove-button" @click="remove(i)">
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
        <v-btn
          outlined
          link
          :to="{ name: 'events-eventId', params: { eventId: event.id } }"
          exact
          color="neutral darken-3"
          class="mr-2"
          :ripple="false"
        >
          Cancel
        </v-btn>
        <v-btn depressed color="primary" :ripple="false" @click="save()">
          Confirm
        </v-btn>
      </div>
    </template>
  </FxEventSheetTabulatedContent>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import FxEventItemCard from '@/components/FxEventItemCard'
import FxGroupedTeamSheetSelect
  from '@/components/PageComponents/FxEventIndividualPage/FxTeamSheetPage/FxGroupedTeamSheetSelect'
import FxEventSheetTabulatedContent
  from '@/components/FxEventSheetTabulatedContent.vue'

export default {
  name: 'FxTeamSheetEditPage',
  components: { FxEventSheetTabulatedContent, FxGroupedTeamSheetSelect, FxEventItemCard, draggable },

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
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
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
    border-bottom: none!important;
  }

  tr:last-child {
    td {
      border-bottom: 1px var(--v-info-lighten3) solid!important;
    }
  }

  .ghost {
    border-bottom: 1px var(--v-info-lighten3) solid;
  }

  .no-right-border {
    border-right: none;
  }
}

.draggable {
    cursor: grab;
}
.draggable:active {
    cursor: grabbing!important;
}

.remove-button:hover {
  color: var(--v-error-base)!important;
}
.radius-8 {
  border-radius: 8px!important;
}
</style>
