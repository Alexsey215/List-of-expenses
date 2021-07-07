<template>
  <div id="app">
    <header>
      <div class="container">
        <h1 class="header-title">My personal costs</h1>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="payment">
          <AddPaymentForm @addNewPayment="addNewPayment" v-show="addNewPaymentVisibility"/>
          <button class="payment-btn" @click="AddPaymentFormVisibility">add new cost +</button>
        </div>
        <PaymentsDisplay :list="paymentsList"/>
      </div>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import AddPaymentForm from './components/AddPaymentForm.vue';

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
  },
  data: () => ({
    paymentsList: [],
    addNewPaymentVisibility: false,
  }),
  methods: {
    fetchData() {
      return [
        {
          date: 'Date',
          category: 'Category',
          value: 'Value',
        },
        {
          date: '28.03.2020',
          category: 'Food',
          value: 169,
        },
        {
          date: '24.03.2020',
          category: 'Transport',
          value: 360,
        },
        {
          date: '24.03.2020',
          category: 'Food',
          value: 532,
        },
      ];
    },
    addNewPayment(data) {
      this.paymentsList = [...this.paymentsList, data];
    },
    AddPaymentFormVisibility() {
      if (!this.addNewPaymentVisibility) {
        this.addNewPaymentVisibility = true;
      } else {
        this.addNewPaymentVisibility = false;
      }
    },
  },
  created() {
    this.paymentsList = this.fetchData();
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
