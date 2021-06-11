<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="video in video_list" :key="video.id" :title="video.name" style="display: inline-block">
        <router-link :to="{name: 'video', params: {id: video.id}}">
        <div style="margin: 5px">
          <img style="width:120px; height: 120px" v-lazy="video.pic_link"/>
          <div class="item-title"> {{getSafeName(video.name, 8)}}</div>
        </div>
      </router-link>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                finished: false,
                video_list: [],
                tag_list: [],
            }
        },
        created() {
            this.listVideo();
        },
        methods: {
            listVideoTag() {
                this.tag_list = [];
            },
            listVideo() {
                this.video_list = [
                    {
                        pic_link: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
                        id: 1,
                        name: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                        score: 7
                    },
                    {
                        pic_link: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
                        id: 2,
                        name: '呵呵呵呵呵呵',
                        score: 7
                    }
                ]
            },
            getSafeName(str, len) {
                let reg = /[\u4e00-\u9fa5]/g; // 专业匹配中文
                let slice = str.substring(0, len);
                let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length));
                let realen = slice.length * 2 - chineseCharNum;
                return str.substr(0, realen) + (realen < str.length ? '...' : '');
            },
            onLoad() {
                this.loading = true;
                this.video_list.push({
                    pic_link: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
                    id: 1,
                    name: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    score: 7
                });
                this.loading=false;
            }
        }
    }
</script>

<style scoped>
  .item-title {
    font-size: 5px;
    color: white;
    text-align: center;
  }

</style>
