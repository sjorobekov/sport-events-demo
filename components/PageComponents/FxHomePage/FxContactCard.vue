<template>
  <div>
    <div class="d-flex text-p1">
      <FxAvatar :value="avatar" class="mb-1 mr-3" />

      <div class="py-2">
        <div class="contact-name font-weight-bold">
          {{ name }}
        </div>
        <div class="contact-role">
          {{ role }}
        </div>
      </div>
    </div>
    <div class="my-1">
      <div v-if="contact.phone" class="text-p1 mb-1">
        <v-icon size="20" class="home-icon">
          $vuetify.icons.phone-fill
        </v-icon>
        <a class="link" :href="`tel:${contact.phone}`">
          {{ contact.phone }}
        </a>
      </div>
      <div v-if="contact.email" class="text-p1">
        <v-icon size="20" class="home-icon">
          $vuetify.icons.mail-fill
        </v-icon>
        <a class="link email" :href="`mailto:${contact.email}`">
          {{ contact.email }}
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
      return this.contact.displayName ? this.contact.displayName : `${this.contact.firstname} ${this.contact.lastname}`
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

<style scoped>
.email {
  color: var(--v-primary-lighten1)!important;
}
.theme--light.v-divider {
  border-color: var(--v-neutral-lighten1);
}

.contact-name {
  color: var(--v-neutral-darken4);
}

.contact-role {
  color: var(--v-neutral-darken2);
}
</style>
