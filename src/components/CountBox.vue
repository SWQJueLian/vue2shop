<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      // console.log(e.target.value)
      const num = +e.target.value // 转数字处理 (1) 数字 (2) NaN

      // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }

      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  color: #0e0d0d;

  display: flex;

  .add, .minus {
    line-height: 24px;
    width: 24px;
    height: 24px;
    outline: none;
    border: 1px solid #aba7a7;
    background: 0 0;
    border-radius: 0 12px 12px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .minus {
    border-radius: 12px 0 0 12px;
    padding-left: 2px;
  }
  .add {
    padding-right: 2px;
  }
  .inp {
    width: 28px;
    height: 24px;
    outline: none;
    border-bottom: 1px solid #aba7a7;
    border-top: 1px solid #aba7a7;
    border-left: none;
    border-right: none;
    //border: 1px solid #aba7a7;
    background: 0 0;
    text-align: center;
  }
}
</style>
