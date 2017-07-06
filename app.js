//app.js
var util = require('/util/util.js')

App({
    onLaunch: function () {
        console.log('app launched')
        this.getLocation()
    },
    getUserInfo:function(cb){
        var that = this
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
          })
        }
    },
    getLocation: function () {
      var that = this
      wx.getLocation({
        success: function (res) {
          that.globalData.location = util.formatLocation(res.longitude, res.latitude)
        }
      })
    },
    //全局变量
    globalData:{
        userInfo:null,
        location
    }
})