<template>
  <div class="payment-form ma-1 pa-2">
    <v-text-field
      name = "date"
      placeholder="Date"
      v-model="date"
      class="payment-form-input"
    />
    <v-select
      name = "category"
      placeholder="Category"
      v-model.trim="category"
      :items="itemsOfCategory"
      class="payment-form-input"
    />
    <v-text-field
      placeholder="Value"
      name = "value"
      type="number"
      v-model.number.trim="value"
      class="payment-form-input"
    />
    <v-btn color="teal" @click="onClick" class="payment-form-btn" dark block>Add <v-icon dense>mdi-plus</v-icon></v-btn>
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
      itemsOfCategory: ['Sport', 'Food', 'Transport', 'Housing', 'Healthcare', 'Other'],
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
      if(this.getValueQueryFromRoute && this.getCategoryParamsFromRoute) {
        this.$store.commit('addDataToPaymentsList', data);
        this.goToPagePaymentForm();
        return;
       }
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
    getValueQueryFromRoute() {
      return Number(this.$route.query?.value) ?? null;
    },
     getCategoryParamsFromRoute() {
       return this.$route.params?.category ?? null;
     }
  },
   created() {
      if((!this.getValueQueryFromRoute || !this.getCategoryParamsFromRoute) && this.$route.name !== 'PaymentForm'){
        this.goToPagePaymentForm();
      }
      this.category = this.getCategoryParamsFromRoute;
      this.value = this.getValueQueryFromRoute;
  },
};
</script>

<style scoped lang="scss">
</style>
