<template>
  <div class="pwd-input-container">
    <div class="inputs-box">
      <ul class="clearfix" :style="{borderColor,borderWidth}" @click.stop.prevent="showKeyboard=true">
        <li v-for="(i,index) in 6" :key="i" :style="{borderColor,borderWidth}"><span
          v-if="pwdArr[index]!==undefined"></span></li>
      </ul>
    </div>


    <transition name="slideup">
      <div class="keyboard" v-if="showKeyboard">
        <div class="keyboard-top-bar">
          <button @click="showKeyboard=false">关闭</button>
        </div>
        <ul>
          <li v-for="(key,index) in keys" :key="index" @click.stop.prev="keyClick(key)">
            <a href="javascript:;">{{key}}</a>
          </li>
          <li>
            <a href="javascript:;" @click.stop.prev="del" class="del-btn">

            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "pwd-input",
    data() {
      return {
        keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0],
        pwdArr:this.value || [],
        showKeyboard:true
      }
    },
    props: {
      value:{
        type:[String,Array],
        default(){
          return []
        }
      },
      /*inputs: {
        type: Array,
        default: () => {
          return [];
        }
      },*/
      borderColor: {
        type: String,
        default: '#ccc'
      },
      borderWidth: {
        type: String,
        default: '1px'
      }
    },
    watch:{
      value(val){
        if(!val) this.pwdArr=[];
        else this.showKeyboard=true;
      }
    },
    methods: {
      keyClick(key) {
        if (key !== '' && this.pwdArr.length < 6) {
          this.pwdArr.push(key);
          this.$emit('input',this.pwdArr.join(''));
          // console.log(this.pwdArr);
          if(this.pwdArr.length ===6){
            this.$emit('on-sure',this.pwdArr.join(''))
          }
        }
      },
      del() {
        this.pwdArr.splice(this.pwdArr.length-1);
        this.$emit('input',this.pwdArr.join(''));
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../utils/app';
  .pwd-input-container{
    position: relative;
    min-height: 400px;
  }
  .inputs-box{

    padding: 0 15px;
    ul {
      border: 1px solid $borderColor;
      border-radius: 5px;
      display: flex;
      list-style: none;
      padding: 0;
      li {
        padding: 0;
        list-style: none;
        flex: 1;
        height: 50px;
        border-right: 1px solid $borderColor;
        text-align: center;
        line-height: 60px;

        &:last-child {
          border: none;
        }

        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #000;
        }
      }
    }
  }


  div.keyboard {
    width: 100%;
    /*border: 1px solid red;*/
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #fff;
    /*box-shadow: 0 px2rem(-1px) px2rem(10px) 0 rgba(0,0,0,.1);*/
    /*ul:after{
        display: block;
        content: '';
        clear: both;
    }*/
    .keyboard-top-bar{
      height: 30px;
      border-top: 1px solid $borderColor;
      padding:5px 10px;
      button{
        height: 100%;
        float: right;
        width: 50px;
        background: #d1d4dd;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        &:active{
          opacity: .5;
        }
      }
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }

    $width: 100%;

    li {
      width: $width/3;
      box-sizing: border-box;
      height: 50px;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      font-weight: bold;
      list-style: none;

      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        border-top: 1px solid $borderColor;
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
        border-right: none;
      }

      &:nth-child(10), &:nth-child(11), &:nth-child(12) {
        border-bottom: none;
      }

      &:nth-child(10), &:nth-child(12), &:active {
        background-color: #d1d4dd;
      }

      &:nth-child(12):active {
        background-color: #fff;
      }
    }

    a {
      color: #000;
      display: block;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
    }

    .del-btn {
      height: 100%;
      background: url("./del_icon.png") no-repeat center center;
      background-size: 25%;
    }
  }

  .slideup-enter-active {
    animation: animateSlide .3s;
  }

  .slideup-leave-active {
    animation: animateSlide .3s reverse;
  }

  @keyframes animateSlide {
    from {
      bottom: -100%;
    }
    to {
      bottom: 0;
    }
  }
</style>
