<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0 hidden-sm-and-down">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="text-p2 neutral--text text--darken-4">
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
              <v-list-item-title class="text-p2 neutral--text text--darken-4">
                {{ contact.displayName }}
                <v-icon v-if="contact.main">
                  mdi-star
                </v-icon>
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                {{ contact.jobRole }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                depressed
                color="primary"
                link
                icon
                :ripple="false"
              >
                <a class="text-decoration-none" :href="`tel:${contact.phone}`">
                  <v-icon color="primary">$vuetify.icons.phone-fill</v-icon>
                </a>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                depressed
                color="primary"
                link
                icon
                :ripple="false"
              >
                <a class="text-decoration-none" :href="`mailto:${contact.email}`">
                  <v-icon color="primary">$vuetify.icons.mail-fill</v-icon>
                </a>
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
    contacts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
