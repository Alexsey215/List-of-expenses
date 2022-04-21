<template>
  <v-app>
    <v-app-bar app>
      <v-btn to="addPaymentForm" :ripple="false" plain>payment form</v-btn>
      <v-btn to="/notfound" :ripple="false" plain>Notfound</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
        <v-row>
          <v-col>
            <v-dialog
            v-model="dialog"
            width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="teal" class="payment-btn mt-2" v-on="on" dark>
                  add new cost <v-icon dense>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <transition name="fade">
                  <AddPaymentForm @addNewPayment="addData" :selected="selected"/>
                </transition>
              </v-card>
            </v-dialog>
            <CategorySelect @emitSelectedValue="selectedCategories" :categories="categories" />
            <PaymentsDisplay @emitOldItem="oldEditedItem" :list="currentElements"/>
            <Pagination :cur="curPage"
                        :n="n"
                        :length="paymentsList.length"
                        @paginate="onChangePage"
            />
          </v-col>
          <v-col>
            <v-container class="chart-wrap d-flex flex-column">
              <Chart :chart-data="dataCollection" />
              <v-btn color="teal" width="200" class="mt-6 chart-wrap-btn" @click="fillData()" dark>Update chart</v-btn>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <transition name="fade">
      <ContextMenu/>
    </transition>
    <transition name="fade">
      <ModalWindow :oldItem="this.oldItem"/>
    </transition>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import CategorySelect from './components/CategorySelect.vue';
import AddPaymentForm from './components/AddPaymentForm.vue';
import Pagination from './components/Pagination.vue';
import ModalWindow from './components/ModalWindow';
import Chart from './components/Chart';

export default {
  name: 'App',

  components: {
    ModalWindow,
    PaymentsDisplay,
    AddPaymentForm,
    CategorySelect,
    Pagination,
    Chart,
    ContextMenu: () => import(/* webpackChunkName: 'ModalWindow' */ "./components/ContextMenu.vue"),
  },
  data: () => ({
    page: '',
    curPage: 1,
    n: 10,
    selected:'',
    oldItem: null,
    dialog: false,
    dataCollection: null
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
    fillData () {
      this.dataCollection = {
        labels: ['Sport', 'Food', 'Transport', 'Housing', 'Healthcare', 'Other'],
        datasets: [{
          label: 'Expenses by category',
          data: [this.sport, this.food, this.transport, this.housing, this.healthcare, this.other],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
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
    sport() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Sport') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
    food() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Food') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
    transport() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Transport') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
    housing() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Housing') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
    healthcare() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Healthcare') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
    other() {
      return this.paymentsList.reduce((total, rec) => {
        if(rec.category === 'Other') {
          total += rec.value;
        }
        return total;
      }, 0);
    },
 },
  created() {
    this.fetchData();
    if (!this.categories.length) {
      this.fetchCategory();
    }
  },
  mounted () {
    this.fillData()
  },
};
</script>

<style lang="scss">
.chart-wrap {
  max-width: 450px;
  max-height: 450px;
    &-btn {
    display:block;
    position: relative;
    border: 1px solid white;
    margin:0 auto;
  }
}
</style>
