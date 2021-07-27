import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add/payment',
      name: 'PaymentForm',
      component: ()=> import(/* webpackChunkName: 'PaymentForm' */ '../views/PaymentForm'),
    },
    {
      path: '/add/payment/:category/',
      name: 'addPaymentForm',
      component: ()=> import(/* webpackChunkName: 'PaymentForm' */ '../views/PaymentForm'),
    },
    {
      path: '/add/payment/:value/',
      name: 'addPaymentForm',
      component: ()=> import(/* webpackChunkName: 'PaymentForm' */ '../views/PaymentForm'),
    },
    {
      path:'/notfound',
      name: 'NotFound',
      component: ()=> import(/* webpackChunkName: 'NotFound' */ '../views/NotFound'),
    }
  ]
})
