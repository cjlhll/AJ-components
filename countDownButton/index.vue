<template>
  <a href="javascript:;" @click="sendSms" :class="{disalbed:isStart}">
    <span v-if="!isStart"><slot>发送验证码</slot></span>
    <span v-else>{{time}}秒后重发</span>
  </a>
</template>

<script>
  //let reg=/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$/; 送正则一条
  export default {
    name: "countdownButton",
    data() {
      return {
        isStart: false,
        time: this.count
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      count: {
        type: Number,
        default: 60
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val) {
        if(val) this.start();
      }
    },
    methods: {
      sendSms() {
        if(!this.isStart) this.$emit('send-sms');
      },
      start(){
        let timeId=null;
        this.isStart=true;
        timeId=setInterval(()=>{
          if(this.time > 1){
            this.time--;
            if(this.time < 10){
              this.time='0'+this.time;
            }
          }else{
            clearInterval(timeId);
            this.isStart=false;
            this.time=this.count;
            this.$emit('input',false);
          }
        },1000)
      }
    }
  }
</script>


<style scoped lang="scss">
  @import '../utils/app.scss';
  a{
    display: inline-block;
    border: 1px solid $borderColor;
    padding: 5px 20px;
    text-decoration: none;
    font-size: 14px;
    color: #0193de;
    border-radius: $borderRadius;
    &.disalbed{
      opacity: .5;
    }
  }
</style>
