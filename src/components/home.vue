<template>
  <div>
     <div id="chart" style="width:800px;height:400px"></div>
  </div>
</template>

<script>

var echarts = require('echarts') 
export default {
  data(){
    return{
       myCharts:null
    }
  },
  mounted(){
    this.myCharts = echarts.init(document.getElementById('chart'))
    this.drawChart();
  },
  methods:{
    drawChart() {
      var option = {
        title: {
          text: "本周订单数量",
        },
        tooltip: {},
        legend: {
          data: ["数量"],
        },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "line",//bar
            data: [30, 20, 35, 25, 10, 20, 15],
          },
        ],
      };
      this.myCharts.setOption(option);
    },
  }
}
</script>

<style>

</style>