<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="school_name">School Name</label>
    <v-text-field
      id="school_name"
      v-async-validate
      :value="formData.name"
      :async-rules="[$rule.required]"
      placeholder="Enter School Name"
      dense
      outlined
      maxlength="120"
      @input="update('name', $event)"
    />

    <label for="street">Street</label>
    <v-text-field
      id="street"
      :value="formData.street"
      placeholder="Street"
      dense
      outlined
      maxlength="120"
      @input="update('street', $event)"
    />

    <label for="city">City</label>
    <v-text-field
      id="city"
      :value="formData.city"
      placeholder="City"
      dense
      outlined
      maxlength="50"
      @input="update('city', $event)"
    />

    <label for="zip">Zip</label>
    <v-text-field
      id="zip"
      placeholder="Zip Code"
      :value="formData.zip"
      dense
      outlined
      maxlength="15"
      @input="update('zip', $event)"
    />

    <label for="country">Country</label>
    <v-autocomplete
      id="country"
      :value="formData.country"
      dense
      :items="countries"
      outlined
      item-value="code"
      placeholder="Select Country"
      item-text="name"
      @input="update('country', $event)"
    />

    <label for="website">School Website</label>
    <v-text-field
      id="website"
      v-async-validate
      :value="formData.website"
      dense
      :async-rules="[$rule.url]"
      placeholder="https://website.com"
      outlined
      maxlength="120"
      @input="update('website', $event)"
    />

    <label for="email_domain">Email Domains</label>
    <v-combobox
      id="email_domain"
      v-async-validate
      :value="formData.emailDomains"
      :async-rules="[domains, maxItems, doesntContainPublicDomains]"
      multiple
      outlined
      dense
      chips
      hint="Associate E-mail Addresses from these domains with the School"
      persistent-hint
      deletable-chips
      append-icon=""
      @input="update('emailDomains', $event)"
    />
    <GmapMap
      ref="mapRef"
      :center="mapCenter"
      :zoom="zoom"
      style="height: 300px"
      :options="mapOptions"
    >
      <GmapMarker :position="formData.coordinates" :draggable="true" @update:position="updatePositionHandler" />
    </GmapMap>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

const DOMAIN_REGEXP = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
const PUBLIC_DOMAINS = [
  'aol.com',
  'att.net',
  'comcast.net',
  'facebook.com',
  'gmail.com',
  'gmx.com',
  'googlemail.com',
  'google.com',
  'hotmail.com',
  'hotmail.co.uk',
  'mac.com',
  'me.com',
  'mail.com',
  'msn.com',
  'live.com',
  'sbcglobal.net',
  'verizon.net',
  'yahoo.com',
  'yahoo.co.uk',
  'email.com',
  'fastmail.fm',
  'games.com',
  'gmx.net',
  'hush.com',
  'hushmail.com',
  'icloud.com',
  'iname.com',
  'inbox.com',
  'lavabit.com',
  'love.com',
  'outlook.com',
  'pobox.com',
  'protonmail.ch',
  'protonmail.com',
  'tutanota.de',
  'tutanota.com',
  'tutamail.com',
  'tuta.io',
  'keemail.me',
  'rocketmail.com',
  'safe-mail.net',
  'wow.com',
  'ygm.com',
  'ymail.com',
  'zoho.com',
  'yandex.com',
  'bellsouth.net',
  'charter.net',
  'cox.net',
  'earthlink.net',
  'juno.com',
  'btinternet.com',
  'virginmedia.com',
  'blueyonder.co.uk',
  'freeserve.co.uk',
  'live.co.uk',
  'ntlworld.com',
  'o2.co.uk',
  'orange.net',
  'sky.com',
  'talktalk.co.uk',
  'tiscali.co.uk',
  'virgin.net',
  'wanadoo.co.uk',
  'bt.com',
  'sina.com',
  'sina.cn',
  'qq.com',
  'naver.com',
  'hanmail.net',
  'daum.net',
  'nate.com',
  'yahoo.co.jp',
  'yahoo.co.kr',
  'yahoo.co.id',
  'yahoo.co.in',
  'yahoo.com.sg',
  'yahoo.com.ph',
  '163.com',
  'yeah.net',
  '126.com',
  '21cn.com',
  'aliyun.com',
  'foxmail.com',
  'hotmail.fr',
  'live.fr',
  'laposte.net',
  'yahoo.fr',
  'wanadoo.fr',
  'orange.fr',
  'gmx.fr',
  'sfr.fr',
  'neuf.fr',
  'free.fr',
  'gmx.de',
  'hotmail.de',
  'live.de',
  'online.de',
  't-online.de',
  'web.de',
  'yahoo.de',
  'libero.it',
  'virgilio.it',
  'hotmail.it',
  'aol.it',
  'tiscali.it',
  'alice.it',
  'live.it',
  'yahoo.it',
  'email.it',
  'tin.it',
  'poste.it',
  'teletu.it',
  'mail.ru',
  'rambler.ru',
  'yandex.ru',
  'ya.ru',
  'list.ru',
  'hotmail.be',
  'live.be',
  'skynet.be',
  'voo.be',
  'tvcablenet.be',
  'telenet.be',
  'hotmail.com.ar',
  'live.com.ar',
  'yahoo.com.ar',
  'fibertel.com.ar',
  'speedy.com.ar',
  'arnet.com.ar',
  'yahoo.com.mx',
  'live.com.mx',
  'hotmail.es',
  'hotmail.com.mx',
  'prodigy.net.mx',
  'yahoo.ca',
  'hotmail.ca',
  'bell.net',
  'shaw.ca',
  'sympatico.ca',
  'rogers.com',
  'yahoo.com.br',
  'hotmail.com.br',
  'outlook.com.br',
  'uol.com.br',
  'bol.com.br',
  'terra.com.br',
  'ig.com.br',
  'itelefonica.com.br',
  'r7.com',
  'zipmail.com.br',
  'globo.com',
  'globomail.com',
  'oi.com.br',
]

export default {
  name: 'SchoolInfoForm',
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
  data: () => ({
    mapCenter: { lng: 0, lat: 0 },
  }),

  computed: {
    ...mapGetters({
      countries: 'countries/list',
    }),

    formData () {
      return this.value || {}
    },
    zoom () {
      if (this.value.coordinates?.lat && this.value.coordinates?.lng) {
        return 15
      }
      return 1
    },
    mapOptions () {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
      }
    },
  },

  watch: {
    'formData.coordinates': {
      handler (val) {
        this.panTo({ ...val })
          .catch((e) => {
            console.error(e)
          })
      },
      deep: true,
    },
  },

  mounted () {
    if (this.formData.coordinates?.lat && this.formData.coordinates?.lng) {
      setTimeout(() => {
        this.panTo({ ...this.formData.coordinates })
      }, 500)
    }
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },

    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    domains (val) {
      if (!val) {
        return true
      }
      return val.every(item => DOMAIN_REGEXP.test(item)) || 'Field contains invalid domain(s)'
    },

    doesntContainPublicDomains (val) {
      if (!val) {
        return true
      }

      return val.every(item => !PUBLIC_DOMAINS.includes(item)) || 'Public E-Mail services are not allowed'
    },

    maxItems (val) {
      if (!val) {
        return true
      }
      return val.length <= 5 || 'Max number of domains is 5'
    },

    updatePositionHandler (coordinates) {
      this.$emit('input', {
        ...this.formData,
        coordinates,
      })
    },

    panTo (location) {
      return this.$refs.mapRef.$mapPromise.then((map) => {
        return map.panTo(location)
      })
    },
  },
}
</script>
