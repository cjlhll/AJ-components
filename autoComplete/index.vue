<template>
  <div class="container-box">
    <input type="text" placeholder="请输入内容" v-model="curValue" @keyup="getResult" @blur="showResult=false">
    <i class="iconfont icon-xiala" :class="{'active':showResult}" v-if="showSelect" @click="selectClick"></i>
    <div v-if="showResult">
      <ul>
        <li v-for="(item,index) in resultList" :key="index" @click="selectItem(item)">
          {{item[label]}}
          <span>{{item[after]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        showResult: false,
        curValue:this.value,
        curResultList:[]
      }
    },
    props:{
      value:{
        type:[String,Number]
      },
      resultList:{
        type:Array,
        default(){
          return []
        }
      },
      label:{
        type:String
      },
      after:{
        type:String
      },
      showSelect:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      value(val){
        this.curValue=val;
      },
      resultList(val){
        this.curResultList=val;
        // this.showResult=true;
      }
    },
    methods:{
      getResult(e){
        if(this.curValue!==''){
          setTimeout(()=>{
            this.showResult=true;
            this.$emit('key-up',e.target.value);
          },500)
        }else{
          this.curResultList=[];
          this.showResult=false;
        }
      },
      selectItem(item){
        this.curValue=item[this.label];
        this.showResult=false;
        this.$emit('on-item-click',item);
      },
      selectClick(){
        if(this.curResultList.length === 0){
          this.$emit('select-click');
        }
        this.showResult=!this.showResult;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '../utils/app';
  .container-box {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    position: relative;
    box-sizing: border-box;
    input {
      width: 100%;
      height: 100%;
      text-align: center;
      border: none;
      box-sizing: border-box;
    }

    > div {
      position: absolute;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      height: 200px;
      overflow: auto;
      z-index: 999;
      box-shadow: 0 2px 5px 2px rgba(0,0,0,.1);
      li {
        padding: 0 10px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        span{
          color: #aaa;
        }
        &:active {
          background: #ccc;
        }
      }
    }
    .iconfont{
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 15px!important;
      /*transition: all .5s;*/
      &.active{
        transform: translateY(-50%) rotate(-180deg);
      }
    }
  }
</style>
