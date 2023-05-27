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
                Team Name
              </template>
              <template #content>
                Please enter a name for this in-house team.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pt-8"
          >
            <label for="team_name">Team Name</label>
            <v-text-field
              id="team_name"
              v-async-validate
              :value="formData.name"
              placeholder="Team Name"
              :async-rules="[$rule.required]"
              dense
              outlined
              maxlength="120"
              @input="update('name', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary">
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
                Team Colour
              </template>
              <template #content>
                Choose a color for this in-house team.
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="9"
            lg="4"
            class="pt-8"
          >
            <label for="color">Colour (Hex) Code</label>
            <FxColorPicker
              :value="formData.color"
              @input="update('color', $event)"
            >
              <template #activator="{on, attrs}">
                <v-text-field
                  v-bind="attrs"
                  id="color"
                  v-async-validate
                  readonly
                  :value="formData.color"
                  placeholder="Select Colour"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  v-on="on"
                />
              </template>
            </FxColorPicker>
          </v-col>
          <v-col>
            <v-icon class="mt-12" x-large :color="formData.color">
              $vuetify.icons.teams
            </v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'FxInHouseTeamForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formData () {
      return {
        color: '#94A3B8',
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
