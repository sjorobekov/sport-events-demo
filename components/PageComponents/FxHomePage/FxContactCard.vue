<template>
  <div class="mb-6">
    <div class="d-flex text-p1">
      <FxAvatar :value="avatar" class="mb-2" />

      <div class="pa-2">
        <div class="text--darken-1 font-weight-bold">
          {{ name }}
        </div>
        <div>{{ role }}</div>
      </div>
    </div>
    <div class="my-1">
      <div v-if="contact.email" class="text-p1 mb-2">
        <v-icon size="20" color="primary" class="mr-1">
          $vuetify.icons.email-1
        </v-icon>
        <a class="info--text text--darken-2" :href="`mailto:${contact.email}`">
          {{ contact.email }}
        </a>
      </div>
      <div v-if="contact.phone" class="text-p1">
        <v-icon size="20" color="primary" class="mr-1">
          $vuetify.icons.phone-1
        </v-icon>
        <a class="info--text text--darken-2" :href="`tel:${contact.phone}`">
          {{ contact.phone }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import FxAvatar from '@/components/FxAvatar/FxAvatar'
export default {
  name: 'FxContactCard',
  components: {
    FxAvatar,
  },
  props: {
    contact: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    avatar () {
      return this.contact.avatar || this.contact.user?.avatar
    },
    name () {
      return this.contact.name || `${this.contact.firstname} ${this.contact.lastname}`
    },
    role () {
      return this.contact.role || this.contact.jobRole || ''
    },
    isMainContact () {
      return this.contact.main || this.contact.mainSportsContact || false
    },
  },
}
</script>
