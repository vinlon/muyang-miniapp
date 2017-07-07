//index.js

//获取应用实例
var app = getApp()
var config = require('../../config.js')
var util = require('../../util/util.js')

Page({
    data: {
        age: {},
        latestNotes: []
    },
    onLoad: function() {
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
                    }
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
                    }
                })
            }
        })
    }

})
