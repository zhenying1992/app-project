<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" >
      <van-tabbar-item name="home" icon="home-o" :to="{name: 'home'}">首页</van-tabbar-item>
      <van-tabbar-item name="resource" icon="search" :to="{name: 'page2'}"> 资源</van-tabbar-item>
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

</style>
