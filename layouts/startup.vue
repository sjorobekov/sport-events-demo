<template>
  <v-app>
    <v-main>
      <div class="fill-height d-sm-flex flex-column flex-sm-row justify-center align-center">
        <div class="school-panel d-flex flex-column align-center flex-shrink-1 justify-sm-space-between" :style="style">
          <div class="school-info">
            <div class="mb-3 mb-sm-5">
              <FxSchoolLogo class="school-logo-container" :value="contextSchool.logo" :color="contextSchool.color" />
            </div>
            <h1 v-balance-text class="text-sm-h1s text-h6 white--text text-center pb-5 font-weight-bold school-name">
              {{ contextSchool.name }}
            </h1>
          </div>

          <div>
            <div class="hidden-xs-only">
              <v-img class="mb-5" width="185" :src="require('/static/fixturr_logo_white.svg')" />
            </div>
          </div>
        </div>
        <div class="mx-sm-auto px-2 pt-2 pb-12 content-part d-flex align-center flex-grow-1 justify-center">
          <div class="content-wrap">
            <Nuxt />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'StartUpLayout',
  components: { FxSchoolLogo },
  middleware: ({ store, redirect }) => {
    if (store.getters['context/isSuperAdminSite']) {
      return redirect({ name: 'login' })
    }
  },
  data: () => ({
    image: null,
  }),
  async fetch () {
    this.image = (await this.$store.dispatch('api/schools/getImages', this.contextSchool.id))[0]
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      isMobileDevice: 'context/isMobile',
    }),

    style () {
      if (this.image) {
        return {
          backgroundImage: `url(${this.image.image})`,
          boxShadow: `inset 0 0 0 1000px ${this.contextSchool.color}e0`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      }

      return {
        backgroundColor: this.contextSchool.color,
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.v-main
  padding-top: 0!important

.school-panel
  width: 100%
  background-repeat: no-repeat!important
  padding-left: 32px
  padding-right: 32px

.school-logo-container
  display: block
  margin: 0 auto
  border-radius: 50%
  overflow: visible
  width: 220px
  height: 220px
  -webkit-filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white)
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white)

.school-info
  margin-top: auto
  margin-bottom: auto

.school-name
  max-width: 480px

@media #{map-get($display-breakpoints, 'xs-only')}

  .school-logo-container
    width: 200px
    height: 200px
  .content-wrap
    width: 100%

  .school-info
    margin-top: 20px
    padding-left: 24px
    padding-right: 24px

  @media screen and (max-device-height: 667px)
    .school-logo-container
      width: 120px
      height: 120px

@media #{map-get($display-breakpoints, 'sm-and-up')}
  .school-panel
    height: 100%
    max-width: 50vw
</style>
