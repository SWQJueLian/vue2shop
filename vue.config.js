const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './' // 相对路径，使得可以不妨到服务器根部署就能访问，比如双击index.html就可以访问，不然是绝对路径提示找不到js和css
})
