<template>
  <div class="search">
    <van-nav-bar :safe-area-inset-top="true" left-arrow :border="false"
                 @click-left="$router.go(-1)"
    >
      <template #title>
        <van-search
          :clearable="false"
          :autofocus="true"
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <van-icon @click="$toast('打开相机...')" name="paid" size="20"/>
          </template>
        </van-search>
      </template>
      <template #right>
        <span class="mybtn-search2" @click="searchProduct(search_key)">搜索</span>
      </template>
    </van-nav-bar>
    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span><b>搜索历史</b></span>
        <!-- 删除全部搜索历史，直接给一个空列表就行了-->
        <van-icon @click="clearHistory()" name="delete-o" size="20"/>
      </div>
      <div class="list">
        <div v-for="item in search_history" :key="item" class="list-item" @click="searchProduct(item)">
          {{ item }}
        </div>
        <!--<div class="list-item" @click="$router.push('/searchlist?searchkey=炒锅')">炒锅</div>
        <div class="list-item" @click="$router.push('/searchlist?searchkey=电视')">电视</div>
        <div class="list-item" @click="$router.push('/searchlist?searchkey=冰箱')">冰箱</div>
        <div class="list-item" @click="$router.push('/searchlist?searchkey=手机')">手机</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/stroage'

export default {
  name: 'SearchPage',
  data () {
    return {
      search_history: getSearchHistory(),
      search_key: ''
    }
  },
  methods: {
    // 清空搜索历史记录
    clearHistory () {
      this.search_history = []
      setSearchHistory(this.search_history)
    },
    // 搜索商品
    searchProduct (key) {
      // 修复：key为空的时候不保存搜索历史记录。
      if (key.trim() !== '') {
        // 查找搜索关键词是否已经在搜索历史列表中
        const index = this.search_history.indexOf(key)
        // 如果在就删除掉
        if (index !== -1) {
          this.search_history.splice(index, 1)
        }
        // 再次将关键词放入到数组的最前面中
        this.search_history.unshift(key)
        // 保存到localstorage中
        setSearchHistory(this.search_history)
      }
      // 跳转到搜索详情页
      this.$router.push(`/search_list?searchkey=${key}`)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar__title {
  max-width: 100%;
  margin: 0 auto 0 45px;
}

.mybtn-search2 {
  padding: 2px 10px;
  background: linear-gradient(to right, orange, orangered);
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

.search {
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 20%;
    text-align: center;
    padding: 3px;
    line-height: 15px;
    border-radius: 50px;
    background: #f8f8f8;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
