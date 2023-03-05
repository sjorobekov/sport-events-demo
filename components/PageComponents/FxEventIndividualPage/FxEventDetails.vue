<template>
  <div>
    <FxEventItemCard>
      <template #title>
        Details
      </template>
      <template #actions>
        <v-btn v-if="canEditEvent && !formVisible" outlined color="neutral darken-3" :ripple="false" @click="open">
          <v-icon color="neutral darken-1">
            $vuetify.icons.pen
          </v-icon>Edit Details
        </v-btn>
      </template>
      <FxEventDetailsEditForm
        v-if="formVisible"
        ref="form"
        v-model="formData"
        :disabled="loading"
        @submit="save"
        @cancel="formVisible = false"
      />
      <v-container v-else class="child-border">
        <v-row>
          <v-col cols="12" class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.calendar-1</v-icon>
              </template>
              <template #title>
                <FxDateFormat :date="event.date" />
              </template>
              <template #subtitle>
                Date
              </template>
            </ListItem>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.clock-1</v-icon>
              </template>
              <template #content>
                <div>
                  <div v-if="me.meetTime" class="d-inline-block pr-8">
                    <v-list-item-title class="text-p2 info--text text--darken-4">
                      {{ me.meetTime }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 info--text">
                      Meet Time
                    </v-list-item-subtitle>
                  </div>
                  <div class="d-inline-block pr-8">
                    <v-list-item-title class="text-p2 info--text text--darken-4">
                      {{ event.startTime }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 info--text">
                      Start Time
                    </v-list-item-subtitle>
                  </div>
                  <div v-if="me.returnTime" class="d-inline-block">
                    <v-list-item-title class="text-p2 info--text text--darken-4">
                      {{ me.returnTime }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 info--text">
                      Return Time
                    </v-list-item-subtitle>
                  </div>
                </div>
              </template>
            </ListItem>
          </v-col>
        </v-row>
        <v-row v-if="lead">
          <v-col cols="12" class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <FxAvatar :size="24" :value="lead.avatar" />
              </template>
              <template #title>
                {{ lead.firstname }} {{ lead.lastname }}
              </template>
              <template #subtitle>
                Lead Staff Member
              </template>
            </ListItem>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.location-1</v-icon>
              </template>
              <template #title>
                <FxLocationLabel :event="event" :me="me" />
              </template>
              <template #subtitle>
                Location
              </template>
            </ListItem>
          </v-col>
        </v-row>
        <v-row v-if="!me.noNeedTransport && me.transportTo && me.transportFrom">
          <v-col cols="12" class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.transport-1</v-icon>
              </template>
              <template #content>
                <div>
                  <div class="d-inline-block pr-8">
                    <v-list-item-title class="text-p2 info--text text--darken-4">
                      {{ transportTo }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 info--text">
                      Transport To
                    </v-list-item-subtitle>
                  </div>
                  <div class="d-inline-block">
                    <v-list-item-title class="text-p2 info--text text--darken-4">
                      {{ transportFrom }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-p1 info--text">
                      Transport From
                    </v-list-item-subtitle>
                  </div>
                </div>
              </template>
            </ListItem>
          </v-col>
        </v-row>
        <v-row v-if="me.info">
          <v-col class="pt-1 pb-0">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.directory-outline</v-icon>
              </template>
              <template #content>
                <v-list-item-title class="text-p1 info--text">
                  Further Information
                </v-list-item-title>
                <span class="text-p2 info--text text--darken-2">{{ me.info }}</span>
              </template>
            </ListItem>
          </v-col>
        </v-row>
      </v-container>
      <FxEventDateOrStartTimeChangeConfirmationModal ref="confirmationDialog" />
    </FxEventItemCard>
    <v-btn
      v-if="canEditEvent && !formVisible"
      height="50"
      outlined
      block
      class="mt-4 hidden-md-and-up"
      @click="open"
    >
      <v-icon small>
        mdi-pencil-outline
      </v-icon>Edit Details
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransportType } from '@/enum'
import ListItem from '@/components/FxEventItem/ListItem'
import FxAvatar from '@/components/FxAvatar'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import FxEventItemCard from '@/components/FxEventItemCard'
import FxEventDetailsEditForm from '@/components/FxEventDetailsEditForm'
import FxEventDateOrStartTimeChangeConfirmationModal from '@/components/FxEventDateOrStartTimeChangeConfirmationModal'

export default {
  name: 'FxEventDetails',
  components: {
    FxEventDateOrStartTimeChangeConfirmationModal,
    FxEventDetailsEditForm,
    FxEventItemCard,
    ListItem,
    FxAvatar,
    FxLocationLabel,
  },

  data: () => ({
    formVisible: false,
    formData: {},
    loading: false,
  }),

  computed: {
    ...mapGetters({
      event: 'page/event/event',
      me: 'page/event/me',
      opponent: 'page/event/opponent',
      sport: 'page/event/sport',
      lead: 'page/event/lead',
      canEditEvent: 'user/acl/canCreateEvent',
    }),

    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }

      return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
    },

    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }

      return this.$t(`TRANSPORT_FROM.${this.me.transportTo}`)
    },

    dateOrStartTimeChanged () {
      return this.event.startTime !== this.formData.startTime || this.event.date !== this.formData.date
    },
  },

  methods: {
    open () {
      this.formData = {
        date: this.event.date,
        startTime: this.event.startTime,
        meetTime: this.me.meetTime,
        returnTime: this.me.returnTime,
        leadId: this.me.leadId,
        location: this.event.location,
        sportLocationId: this.event.sportLocationId,
        otherLocation: this.event.otherLocation,
        info: this.me.info,
        noNeedTransport: this.me.noNeedTransport,
        transportTo: this.me.transportTo,
        transportToOther: this.me.transportToOther,
        transportFrom: this.me.transportFrom,
        transportFromOther: this.me.transportFromOther,
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

      if (this.dateOrStartTimeChanged) {
        if (!(await this.$refs.confirmationDialog.open())) {
          return
        }
      }

      this.$store.dispatch('page/event/update', this.formData)
        .then(() => {
          this.formVisible = false
          this.$toast.success('Event has been updated!')
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
