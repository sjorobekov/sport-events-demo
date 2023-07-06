<template>
  <div>
    <v-card v-if="isMobile" class="d-flex flex-column py-5 opponent-mobile">
      <FxSchoolLogo
        class="mx-auto mb-2"
        size="64"
        :value="logo"
        :alt="name"
        :color="color"
      />
      <div class="team-name text-center px-2 px-md-6 neutral--text text--darken-4">
        <span>{{ name }}</span>
      </div>
    </v-card>
    <FxOpponentTabulatedContent :show-tabs="isMobile" :show-contacts="contacts.length">
      <template #details>
        <FxOpponentCard :opponent="opponent" :school="school" />
      </template>
      <template #contacts>
        <FxContactsCard :contacts="contacts" />
      </template>
      <template #map>
        <FxMapCard :coordinates="coordinates" />
      </template>
      <template #portal>
        <v-list-item class="px-0">
          <v-list-item-action class="full-width-btn d-block mr-0">
            <v-btn
              v-if="school && school.portal"
              depressed
              outlined
              color="neutral darken-3"
              link
              :href="school.portalUrl"
              class="full-width-btn"
              height="56"
            >
              <v-icon color="neutral darken-1">
                $vuetify.icons.link-1
              </v-icon>
              Sports Portal
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </FxOpponentTabulatedContent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxOpponentCard from './FxOpponentCard.vue'
import FxContactsCard from './FxContactsCard.vue'
import FxMapCard from './FxMapCard.vue'
import FxOpponentTabulatedContent from './FxOpponentTabulatedContent.vue'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo.vue'

export default {
  name: 'FxOpponentSelectedItem',
  components: {
    FxOpponentCard,
    FxContactsCard,
    FxMapCard,
    FxOpponentTabulatedContent,
    FxSchoolLogo,
  },

  computed: {
    ...mapGetters({
      isMobileDevice: 'context/isMobile',
      opponent: 'page/opponent/opponent',
      contacts: 'page/opponent/contacts',
    }),
    school () {
      return this.opponent?.opponentSchool || null
    },
    coordinates () {
      return this.school?.coordinates || null
    },
    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }
      return this.isMobileDevice
    },
    name () {
      return this.school ? this.school.name : this.opponent?.name
    },
    logo () {
      return this.school?.logo
    },
    color () {
      return this.school?.color
    },
  },
}
</script>

<style scoped lang="sass">
.team-name
  font-size: 1.4375rem
  line-height: 1.3rem
  font-family: ProximaNova-Semibold, sans-serif

.opponent-mobile.v-card
  border-radius: 0!important
  border: 0!important
.full-width-btn
  width: 100%
</style>
