<template>
  <div class="menu-wrapper" v-if="shown" :style="styles">
    <div class="menu" v-for="item in items" :key="item.text" @click="onClick(item)">
      {{item.text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  data () {
    return {
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0,
    }
  },
  methods: {
    onClick(item){
      item.action();
    },
    onShow({ items, caller }) {
      this.items = items;
      this.shown = true;
      this.setPosition(caller);
    },
    setPosition(caller) {
      const computed = caller.getBoundingClientRect();
      this.xPos = computed.left;
      this.yPos = computed.top;
    },
    onClose() {
      this.items = [];
      this.shown = false;
    }
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos + 20}px`
      }
    }
  },
  mounted() {
    this.$context.EventBus.$on('shown', this.onShow);
    this.$context.EventBus.$on('close', this.onClose);
  },
  beforeDestroy() {
    this.$context.EventBus.$off('shown', this.onShow);
    this.$context.EventBus.$off('close', this.onClose);
  }
};
</script>

<style scoped>
  .menu-wrapper {
    position: absolute;
  }
  .menu {
    width: 65px;
    height: 15px;
    padding: 3px;
    background-color: #e7e7e7;
    cursor: pointer;
  }
</style>
