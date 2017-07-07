//app.js
var util = require('/util/util.js')

App({
    onLaunch: function() {
        console.log('app launched')
        this.getLocation()
    },

    //lazy load userInfo
    getUserInfo: function(callback) {
        var that = this
        if (this.globalData.userInfo) {
            typeof callback == "function" && callback(null, this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof callback == "function" && callback(null, that.globalData.userInfo)
                        },
                        fail: function(err) {
                            callback(res)
                        }
                    })
                },
                fail: function(err) {
                    callback(err)
                }
            })
        }
    },
    getLocation: function() {
        var that = this
        wx.getLocation({
            success: function(res) {
                that.globalData.location = util.formatLocation(res.longitude, res.latitude)
            }
        })
    },
    //全局变量
    globalData: {
        userInfo: null,
        location: null
    }
})
