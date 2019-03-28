/*
2018年12月4号：增加直接输入文字
*      ---操健
2019年3月28号：优化多次点击toast效果（）
*      ---操健
* */
import toast from './toast'
import Vue from 'vue';
class Toast {
  constructor(){
    this.instance=Vue.extend(toast);
    // this.toastDom=new this.instance().$mount();
    this.timeId=null;
  }
  open(options){
    if(typeof options === 'object'){
      this.options=options;
      if(!this.options.closeTimeout){
        this.options.closeTimeout=3000
      }
    }else{
      this.options={
        text:options,
        closeTimeout:3000
      }
    }
    this.addContent(this.options);
  }
  addContent(){
    let toastDom = new this.instance().$mount();
    toastDom.showToast=true;
    toastDom.text=this.options.text;
    document.body.appendChild(toastDom.$el);
    this.close(toastDom,this.options.closeTimeout);
  }
  close(toastDom,time){
    this.timeId=setTimeout(()=>{
      toastDom.showToast=false;
      setTimeout(()=>{
        document.body.removeChild(toastDom.$el);
      },500)
    },time)
  }
}
export default Toast

