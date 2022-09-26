<template>
  <FxInHouseEventItemCard>
    <template #title>
      Results
    </template>
    <template #actions>
      <v-btn v-if="!formVisible && canAddOrEditResult" outlined @click="formVisible = true">
        <v-icon small>
          mdi-pencil-outline
        </v-icon>Edit Result
      </v-btn>
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-1 pb-0 px-0">
          <FxInHouseEventResultForm
            v-if="formVisible"
            ref="form"
            v-model="formData"
            class="px-6"
            :event-type="inHouseEvent.eventType"
            :left-name="myTeam.name"
            :right-name="opponentTeam.name"
            :disabled="loading"
            @submit="save"
            @cancel="formVisible = false"
          />
          <FxInHouseEventExistingResult v-else class="rounded" />
        </v-col>
      </v-row>
    </v-container>
  </FxInHouseEventItemCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import FxInHouseEventResultForm from '@/components/FxInHouseEventResultForm/FxInHouseEventResultForm'
import FxInHouseEventItemCard from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventItemCard'
import FxInHouseEventExistingResult
  from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventExistingResult/FxInHouseEventExistingResult'

export default {
  name: 'FxInHouseEventFResults',
  components: { FxInHouseEventExistingResult, FxInHouseEventItemCard, FxInHouseEventResultForm },
  data: () => ({
    formVisible: false,
    formData: {
      homeScore: '0',
      awayScore: '0',
    },
    loading: false,
  }),

  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      me: 'page/inHouseEvent/me',
      myTeam: 'page/inHouseEvent/myTeam',
      opponentTeam: 'page/inHouseEvent/opponentTeam',
      opponent: 'page/inHouseEvent/opponent',
      sport: 'page/inHouseEvent/sport',
      lead: 'page/inHouseEvent/lead',
      hasResult: 'page/inHouseEvent/hasResult',
      canAddOrEditResult: 'page/inHouseEvent/canAddOrEditResult',
      result: 'page/inHouseEvent/result',
    }),
  },

  created () {
    this.formData = cloneDeep(this.result)
    this.formVisible = !this.hasResult
  },

  methods: {
    ...mapActions({
      storeResult: 'page/inHouseEvent/saveResult',
    }),

    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('page/inHouseEvent/saveResult', this.formData)
        .then(() => {
          this.formVisible = false
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },

}
</script>
