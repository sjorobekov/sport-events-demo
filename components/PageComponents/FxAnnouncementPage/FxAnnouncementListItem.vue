<template>
  <nuxt-link :ripple="false" exact class="d-block text-decoration-none pt-4 pb-2 px-3 px-md-4 fx-announcement-item" :to="to">
    <div class="d-flex">
      <div class="flex-grow-1">
        <div class="text-p2 font-weight-bold neutral--text text--darken-4 line-clamp-2 mb-2 f">
          {{ announcement.subject }}
        </div>
        <div class="text-p1 neutral--text text--darken-2 line-clamp-2 text-fade">
          {{ announcement.body }}
        </div>
      </div>
    </div>

    <v-list-item class="px-0 mb-0 py-0">
      <v-list-item-avatar size="20" class="mr-2 py-0">
        <FxAvatar size="20" :value="announcement.user.avatar" />
      </v-list-item-avatar>
      <v-list-item-content class="py-0">
        <v-list-item-title class="text-caption neutral--text text--darken-2 py-0">
          {{ announcement.user.firstname }} {{ announcement.user.lastname }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text class="text-caption neutral--text text--darken-2 text-capitalize py-0">
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

@media screen and (max-width: 600px) {
  .text-fade {
    -webkit-mask-image: linear-gradient(180deg, #000 15%, transparent);
  }
}
</style>

<style>
.fx-announcement-item.nuxt-link-active {
  box-shadow: inset -4px 0 0 0 var(--v-primary-base);
  background: var(--v-neutral-lighten2);
}
.fx-announcement-item:hover {
  background: var(--v-neutral-lighten2);
}
.custom-font-size {
  font-size: 0.875rem;
  line-height: 1.25rem
}
</style>
