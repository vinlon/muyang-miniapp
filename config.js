/**
 * 小程序配置文件
 */

var host = 'https://mynote.wang/muyang_note/my_note/'

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    //获取宝宝年龄
    getAgeUrl: `${host}/muyang/age`,

    //获取文字日志列表
    textListUrl: `${host}/note/textList`,

    //获取图片日志列表
    imageListUrl: `${host}/note/imageList`,

    //获取最新动态
    latestNotesUrl: `${host}/note/latest`
};

module.exports = config
