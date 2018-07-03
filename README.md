# 微信小程序
服务器返回的是一个数组形式的数据
index.wxml中通过wx:for的方式遍历数组的方式创建view，并且绑定函数，通过wx:for-index="idx"获取下标，使用data-id='{{idx}}'传递参数
index.js中to_content根据传进的参数，让内容区域加载对应的内容
