<template>
  <div>
      <div class="display">
        <input v-model.number="operand1" type="number"/>
        <input v-model.number="operand2" type="number"/>
        = {{result}}
      </div>
      <div class="keyboard">
        <button @click="result = operand1 + operand2">+</button>
        <button @click="result = operand1 - operand2">-</button>
        <button @click="div">/</button>
        <button @click="result = operand1 * operand2">*</button>
        <button @click="pow">Возвести в степень</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
  }),
  methods: {
    div() {
      this.result = this.operand1 / this.operand2;
      if (!Number.isInteger(this.result)) {
        this.result = 'Ответ не является целым числом';
      }
    },
    pow() {
      this.result = this.operand1 ** this.operand2;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
