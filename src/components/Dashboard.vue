<template>
  <div style="width: 100%">
    <div id="myChart" style="width: 45%;height: 500px;float: left">

    </div>
    <div id="chart" style="width: 45%;height: 500px;float: left;padding-left: 5%">

    </div>

    <div class="amap">
      <h1>高德地图组件</h1>
      <p>地图宽高根据自己所需设置</p>
      <el-amap vid="amapDemo" >
      </el-amap>
      <div class="kong"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'echarts',
    data () {
      return {
        msg: 'echarts page'
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.initMychart());
        let chart = this.$echarts.init(document.getElementById('chart'));
        // 绘制图表
        chart.setOption({
          title : {
            text: '站点用户访问来源',
            subtext: '数据来源',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        });
      },
      initMychart(){
        return{
          title : {
            text: '未来一周气温变化',
            subtext: ''
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['最高气温','最低气温']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value} °C'
              }
            }
          ],
          series : [
            {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                data : [
                  {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            }
          ]
        }
      }
    }
  }

</script>


<style scoped>
  .amap{
    width:50%;
    height: 500px;
    margin: 0 auto;
  }
  .amap h1{
    line-height: 50px;
    margin-top: 50px;
  }
  .amap p{
    line-height: 100px;
  }
  .kong{
    height: 300px;
  }
</style>
