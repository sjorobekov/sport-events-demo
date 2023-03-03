<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="pa-4">
          <div class="d-flex justify-space-between text-p2">
            <FxAvatar :value="avatar" size="64" class="border-avatar" />
            <v-chip
              v-if="isMainContact"
              class="caption font-weight-bold"
              color="primary"
            >
              <v-icon left size="12" class="mr-1">
                mdi-star
              </v-icon>
              Main Sports Contact
            </v-chip>
          </div>
          <div class="pt-4 pb-2">
            <div class="text-p2 neutral--text text--darken-4 font-weight-bold contact-main-info">
              {{ name }}
            </div>
            <div class="text-p2 neutral--text text--darken-3 contact-main-info">
              {{ role }}
            </div>
          </div>
          <div v-if="contact.phone" class="text-p1 mb-1">
            <v-icon color="primary lighten-1">
              $vuetify.icons.phone-fill
            </v-icon>
            <a class="link" :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
          </div>

          <div class="d-flex justify-space-between">
            <div class="text-p1">
              <v-icon color="primary lighten-1">
                $vuetify.icons.mail-fill
              </v-icon>
              <a class="email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </div>
            <v-menu>
              <template v-if="canCreateSportsContacts && contact.kind === 'SportsContact'" #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>
                    $vuetify.icons.threeDots
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="grey lighten-3">
                <v-list-item link :to="{ name: 'directory-sports-contacts-id', params: { id: contact.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Edit Contact
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="remove()">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Delete Contact
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FxSportsContactCard',
  props: {
    contact: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      canCreateSportsContacts: 'user/acl/canCreateSportsContacts',
    }),
    avatar () {
      return this.contact.user ? this.contact.user.avatar : this.contact.avatar
    },
    name () {
      return this.contact.kind === 'SportsContact' ? this.contact.name : this.contact.displayName ? this.contact.displayName : `${this.contact.firstname} ${this.contact.lastname}`
    },
    role () {
      return this.contact.role || this.contact.jobRole || ''
    },
    isMainContact () {
      return this.contact.main || this.contact.mainSportsContact || false
    },
  },
  methods: {
    remove () {
      if (!confirm('Are you sure?')) {
        return
      }
      this.$store.dispatch('api/sportsContacts/remove', this.contact).then(() => {
        this.$fetch()
        this.$toast('Sport contact has been deleted')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

<style scoped>

.border-avatar {
  border: 1px solid var(--v-neutral-base);
}

.email {
  color: var(--v-primary-lighten1)!important;
}

.contact-main-info {
  line-height: 1.2;
}
</style>
