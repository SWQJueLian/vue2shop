<template>
  <div class="comment-sku">
    <van-nav-bar
      title="评价商品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="comment-sku-item">
        <!--商品信息-->
        <div class="goods-info">
          <div class="goods-img">
            <img src="http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg" alt="">
          </div>
          <div class="goods-content">
            <div class="text-ellipsis-2">
              Apple iPhone 14 Pro Max 256G 银色 移动联通电信5G双卡双待手机
            </div>
          </div>

        </div>
        <!--评分条-->
        <div class="rate">
          评分：<van-rate v-model="rateNum" />
        </div>
        <!--评价内容-->
        <div>
          <van-field
            v-model="message"
            rows="2"
            :autosize="{maxHeight:100,minHeight:100}"
            clearable
            type="textarea"
            maxlength="500"
            placeholder="感觉怎样？跟大家分享一下吧~"
            show-word-limit
          />
        </div>
        <!--图片上传-->
        <div>
          <van-uploader
            v-model="fileList"
            multiple :max-count="10"
            :after-read="afterRead"
            :before-delete="beforeDelete"
          />
        </div>
      </div>
      <!--分割线-->
      <div class="van-hairline--bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductComment',
  data () {
    return {
      rateNum: 0, // 商品评分
      message: '', // 商品评价
      fileList: [] // 图片文件上传列表
    }
  },
  methods: {
    // 文件上传完毕后会触发 after-read 回调函数，获取到对应的 file 对象。
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    // 文件删除前操作，比如向服务器发出删除图片的请求，不过后端没有这个接口.....
    beforeDelete (file, detail) {
      console.log(file)
      // 返回true才能使得v-model同时删除数据
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.goods-img {
  width: 90px;
  height: 90px;
  margin: 0px 10px 10px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.goods-content {
  flex: 2;
}
.goods-info {
  display: flex;
}
.main {
  padding: 0 10px;
}
.rate {
  padding-left: 10px;
}
.van-cell {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
