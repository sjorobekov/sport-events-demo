<template>
  <FxEventItemCard>
    <template #title>
      Results
    </template>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <FxEventResultForm
            v-model="formData"
            :event-type="event.eventType"
            :left-name="myTeam.name"
            :right-name="opponentTeam.name"
            @submit="storeResult($event)"
          />
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

export default {
  name: 'FxEventFResults',
  components: { FxEventItemCard, FxEventResultForm },
  data: () => ({
    formData: {
      results: [
        {},
      ],
    },
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
    }),
  },

  created () {
    this.formData = cloneDeep(this.result)
  },

  methods: {
    ...mapActions({
      storeResult: 'page/event/saveResult',
    }),
  },

}
</script>
