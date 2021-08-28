<template>
  <div id="app">
    <header>
      <div class="container">
        <h1 class="header-title">My personal costs</h1>
      </div>
    </header>
    <main>
      <div class="container">
        <router-link to="PaymentForm"></router-link>
        <router-link to="/notfound"></router-link>
        <router-view />
        <div class="payment">
          <transition name="fade">
            <AddPaymentForm @addNewPayment="addData" v-show="addNewPaymentVisibility" :selected="selected"/>
          </transition>
          <button class="payment-btn" @click="AddPaymentFormVisibility">add new cost +</button>
        </div>
        <CategorySelect @emitSelectedValue="selectedCategories" :categories="categories" />
        <PaymentsDisplay @emitOldItem="oldEditedItem" :list="currentElements"/>
        <Pagination :cur="curPage"
                    :n="n"
                    :length="paymentsList.length"
                    @paginate="onChangePage"
        />
      </div>
    </main>
    <transition name="fade">
      <ContextMenu/>
    </transition>
    <transition name="fade">
      <ModalWindow :oldItem="this.oldItem"/>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import CategorySelect from './components/CategorySelect.vue';
import AddPaymentForm from './components/AddPaymentForm.vue';
import Pagination from './components/Pagination.vue';
import ModalWindow from './components/ModalWindow';


export default {
  name: 'App',
  components: {
    ModalWindow,
    PaymentsDisplay,
    AddPaymentForm,
    CategorySelect,
    Pagination,
    ContextMenu: () => import(/* webpackChunkName: 'ModalWindow' */ "./components/ContextMenu.vue"),
  },
  data: () => ({
    addNewPaymentVisibility: false,
    page: '',
    curPage: 1,
    n: 10,
    selected:'',
    oldItem: null,
  }),
  methods: {
    ...mapMutations([
      'setPaymentListData',
      'addDataToPaymentsList',
      'setCategoryList',
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory',
    ]),
    addData(data) {
      this.addDataToPaymentsList(data);
    },
    selectedCategories(data) {
      this.selected = data;
    },
    AddPaymentFormVisibility() {
      if (!this.addNewPaymentVisibility) {
        this.addNewPaymentVisibility = true;
      } else {
        this.addNewPaymentVisibility = false;
      }
    },
    onChangePage(p) {
      this.curPage = p;
    },
    oldEditedItem(item) {
      this.oldItem = item;
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: 'getPaymentList',
      categories: 'getCategoryList',
    }),
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    currentElements() {
      const { n, curPage } = this;
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n);
    },
  },
  created() {
    this.fetchData();
    if (!this.categories.length) {
      this.fetchCategory();
    }

  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 35px;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
}
.header-title {
  display: flex;
  margin-left: 0;
}
.payment {
  display: flex;
  flex-direction: column;
  &-btn {
    margin-top: 10px;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    background-color: #18a145;
    min-height: 40px;
    max-width: 165px;
    border: none;
    border-radius: 4px;
    transition: 0.1s;
    &:hover {
      background-color: #137f34;
    }
    &:active {
      background-color: #18a145;
    }
  }
}
</style>
