<template>
  <v-app>
    <v-img class="ellipse-left-top" :src="require('@/assets/img/ellipse-left-top.svg')" width="220" height="220" />
    <v-img class="ellipse-right-bottom" :src="require('@/assets/img/ellipse-right-bottom.svg')" width="220" height="220" />
    <v-img class="logo" :src="require('@/assets/img/logo_light.svg')" width="249" />

    <v-main>
      <div class="d-flex align-center justify-center fill-height">
        <div class="content mx-2">
          <template v-if="!school">
            <h1 class="text-h1 primary--text text-center">
              Find My School
            </h1>

            <h2 class="text-subheading primary--text mt-4 text-center mb-8">
              Type your school name to find your Fixturr Portal
            </h2>

            <v-autocomplete
              v-model="selected"
              class="mb-6"
              outlined
              placeholder="School Name"
              :items="items"
              :search-input.sync="search"
              item-value="id"
              item-text="name"
              hide-details
              return-object
              height="56"
            >
              <template #item="{ item }">
                <template v-if="(typeof item !== 'object')">
                  <v-list-item-content v-text="item" />
                </template>
                <template v-else>
                  <FxSchoolItem :item="item" />
                </template>
              </template>
            </v-autocomplete>

            <v-btn
              depressed
              color="brand3"
              height="56"
              block
              dark
              @click="next"
            >
              Next
            </v-btn>
          </template>
          <template v-else>
            <div class="mb-10 text-center">
              <FxSchoolLogo :value="school.logo" :color="school.color" :alt="school.name" size="160" />
            </div>
            <h1 class="text-h1 primary--text text-center">
              {{ school.name }}
            </h1>

            <h2 class="text-subheading primary--text mt-4 text-center mb-8">
              <span v-if="school.city">{{ school.city }},</span> <FxCountryName :code="school.country" />
            </h2>

            <v-btn
              v-if="school.portal"
              link
              :href="school.portalUrl"
              depressed
              color="brand3"
              height="56"
              block
              dark
            >
              Go To Sports Portal <v-icon class="ml-2 mr-0" size="16">
                mdi-arrow-right
              </v-icon>
            </v-btn>

            <h3 v-else class="message primary--text text-center">
              This school is in our database, but it doesn't have an active Fixturr portal.
            </h3>

            <v-btn text color="primary" block class="mt-10" @click="school = null">
              <v-icon size="16">
                mdi-arrow-left
              </v-icon> Go Back To Find My School
            </v-btn>
          </template>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'FindMySchoolPage',
  layout: 'empty',

  middleware: ({ store, error }) => {
    if (!store.getters['context/isFindMySchoolSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data: () => ({
    search: '',
    items: [],
    school: null,
    selected: null,
  }),
  head: () => ({
    title: 'Find My School',
  }),

  watch: {
    search (val) {
      this.query(val)
    },
  },

  methods: {
    async query (search) {
      const { data } = await this.$store.dispatch('api/schools/list', {
        search,
      })

      this.items = data
    },
    next () {
      if (!this.selected) {
        return
      }
      this.school = this.selected
    },
  },
}
</script>

<style scoped>

.ellipse-left-top {
  position: fixed;
  left: 0;
  top: 0;
}

.ellipse-right-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
}

.content {
  display: inline-block;
  max-width: 425px;
}

.logo {
  position: fixed;
  bottom: 86px;

  left: 50%;
  transform: translate(-50%, 0);
}

.message {
  font-size: 32px;
  line-height: 46px;
  font-weight: 400;
}
</style>
