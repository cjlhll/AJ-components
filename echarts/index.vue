<template>
  <div :id="id" :style="style"></div>
</template>
<script>
  export default {
    name: "Chart",
    data() {
      return {
        //echarts实例
        chart: ""
      };
    },
    props: {
      //父组件需要传递的参数：id，width，height，option
      id: {
        type: String
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "200px"
      },
      option: {
        type: Object,
        //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
        //使用闭包保证一个vue实例拥有自己的一份props
        default() {
          return  {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
              }
            ]
          };
        }
      }
    },
    computed: {
      style() {
        return {
          // height: '100%',
          width: this.width
        };
      }
    },
    watch: {
      //观察option的变化
      option: {
        handler(newVal, oldVal) {
          // console.log(newVal)
          if (this.chart) {
            if (newVal && JSON.stringify(newVal)!=='{}') {
              setTimeout(()=>{
                this.init()
              })
            }
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.chart = this.$echarts.init(document.getElementById(this.id));
        this.chart.resize();
        this.chart.setOption(this.option,{
          notMerge:true
        });
        /*this.chart.on('click',function (params) {
          console.log(params);
        })*/
      },
      resize(){
        this.chart.resize();
      }
    }
  };
</script>

<style scoped>

</style>
