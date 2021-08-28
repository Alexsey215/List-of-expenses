import Vue from 'vue';
import App from './App.vue';

import context from './plugins/ContextMenu';
import modal from './plugins/ModalWindow';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(context);
Vue.use(modal);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
