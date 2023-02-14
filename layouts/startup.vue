<template>
  <v-app>
    <v-main>
      <div class="fill-height d-sm-flex flex-column flex-sm-row justify-center align-center">
        <div class="school-panel d-flex flex-column align-center flex-shrink-1 justify-sm-space-between" :style="style">
          <div class="school-info">
            <div class="school-logo-container mb-5 mb-sm-5">
              <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" />
            </div>
            <h1 class="text-sm-h1s text-h6 white--text text-center pb-5">
              {{ contextSchool.name }}
            </h1>
          </div>

          <div>
            <div class="hidden-xs-only">
              <v-img class="mb-5" width="185" :src="require('/static/logo.svg')" />
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
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),

    style () {
      return {
        background: this.contextSchool.color,
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
  width: calc(100% - 48px)
  background-image: url('../assets/img/fixturr-bg-icon.svg')!important
  background-repeat: no-repeat!important
  background-position: 100% 95%!important
  background-size: contain!important
  margin-top: auto
  margin-bottom: auto
  border-radius: 64px
  margin-left: 2.5%
  box-shadow: 0px 0px 16px rgba(255, 255, 255, 0.8)!important
  padding-left: 32px
  padding-right: 32px
.school-logo-container
  display: block
  margin: 0 auto
  border-radius: 50%
  overflow: hidden
  background-color: white
  width: 220px
  height: 220px
  box-shadow: 0px 1px 16px 5px rgba(255, 255, 255, 0.15)

.school-info
  margin-top: auto
  margin-bottom: auto

@media #{map-get($display-breakpoints, 'xs-only')}
  .school-panel
    width: calc(100% - 24px)
    margin-top: 12px
    margin-left: auto
    margin-right: auto
    border-radius: 32px
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
    height: calc(100% - 48px)
    max-width: 50vw
</style>
