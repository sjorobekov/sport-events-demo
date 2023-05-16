<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                Sport & Season
              </template>
              <template #content>
                Select the sport and season for this competition
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col cols="6">
                <label for="sport">Sport</label>
                <v-autocomplete
                  id="sport"
                  v-async-validate
                  :async-rules="[$rule.required]"
                  outlined
                  dense
                  :value="formData.sportId"
                  :items="sports"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Sport"
                  @input="update('sportId', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label for="season">Season</label>
                <v-autocomplete
                  id="season"
                  v-async-validate
                  :async-rules="[$rule.required]"
                  outlined
                  dense
                  :value="formData.seasonId"
                  :items="seasons"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Season"
                  @input="update('seasonId', $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <slot name="alert" />

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                2
              </template>
              <template #title>
                Competition Name
              </template>
              <template #content>
                Enter a name for this competition.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="6" class="my-0 py-0">
                <label for="competitionName">Competition Name</label>
                <v-text-field
                  id="competitionName"
                  v-async-validate
                  :value="formData.name"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="120"
                  placeholder="Select Competition Name"
                  @input="update('name', $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                3
              </template>
              <template #title>
                Lead Staff Member
              </template>
              <template #content>
                Select the member of staff responsible for leading this competition.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="6" class="mt-0 pt-0">
                <label for="lead">Lead Staff Member</label>
                <FxUserSelect id="lead" placeholder="Select Lead Staff Member" :school-id="schoolId" :value="formData.leadId" @input="update('leadId', $event)" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                4
              </template>
              <template #title>
                Competition Photo (Optional)
              </template>
              <template #content>
                File Types Accepted: jpeg, png, webp
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="6" class="mt-0 pt-0">
                <label>Upload Image</label>
                <v-file-input
                  accept="image/*"
                  outlined
                  dense
                  :prepend-icon="null"
                  prepend-inner-icon="$vuetify.icons.upload-button"
                  @change="uploadHandler"
                />
                <v-img
                  v-if="image"
                  max-height="200"
                  :src="image"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                5
              </template>
              <template #title>
                Competition Privacy Settings
              </template>
              <template #content>
                Choose whether you want this competition, and the related fixtures, events and results to be published to the sports website.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" class="mt-0 pt-0">
                <label>Publish Competition to Sports Portal</label>
                <v-radio-group
                  :value="formData.publishCompetition"
                  mandatory
                  class="mt-0"
                  @change="update('publishCompetition', $event)"
                >
                  <v-radio
                    v-for="opt in publishCompetitionOptions"
                    :key="opt.value"
                    :label="opt.text"
                    :value="opt.value"
                  />
                </v-radio-group>
              </v-col>
              <v-col cols="12" class="mt-0 pt-0">
                <label>Publish Results to Sports Portal</label>
                <v-radio-group
                  :value="formData.publishResults"
                  mandatory
                  class="mt-0"
                  @change="update('publishResults', $event)"
                >
                  <v-radio
                    v-for="opt in publishResultsOptions"
                    :key="opt.value"
                    :label="opt.text"
                    :value="opt.value"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imageCompression from 'browser-image-compression'

export default {
  name: 'FxInHouseCompetitionForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sports: {
      type: Array,
      default: () => [],
    },
    schoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    preview: null,
  }),

  computed: {
    ...mapGetters({
      publishResultsOptions: 'api/inHouseCompetitions/publishResultsOptions',
      publishCompetitionOptions: 'api/inHouseCompetitions/publishCompetitionOptions',
      seasons: 'seasons/all',
    }),
    formData () {
      return {
        publishResults: 'RESULTS_SCORES',
        publishCompetition: true,
        ...(this.value || {}),
      }
    },
    compressionOptions: () => ({
      maxSizeMB: 2,
      maxWidthOrHeight: 4032,
      useWebWorker: true,
    }),

    image () {
      return this.preview || this.formData.photo
    },
  },

  methods: {
    ...mapActions({
      readBlob: 'helper/readBlob',
    }),
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    uploadHandler (file) {
      imageCompression(file, this.compressionOptions)
        .then(async (compressedFile) => {
          this.update('file', compressedFile)
          this.preview = await this.readBlob(compressedFile)
        })
    },
  },
}
</script>
