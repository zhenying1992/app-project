// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {Button, Tabbar, TabbarItem, Search, Swipe, SwipeItem, Lazyload, Col, Row, List, Cell} from 'vant'

Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Search).use(Swipe).use(SwipeItem);
Vue.use(Lazyload).use(Col).use(Row).use(List).use(Cell);

function getCookie(cookieName) {
  // 获取所有的cookie "psw=1234we; rememberme=true; user=Annie"
  let totalCookie = document.cookie;

  // 获取参数所在的位置
  let cookieStartAt = totalCookie.indexOf(cookieName + '=');
  // 判断参数是否存在 不存在直接返回
  if (cookieStartAt === -1) {
    return null;
  }
  // 获取参数值的开始位置
  let valueStartAt = totalCookie.indexOf('=', cookieStartAt) + 1;
  // 以;来获取参数值的结束位置
  let valueEndAt = totalCookie.indexOf(';', cookieStartAt);
  // 如果没有;则是最后一位
  if (valueEndAt === -1) {
    valueEndAt = totalCookie.length;
  }
  // 截取参数值的字符串
  return unescape(totalCookie.substring(valueStartAt, valueEndAt));
}

const api = 'http://192.168.1.102:8000/api/v1';
axios.defaults.baseURL = api;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    let methods = ['POST', 'DELETE', 'PUT'];
    let method = config.method.toUpperCase();
    if (methods.indexOf(method) !== -1) {
      config.headers['X-CSRFTOKEN'] = getCookie('csrftoken');
    }
    // console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  });

Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
