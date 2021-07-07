<template>
  <div class="payments-display">
    <div class="payments-display-list" v-for="(item, idx) in list" :key="idx">
      <span class="payments-display-list-item" v-if="idx !== 0">{{ idx }}</span>
      <span class="payments-display-list-item" v-else>#</span>
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
  &-list {
    display: grid;
    grid-template-columns: 50px 1fr 1fr 1fr;
    &:first-child {
      font-weight: bold;
    }
    &:after {
      content: "";
      position: relative;
      border: 1px solid #ccc;
      width: 335px;
    }
    &-item {
      margin-top: 7px;
    }
  }
}
</style>
