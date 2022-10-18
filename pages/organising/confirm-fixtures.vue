<template>
  <div>
    <h1 class="text-h3 mb-6 mt-16">
      Fixtures To Confirm
    </h1>

    <v-card
      v-for="(item, index) in items"
      :key="`confirm-${index}`"
      class="mb-3"
    >
      <FxFixtureToConfirm
        :context-school-id="contextSchoolId"
        :me.sync="item.me"
        :opponent="item.opponent"
        :event.sync="items[index]"
        @accepted="removeToConfirm(index)"
        @rejected="removeToConfirm(index)"
      />
    </v-card>

    <p v-if="!items.length" class="text--disabled">
      Nothing to Confirm
    </p>

    <template v-if="rejected.length">
      <h1 class="text-h3 mt-9 mb-6">
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
import { EventStatus } from '@/enum'
import FxFixtureToConfirm from '@/components/FxFixtureToConfirm/FxFixtureToConfirm'
import FxFixtureRejected from '@/components/FxFixtureToConfirm/FxFixtureRejected'

export default {
  name: 'ConfirmFixtures',
  components: { FxFixtureRejected, FxFixtureToConfirm },

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
