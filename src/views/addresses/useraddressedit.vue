<template>
  <div class="user-address-edit">
    <van-nav-bar
      title="编辑地址"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'

export default {
  name: 'userAddressEdit',
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onSave () {
      this.$toast('save')
    },
    onDelete () {
      this.$toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-address-edit {
  background-color: #F7F8FA;
}
</style>
