<template>
  <v-card outlined flat>
    <v-card-title class="text-h4s">
      Customisation
    </v-card-title>

    <v-card-title class="text-p3 font-weight-bold">
      Home Page Images
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="text-p2 info--text">
          Image should be 100 x 100px. <br>
          Transparent PNG or SVG recommended. JPG and GIF are also supported
        </v-col>
        <v-col cols="12" md="7" />
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold">
      School Logo
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="text-p2 info--text">
          Image should be 100 x 100px. <br>
          Transparent PNG or SVG recommended. JPG and GIF are also supported
        </v-col>
        <v-col cols="12" md="7" />
      </v-row>
    </v-container>
    <v-card-title class="text-p3 font-weight-bold">
      School Colour
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="text-p2 info--text">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </v-col>
        <v-col cols="12" md="7">
          <FxCustomizationSchoolColorForm
            ref="colorForm"
            v-model="colorForm.color"
            :disabled="colorFormLoading"
            :loading="colorFormLoading"
            @save="saveColor"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import FxCustomizationSchoolColorForm from '@/components/FxCustomization/FxCustomizationSchoolColorForm'

export default {
  name: 'SchoolCustomisationPage',
  components: {
    FxCustomizationSchoolColorForm,
  },
  layout: 'admin',

  data: () => ({
    colorForm: {},
    colorFormLoading: false,
  }),

  computed: {
    ...mapGetters({
      school: 'admin/page/school/school',
    }),
  },

  created () {
    this.colorForm = {
      ...this.school,
    }
  },

  methods: {
    saveColor () {
      this.colorFormLoading = true
      this.$store.dispatch('api/schools/saveColor', this.colorForm)
        .catch(() => {
          this.$toast.error('Unknown error')
        })
        .finally(() => {
          this.colorFormLoading = false
        })
    },
  },
}
</script>
