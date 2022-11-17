<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card :flat="tile" :tile="tile" class="fx-card-border-top-sm-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="4"
            class="hidden-xs-only"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                Subject and Message
              </template>
              <template #content>
                Enter subject and message of this announcement
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="24"
            md="6"
            lg="7"
            class="pt-8"
          >
            <v-row>
              <v-col>
                <label for="subject">Announcement Subject</label>
                <v-text-field
                  id="subject"
                  v-async-validate
                  :value="formData.subject"
                  placeholder="Subject"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  maxlength="120"
                  @input="update('subject', $event)"
                />

                <label for="body">Announcement Text</label>
                <v-textarea
                  id="body"
                  v-async-validate
                  :value="formData.body"
                  placeholder="Enter your announcement"
                  :async-rules="[$rule.required]"
                  dense
                  outlined
                  @input="update('body', $event)"
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
export default {
  name: 'FxAnnouncementForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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
