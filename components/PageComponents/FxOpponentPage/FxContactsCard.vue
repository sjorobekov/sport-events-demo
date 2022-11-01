<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                Sports Contacts
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col v-for="contact in contacts" :key="contact.id" cols="12" class="border-bottom border-right pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-avatar class="mr-2">
              <FxAvatar size="22" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ contact.name }}
                <v-icon v-if="contact.main">
                  mdi-star
                </v-icon>
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                {{ contact.role }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                depressed
                color="primary"
                link
                icon
              >
                <v-icon>mdi-phone-in-talk</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                depressed
                color="primary"
                link
                icon
              >
                <v-icon>mdi-email-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'FxContactsCard',
  props: {
    opponentId: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    contacts: [
      { id: 1, name: 'Miracle Herwitz', role: 'Sports Contact', main: true },
      { id: 2, name: 'Miracle Herwitz', role: 'Sports Contact' },
      { id: 3, name: 'Miracle Herwitz', role: 'Sports Contact' },
    ],
  }),
}
</script>
