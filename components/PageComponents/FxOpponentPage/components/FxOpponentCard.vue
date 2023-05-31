<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="border-bottom pt-1 pb-0 hidden-sm-and-down">
          <v-list-item class="px-0">
            <v-list-item-avatar v-if="school" color="white" size="44">
              <FxSchoolLogo :value="school.logo" :color="school.color" :size="44" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-p2 neutral--text text--darken-5">
                {{ name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="school && school.portal"
                depressed
                outlined
                color="neutral darken-2"
                link
                :href="school.portalUrl"
                :ripple="false"
              >
                Sports Portal
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-icon class="mr-3">
              <v-icon>$vuetify.icons.location-1</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-p2 neutral--text text--darken-3">
                {{ opponent.address }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                Address
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col v-if="school" cols="12" class="border-bottom pt-1 pb-0">
          <v-list-item class="px-0">
            <v-list-item-icon class="mr-3">
              <v-icon>$vuetify.icons.link-1</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-p2 neutral--text text--darken-3">
                {{ school.website }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                Website
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'FxOpponentCard',
  props: {
    opponent: {
      type: Object,
      default: undefined,
    },
    school: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    name () {
      return this.school ? this.school.name : this.opponent.name
    },
  },
}
</script>
