<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
<!--      <van-cell v-for="video in video_list" :key="video.id" :title="video.name" style="width:45%;height: 150px; margin:5px; display: inline-block">-->
<!--        <router-link :to="{name: 'video', params: {id: video.id}}">-->
<!--          <div>-->
<!--            <img style="height: 120px" v-lazy="video.pic_link"/>-->
<!--            <div class="item-title"> {{ getSafeName(video.name, 8) }}</div>-->
<!--          </div>-->
<!--        </router-link>-->
<!--      </van-cell>-->
      <van-row>
        <van-col span="12" v-for="video in video_list" :key="video.id">
          <router-link :to="{name: 'video', params: {id: video.id}}">
            <div style="margin-top: 10px;">
              <img style="width:95%;height: 120px; border-radius: 10px" v-lazy="video.pic_link"/>
            </div>
            <div class="item-title"> {{getSafeName(video.name, 8)}}</div>
          </router-link>
        </van-col>
      </van-row>
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
      count: 0,
      current_page: 0,
      tag_list: []
    }
  },
  mounted() {
    // this.listVideo(1);
  },
  methods: {
    listVideoTag() {
      this.tag_list = [];
    },
    listVideo(page) {
      this.$axios({
        url: 'video',
        method: 'get',
        params: {'page': page}
      }).then(resp => {
        this.count = resp.data.count;
        this.video_list.push(...resp.data.results);
        // for (let i=0; i<this.video_list.length; i++){
        //   this.video_list[i].pic_link='https://img01.yzcdn.cn/vant/apple-1.jpg'
        // }
      });
    },
    getSafeName(str, len) {
      let reg = /[\u4e00-\u9fa5]/g; // 专业匹配中文
      let slice = str.substring(0, len);
      let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length));
      let realen = slice.length * 2 - chineseCharNum;
      return str.substr(0, realen) + (realen < str.length ? '...' : '');
    },
    onLoad() {
      if (this.count !== 0 && this.video_list.length >= this.count) {
        this.finished = true;
        return
      }
      this.loading = true;
      this.current_page += 1
      this.listVideo(this.current_page);
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.item-title {
  font-size: 15px;
  color: white;
  text-align: center;
}

</style>
