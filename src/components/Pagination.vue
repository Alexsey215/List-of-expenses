<template>
  <div @click="onClick(curPage)" class="text-center mt-4">
    <v-pagination
      color="teal"
      v-model="curPage"
      :length="amount"
      total-visible="8"
      @click="getCurPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    curPage: 1,
  }),
  props: {
    length: Number,
    n: Number,
    cur: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    },
  },
  methods: {
    getCurPage() {
      this.curPage = this.cur;
    },
    onClick(p) {
      if (p < 1 || p > this.amount || p === this.cur) {
        return;
      }
      this.$emit('paginate', p);
    },
  },
};
</script>

<style module lang="scss">

</style>
