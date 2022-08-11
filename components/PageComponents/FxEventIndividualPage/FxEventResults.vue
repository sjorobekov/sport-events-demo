<template>
  <FxEventItemCard>
    <template #title>
      {{ title }}
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
          <FxEventResultForm
            v-if="formVisible"
            ref="form"
            v-model="formData"
            class="px-6"
            :event-type="event.eventType"
            :left-name="myTeam.name"
            :right-name="opponentTeam.name"
            :disabled="loading"
            @submit="save"
            @cancel="formVisible = false"
          />
          <FxEventExistingResult v-else />
        </v-col>
      </v-row>
    </v-container>
  </FxEventItemCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import FxEventResultForm from '@/components/FxEventResultForm/FxEventResultForm'
import FxEventItemCard from '@/components/PageComponents/FxEventIndividualPage/FxEventItemCard'
import FxEventExistingResult
  from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult/FxEventExistingResult'
import { EventType } from '@/enum'

const TITLE = {
  [EventType.FIXTURE]: 'Result',
  [EventType.TOURNAMENT]: 'Results',
  [EventType.MULTI_EVENT]: 'Results',
}

export default {
  name: 'FxEventFResults',
  components: { FxEventExistingResult, FxEventItemCard, FxEventResultForm },
  data: () => ({
    formVisible: false,
    formData: {
      results: [
        {},
      ],
    },
    loading: false,
  }),

  computed: {
    ...mapGetters({
      event: 'page/event/event',
      me: 'page/event/me',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      opponent: 'page/event/opponent',
      sport: 'page/event/sport',
      lead: 'page/event/lead',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
      canAddOrEditResult: 'page/event/canAddOrEditResult',
    }),
    title () {
      return TITLE[this.event.eventType] || 'Results'
    },
  },

  created () {
    this.formData = cloneDeep(this.result)
    this.formVisible = !this.hasResult
  },

  methods: {
    ...mapActions({
      storeResult: 'page/event/saveResult',
    }),

    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('page/event/saveResult', this.formData)
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
