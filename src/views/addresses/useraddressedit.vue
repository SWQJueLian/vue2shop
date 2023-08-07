<template>
  <div class="user-address-edit">
    <van-nav-bar
      :title="isAdd ? '添加地址' : '编辑地址' "
      left-arrow
      @click-left="$router.back()"
    />
    <!--
    :show-set-default="!isAdd" 玛德，添加完又不返回id，你大爷的..谁写得后端，太坑爹了...
    所以这里只能再编辑的时候才显示’设置位默认地址‘的按钮
    -->
    <van-address-edit
      :area-list="areaList"
      :address-info="generatorEditData"
      show-postal
      :show-delete="!isAdd"
      :show-set-default="!isAdd"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-area="onChangeArea"
    />
    <p style="padding: 10px">省市区不管你选什么我都写死了，因为黑马提供的后端数据的省市区不是标准的id，而且看不懂他们的写的api文档，有没有标注，又长又臭的...</p>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { mapActions, mapGetters } from 'vuex'
import { addAddress, editAddress, setDefaultAddress } from '@/apis/address'

export default {
  name: 'userAddressEdit',
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    ...mapActions('address', ['deleteAddressByID']),
    async onSave (content) {
      // this.$toast('save')
      // console.log(content)
      if (this.isAdd) {
        // 添加地址就直接发请求了，没必要操作vuex了
        const resp = await addAddress(content.name, content.tel, content.addressDetail)
        console.log(resp, '添加地址：')
      } else {
        const resp = await editAddress(this.pAddressId, content.name, content.tel, content.addressDetail)
        console.log(resp, '编辑地址：')

        // 判断是否设置了默认地址
        if (content.isDefault) {
          const resp = await setDefaultAddress(this.pAddressId)
          console.log(resp, '设置默认收货地址')
        }
      }
      // 编辑和添加后就返回地址列表
      this.$router.back()
    },
    onDelete (content) {
      // console.log(content.id)
      this.deleteAddressByID(content.id)
      // this.$toast('delete')
      // 删除成功后回退
      this.$router.back()
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
    pAddressId () {
      return this.$route.query.id
    },
    isAdd () {
      return this.$route.query.mode === 'add'
    },
    generatorEditData () {
      if (this.isAdd) return {}
      return {
        ...this.generatorShowData,
        // areaCode: '440111' // 这里的值必须传递区的code，不设置这个值，那个省市区选择器不起效果...
        areaCode: this.getAreaCode
      }
    },
    getAreaCode () {
      if (this.isAdd) return 0
      // areaList背身vant-ui也提供了一份，拿到entries就是一个k-v形式的数组，
      // 使用find匹配传递进来的区名，然后再返回item[0]以获取areaCode
      const item = Object.entries(this.areaList.county_list).find(item => item[1] === this.generatorShowData?.county)
      return item?.[0]
    },
    generatorShowData () {
      let obj = {}
      if (!this.isAdd) {
        this.userAddressList.forEach(item => {
          // 通过路由查询字符串传递过来后的id是字符串了，所以比较的时候要注意了...
          if (item.address_id + '' === this.pAddressId) {
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
      }
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
