<template>
  <div>
      <div class="display">
        <input
          v-model.number="operand1"
          type="number"
          placeholder="op1"
          ref="inputOp1"
        />
        <input
          v-model.number="operand2"
          type="number"
          placeholder="op2"
          ref="inputOp2"
        />
        = {{result}}
      </div>
      <div class="keyboard">
        <button
          v-for="btn in buttons"
          :key="btn"
          @click="calculate(btn)"
        >
          {{ btn }}
        </button>

        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">Отобразить экранную клавиатуру</label>
        <div v-if="checked">
          <button @click="inputValue(num)" v-for="(num, idx) in collection" :key="idx">
            {{ num }}
          </button>
        </div>
        <div>
          <input
            type="radio"
            id="radio1"
            value="op1"
            v-model="picked"
            @click="focusOnInput('radio1')"
          >
          <label for="radio1">Операнд 1</label>

          <input
            type="radio"
            id="radio2"
            value="op2"
            v-model="picked"
            @click="focusOnInput('radio2')"
          >
          <label for="radio2">Операнд 2</label>
        </div>
      </div>

      <div class="error" v-show="error">
        Ошибка: {{ error }}
      </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data: () => ({
    operand1: '',
    operand2: '',
    result: 0,
    error: '',
    buttons: ['+', '-', '*', '/', '**'],
    collection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '<--'],
    checked: true,
    picked: '',
  }),
  methods: {
    calculate(op = '+') {
      this.error = '';
      switch (op) {
        case '+':
          this.add();
          break;
        case '-':
          this.substract();
          break;
        case '*':
          this.multiply();
          break;
        case '/':
          this.div();
          break;
        case '**':
          this.pow();
          break;
        default:
          console.log('error');
      }
    },
    add() {
      this.operand1 = Number(this.operand1);
      this.operand2 = Number(this.operand2);
      this.result = this.operand1 + this.operand2;
    },
    substract() {
      this.result = this.operand1 - this.operand2;
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    },
    div() {
      if (this.operand2 === 0) {
        this.error = 'На ноль делить нельзя';
      } else {
        this.result = this.operand1 / this.operand2;
        if (!Number.isInteger(this.result)) {
          this.error = 'Ответ не является целым числом';
        }
      }
    },
    pow() {
      this.result = this.operand1 ** this.operand2;
    },
    focusOnInput(radioName) {
      if (radioName === 'radio1') {
        this.$refs.inputOp1.focus();
      } else {
        this.$refs.inputOp2.focus();
      }
    },
    inputValue(num) {
      const valueNum = String(num);
      this.operand1 = String(this.operand1);
      this.operand2 = String(this.operand2);
      if (valueNum !== '<--') {
        if (this.picked === 'op1') {
          this.operand1 += valueNum;
        } else if (this.picked === 'op2') {
          this.operand2 += valueNum;
        }
      } else if (this.picked === 'op1') {
        this.operand1 = this.operand1.slice(0, -1);
      } else if (this.picked === 'op2') {
        this.operand2 = this.operand2.slice(0, -1);
      }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error {
  color: red;
}
</style>
