<template>
  <div class="wrapper" v-if="shown">
    <input placeholder="Date" v-model="date" class="wrapper-form-input" />
    <input placeholder="Category" v-model.trim="category" class="wrapper-form-input" />
    <input
      placeholder="Value"
      type="number"
      v-model.number.trim="value"
      class="wrapper-form-input" />
    <div class="btn-wrapper">
      <button @click="onClose">Close</button>
      <button @click="edited(date, category, value)">Edit</button>
    </div>
  </div>
</template>

<!--
v-model.trim="category"
v-model.number.trim="value"
-->
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
    top: 9%;
    left: 34.5%;
  }
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>
