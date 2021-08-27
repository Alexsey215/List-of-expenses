import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
  },

  mutations: {
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    addDataToPaymentsList(state, payload) {
      if (isNaN(payload.value)) {
        payload.value = 0;
      }
      state.paymentsList.push(payload);
    },
    changePaymentsListItem(state, payload) {
      const filteredItem = state.paymentsList.filter(({ id }) => payload.oldItem.id === id);
      filteredItem.id = payload.oldItem.id;
      if (payload.date !== "") {
        filteredItem.date = payload.date;
      } else {
        filteredItem.date = payload.oldItem.date;
      }
      if (payload.category !== "") {
        filteredItem.category = payload.category;
      } else {
        filteredItem.category = payload.oldItem.category;
      }
      if (payload.value !== null) {
        filteredItem.value = payload.value;
      } else {
        filteredItem.value = payload.oldItem.value;
      }
      filteredItem.splice(0, 1);
      for (let i = 0; i < state.paymentsList.length; i++) {
        if (state.paymentsList[i].id === filteredItem.id) {
          state.paymentsList[i] = filteredItem;
          state.paymentsList.push(state.paymentsList[i]);
          break;
        }
      }
      state.paymentsList = state.paymentsList.slice(0, -1);
      console.log(state.paymentsList);
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    deletePaymentListItem(state, item_id) {
      state.paymentsList = state.paymentsList.filter(({ id }) => item_id !== id);
    },
  },

  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = [];
          for (let i = 1; i < 50; i++) {
            items.push({
              date: '23.12.2020',
              category: 'Sport',
              value: i + 100,
              id: i,
            });
          }
          resolve(items);
        }, 1000);
      }).then((res) => {
        commit('setPaymentListData', res);
      });
    },
    fetchCategory({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family']);
        }, 500);
      }).then((res) => {
        commit('setCategoryList', res);
      });
    },
  },

  getters: {
    getPaymentList: (state) => state.paymentsList,
    getCategoryList: (state) => state.categoryList,
  },
});
