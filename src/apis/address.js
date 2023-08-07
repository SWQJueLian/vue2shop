import request from '@/utils/request'

// 获取用户的地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 获取默认收获地址ID，太狗血了吧...就不能来一个获取默认收获地址,....
export const getDefaultAddressID = () => {
  return request.get('/address/defaultId')
}

// 删除收货地址
export const deleteAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

// 添加收货地址
export const addAddress = (name, phone, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      // 省市区写死了，这个省市区ID不是标准ID，有毒....懒得分析了...
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail
    }
  })
}

// 编辑收货地址
export const editAddress = (addressId, name, phone, detail) => {
  return request.post('/address/edit', {
    addressId,
    form: {
      name,
      phone,
      // 省市区写死了，这个省市区ID不是标准ID，有毒....懒得分析了...
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail
    }
  })
}

// 设置默认收货地址
export const setDefaultAddress = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}
