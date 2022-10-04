<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row class="fill-height" no-gutters>
          <v-col
            cols="12"
            sm="5"
            md="5"
            lg="4"
            xl="3"
            class="school-panel pa-0"
          >
            <v-row class="fill-height" no-gutters>
              <v-col class="pt-16">
                <div>
                  <v-img class="mx-auto" width="185" :src="require('/static/logo_new.svg')" />
                </div>
                <div class="pt-16">
                  <v-timeline
                    light
                    dense
                  >
                    <v-timeline-item
                      v-for="(item, i) in items"
                      :key="i"
                      color="primary"
                      fill-dot
                    >
                      <template #icon>
                        <v-icon size="40" color="white">
                          mdi-adjust
                        </v-icon>
                      </template>
                      <v-row class="pt-1">
                        <v-col>
                          <strong class="text-subheading white--text">{{ item.title }}</strong>
                          <div class="text-p3 white--text">
                            {{ item.caption }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-timeline-item>
                  </v-timeline>
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
            <div class="mx-sm-auto sign-in-form" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'SignUpPage',
  layout: 'empty',
  middleware: ({ store, error }) => {
    if (!store.getters['context/isSignUpSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  computed: {
    items () {
      return [
        { title: 'Your details', caption: 'Please provide your name and email' },
        { title: 'Your school', caption: 'Find your school on fixturr' },
        { title: 'Choose a password', caption: 'Choose a secure password' },
        { title: 'Invite your team', caption: 'Add your sports department to fixturr' },
      ]
    },
  },
}
</script>

<style lang="scss">
@media only screen and (min-width: 600px) {
  .school-panel {
    height: 100%;
    background: var(--v-primary-base);
  }
  .sign-in-form {
    max-width: 400px
  }
}

.theme--light.v-timeline::before {
  background: white;
  margin-top: 50px;
  height: calc(100% - 100px);
}
.v-timeline-item__dot {
  background: none!important;
  box-shadow: none!important;
  height: 45px;
  width: 45px;
}
</style>
