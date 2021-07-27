<template>
  <div class="payments-display">
    <div class="payments-display-description">
      <span>#</span>
      <span>Date</span>
      <span>Category</span>
      <span>Value</span>
    </div>
    <div class="payments-display-list" v-for="item in list" :key="item.id">
      <span class="payments-display-list-item">{{ item.id }}</span>
      <span class="payments-display-list-item">{{ item.date }}</span>
      <span class="payments-display-list-item">{{ item.category }}</span>
      <span class="payments-display-list-item">{{ item.value }}</span>
      <div class="context-wrapper" @click="onContextMenuClick($event, item)">
        <div class="context-menu"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaymentsDisplay',
  components: {
  },
  data() {
    return {
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onContextMenuClick(event, item) {
      const items = [
        { text: "Edit", action: () => {this.actionEdit(item)}},
        { text: "Delete", action: () => {this.actionDelete(item.id)}},
      ];
      this.$context.show({event, items});
    },


    actionEdit(item){
      this.$modal.show({oldCategory: item.category, oldValue: item.value, oldDate: item.date});
      this.$emit('emitOldItem', item);
      this.$context.close()
    },


    actionDelete(item_id){
      this.$store.commit('deletePaymentListItem', item_id);
      this.$context.close()
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
    position: relative;
    display: grid;
    grid-template-columns: 50px 1fr 1fr 1fr;
    &:after {
      content: "";
      position: absolute;
      border: 1px solid #ccc;
      width: 465px;
    }
    &-item {
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
}
.context-wrapper {
    position: absolute;
    right: 18%;
    cursor: pointer;
    padding: 13px;
}
.context-menu {
  content: "";
  display: block;
  position: absolute;
  border: 2px solid #2c3e50;
  border-radius: 50%;
  top: 7px;
  &:before {
    content: "";
    display: block;
    position: absolute;
    border: 2px solid #2c3e50;
    border-radius: 50%;
    top: 12px;
    left: -2px;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    border: 2px solid #2c3e50;
    border-radius: 50%;
    top: 5px;
    left: -2px;
  }
}
</style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
