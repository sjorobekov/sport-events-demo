<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                Sport & Season
              </template>
              <template #content>
                Select the sport and season for this team
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="8"
            class="pt-8"
          >
            <v-row>
              <v-col cols="6">
                <label for="sport">Sport</label>
                <v-autocomplete
                  id="sport"
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

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                2
              </template>
              <template #title>
                Team Type & Name
              </template>
              <template #content>
                Select the gender, age level and ability level for this team.

                If a team represents multiple age levels, please select the highest age level involved.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="8"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="4" class="my-0 py-0">
                <label for="gender">Gender</label>
                <v-select
                  id="gender"
                  v-async-validate
                  outlined
                  dense
                  :value="formData.gender"
                  :items="genderOptions"
                  :async-rules="[$rule.required]"
                  placeholder="Select Gender"
                  @input="update('gender', $event)"
                />
              </v-col>
              <v-col cols="12" md="12" lg="4" class="my-0 py-0">
                <label for="ageLevel">Age Level</label>
                <v-select
                  id="ageLevel"
                  v-async-validate
                  outlined
                  dense
                  :value="formData.ageLevel"
                  :items="ageLevelOptions"
                  placeholder="Select Age"
                  :async-rules="[$rule.required]"
                  @input="update('ageLevel', $event)"
                />
              </v-col>
              <v-col cols="12" md="12" lg="4" class="my-0 py-0">
                <label for="abilityLevel">Ability Level</label>
                <v-select
                  id="abilityLevel"
                  v-async-validate
                  outlined
                  dense
                  :value="formData.abilityLevel"
                  :items="abilityLevel"
                  placeholder="Select Ability"
                  :async-rules="[$rule.required]"
                  @input="update('ageLevel', $event)"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12" lg="6" class="my-0 py-0">
                <label for="teamName">Team Name</label>
                <v-text-field
                  id="teamName"
                  v-async-validate
                  :value="formData.name"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="120"
                  placeholder="Select Team Name"
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
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                3
              </template>
              <template #title>
                Team Coach
              </template>
              <template #content>
                Select the member of staff responsible for coaching this team.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="8"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="6" class="mt-0 pt-0">
                <FxUserSelect label="Team Coach" :school-id="schoolId" :value="formData.coachId" @input="update('coachId', $event)" />
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
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                4
              </template>
              <template #title>
                Team Photo (Optional)
              </template>
              <template #content>
                File Types Accepted: jpeg, png, webp
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="8"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" md="12" lg="6" class="mt-0 pt-0">
                <label>Upload Image</label>
                <v-file-input outlined dense :prepend-icon="null" prepend-inner-icon="mdi-camera" />
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="200"
                  src="https://picsum.photos/id/11/500/300"
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
            md="6"
            lg="4"
          >
            <FxInstructionItem>
              <template #number>
                5
              </template>
              <template #title>
                Team Privacy Settings
              </template>
              <template #content>
                Choose whether you want this team, and the related fixtures, events and results to be published to the sports website.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="8"
            class="pt-8"
          >
            <v-row>
              <v-col cols="12" class="mt-0 pt-0">
                <label>Publish Team to Sports Portal</label>
                <v-radio-group
                  :value="formData.publishTeam"
                  mandatory
                  class="mt-0"
                  @input="update('publishTeam', $event)"
                >
                  <v-radio
                    v-for="opt in publishTeamOptions"
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
                  @input="update('publishResults', $event)"
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
import { mapGetters } from 'vuex'

export default {
  name: 'FxTeamForm',

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
    seasons: {
      type: Array,
      default: () => [],
    },
    schoolId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      ageLevelOptions: 'api/teams/ageLevel',
      genderOptions: 'api/teams/genderOptions',
      abilityLevel: 'api/teams/abilityLevel',
      publishResultsOptions: 'api/teams/publishResultsOptions',
      publishTeamOptions: 'api/teams/publishTeamOptions',
    }),
    formData () {
      return {
        ...(this.value || {}),
      }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>
