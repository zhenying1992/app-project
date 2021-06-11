<template>
  <div>
    这里是食品业
<!--    <video-->
<!--      id="my-video"-->
<!--      class="video-js vjs-default-skin"-->
<!--      controls=""-->
<!--      preload="none"-->
<!--      x5-palysinline=""-->
<!--      playsinline=""-->
<!--      webkit-playsinline=""-->
<!--      poster=""-->
<!--      x-webkit-airplay="allow"-->
<!--    >-->
<!--      <source :src="video_link" type="application/x-mpegURL">-->
<!--    </video>-->
    <video></video>
  </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import videojs from 'video.js'

    export default {
        data() {
            return {
                video_link: ''
            }
        },
        mounted() {
            videojs.addLanguage('zh-CN', {
                'You aborted the media playback': '视频播放被终止',
                'A network error caused the media download to fail part-way.': '网络错误导致视频下载中途失败。',
                'The media could not be loaded, either because the server or network failed or because the format is not supported.': '视频因格式不支持或者服务器或网络的问题无法加载。',
                'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.': '由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。',
                'No compatible source was found for this media.': '无法找到此视频兼容的源。'
            });
            this.getVideoLink();
        },
        methods: {
            getVideoLink() {
                console.log(this.$route.params);
                this.video_link = '';
                this.playVideo();
            },
            playVideo() {
                let myPlayer = videojs('my-video',
                    {
                        bigPlayButton: true, // 是否显示播放按钮（这个播放按钮默认会再左上方，需用CSS设置居中）
                        textTrackDisplay: true,
                        posterImage: true,
                        errorDisplay: true,
                        controlBar: true,
                        autoplay: true, // 这个说是自动播放，但是本人使用无效
                        controls: true
                    }, function () {
                        this.play()
                    }
                );

                myPlayer.src(this.video_link);
                myPlayer.load(this.video_link);
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
