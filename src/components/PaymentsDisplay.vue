<template>
  <div class="payments-display text-body-1">
    <div class="text-h5 text-md-h3 mb-6">My personal costs</div>
    <v-row>
      <v-col :cols="1">#</v-col>
      <v-col :cols="4">Date</v-col>
      <v-col :cols="5">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <v-row v-for="item in list" :key="item.id">
      <v-col :cols="1">{{ item.id }}</v-col>
      <v-col :cols="4">{{ item.date }}</v-col>
      <v-col :cols="5">{{ item.category }}</v-col>
      <v-col :cols="1">{{ item.value }}</v-col>
      <v-icon class="context-wrapper mt-3 mb-3" @click="onContextMenuClick($event, item)">
        mdi-sort-variant
      </v-icon>
    </v-row>
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

//.payments-display {
//  margin-top: 20px;
//  width: 50%;
//  &-description {
//    display: grid;
//    grid-template-columns: 50px 1fr 1fr 1fr;
//    font-weight: bold;
//  }
//  &-list {
//    position: relative;
//    display: grid;
//    grid-template-columns: 50px 1fr 1fr 1fr;
//    &:after {
//      content: "";
//      position: absolute;
//      border: 1px solid #ccc;
//      width: 465px;
//    }
//    &-item {
//      margin-top: 7px;
//      margin-bottom: 7px;
//    }
//  }
//}
//.context-menu {
//  content: "";
//  display: block;
//  position: absolute;
//  border: 2px solid #2c3e50;
//  border-radius: 50%;
//  top: 7px;
//  &:before {
//    content: "";
//    display: block;
//    position: absolute;
//    border: 2px solid #2c3e50;
//    border-radius: 50%;
//    top: 12px;
//    left: -2px;
//  }
//  &:after {
//    content: "";
//    display: block;
//    position: absolute;
//    border: 2px solid #2c3e50;
//    border-radius: 50%;
//    top: 5px;
//    left: -2px;
//  }
//}
</style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
