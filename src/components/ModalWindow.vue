<template>
  <v-card width="200" class="wrapper pa-2" v-if="shown">
    <v-text-field name = "date1" placeholder="Date" v-model="date" class="wrapper-form-input" />
    <v-select
      name = "category"
      placeholder="Category"
      v-model.trim="category"
      :items="itemsOfCategory"
      class="payment-form-input"
    />
    <v-text-field
      name = "value1"
      placeholder="Value"
      type="number"
      v-model.number.trim="value"
      class="wrapper-form-input" />
    <div class="btn-wrapper d-flex">
      <v-btn color="teal" class="mr-2" @click="onClose" dark>Close</v-btn>
      <v-btn color="teal" @click="edited(date, category, value)" dark>Edit</v-btn>
    </div>
  </v-card>
</template>


<script>
export default {
  name: 'ModalWindow',
  props: {
    oldItem: Object,
  },
  data() {
    return {
      items: [],
      date: '',
      category: '',
      value: null,
      shown: false,
      settings: {},
      itemsOfCategory: ['Food', 'Transport', 'Housing', 'Healthcare', 'Other'],
    }
  },
  methods: {
    onShow() {
      this.shown = true;
    },
    onClose() {
      this.shown = false;
    },
    edited(date, category, value) {
      const {oldItem} = this;
      this.settings = {
        date,
        category,
        value,
        oldItem
      };
      this.$store.commit('changePaymentsListItem', this.settings);
      this.$modal.close();
    }
  },
  mounted() {
    this.$modal.EventBus.$on('shown', this.onShow);
    this.$modal.EventBus.$on('close', this.onClose);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off('shown', this.onShow);
    this.$modal.EventBus.$off('close', this.onClose);
  }
};
</script>

<style lang="scss">
  .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -65%;
    left: 30%;
  }
</style>
