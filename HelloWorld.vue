<template>
  <div class="hello">
    <p>autoComplete</p>
    <auto-complete></auto-complete>
    <hr>
    <p>countDownButton</p>
    <count-down-button v-model="smsStatus" :count="20" @send-sms="smsStatus=true">发送验证码</count-down-button>
    <hr>
    <p>lottery</p>
    <lottery :data="prizeData" show-key="name" @onstart="prizeData.target=5" @onstop="prizeData.target=''"></lottery>
    <hr>
    <p>passwordInput</p>
    <pwd-input></pwd-input>
    <hr>
    <p>jigsawCode</p>
    <div style="padding: 20px;">
      <jigsaw-code @on-success="jigsawSuccess" slide-text="滑动来验证"></jigsaw-code>
    </div>
    <hr>
    <p>stepper</p>
    <stepper></stepper>
    <hr>
    <p>toast</p>
    <button @click="testToast">测试Toast</button>
  </div>
</template>

<script>
  import AutoComplete from './autoComplete'
  import CountDownButton from './countDownButton'
  import Lottery from './lottery'
  import PwdInput from './passwordInput/pwdInput'
  import JigsawCode from './jigsawCode'
  import Stepper from './stepper'

  export default {

    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        smsStatus:false,
        prizeData: {
          data: [
            // title: 奖品名称  color: 区块颜色  src: 奖品图片地址，支持网络和本地可读路径图片
            { id: 1, name: '奖品一', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 2,name: '奖品二', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 3,name: '奖品三', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 4,name: '谢谢参与', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 5,name: '奖品四', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 6,name: '奖品五', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 7,name: '奖品六', color: '#fe807d', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' },
            { id: 8,name: '谢谢参与', color: '#fe7771', src: 'http://img13.360buyimg.com/n1/g7/M03/11/16/rBEHZlDdcgAIAAAAAAETXb0oTNQAADdPwG-jPIAARN1548.jpg' }
          ],
          target: '', // 所获奖品id
          bgColor: '#871cfb', // 外环背景色
          // goImage:   //传图片地址一定要用require，否则无法解析路径
        },
      }
    },
    methods:{
      jigsawSuccess(){
        console.log('验证成功');
      },
      testToast(){
        this.$Toast.open('测试Toast');
      }
    },
    components: {
      AutoComplete,
      CountDownButton,
      Lottery,
      PwdInput,
      JigsawCode,
      Stepper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
