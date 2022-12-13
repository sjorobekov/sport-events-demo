<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <div class="d-flex justify-space-between text-p1">
            <FxAvatar :value="avatar" class="border-avatar" />
            <v-chip
              v-if="contact.main"
              class="ma-2"
              color="primary"
            >
              <v-icon left small>
                mdi-star
              </v-icon>
              Main Sports Contact
            </v-chip>
          </div>
          <div class="py-2">
            <div class="text--darken-1 font-weight-bold">
              {{ name }}
            </div>
            <div>{{ contact.role }}</div>
          </div>
          <div class="text-p1">
            <v-icon>mdi-email-outline</v-icon>
            <a class="info--text text--darken-2" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </div>

          <div class="d-flex justify-space-between">
            <div v-if="contact.phone" class="text-p1">
              <v-icon>mdi-phone-in-talk</v-icon>
              <a class="info--text text--darken-2" :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
            </div>
            <v-menu>
              <template v-if="canCreateSportsContacts && !contact.user" #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="info lighten-1">
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
      return this.contact.kind === 'SportsContact' ? this.contact.name : `${this.contact.firstname} ${this.contact.lastname}`
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
  border: 1px solid #E2E8F0;
}

</style>
