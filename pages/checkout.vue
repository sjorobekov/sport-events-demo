<template>
  <v-app class="custom-background">
    <v-main>
      <div class="d-flex align-center justify-center fill-height pt-8">
        <div class="content-container mx-2 px-4 px-sm-8 content-card d-flex align-center justify-center">
          <div class="logo-container pa-4">
            <v-img class="fixturr-logo" :src="require('@/assets/img/logo_light.svg')" width="180" />
          </div>
          <div class="content py-4 mt-4">
            <div class="d-flex icon-container align-center justify-center mb-4">
              <v-icon size="40" color="#17d6a6" class="fa fa-spinner">
                $vuetify.icons.checkout-loading
              </v-icon>
            </div>
            <h1 class="text-h3 branddark--text text-center mb-2">
              Checkout
            </h1>
            <div class="text-center sub-text mb-4">
              The Checkout is loading, please wait a few seconds.
            </div>
            <div class="text-center support-text">
              If you encounter any problems, please don't hesitate to reach out to us for assistance. You can contact our support team at
              <a href="mailto:support@fixturr.com" class="support-link">help@fixturr.com</a>.
            </div>
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

.fa-spinner {
  animation: spin 2.5s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sub-text {
  color: rgba(51,60,78,.8);
  font-size: 18px;
}

.support-text {
  color: rgba(51,60,78,.8);
  font-size: 18px;
}
.support-link{
  text-decoration-color: #17d6a6;
  transition: ease all 0.2s;
}
.support-link:hover{
  color: #17d6a6;
}
</style>
