Page({
  data: {
    maxDuration: 120, //视频最大长度2分钟
    sourceType: ['camera', 'album'],
    camera: ['front', 'back'],

    src: ''
  },
  onLoad: function() {
    console.log('发布视频日记')
  },
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: this.data.sourceType,
      camera: this.data.camera,
      maxDuration: this.data.maxDuration,
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})
