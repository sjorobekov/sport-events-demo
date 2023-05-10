<template>
  <v-app class="custom-background">
    <v-main>
      <div class="d-flex align-center justify-center fill-height pt-8">
        <div class="content-container mx-2 px-4 px-sm-8 find-my-school-card d-flex align-center justify-center">
          <div class="logo-container pa-4">
            <v-img class="fixturr-logo" :src="require('@/assets/img/logo_light.svg')" width="180" />
          </div>
          <div class="content py-4 mt-4">
            <template v-if="!school">
              <h1 class="text-h3 branddark--text text-center">
                Find My School
              </h1>

              <h2 class="text-subheading text-center mb-8 find-school-subheading">
                Please type your school name below/select from the list:
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
                prepend-inner-icon="mdi-magnify"
                color="brandgreen"
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
                color="brandgreen"
                height="56"
                block
                dark
                class="find-school-button"
                @click="next"
              >
                Next
              </v-btn>
            </template>
            <template v-else>
              <div class="mb-5 text-center">
                <FxSchoolLogo class="d-inline-block" :value="school.logo" :color="school.color" :alt="school.name" size="160" />
              </div>
              <h1 class="text-h3 branddark--text text-center">
                {{ school.name }}
              </h1>

              <h2 class="text-subheading brandtext--text text-center mb-8 find-school-subheading">
                <span v-if="school.city">{{ school.city }},</span> <FxCountryName :code="school.country" />
              </h2>

              <v-btn
                v-if="school.portal"
                link
                :href="school.portalUrl"
                depressed
                color="brandgreen"
                height="56"
                block
                dark
                class="find-school-button"
              >
                Go To Sports Portal <v-icon class="ml-2 mr-0" size="16">
                  mdi-arrow-right
                </v-icon>
              </v-btn>

              <h3 v-else class="message branddark--text text-center">
                This school is in our database, but it doesn't have an active Fixturr portal.
              </h3>

              <v-btn text color="branddark" block class="mt-8" @click="school = null">
                <v-icon size="16" color="brandgreen">
                  mdi-arrow-left
                </v-icon> Go Back To Find My School
              </v-btn>
            </template>
          </div>
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

.content-container {
  display: inline-block;
  max-width: 492px;
  width: 100%;
  position: relative;
  min-height: 492px;
}

.logo-container {
  position: absolute;
  left: 50%;
  top: -50px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  transform: translateX(-50%);
  border-radius: 4px;
  border: 2px solid #ffffff;
  min-height: 86px;
}

.content {
  width: 100%;
}

.message {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
}

.custom-background {
  background-image: linear-gradient(rgba(51,60,78,0.90),rgba(51,60,78,0.90)),url(@/assets/img/log-in-background.png)!important;
    background-size: auto,cover!important;
    background-color: #333c4e!important;
    background-position: center!important;
    background-repeat: no-repeat!important;
}

.find-my-school-card {
  background: white;
  border-radius: 8px;
  border: solid 2px #ebebeb;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.04);
}
.find-school-subheading {
  color: rgba(51,60,78,0.8);
}
.theme--light.v-btn:hover::before {
  opacity: 0!important;
}
.v-btn:hover {
  box-shadow: none!important;
}

.find-school-button {
  border: 2px solid rgba(255,255,255,0.25)!important;
  border-radius: 8px;
  box-shadow: 0px 10px 20px -15px rgb(0 0 0 / 50%)!important;
}
</style>
