//index.js
//获取应用实例
const app = getApp()
var socketOpen = false
var socketMsgQueue = []

Page({
  data: {
    html:'',
    motto: 'python学习',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    article:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function (){
    wx.request({
      url: 'http://127.0.0.1:8000/Article/',

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
          this.article = res.data
          this.setData({
            article: this.article
          })
          console.log(this.article)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  to_content: function (e) {
    
    var index = e.currentTarget.dataset.id
    
    this.setData({
      html:this.article[index].content
    })
  }
})
