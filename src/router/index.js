import Vue from 'vue'
import Router from 'vue-router'

import AddPaymentForm from '../components/AddPaymentForm'
import Page404 from '../views/Page404'
import PaymentForm from '../views/PaymentForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add/payment',
      name: 'paymentForm',
      component: PaymentForm,
    },
    {
      path: '/add/payment/:category/',
      name: 'addPaymentForm',
      component: AddPaymentForm,
    },
    {
      path: '/add/payment/:value/',
      name: 'addPaymentForm',
      component: AddPaymentForm,
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404,
    },
  ]
})
