<template>
  <v-app class="custom-background">
    <v-main>
      <div class="d-flex align-center justify-center fill-height pt-8">
        <div class="content-container mx-2 px-4 px-sm-8 content-card d-flex align-center justify-center">
          <div class="logo-container pa-4">
            <v-img class="fixturr-logo" :src="require('@/assets/img/logo_light.svg')" width="180" />
          </div>
          <div class="content py-4 mt-4">
            <h1 class="text-h3 branddark--text text-center">
              Checkout
            </h1>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'CheckoutPage',
  layout: 'empty',
  middleware: ({ redirect, store, error, route }) => {
    if (!store.getters['context/isCheckoutSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    if (process.server && route.query.redirectTo) {
      redirect(route.query.redirectTo)
    }
  },
  async fetch () {
    if (process.client && this.$route.query.signedUrl) {
      if (this.$config.PADDLE_SANDBOX) {
        Paddle.Environment.set('sandbox')
      }
      Paddle.Setup({ vendor: this.$config.PADDLE_VENDOR_ID })

      const { url: override } = await this.$store.dispatch('api/paddle/generatePayLink', this.$route.query.signedUrl)
      Paddle.Checkout.open({ override })
    }
  },
  fetchOnServer: false,
  head () {
    return {
      script: [
        {
          src: 'https://cdn.paddle.com/paddle/paddle.js',
        },
      ],
    }
  },
}
</script>

<style scoped>
.content-container {
  display: inline-block;
  max-width: 492px;
  width: 100%;
  position: relative;
  min-height: 521px;
}

.logo-container {
  position: absolute;
  left: 50%;
  top: -50px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  transform: translateX(-50%);
  border-radius: 4px;
  border: 2px solid #ffffff;
  min-height: 86px;
}

.content {
  width: 100%;
}

.custom-background {
  background-image: linear-gradient(rgba(51,60,78,0.90),rgba(51,60,78,0.90)),url(@/assets/img/log-in-background.png)!important;
    background-size: auto,cover!important;
    background-color: #333c4e!important;
    background-position: center!important;
    background-repeat: no-repeat!important;
}

.content-card {
  background: white;
  border-radius: 8px;
  border: solid 2px #ebebeb;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.04);
}
</style>
