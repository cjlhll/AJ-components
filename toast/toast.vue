<template>
  <transition name="fade">
    <div v-show="showToast" class="aj-toast">
      {{text}}
    </div>
  </transition>

</template>

<script>
    export default {
        name: "test",
      data(){
        return {
          text:'默认文字',
          showToast:false
        }
      }
    }
</script>

<style scoped>
  .aj-toast{
    position: fixed;
    background: rgba(0,0,0,.8);
    text-align: center;
    padding:10px 20px;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    color: #fff;
    transform: translate(-50%,-50%);
    transform-origin: 0 0;
    z-index: 999999;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0) translate(-50%,-50%);
      transform-origin:0 0;
    }
    50% {
      transform: scale(1.1) translate(-50%,-50%);
      transform-origin:0 0;
    }
    100% {
      transform: scale(1) translate(-50%,-50%);
      transform-origin:0 0;
    }
  }

</style>
