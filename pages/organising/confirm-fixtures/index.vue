<template>
  <div>
    <h1 class="text-h4 text-md-h3 mb-6 neutral--text text--darken-4 font-weight-bold">
      Fixtures To Confirm
    </h1>

    <v-card
      v-for="(item, index) in items"
      :key="`confirm-${index}`"
      class="mb-3 fixture-to-confirm-card"
    >
      <FxFixtureToConfirmItem
        :me="item.me"
        :opponent="item.opponent"
        :event="items[index]"
      >
        <template #action>
          <v-btn outlined color="neutral darken-3" height="34" link :to="{ name: 'organising-confirm-fixtures-eventId', params: { eventId: item.id } }">
            View Event
          </v-btn>
        </template>
      </FxFixtureToConfirmItem>
    </v-card>

    <p v-if="!items.length" class="text-p3 neutral--text text--darken-3 mt-n4">
      Nothing to Confirm
    </p>

    <template v-if="rejected.length">
      <h1 class="text-h3 mt-9 mb-6 neutral--text text--darken-4">
        Rejected Fixtures
      </h1>

      <v-card
        v-for="(item, index) in rejected"
        :key="`rejected-${index}`"
        class="mb-3"
      >
        <FxFixtureRejected
          :context-school-id="contextSchoolId"
          :me.sync="item.me"
          :opponent="item.opponent"
          :event.sync="rejected[index]"
          @removed="removeRejected(index)"
          @dismissed="removeRejected(index)"
        />
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventStatus } from '~/enum'
import FxFixtureRejected from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureRejected.vue'
import FxFixtureToConfirmItem
  from '~/components/PageComponents/FxFixtureConfirmPage/components/FxFixtureToConfirmItem.vue'

export default {
  name: 'ConfirmFixtures',
  components: { FxFixtureToConfirmItem, FxFixtureRejected },

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canConfirmFixtures'],
  },

  data: () => ({
    loadingToConfirm: false,
    items: [],
    rejected: [],
  }),

  async fetch () {
    const [{ data }, { data: rejected }] = await Promise.all([
      this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: { status: EventStatus.PENDING },
      }),
      this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: { rejected: true },
      }),
    ])

    this.items = data

    this.rejected = rejected
  },

  head () {
    return {
      title: 'Fixtures To Confirm',
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },

  methods: {
    removeToConfirm (index) {
      this.items.splice(index, 1)
    },

    removeRejected (index) {
      this.rejected.splice(index, 1)
    },
  },
}
</script>
<style scoped>
.fixture-to-confirm-card {
  box-shadow: 0px 0px 10px 0px #dadfe6 !important;
  border: none!important;
}
</style>
