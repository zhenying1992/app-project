import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/main'
import home from '@/components/home'
import resource from '@/components/resource'
import page3 from '@/components/page3'
import my from '@/components/my'
import video from '@/components/video'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {
          path: '',
          component: home
        },
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'resource',
          name: 'resource',
          component: resource
        },
        {
          path: 'page3',
          name: 'page3',
          component: page3
        },
        {
          path: 'my',
          name: 'my',
          component: my
        },
        {
          path: 'video',
          name: 'video',
          component: video
        }
      ]
    }
  ]
})
