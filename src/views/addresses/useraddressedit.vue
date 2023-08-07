<template>
  <div class="user-address-edit">
    <van-nav-bar
      title="编辑地址"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-edit
      :area-list="areaList"
      :address-info="generatorEditData"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { mapGetters } from 'vuex'

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
    onChangeArea (val) {
      console.log(val)
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
  },
  computed: {
    ...mapGetters('address', ['userAddressList', 'defaultAddressId']),
    generatorEditData () {
      return {
        ...this.generatorShowData,
        // areaCode: '440111' // 这里的值必须传递区的code，不设置这个值，那个省市区选择器不起效果...
        areaCode: this.getAreaCode
      }
    },
    getAreaCode () {
      // areaList背身vant-ui也提供了一份，拿到entries就是一个k-v形式的数组，
      // 使用find匹配传递进来的区名，然后再返回item[0]以获取areaCode
      return Object.entries(this.areaList.county_list).find(item => item[1] === this.generatorShowData.county)[0] || ''
    },
    generatorShowData () {
      let obj = {}
      this.userAddressList.forEach(item => {
        // 通过路由查询字符串传递过来后的id是字符串了，所以比较的时候要注意了...
        if (item.address_id + '' === this.$route.query.id) {
          obj = {
            id: item.address_id,
            name: item.name,
            tel: item.phone,
            province: item.region.province,
            city: item.region.city,
            county: item.region.region,
            addressDetail: item.detail,
            isDefault: item.address_id === this.defaultAddressId
            // areaCode: Object.entries(this.areaList.county_list).find(inneritem => inneritem[1] === item.region?.region)[0] || '' // 这里的值必须传递区的code，不设置这个值，那个省市区选择器不起效果...
          }
        }
      })
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
.user-address-edit {
  background-color: #F7F8FA;
}
</style>
