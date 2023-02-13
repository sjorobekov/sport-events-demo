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
      <div class="team-name text-center px-2 px-md-6">
        <span>{{ name }}</span>
      </div>
    </v-card>
    <FxOpponentTabulatedContent :show-tabs="isMobile">
      <template #details>
        <FxOpponentCard :opponent="item" :school="school" />
      </template>
      <template #contacts>
        <FxContactsCard />
      </template>
      <template #map>
        <FxMapCard :coordinates="coordinates" />
      </template>
      <template #portal>
        <v-list-item class="px-0">
          <v-list-item-action>
            <v-btn
              v-if="school && school.portal"
              depressed
              outlined
              color="primary"
              link
              :href="school.portalUrl"
            >
              <v-icon>mdi-link-variant</v-icon>
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
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      isMobileDevice: 'context/isMobile',
    }),
    opponentId () {
      return this.$route.params.opponentId
    },
    school () {
      return this.item?.opponentSchool || null
    },
    schoolId () {
      return this.school?.id
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
      return this.school?.name
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
</style>
