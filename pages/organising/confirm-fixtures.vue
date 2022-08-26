<template>
  <div>
    <h1 class="mb-6 mt-16">
      Fixtures To Confirm
    </h1>

    <v-card
      v-for="(item, index) in items"
      :key="index"
      class="mb-3"
    >
      <FxFixtureToConfirm
        :context-school-id="contextSchoolId"
        :me.sync="item.me"
        :opponent="item.opponent"
        :event.sync="items[index]"
        @accepted="remove(index)"
        @rejected="remove(index)"
      />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventStatus } from '@/enum'
import FxFixtureToConfirm from '@/components/FxFixtureToConfirm/FxFixtureToConfirm'

export default {
  name: 'ConfirmFixtures',
  components: { FxFixtureToConfirm },

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canConfirmFixtures'],
  },
  data: () => ({
    items: [],
    rejected: [],
  }),

  async fetch () {
    const { data } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: { status: EventStatus.PENDING },
    })

    this.items = data
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },

  methods: {
    remove (index) {
      this.items.splice(index, 1)
    },
  },
}
</script>
