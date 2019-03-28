/*
2018年12月4号：增加直接输入文字
*      ---操健
2019年3月28号：优化多次点击toast效果（）
*      ---操健
* */
import toast from './toast'
import Vue from 'vue';
let instance = Vue.extend(toast);
let timeId = null;

function close(toastDom,time) {
  timeId = setTimeout(() => {
    toastDom.showToast = false;
    setTimeout(()=>{
      document.body.removeChild(toastDom.$el);
    },500)
  }, time)
}

function clearTime() {
  clearTimeout(timeId);
}

function addContent(options) {
  let toastDom = new instance().$mount();
  toastDom.showToast = true;
  toastDom.text = options.text;
  document.body.appendChild(toastDom.$el);
  close(toastDom,options.closeTimeout);
}

export default {
  open(options) {
    let obj = {};
    if (typeof options !== 'object') {
      obj['text'] = options;
    } else {
      obj = options;
    }
    if (!obj.closeTimeout) {
      obj.closeTimeout = 3000
    }
    /*if (toastDom.showToast) {
      toastDom.showToast = false;
      clearTime();
      setTimeout(() => {
        addContent(obj);
      }, 500);
      console.log(1111);
      return false;
    }*/
    addContent(obj);
  }
}

