<template>
  <div class="payments-display">
  <div class="payments-display-description">
      <span>#</span>
      <span>Date</span>
      <span>Category</span>
      <span>Value</span>
    </div>
    <div class="payments-display-list" v-for="(item, idx) in list" :key="idx">
      <span class="payments-display-list-item">{{ idx + 1 }}</span>
      <span class="payments-display-list-item">{{ item.date }}</span>
      <span class="payments-display-list-item">{{ item.category }}</span>
      <span class="payments-display-list-item">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsDisplay',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.payments-display {
  margin-top: 20px;
  width: 50%;
  &-description {
    display: grid;
    grid-template-columns: 50px 1fr 1fr 1fr;
    font-weight: bold;
  }
  &-list {
    display: grid;
    grid-template-columns: 50px 1fr 1fr 1fr;
    &:after {
      content: "";
      position: relative;
      border: 1px solid #ccc;
      width: 450px;
    }
    &-item {
      margin-top: 7px;
    }
  }
}
</style>
