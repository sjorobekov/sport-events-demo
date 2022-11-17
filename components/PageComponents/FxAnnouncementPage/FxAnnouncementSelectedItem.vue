<template>
  <v-card tile class="pa-4" color="info lighten-3">

    <v-card tile color="info lighten-5" class="px-3 pt-5">
    
    <v-card-title class="text-h4 font-weight-bold">
      <v-icon size="20">
          $vuetify.icons.announcement
        </v-icon>
      <v-col>
        {{ item.subject }}
      </v-col>

      </v-col>
      
    </v-card-title>

    <v-card-text class="pb-0 d-flex">
      <div class="flex-shrink-1 flex-grow-0 pr-6">
        <v-list-item class="px-0">
          <v-list-item-avatar size="20" class="mr-2">
            <FxAvatar size="20" :value="user.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-caption info--text">
              {{ user.firstname }} {{ user.lastname }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <div class="flex-shrink-1 flex-grow-0">
        <v-list-item class="px-0">
          <v-list-item-icon size="20" class="mr-1">
            <v-icon size="20">
              $vuetify.icons.calendarOutline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption info--text">
              {{ date }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card-text>

    <v-card-text>
      {{ item.body }}
      <slot name="actions" />
    </v-card-text>

  </v-card>
  </v-card>
</template>

<script>
import { DateTime } from "luxon";
import FxAvatar from "@/components/FxAvatar/FxAvatar";

export default {
  name: "FxAnnouncementSelectedItem",
  components: { FxAvatar },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    user() {
      return this.item.user || {};
    },

    date() {
      return DateTime.fromISO(this.item.createdAt).toFormat("dd/MM/yyyy");
    },
  },
};
</script>
