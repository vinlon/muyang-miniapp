//node.js

//获取应用实例
var app = getApp()
var menu_index_cache_key = 'note_menu_index';

Page({
    data: {
        wordCountLimit: 50,
        currentWordCount: 0,
        menuList: [
            'text', 'image', 'voice', 'video'
        ],
        menuIndex: 0,

        recording: false,
        playing: false,
        hasRecord: false,
        recordTime: 0,
        playTime: 0,
        formatedRecordTime: '00:00:00',
        formatedPlayTime: '00:00:00'
    },
    onLoad: function(option) {
        var cached_menu_index = wx.getStorage({ key: menu_index_cache_key })
        this.setData({
            menuIndex: cached_menu_index
        })
    },
    onHide: function() {
        if (this.data.playing) {
            this.stopVoice()
        } else if (this.data.recording) {
            this.stopRecordUnexpectedly()
        }
    },

    //输入框文本发生变化 
    onNoteChange: function(e) {
        this.setData({
            currentWordCount: e.detail.value.length
        })
    },

    //菜单点击事件处理
    onMenuClick: function(e) {
        var selected_index = parseInt(e.currentTarget.dataset.selected_index)
        wx.setStorage({
            key: menu_index_cache_key,
            data: selected_index
        })
        this.setData({
            menuIndex: selected_index
        })
    },
    startRecord: function() {
        this.setData({ recording: true })

        var that = this
        recordTimeInterval = setInterval(function() {
            var recordTime = that.data.recordTime += 1
            that.setData({
                formatedRecordTime: util.formatTime(that.data.recordTime),
                recordTime: recordTime
            })
        }, 1000)
        wx.startRecord({
            success: function(res) {
                that.setData({
                    hasRecord: true,
                    tempFilePath: res.tempFilePath,
                    formatedPlayTime: util.formatTime(that.data.playTime)
                })
            },
            complete: function() {
                that.setData({ recording: false })
                clearInterval(recordTimeInterval)
            }
        })
    },
    stopRecord: function() {
        wx.stopRecord()
    },
    stopRecordUnexpectedly: function() {
        var that = this
        wx.stopRecord({
            success: function() {
                console.log('stop record success')
                clearInterval(recordTimeInterval)
                that.setData({
                    recording: false,
                    hasRecord: false,
                    recordTime: 0,
                    formatedRecordTime: util.formatTime(0)
                })
            }
        })
    },
    playVoice: function() {
        var that = this
        playTimeInterval = setInterval(function() {
            var playTime = that.data.playTime + 1
            console.log('update playTime', playTime)
            that.setData({
                playing: true,
                formatedPlayTime: util.formatTime(playTime),
                playTime: playTime
            })
        }, 1000)
        wx.playVoice({
            filePath: this.data.tempFilePath,
            success: function() {
                clearInterval(playTimeInterval)
                var playTime = 0
                console.log('play voice finished')
                that.setData({
                    playing: false,
                    formatedPlayTime: util.formatTime(playTime),
                    playTime: playTime
                })
            }
        })
    },
    pauseVoice: function() {
        clearInterval(playTimeInterval)
        wx.pauseVoice()
        this.setData({
            playing: false
        })
    },
    stopVoice: function() {
        clearInterval(playTimeInterval)
        this.setData({
            playing: false,
            formatedPlayTime: util.formatTime(0),
            playTime: 0
        })
        wx.stopVoice()
    },
    clear: function() {
        clearInterval(playTimeInterval)
        wx.stopVoice()
        this.setData({
            playing: false,
            hasRecord: false,
            tempFilePath: '',
            formatedRecordTime: util.formatTime(0),
            recordTime: 0,
            playTime: 0
        })
    }

})
