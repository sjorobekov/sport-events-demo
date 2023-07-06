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
              <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
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

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #17d6a6;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
