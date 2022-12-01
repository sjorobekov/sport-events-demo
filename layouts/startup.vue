<template>
  <v-app>
    <v-main>
      <div class="fill-height d-sm-flex flex-column flex-sm-row justify-center align-center">
        <div class="school-panel d-flex flex-column align-center flex-shrink-1 justify-sm-space-around" :style="style">
          <div class="pt-2 pt-sm-0">
            <div class="school-logo-container mb-4">
              <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" />
            </div>
            <h1 class="text-md-h1s text-h6 white--text text-center">
              {{ contextSchool.name }}
            </h1>
          </div>

          <div>
            <div class="hidden-sm-and-down">
              <v-img class="mx-auto" width="185" :src="require('/static/logo_new.svg')" />
            </div>
            <h2 class="text-p1 font-weight-medium white--text text-center mt-4 mb-2 hidden-md-and-up">
              Sports Portal
            </h2>
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
  width: 400px
.school-logo-container
  display: block
  margin: 0 auto
  border-radius: 50%
  overflow: hidden
  background-color: white
  width: 220px
  height: 220px

@media #{map-get($display-breakpoints, 'xs-only')}
  .school-panel
    width: 100%
    border-bottom: 4px solid var(--v-info-lighten2)
  .school-logo-container
    width: 200px
    height: 200px
  .content-wrap
    width: 100%

  @media screen and (max-device-height: 667px)
    .school-logo-container
      width: 120px
      height: 120px

@media #{map-get($display-breakpoints, 'sm-and-up')}
  .school-panel
    height: 100%
    max-width: 50vw
</style>
