<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Staff"
    :items="users"
    :item-text="fullname"
    item-value="id"
    :value="value"
    prepend-inner-icon="mdi-account-filter-outline"
    :class="{ 'staff-filter': value.length > 0 }"
    @input="$emit('input', $event)"
  >
    <template #selection="{ index }">
      <v-chip v-show="index === 0">
        {{ value.length }} selected <v-icon size="18" @click.stop="$emit('input', [])">
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
    <template #item="{ item, on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-action class="mr-2">
          <v-checkbox :input-value="attrs.inputValue" />
        </v-list-item-action>
        <v-list-item-avatar size="24" class="mr-2">
          <FxAvatar size="24" :value="item.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.firstname }} {{ item.lastname }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxCalendarStaffFilter',
  components: { FxAvatar },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    users: [],
  }),

  async fetch () {
    await this.fetchItems()
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  watch: {
    items: {
      deep: true,
      async handler () {
        await this.fetchItems()
      },
    },
  },

  methods: {
    fullname (item) {
      return `${item.firstname} ${item.lastname}`
    },

    async fetchItems () {
      this.users = await Promise.all(this.items.filter(id => !!id).map((id) => {
        return this.$store.dispatch('api/users/fetch', {
          id,
          schoolId: this.schoolId,
        })
      }))
    },
  },
}
</script>

<style scoped>
 .staff-filter /deep/ input {
  display: none;
}
</style>
