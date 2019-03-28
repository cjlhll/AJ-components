<template>
  <div>
    <div class="zhuanpan-box" ref="truntableBox" :style="rotateStyle">
      <canvas ref="truntableCanvas" width="300" height="300"></canvas>
    </div>
    <f7-button fill @click="startFn">开始</f7-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        endrotate: (Math.floor(Math.random() * 10) + 1) * 5,
        rotateStyle: {}
      }
    },
    props:{
      num:{
        type:Number,
        default:6
      }
    },
    mounted() {
      this.$refs.truntableBox.addEventListener('transitionend', () => {
        console.log('动画完成');
        this.endrotate = 0;
      });

      this.initCanvas();
    },
    methods: {
      initCanvas(){
        let canvas=this.$refs.truntableCanvas;
        let ctx=canvas.getContext('2d');
        let r=150;

        /*画背景*/
        ctx.beginPath();
        ctx.fillStyle='#ccc';
        ctx.arc(r,r,r,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();

        /*画格数*/
        let num=this.num;   //总格数
        let color=['red','blue','orange','#FF4040','#551A8B','#8B8B00'];
        let oneRadian=Math.PI*2/num;   //单个弧度
        // console.log(360/num)
        for(let i=0;i<num;i++){
          ctx.beginPath();
          ctx.fillStyle=color[i];
          ctx.arc(r,r,r,oneRadian*i,oneRadian*(i+1));
          ctx.lineTo(r,r);
          ctx.closePath();
          ctx.fill();

         /* ctx.save();
          ctx.beginPath();
          ctx.fillStyle='#fff';
          ctx.translate(150,150);
          ctx.rotate(360/num*i+360/num);
          console.log(360/num*i)
          ctx.closePath();
          ctx.fillText("文字"+i,80,30);
          ctx.restore();*/


        }



      },



      startFn() {
        let ramdomNum = Math.floor(Math.random() * 10 + 4);
        console.log(ramdomNum + '圈');
        let rotateDeg = ramdomNum * 360 + this.endrotate;
        console.log(rotateDeg + '度');


        this.rotateStyle = {
          transform: 'rotate(' + rotateDeg + 'deg)',
          transition: 'all 5s ease-out'
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .zhuanpan-box {
    width: px2rem(300px);
    height: px2rem(300px);
    border-radius: 50%;
    background: #ccc;
    position: relative;
    margin: px2rem(20px) auto;

    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: px2rem(20px);
    }
  }
</style>
