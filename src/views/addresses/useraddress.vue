<template>
  <div class="user-address">
    <van-nav-bar
      title="收货地址"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 不能用v-model，你不能去改vuex中的数据... ，改成:value绑定就可以设置默认值
          v-model="chosenAddressId"  -> :value="defaultAddressId"
     -->
    <van-address-list
      :value="defaultAddressId"
      :list="generatorShowListData"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAddAddress"
      @edit="onEditAddress"
      @select="$toast('选中其他的收货地址....')"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'userAddress',
  data () {
    return {
      /*
      chosenAddressId: this.defaultAddressId,
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      */
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  created () {
    this.getUserAddressListAndDefaultID()
  },
  methods: {
    onAddAddress () {
      // this.$toast('新增地址')
      this.$router.push({
        path: '/useraddressedit?mode=add'
      })
    },
    onEditAddress (item, index) {
      // this.$toast('编辑地址:' + index)
      this.$router.push({
        path: '/useraddressedit',
        query: {
          id: item.id // 选中的addressid然后传递给useraddressedit页面
        }
      })
    },
    ...mapActions('address', ['getUserAddressListAndDefaultID'])
  },
  computed: {
    ...mapGetters('address', ['defaultAddressId', 'userAddressList']),
    // 生成符合vant-ui需要的用户地址数据结构
    generatorShowListData () {
      const listArr = []
      this.userAddressList.forEach(item => {
        const region = Object.values(item.region)
        region.push(item.detail)
        const obj = {
          id: item.address_id,
          name: item.name,
          tel: item.phone,
          address: region.join(','), // 列表显示的详情地址，包含省市区+detail
          isDefault: item.address_id === this.defaultAddressId
        }
        listArr.push(obj)
      })
      return listArr
    }
  }
}
</script>

<style lang="less" scoped>
.van-address-list__bottom {
  bottom: 50px;
}

.user-address {
  background-color: #F7F8FA;
}
</style>
