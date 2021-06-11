import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/main'
import home from '@/components/home'
import page2 from '@/components/page2'
import page3 from '@/components/page3'
import my from '@/components/my'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [{
        path: '',
        component: home
      }, {
        path: 'home',
        name: 'home',
        component: home
      }, {
        path: 'page2',
        name: 'page2',
        component: page2
      }, {
        path: 'page3',
        name: 'page3',
        component: page3
      }, {
        path: 'my',
        name: 'my',
        component: my
      }]
    }
  ]
})
