<template>
  <div>
    <v-btn
      v-if="!showForm"
      text
      class="text-p1 font-weight-medium"
      color="info darken-1"
      @click="showForm = true"
    >
      Change Team
    </v-btn>

    <template v-if="showForm">
      <v-row>
        <v-col>
          <label id="team">Team</label>
          <v-autocomplete
            id="team"
            v-model="formData.teamId"
            outlined
            dense
            :items="teams"
            item-text="name"
            item-value="id"
            placeholder="Select Team"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn text block @click="update()">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxTeamSelectForm',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    seasonId: {
      type: String,
      required: true,
    },
    sportId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    showForm: false,
    formData: { leadId: null },
    teams: [],
  }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  watch: {
    showForm: {
      handler (val) {
        if (val) {
          this.formData = {
            leadId: this.value.leadId,
          }
        }
      },
    },
  },

  async created () {
    this.teams = await this.$store.dispatch('api/teams/list', {
      schoolId: this.schoolId,
      params: { seasonId: this.seasonId },
    })
  },

  methods: {
    update () {
      this.$emit('input', {
        ...this.value,
        ...this.formData,
      })
      this.showForm = false
    },
  },
}
</script>
