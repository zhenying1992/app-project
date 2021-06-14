<template>
  <div>
    <vue-core-video-player
      id="my-video"
      ref="child"
      :core="HLSCore"
      :autoplay="false"
      :src="video_link"
      class="video"
    ></vue-core-video-player>
    <div class="item">
      <span class="name">{{ video.name }}</span>
    </div>

    <div class="item">
      <van-rate readonly size="12px" color="#ffd21e" allow-half void-color="white" v-model="video.score"></van-rate>
      <van-icon size="9px" name="clock-o"/>
      <span class="time">{{ video.create_time }}</span>
    </div>

    <div class="item">
      <van-tag style="margin: 5px" color="red" round v-for="tag in video.tags" :key="tag">{{ tag }}</van-tag>
    </div>

    <div>
      相似主题
    </div>
    <div class="img-list">
      <div style="display:inline-block">
        <img
          v-lazy="video.pic_link"
          v-for="video in similar_video_list"
          :key="video.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HLSCore from '@core-player/playcore-hls'

export default {
  data() {
    return {
      video: '',
      video_link: '',
      similar_video_list: [],
      HLSCore
    }
  },
  beforeMount() {
    this.video_link = this.$route.params.link;
    this.getVideo();
  },
  methods: {
    getVideo() {
      let id = this.$route.params.id;

      this.$axios({
        url: 'video/' + id,
        method: 'get'
      }).then(resp => {
        this.video = resp.data;
        this.getSimilarVideo();
      })
    },
    getSimilarVideo() {
      this.$axios({
        url: 'video/' + this.video.id + '/similar',
        method: 'get'
      }).then(resp => {
        this.similar_video_list = resp.data
      })
    }
  }
}
</script>

<style scoped>
.vjs-big-play-button {
  left: 50% !important;
  top: 50% !important;
  /*margin-top: -1em;*/
  /*margin-left: -1.5em;*/

}

.item {
  margin: 10px;
  text-align: left
}

.video {
  width: 100%;
  height: 250px
}

.name {
  color: white;
  font-size: 20px
}

.time {
  font-size: 10px;
  color: #7d7a7a
}

.img-list {
  margin: 10px;
  display: flow;
  overflow-x: auto;
  white-space: nowrap
}

.img-list img {
  width: 200px;
  height: 100px;
  border-radius: 10px;
  margin: 5px
}
</style>
