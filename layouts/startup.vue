<template>
  <v-app>
    <v-main>
      <div class="fill-height d-flex flex-column flex-md-row justify-center align-center">
        <div class="fill-height school-panel d-flex flex-column align-center justify-space-around" :style="style">
          <div>
            <div class="school-logo mt-2 mt-md-8 mb-2 mb-md-10 mx-auto d-block">
              <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" />
            </div>
            <h1 class="text-md-h1s text-h3s white--text text-center">
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
        <div class="mx-sm-auto px-2 py-2 content-part d-flex align-center justify-center">
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

<style lang="scss" scoped>
.school-logo {
  width: 220px;
  height: 220px;
  min-width: 220px;
  border-radius: 50%;
  background-color: white;
}
.content-wrap {
  width: 100%;
}
@media screen and (max-height: 667px) {
  .school-logo {
    width: 170px!important;
    height: 170px!important;
    min-width: 170px!important;
  }
}
@media only screen and (min-width: 960px) {
  .school-panel {
    width: 400px;
  }
  .content-part {
    max-width: 400px
  }
}
@media only screen and (max-width: 959px) {
  .school-panel {
    width: 100%;
  }
  .content-part {
    height: 100%;
    width: 100%;
    max-width: 100%;
  }
  .content-wrap {
    max-width: 600px!important;
  }
}
</style>
