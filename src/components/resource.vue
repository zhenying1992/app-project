<template>
  <div style="background-color: black">
    <van-search
      shape="round"
      v-model="keyword"
      placeholder="搜索一下，马上发车"
      @search="onSearch"
      style="background-color: black"
    >
    </van-search>

    <div style="margin-top: 15px">
      <van-tag
        :plain="!tag.choose"
        round
        :color="tag.color"
        v-for="(tag, idx) in tag_list"
        :key="tag.id"
        @click="chooseTag(idx)"
        style="margin:5px"
      >
        {{ tag.name }}
      </van-tag>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-row>
        <van-col span="12" v-for="video in video_list" :key="video.id">
          <router-link :to="{name: 'video', params: {id: video.id,  link: video.video_link}}">
            <div style="margin-top: 10px;">
              <img style="width:95%;height: 120px; border-radius: 10px" v-lazy="video.pic_link"/>
            </div>
            <div class="item-title"> {{ getSafeName(video.name, 8) }}</div>
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
      keyword: '',
      tags: [],
      loading: false,
      finished: false,
      video_list: [],
      count: 0,
      current_page: 0,
      tag_list: [],
      color_list: ['#a18d51', '#ac4d4d', '#71a54c']
    }
  },
  mounted() {
    this.listVideoTag();
  },
  methods: {
    clear() {
      this.tags = [];
      this.count = 0;
      this.video_list = [];
    },
    listVideoTag() {
      this.$axios({
        url: 'video/tags',
        method: 'get'
      }).then(resp => {
        this.tag_list = resp.data;
        for (let i = 0; i < this.tag_list.length; i++) {
          this.tag_list[i].choose = false;
          this.tag_list[i].color = this.color_list[i % this.color_list.length]
        }
      })
    },
    listVideo(page) {
      this.$axios({
        url: 'video',
        method: 'get',
        params: {
          'page': page,
          'keyword': this.keyword,
          'tags': JSON.stringify(this.tags)
        }
      }).then(resp => {
        this.count = resp.data.count;
        this.video_list.push(...resp.data.results);
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
    },
    onSearch(val) {
      this.clear();
      this.listVideo(1)
    },
    chooseTag(idx) {
      let newTag = JSON.parse(JSON.stringify(this.tag_list[idx]))
      newTag.choose = !newTag.choose;
      this.$set(this.tag_list, idx, newTag);

      this.clear();
      for (let i = 0; i < this.tag_list.length; i++) {
        if (this.tag_list[i].choose === true) {
          this.tags.push(this.tag_list[i].name)
        }
      }
      this.listVideo(1)
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

div {
  background-color: black;
}

input {
  background-color: #0a74de;
}

</style>
