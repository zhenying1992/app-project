<template>
  <div style="background-color: black">
    <router-view></router-view>
    <div style="height: 4rem;"></div>
    <van-tabbar v-model="active" >
      <van-tabbar-item name="home" icon="home-o" :to="{name: 'home'}">首页</van-tabbar-item>
      <van-tabbar-item name="resource" icon="search" :to="{name: 'resource'}">资源</van-tabbar-item>
      <van-tabbar-item name="none" icon="setting-o" :to="{name: 'page3'}">待定</van-tabbar-item>
      <van-tabbar-item name="my" icon="friends-o" :to="{name: 'my'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 'home'
            }
        }
    }
</script>

<style scoped>
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
