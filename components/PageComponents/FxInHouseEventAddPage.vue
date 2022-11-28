<template>
  <div>
    <h3 class="text-h3 mb-6" v-text="title" />
    <v-form v-if="!formVisible" ref="confirmForm" lazy-validation>
      <v-card v-for="(match, index) in formData.matches" :key="index" class="mb-3">
        <FxInHouseEventWithConflictItem
          ref="eventItem"
          :context-school-id="contextSchoolId"
          :match="match"
          :event="formData.event"
        />
      </v-card>
    </v-form>

    <FxInHouseEventForm
      v-if="formVisible"
      ref="form"
      :school-id="contextSchoolId"
      :event.sync="formData.event"
      :matches.sync="formData.matches"
      @cancel="cancel"
      @save="save"
    />

    <v-container v-else class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined @click="goBack">
          Go Back
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="confirm"
        >
          Confirm & Add Event
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FxInHouseEventForm from '@/components/FxInHouseEventForm/FxInHouseEventForm'
import { EventLocationType, InHouseEventType } from '@/enum'
import FxInHouseEventWithConflictItem from '@/components/FxInHouseEventItem/FxInHouseEventWithConflictItem'

export default {
  name: 'FxInHouseEventAddPage',
  components: {
    FxInHouseEventWithConflictItem,
    FxInHouseEventForm,
  },
  props: {
    contextSchoolId: {
      type: String,
      required: true,
    },
    competitionId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    formData: {
      event: {
        location: EventLocationType.SPORTS_LOCATIONS,
      },
    },
    override: [],
    loading: false,
    formVisible: true,
  }),

  head () {
    return this.title
  },

  computed: {
    title () {
      if (this.formVisible) {
        return 'Create In-House Event'
      }

      return 'Confirm In-House Event'
    },
  },

  watch: {
    formData: {
      handler (val) {
        this.setSession('inHouseEventForm', val)
      },
      deep: true,
    },
  },

  mounted () {
    this.formData = this.getSession('inHouseEventForm') || {
      matches: [{
        number: 1,
        homeTeamId: '',
        awayTeamId: '',
        location: EventLocationType.SPORTS_LOCATIONS,
      }],
      event: {
        eventType: InHouseEventType.HOUSE_VS_HOUSE,
        leadId: this.$route.query.leadId,
      },
    }

    this.$router.push({ query: {} })
  },

  beforeDestroy () {
    this.setSession('inHouseEventForm', null)
  },

  methods: {
    setSession (key, val) {
      window.sessionStorage.setItem(key, JSON.stringify(val))
    },

    getSession (key) {
      return JSON.parse(window.sessionStorage.getItem(key))
    },

    async save () {
      this.loading = true

      try {
        const isValid = await this.$refs.form.validateAsync()
        if (!isValid) {
          this.loading = false
          return
        }
        this.formVisible = false
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },

    cancel () {
      this.setSession('inHouseEventForm', null)
      this.$emit('cancel')
    },

    goBack () {
      this.formVisible = true
    },

    confirm () {
      const isValid = this.$refs.confirmForm.validate()
      if (!isValid) {
        this.$toast.error('You need to resolve or override conflict')
        return
      }

      this.loading = true

      this.$store.dispatch('api/inHouseEvents/create', {
        inHouseCompetitionId: this.competitionId,
        schoolId: this.contextSchoolId,
        ...this.formData,
      }).then(() => {
        this.setSession('inHouseEventForm', null)
        this.$emit('saved')
      }).catch(() => {
        this.$toast.error('Something went wrong')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
