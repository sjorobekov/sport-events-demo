<template>
  <nuxt-link v-ripple exact class="d-block text-decoration-none pt-4 pb-4 px-8 fx-announcement-item" :to="to">
    <div class="text-p1 font-weight-bold info--text text--darken-3 line-clamp-2 mb-2">
      {{ announcement.subject }}
    </div>
    <div class="text-caption info--text line-clamp-2">
      {{ announcement.body }}
    </div>

    <v-list-item class="px-0">
      <v-list-item-avatar size="20" class="mr-2">
        <FxAvatar size="20" :value="announcement.user.avatar" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-caption info--text">
          {{ announcement.user.firstname }} {{ announcement.user.lastname }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text class="text-caption info--text text-capitalize">
          {{ date }}
        </v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
    <slot name="actions" />
  </nuxt-link>
</template>

<script>
import { DateTime } from 'luxon'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxAnnouncementListItem',
  components: { FxAvatar },
  props: {
    to: {
      type: Object,
      required: true,
    },
    announcement: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date () {
      return DateTime.fromISO(this.announcement.createdAt).toRelativeCalendar()
    },
  },

}
</script>

<style scoped>

.line-clamp-2 {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
</style>

<style>
.fx-announcement-item.nuxt-link-active {
  box-shadow: inset -4px 0 0 0 var(--v-primary-base);
  background: var(--v-info-lighten3);
}
</style>
