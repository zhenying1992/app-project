<template>
  <div style="background-color: black">
    <van-search
      shape="round"
      v-model="search_value"
      placeholder="搜索一下，马上发车"
      @search="onSearch"
      style="background-color: black"
    >
    </van-search>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="video in random_video_list" :key="video.id">
        <router-link :to="{name: 'video', params: {id: video.id}}">
          <img style="width:80%;height: 120px" v-lazy="video.pic_link"/>
          <span class="img-word">
          <span class="img-word-width">{{ getSafeName(video.name, name_length) }}</span>
        </span>
        </router-link>
      </van-swipe-item>
    </van-swipe>

    <div class="sub-title">最新视频</div>
    <van-row>
      <van-col span="12" v-for="video in late_video_list" :key="video.id">
        <router-link :to="{name: 'video', params: {id: video.id}}">
          <div style="margin-top: 10px;">
            <img style="width:80%;height: 120px" v-lazy="video.pic_link"/>
          </div>
          <div class="item-title"> {{ getSafeName(video.name, name_length) }}</div>
        </router-link>
      </van-col>
    </van-row>

    <div class="sub-title">优质精品</div>
    <van-row>
      <van-col span="12" v-for="video in high_score_video_list" :key="video.id">
        <router-link :to="{name: 'video', params: {id: video.id}}">
          <div style="margin-top: 10px;">
            <img style="width:80%;height: 120px" v-lazy="video.pic_link"/>
          </div>
          <div class="item-title"> {{ getSafeName(video.name, name_length) }}</div>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_value: '',
      late_video_list: [],
      high_score_video_list: [],
      random_video_list: [],
      name_length: 10
    }
  },
  created() {
    this.listRandomVideo();
    this.listHighScoreVideo();
    this.listLateVideo();
  },
  methods: {
    onSearch(val) {
      console.log(val)
    },
    getSafeName(str, len) {
      let reg = /[\u4e00-\u9fa5]/g; // 专业匹配中文
      let slice = str.substring(0, len);
      let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length));
      let realen = slice.length * 2 - chineseCharNum;
      return str.substr(0, realen) + (realen < str.length ? '...' : '');
    },
    listRandomVideo() {
      this.$axios({
        url: 'video/random',
        method: 'get'
      }).then(resp => {
        this.random_video_list.push(...resp.data);
      })
    },
    listLateVideo() {
      this.$axios({
        url: 'video/lately',
        method: 'get'
      }).then(resp => {
        this.late_video_list.push(...resp.data);
      })
    },
    listHighScoreVideo() {
      this.$axios({
        url: 'video/high-score',
        method: 'get'
      }).then(resp => {
        this.high_score_video_list.push(...resp.data);
      })
    }

  }
}
</script>

<style scoped>
.sub-title {
  font-size: 13px;
  color: white;
  text-align: left;
  margin-top: 10px;
}

.item-title {
  font-size: 5px;
  color: white;
  text-align: center;
}

.img-word {
  position: absolute;
  bottom: 1.6vw;
  left: 3.5vw;
  width: 91vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  padding-left: 2vw;
  border-radius: 0 0 3vw 3vw;
  background: rgba(22, 22, 22, 0.5);
  color: #ff1c1e;
}

/* 文字的宽度 */
.img-word-width {
  position: absolute;
  bottom: 0vw;
  left: 3vw;
  width: 75vw;
  overflow: hidden;
  text-overflow: clip;
  white-space: pre;
  padding: 0 1vw;
}

</style>
