<template>
  <div class="comment-sku">
    <van-nav-bar
      title="评价商品"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <div class="comment-sku-item">
        <!--商品信息-->
        <div class="goods-info">
          <div class="goods-img">
            <img :src="detailGoods.goods_image" alt="">
          </div>
          <div class="goods-content">
            <div class="text-ellipsis-2">
              {{ detailGoods.goods_name }}
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
        <!--分割线-->
        <div class="van-hairline--bottom"></div>
        <button @click="handlerSubmitComment">提交评价</button>
      </div>
    </div>
  </div>
</template>

<script>
import { submitComment, uploadImage } from '@/apis/product'
import { mapGetters } from 'vuex'
import { Notify } from 'vant'

export default {
  name: 'ProductCommentDetail',
  created () {
    Notify('因为api文档的接口没写清楚怎么传评价，所以只实现了动态渲染数据、上传图片，但是无法发送评论）')
  },
  data () {
    return {
      rateNum: 0, // 商品评分
      message: '', // 商品评价
      fileList: [], // 图片文件上传列表
      uploadFileInfo: [] // 成功上传后的图片信息对象列表
    }
  },
  methods: {
    // 文件上传完毕后会触发 after-read 回调函数，获取到对应的 file 对象。
    async afterRead (file, detail) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      // console.log(detail)
      // 传递file对象进去
      const resp = await uploadImage(file.file)
      console.log(resp)
      // 将上传图片成功后返回的数据添加到数组中存储
      this.uploadFileInfo.push(resp.data.fileInfo)
    },
    // 文件删除前操作，比如向服务器发出删除图片的请求，不过后端没有这个接口.....
    beforeDelete (file, detail) {
      console.log(file)
      // 返回true才能使得v-model同时删除数据
      return true
    },
    // 提交评价
    async handlerSubmitComment () {
      const resp = await submitComment(this.detailGoods.order_id, [{
        goods_id: this.goods_id,
        order_goods_id: this.order_goods_id,
        score: this.rateNum * 2,
        content: this.message,
        imageList: [
          {}, // api文档一点解释都没有写，完全不知道传什么对象....草！！！！
          {}
        ],
        // imageList: this.uploadFileInfo, // 整个上传返回的info的数组？？？妈的了吧...api文档真的是一点东西都不写...
        uploaded: [
          '10307',
          '10308'
        ]
        // uploaded: this.uploadFileInfo.map(item => item.uploader_id + '') // 我猜测应该是图片上传后的ID？？？
      }])
      console.log(resp, '评价')
    }
  },
  computed: {
    ...mapGetters('comment', ['commentGoods']),
    order_goods_id () {
      return +this.$route.query.order_goods_id
    },
    goods_id () {
      return +this.$route.query.goods_id
    },
    detailGoods () {
      return this.commentGoods.goods.find(item => item.order_goods_id === +this.order_goods_id && item.goods_id === this.goods_id)
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
