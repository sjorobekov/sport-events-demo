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
                Student Name
              </template>
              <template #content>
                Please provide the first and last name of the student.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="pt-8"
          >
            <v-row>
              <v-col cols="6">
                <label for="team_name">First Name</label>
                <v-text-field
                  id="firstname"
                  v-async-validate
                  :value="formData.firstname"
                  placeholder="Team Name"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="120"
                  @input="update('firstname', $event)"
                />
              </v-col>
              <v-col cols="6">
                <label for="team_name">Last Name</label>
                <v-text-field
                  id="lastname"
                  v-async-validate
                  :value="formData.lastname"
                  placeholder="Last Name"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="120"
                  @input="update('lastname', $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary">
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
                Student Information
              </template>
              <template #content>
                Enter the required details for the student.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="pt-8"
          >
            <v-row>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="birthday">Date of Birth</label>
                <v-menu ref="menu" offset-y :close-on-content-click="false">
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      id="birthday"
                      :value="birthday"
                      prepend-inner-icon="$vuetify.icons.calendarOutline"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      placeholder="DD-MM-YYYY"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    ref="picker"
                    :value="formData.birthday"
                    :max="today"
                    @input="update('birthday', $event)"
                    @change="$refs.menu.save($event)"
                  />
                </v-menu>
              </v-col>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="yearGroup">Year Group</label>
                <v-select
                  id="yearGroup"
                  outlined
                  dense
                  :value="formData.yearGroup"
                  :items="yearGroupOptions"
                  placeholder="Enter Year Group"
                  @input="update('yearGroup', $event)"
                />
              </v-col>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="gender">Gender</label>
                <v-select
                  id="gender"
                  outlined
                  dense
                  :value="formData.gender"
                  :items="genderOptions"
                  placeholder="Select Gender"
                  @input="update('gender', $event)"
                />
              </v-col>
              <v-col cols="6" md="12" lg="6" class="my-0 py-0">
                <label for="houseTeam">House Team</label>
                <v-autocomplete
                  id="houseTeam"
                  outlined
                  dense
                  :value="formData.inHouseTeamId"
                  :items="inHouseTeams"
                  item-text="name"
                  item-value="id"
                  placeholder="Select House"
                  @input="update('inHouseTeamId', $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

export default {
  name: 'FxStudentAddForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inHouseTeams: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters({
      yearGroupOptions: 'api/students/yearGroupOptions',
      genderOptions: 'api/students/genderOptions',
    }),
    formData () {
      return {
        ...(this.value || {}),
      }
    },
    today () {
      return DateTime.now().toFormat('yyyy-MM-dd')
    },
    birthday () {
      return this.formData.birthday ? DateTime.fromISO(this.formData.birthday).toFormat('dd-MM-yyyy') : ''
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
