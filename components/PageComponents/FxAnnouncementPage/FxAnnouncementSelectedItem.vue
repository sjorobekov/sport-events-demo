<template>
  <v-card class="px-0 px-md-3 py-3 pt-md-5 d-flex">
    <div class="flex-shrink-1">
      <slot name="icon" />
    </div>
    <div class="flex-grow-1">
      <v-card-title class="text-h4 font-weight-bold py-1 neutral--text text--darken-5" style="word-break: break-word">
        {{ item.subject }}
      </v-card-title>

      <v-card-text class="pb-0 d-flex justify-space-between justify-md-start">
        <div class="flex-shrink-1 flex-grow-0 pr-6">
          <v-list-item class="px-0">
            <v-list-item-avatar size="24" class="mr-2">
              <FxAvatar size="24" :value="user.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p1 neutral--text text--darken-2">
                <FxUserDisplayName :user="user" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div class="flex-shrink-1 flex-grow-0">
          <v-list-item class="px-0">
            <v-list-item-avatar size="24" class="mr-2 announcement-calendar-icon">
              <v-icon size="24" color="neutral">
                $vuetify.icons.calendar-small
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p1 neutral--text text--darken-2">
                {{ date }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card-text>

      <v-card-text class="text-p2 neutral--text text--darken-3 py-1 announcement-text">
        {{ item.body }}
        <slot name="actions" />
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import { DateTime } from 'luxon'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'FxAnnouncementSelectedItem',
  components: { FxAvatar },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    user () {
      return this.item.user || {}
    },

    date () {
      return DateTime.fromISO(this.item.createdAt).toFormat('dd/MM/yyyy')
    },
  },
}
</script>

<style scoped>
.announcement-calendar-icon {
  border-radius: 0!important;
}
.announcement-text {
  line-height: 1.5;
}
</style>
