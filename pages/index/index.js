//index.js

//获取应用实例
var app = getApp()
var config = require('../../config.js')
var util = require('../../util/util.js')

Page({
    data: {
        host: config.host
    },
    onLoad: function() {
        wx.showLoading({
            'title': '加载中'
        })
        this.getAge()
        this.getLatestNotes()
    },

    //获取宝宝年龄
    getAge: function() {
        var that = this
        app.getUserInfo(function(err, userInfo) {
            if (!err) {
                wx.request({
                    url: config.getAgeUrl,
                    header: {
                        ticket: userInfo.openid
                    },
                    method: 'GET',
                    success: function(res) {
                        that.setData({ age: res.data.data })
                        if (that.data.latestNotes) {
                            wx.hideLoading()
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                        wx.showToast({
                            'title': '服务器错误',
                            'icon': 'loading'
                        })
                    }
                })
            } else {
                wx.showToast({
                    'title': '登录失败',
                    'icon': 'loading'
                })
            }
        })
    },

    //获取最新动态
    getLatestNotes: function() {
        var that = this
        app.getUserInfo(function(err, userInfo) {
            if (!err) {
                wx.request({
                    url: config.latestNotesUrl,
                    header: {
                        ticket: userInfo.openid
                    },
                    method: 'GET',
                    success: function(res) {
                        that.setData({ latestNotes: res.data.data })
                        if (that.data.age) {
                            wx.hideLoading()
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                        wx.showToast({
                            'title': '服务器错误',
                            'icon': 'loading'
                        })
                    }
                })
            } else {
                wx.showToast({
                    'title': '登录失败',
                    'icon': 'loading'
                })
            }
        })
    },

    //图片预览
    previewImage: function(e) {
        var image_path = e.currentTarget.dataset.image_path
        wx.previewImage({
            current: image_path, // 当前显示图片的http链接
            urls: [image_path] // 需要预览的图片http链接列表
        })
    }

})
