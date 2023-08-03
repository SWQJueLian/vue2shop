<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <van-form>
        <van-field v-model.trim="mobile"
                   clearable
                   label="手机号码"
                   type="tel"
                   placeholder="请输入手机号码"
                   :rules="[{validator: validatorMobile, message:'手机号格式错误'}]">
        </van-field>
        <van-field v-model="code"
                   clearable
                   label="图形验证码"
                   placeholder="请输入图形验证码"
                   :rules="[{validator: validatorCode, message:'请输入4位图形验证码'}]"
        >
          <template #extra>
            <img class="code" v-if="codePic" @click="getCode()" :src="codePic" alt="">
          </template>
        </van-field>
        <van-field v-model="smscode" clearable required label="短信验证码" placeholder="请输入短信验证码"
                   :rules="[{validator: validatorSMSCode, message:'短信验证码格式错误'}]">
          <template #button>
            <van-button @click="getSMSCode" :disabled="totalSecond !== currentSecond" size="small" type="primary">
              {{ totalSecond === currentSecond ? '获取验证码' : `${currentSecond}秒后重新发送` }}
            </van-button>
          </template>
        </van-field>
      </van-form>
      <!--

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="code" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="codePic" @click="getCode()" :src="codePic" alt="">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSMSCode" :disabled="totalSecond !== currentSecond">
            {{ totalSecond === currentSecond ? '获取验证码' : `${currentSecond}秒后重新发送` }}
          </button>
        </div>
      </div>
      -->

      <div @click="loginSystem" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getCode, getSMSCode, loginSystem } from '@/apis/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  created () {
    this.getCode()
  },
  beforeDestroy () {
    // 组件销毁时移除定时器
    clearInterval(this.smstimer)
  },
  data () {
    return {
      codePic: '', // 图形验证码
      codeKey: '', // 图形验证码key
      code: '', // 用户输入的图形验证码
      mobile: '', // 用户手机号
      smstimer: null,
      totalSecond: 5,
      currentSecond: 5,
      smscode: '' // 用户输入的短信验证码
    }
  },
  methods: {
    async loginSystem () {
      if (!(this.validatorSMSCode(this.smscode) && this.validatorCode(this.code) && this.validatorMobile(this.mobile))) {
        this.$toast('校验不通过！允许登录系统')
        return
      }
      const {
        data: {
          userId,
          token
        }
      } = await loginSystem(this.mobile, this.smscode)
      console.log(userId, token)
    },
    // 校验手机号
    validatorMobile (val) {
      console.log(val)
      return /^[1,3-9]\d{10}$/.test(val)
    },
    // 校验图形验证码
    validatorCode (val) {
      return /^\w{4}$/.test(val)
    },
    // 校验短信验证码
    validatorSMSCode (val) {
      return /^\d{6}$/.test(val)
    },
    async getSMSCode () {
      if (!(this.validatorCode(this.code) && this.validatorMobile(this.mobile))) {
        this.$toast('校验不通过！不发送短信验证码')
        return
      }
      if (!this.smstimer && this.currentSecond === this.totalSecond) {
        // 计算倒计时，用于前端显示倒计时
        this.smstimer = setInterval(() => {
          // 让currentSecond自减1
          this.currentSecond--
          // 判断自减完后是否等于小于0，如果是则移除定时器，重置currentSecond的值
          if (this.currentSecond <= 0) {
            clearInterval(this.smstimer)
            this.smstimer = null
            this.currentSecond = this.totalSecond
          }
        }, 1000)
        await getSMSCode(this.code, this.codeKey, this.mobile)
        this.$toast('获取短信验证码成功！')
      } else {
        console.log('频繁获取短信验证码')
      }
    },
    async getCode () {
      // 拆包，类似python中的拆包，因为getCode放回的是一个字典，这里是拿字典key为data
      // data又是一个字典然后又继续往里面拆包，闹到base64和key这两个key值，并且用同名的变量接收。
      const {
        data: {
          base64,
          key
        }
      } = await getCode()
      // console.log(base64)
      // console.log(key)
      this.codeKey = key
      this.codePic = base64
      // 测试toast提示
      // 方法一：需要导入Toast再使用，适合场景：js和vue组件都能用
      // Toast('获取图片验证码成功')

      // 方法二：使用$toast()， 只能在组件内使用，原理，将toast挂在vue原型上
      // this.$toast('获取图片验证码成功2')
    }
  }
}
</script>

<style lang="less" scoped>
.code {
  margin-left: 8px;
  width: 94px;
  height: 31px;
}

.container {
  padding: 49px 10px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
