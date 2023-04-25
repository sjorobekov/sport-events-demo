<template>
  <div>
    <FxEventItemCard>
      <template #title>
        Details
      </template>
      <template #actions>
        <v-btn v-if="canEditEvent && !formVisible" outlined @click="open">
          <v-icon small>
            mdi-pencil-outline
          </v-icon>Edit Details
        </v-btn>
      </template>
      <FxInHouseEventDetailsForm
        v-if="formVisible"
        ref="form"
        v-model="formData"
        :disabled="loading"
        @submit="save"
        @cancel="formVisible = false"
      />
      <v-container v-else>
        <v-row>
          <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.calendar-1</v-icon>
              </template>
              <template #title>
                <FxDateFormat :date="match.date" />
              </template>
              <template #subtitle>
                Date
              </template>
            </ListItem>
          </v-col>
          <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.clock-1</v-icon>
              </template>
              <template #content>
                <div>
                  <div class="d-inline-block pr-8">
                    <v-list-item-title class="text-p2 neutral--text text--darken-4">
                      {{ match.startTime }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                      Start Time
                    </v-list-item-subtitle>
                  </div>
                  <div v-if="match.finishTime" class="d-inline-block">
                    <v-list-item-title class="text-p2 neutral--text text--darken-4">
                      {{ match.finishTime }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                      Finish Time
                    </v-list-item-subtitle>
                  </div>
                </div>
              </template>
            </ListItem>
          </v-col>
          <v-col cols="12" class="border-bottom pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.user-1</v-icon>
              </template>
              <template #title>
                <FxUserDisplayName :user="lead" />
              </template>
              <template #subtitle>
                Lead Staff Member
              </template>
            </ListItem>
          </v-col>
          <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.location-1</v-icon>
              </template>
              <template #title>
                <FxInHouseLocationLabel :match="match" />
              </template>
              <template #subtitle>
                Location
              </template>
            </ListItem>
          </v-col>
          <v-col cols="12" class="border-bottom border-right pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.directory-outline</v-icon>
              </template>
              <template #title>
                Further Information
              </template>
              <template #subtitle>
                {{ event.info }}
              </template>
            </ListItem>
          </v-col>
        </v-row>
      </v-container>
    </FxEventItemCard>
    <v-btn
      v-if="canEditEvent && !formVisible"
      height="50"
      outlined
      block
      class="mt-4 hidden-md-and-up neutral--text text--darken-3"
      @click="open"
    >
      <v-icon color="neutral darken-1">
        $vuetify.icons.pen
      </v-icon>Edit Details
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '@/components/FxEventItem/ListItem'
import FxInHouseLocationLabel from '@/components/FxInHouseEventItem/FxInHouseLocationLabel'

export default {
  name: 'FxInHouseEventDetails',
  components: {
    ListItem,
    FxInHouseLocationLabel,
  },
  data: () => ({
    formVisible: false,
    formData: {},
    loading: false,
  }),
  computed: {
    ...mapGetters({
      canEditEvent: 'page/inHouseEvent/canEditDetails',
      match: 'page/inHouseEvent/inHouseMatch',
      event: 'page/inHouseEvent/inHouseEvent',
      lead: 'page/inHouseEvent/lead',
    }),
  },
  methods: {
    open () {
      this.formData = {
        leadId: this.event.leadId,
        info: this.event.info || '',
        date: this.match.date,
        startTime: this.match.startTime,
        finishTime: this.match.finishTime,
        location: this.match.location,
        sportLocationId: this.match.sportLocationId,
        otherLocation: this.match.otherLocation,
      }
      this.formVisible = true
    },
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('page/inHouseEvent/updateMatch', this.formData)
        .then(() => {
          this.formVisible = false
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
