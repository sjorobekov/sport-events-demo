<template>
  <div>
    <v-btn
      v-if="!showForm"
      text
      class="text-p1 font-weight-medium"
      color="info darken-1"
      @click="showForm = true"
    >
      Add Location
    </v-btn>

    <template v-if="showForm">
      <v-row>
        <v-col>
          <label id="lead">Add Location</label>
          <v-autocomplete
            id="team"
            v-model="formData.sportLocationId"
            outlined
            dense
            :items="sportLocations"
            item-text="name"
            item-value="id"
            placeholder="Select Location"
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
  name: 'FxLocationSelectForm',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    showForm: false,
    formData: { leadId: null },
    sportLocations: [],
  }),

  async fetch () {
    this.sportLocations = await this.$store.dispatch('api/locations/list', {
      schoolId: this.schoolId,
    })
  },

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
