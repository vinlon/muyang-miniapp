//list.js
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置

//获取应用实例
var app = getApp()
var config = require('../../config.js')
var util = require('../../util/util.js')
Page({
    data: {
        host: config.host,
        tabs: ["日志", "图片", "语音"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        pageIndex: 1,
        pageSize: 8,
        loadingMore: false
    },
    onLoad: function(option) {
        //接收GET参数
        this.setData({
            openid: option.openid
        })

        //计算tab间距
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                })
            }
        })

        this.getNoteList()
    },
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: parseInt(e.currentTarget.id)
        })
        this.getNoteList()
    },

    //查询日志列表
    getNoteList: function() {
        //清空原有数据
        this.setData({
            noteList: [],
            showNoteList: []
        })
        wx.showLoading({
            'title': '加载中'
        })
        var url = null
        this.data.pageIndex = 1
        switch (this.data.activeIndex) {
            case 0:
                url = config.textListUrl
                this.data.pageSize = 8
                break
            case 1:
                url = config.imageListUrl
                this.data.pageSize = 3
                break
            case 2:
                wx.showToast({
                    'title': '敬请期待',
                    'icon': 'loading'
                })
                break
        }
        var that = this
        if (url) {
            wx.request({
                url: url,
                header: {
                    ticket: that.data.openid
                },
                method: 'POST',
                success: function(res) {
                    that.setData({
                        noteList: res.data.data,
                        showNoteList: res.data.data.slice(0, that.data.pageIndex * that.data.pageSize)
                    })
                    wx.hideLoading()
                },
                fail: function(err) {
                    console.log(err)
                    wx.showToast({
                        'title': '服务器错误',
                        'icon': 'loading'
                    })
                }
            })
        }
    },

    //加载更多数据
    onReachBottom: function() {
        if (this.data.showNoteList.length < this.data.noteList.length) {
            this.setData({
                loadingMore: true
            })

            //延时1秒种，假装在加载数据
            var that = this
            setTimeout(function() {
                that.setData({
                    pageIndex: that.data.pageIndex + 1,
                    showNoteList: that.data.noteList.slice(0, (that.data.pageIndex + 1) * that.data.pageSize)
                })

                that.setData({
                    loadingMore: false
                })
            }, 1000)

        }
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
