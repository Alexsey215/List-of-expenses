<template>
  <div>
    <select v-model="selected" @change="emitSelectedValue">
      <option v-for="(option, idx) in categories"
              :key="idx"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: '',
    };
  },
  methods: {
    emitSelectedValue() {
      const { selected } = this;
      this.$emit('emitSelectedValue', selected);
    }
  },
};
</script>

<style>
</style>
