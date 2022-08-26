<template>
  <div>
    <v-btn
      v-if="!showForm"
      text
      class="text-p1 font-weight-medium"
      color="info darken-1"
      @click="showForm = true"
    >
      Change Lead Staff Member
    </v-btn>

    <template v-if="showForm">
      <v-row>
        <v-col>
          <label id="lead">Change Lead Staff Member</label>
          <FxUserSelect
            id="lead"
            v-model="formData.leadId"
            :school-id="schoolId"
            placeholder="Select Lead Staff"
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
  name: 'FxLeadSelectForm',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    showForm: false,
    formData: { leadId: null },
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
