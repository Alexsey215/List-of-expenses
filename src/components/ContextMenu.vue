<template>
  <v-card color="teal" class="menu-wrapper d-flex" v-if="shown" :style="styles">
    <div class="menu pa-1" v-for="item in items" :key="item.text" @click="onClick(item)">
      {{item.text}}
    </div>
  </v-card>
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
        top: `${this.yPos - 2}px`,
        left: `${this.xPos + 25}px`
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
    padding: 3px;
    cursor: pointer;
    color: #fff;
  }
</style>
