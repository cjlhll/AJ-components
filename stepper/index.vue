<template>
  <div class="stepper-box" :class="{large}" :style="{borderColor:color}">
    <button :style="{background:color}" @click="addOrReduce(-1)" class="iconfont icon-jian"></button>
    <input type="number" :placeholder="placeholder" :value="curCount" @input="enterValue" @blur="inputBlur">
    <button :style="{background:color}" @click="addOrReduce(1)" class="iconfont icon-jia"></button>
  </div>
</template>

<script>
  export default {
    name: "stepper",
    data(){
      return {
        curCount:this.value
      }
    },
    props:{
      value:{
        type:[Number,String],
        default:1
      },
      large:{
        type:Boolean,
        default:false
      },
      color:{
        type:String,
        default:'red'
      },
      step:{
        type:Number,
        default:1
      },
      placeholder:String,
      min:{
        type:Number,
        default:1
      },
      max:{
        type:Number
      },
      fixedNum:{
        type:Number,
        default:2
      }
    },
    watch:{
      value(val){
        this.curCount=val;
      }
    },
    methods:{
      enterValue(event){
        if(this.fixedNum === 0 && event.data === '.'){
          let a=event.target.value;
          event.target.value='';
          event.target.value=a;
        }

        if(event.target.value.toString().indexOf(".") > 0 && event.target.value.toString().split(".")[1].length > this.fixedNum){
          event.target.value=this.customCalc(event.target.value).toFixed(this.fixedNum);
        }
        this.curCount=this.customCalc(event.target.value);
        this.$emit('input',this.customCalc(event.target.value));
      },
      addOrReduce(num){
        // console.log(this.step);
        if(!this.curCount) this.curCount=this.min;
        else {
          if(num<0){
            if(this.curCount > this.min){
              this.curCount=this.customCalc(this.curCount-this.step);
            }
          }else {
            if(this.curCount < this.max || !this.max){
              this.curCount=this.customCalc(this.curCount+this.step);
            }

          }
        }

        this.$emit('input',this.curCount);
        this.$emit('stepper-click',{num:this.curCount,type:num < 0 ?'reduce':'add'})
      },
      inputBlur(event){
        if(event.target.value > 0){
          if(event.target.value < this.min){
            // event.target.value = this.min;
            event.target.value='';
            this.$emit('input','');
            this.$emit('on-error');
          }
          if(event.target.value > this.max){
            // event.target.value = this.max;
            event.target.value='';
            this.$emit('input','');
            this.$emit('on-error');
          }
        }
      },
      customCalc(x){
        var val = Number(x);
        // console.log(this.step.toString());
        if(!isNaN(parseFloat(val)) && val.toString().indexOf('.') > -1 && this.step.toString().split(".")[1].length > 0) {
          val = val.toFixed(this.step.toString().split(".")[1].length);//把 Number 四舍五入为指定小数位数的数字。
        }
        // console.log(Number(val));
        return  Number(val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .stepper-box{
    display: flex;
    border: 1px solid #EA454B;
    height: px2rem(40px);
    justify-content: space-between;
    &.large{
      height: px2rem(35px);
    }
    input{
      /*width: px2rem(40px);*/
      width: px2rem(115px);
      flex: 1;
      text-align: center;
    }
    button{
      border: none;
      margin: 0;
      flex: 1;
      font-size: px2rem(16px);
      padding: 0;
      color: #fff!important;
      text-align: center;
      background: #EA454B;
      &:active{
        opacity: .5;
      }
    }
  }

</style>
