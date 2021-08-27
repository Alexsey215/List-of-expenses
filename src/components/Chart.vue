<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  name: 'Chart',
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
  },
  mounted () {
    this.renderChart(this.chartData)
  },
};
</script>

<style scoped>

</style>
