<template>
  <nuxt-link v-ripple exact class="d-block text-decoration-none py-6 px-3 px-md-8 fx-announcement-item" :to="to">
    <div class="d-flex">
      <div class="flex-shrink-1 pr-2 hidden-md-and-up">
        <v-icon color="#adadad">
          $vuetify.icons.bullhorn
        </v-icon>
      </div>
      <div class="flex-grow-1">
        <div class="custom-font-size font-weight-bold info--text text--darken-3 line-clamp-2 mb-2 f">
          {{ announcement.subject }}
        </div>
        <div class="custom-font-size info--text line-clamp-2 text-fade">
          {{ announcement.body }}
        </div>
      </div>
    </div>

    <v-list-item class="px-0 mb-n2">
      <v-list-item-avatar size="20" class="mr-2">
        <FxAvatar size="20" :value="announcement.user.avatar" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="custom-font-size info--text">
          {{ announcement.user.firstname }} {{ announcement.user.lastname }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text class="custom-font-size info--text text-capitalize">
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
  background: var(--v-info-lighten3);
}

.custom-font-size {
  font-size: 0.975rem;
  line-height: 1.25rem
}
</style>
