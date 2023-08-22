# myshop

## 在线预览：http://swqjuelian.github.io

## 相对于课程来讲，改进和优化大致内容如下：具体可以看commit提交...

1. 首页：下拉刷新、商品item一键加收藏、加购物车、分享、图片懒加载

2. 商品详情页：增加van的SKU选择面板

3. 分类：图片懒加载、空分类van-empty

4. 搜索页面：支持上拉加载更多数据（van的list组件运用）、支持价格排序（只有价格排序接口...）

5. 购物车：SKU项左滑可一键收藏和删除、商品标签显示。

6. 结算页：添加支付宝、微信支付方式、优惠卷选择组件、收货地址编辑。

7. 提供商品收藏功能：本地localstroage保存数据、支持左滑删除收藏。

8. 提供收货地址列表、收货地址编辑、新增收货地址。

9. 个人中心：添加待评价快捷按钮。

10. 支持评价商品，针对一个订单中的某个SKU分别评价（模仿京东和淘宝）

11. 提供确认收货、取消订单功能。

12. 订单页允许快捷重新将商品加入到购物车（模仿京东和淘宝）。

13. 细节：各个组件一些CSS样式调节（主要是模仿一下京东和淘宝、会额外添加一些按钮图标之类的）

14. keep-alive 缓存首页和分类页。

15. 其他：忘记了...


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
