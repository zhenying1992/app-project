<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="搜索一下，马上发车"
      @search="onSearch"
    >
    </van-search>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, idx) in video_list" :key="idx">

      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                video_list: []
            }
        },
        created() {
            this.getLateVideo()
        },
        methods: {
            onSearch(val) {
                console.log(val)
            },
            getLateVideo() {
                this.video_list = [
                    'https://img01.yzcdn.cn/vant/apple-1.jpg',
                    'https://img01.yzcdn.cn/vant/apple-2.jpg',
                ]
            }
        }
    }
</script>

<style scoped>

</style>
