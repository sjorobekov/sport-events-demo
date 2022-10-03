<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row align-sm="center" justify-sm="center" class="fill-height" no-gutters>
          <v-col
            cols="12"
            sm="5"
            md="5"
            lg="4"
            xl="3"
            :style="style"
            class="school-panel pa-0"
          >
            <v-row align="center" justify="center" class="fill-height" no-gutters>
              <v-col>
                <div>
                  <v-avatar size="220" color="white" class="mt-8 mb-10 mx-auto d-block">
                    <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" />
                  </v-avatar>
                  <h1 class="text-h1s white--text text-center">
                    {{ contextSchool.name }}
                  </h1>
                  <h2 class="text-h1s white--text text-center d-none d-sm-block" style="margin-top: 334px">
                    fixturr
                  </h2>
                  <h2 class="text-p1 font-weight-medium white--text text-center mt-4 d-block d-sm-none">
                    Sports Portal
                  </h2>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="7"
            md="7"
            lg="8"
            xl="9"
            class="pa-2"
          >
            <div class="mx-sm-auto sign-in-form">
              <Nuxt />
            </div>
          </v-col>
        </v-row>
      </v-container>
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
@media only screen and (min-width: 600px) {
  .school-panel {
    height: 100%;
  }
  .sign-in-form {
    max-width: 400px
  }
}
</style>
