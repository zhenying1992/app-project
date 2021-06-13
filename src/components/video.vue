<template>
  <div>
    <vue-core-video-player
      id="my-video"
      ref="child"
      :core="HLSCore"
      :autoplay="false"
      :src="video_link"
      style="width: 100%; height: 250px"
    ></vue-core-video-player>

  </div>
</template>

<script>
import HLSCore from '@core-player/playcore-hls'

export default {
  data() {
    return {
      video: '',
      video_link: '',
      HLSCore
    }
  },
  beforeMount() {
    this.video_link = this.$route.params.link;
  },
  methods: {
    getVideo() {
      let id = this.$route.params.id;

      this.$axios({
        url: 'video/' + id,
        method: 'get'
      }).then(resp => {
        this.video = resp.data;
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
</style>
