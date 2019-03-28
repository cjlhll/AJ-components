/*
2018年12月4号：增加直接输入文字
*      ---操健
* */
import toast from './toast'
import Vue from 'vue';
let instance = Vue.extend(toast);
let toastDom = new instance().$mount();
let timeId = null;

function close(time) {
  timeId = setTimeout(() => {
    toastDom.showToast = false;
    document.body.removeChild(toastDom.$el);
  }, time)
}

function clearTime() {
  clearTimeout(timeId);
}

function addContent(options) {
  toastDom.showToast = true;
  toastDom.text = options.text;
  document.body.appendChild(toastDom.$el);
  close(options.closeTimeout);
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
    if (toastDom.showToast) {
      toastDom.showToast = false;
      clearTime();
      setTimeout(() => {
        addContent(obj);
      }, 500);
      return false;
    }
    addContent(obj);
  }
}

