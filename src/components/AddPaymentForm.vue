<template>
  <div class="payment-form">
    <input
      name = "date"
      placeholder="Date"
      v-model="date"
      class="payment-form-input"
    />
    <input
      name = "category"
      placeholder="Category"
      v-model.trim="category"
      class="payment-form-input" />
    <input
      placeholder="Value"
      name = "value"
      type="number"
      v-model.number.trim="value"
      class="payment-form-input" />
    <button @click="onClick" class="payment-form-btn">Add +</button>
  </div>
</template>

<script>
export default {
  name: 'AddPaymentForm',
  props: {
    selected: {
      type: String,
    }
  },
  data() {
    return {
      date: '',
      category: '',
      value: null,
    };
  },
  methods: {
    goToPagePaymentForm(){
      this.$router.push({
        name: 'PaymentForm',
      })
    },
    onClick() {
      if (this.selected) {
        this.category = this.selected;
      }
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      // if(this.getValueQueryFromRoute && this.getCategoryParamsFromRoute) {
      //   this.$store.commit('addDataToPaymentsList', data);
      //   this.goToPagePaymentForm();
      //   return;
      // }
      this.$emit('addNewPayment', data);
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    // getValueQueryFromRoute() {
    //   return Number(this.$route.query?.value) ?? null;
    // },
    // getCategoryParamsFromRoute() {
    //   return this.$route.params?.category ?? null;
    // }
  },
  // created() {
  //   if((!this.getValueQueryFromRoute || !this.getCategoryParamsFromRoute) && this.$route.name !== 'PaymentForm'){
  //     this.goToPagePaymentForm();
  //   }
  //   this.category = this.getCategoryParamsFromRoute;
  //   this.value = this.getValueQueryFromRoute;
  //},
};
</script>

<style scoped lang="scss">
  .payment-form {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    &-input {
      padding: 7px;
      margin-bottom: 5px;
      font-size: 14px;
      color: #2c3e50;
    }
    &-btn {
      max-width: 250px;
      text-transform: uppercase;
      color: #fff;
      background-color: #18a145;
      min-height: 35px;
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
