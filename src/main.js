// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Tabbar, TabbarItem, Search, Swipe, SwipeItem, Lazyload, Col, Row, List} from 'vant'

Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Search).use(Swipe).use(SwipeItem);
Vue.use(Lazyload).use(Col).use(Row).use(List);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
