/**
 * 小程序配置文件
 */

var host = "mynote.wang/muyang_note/my_note/"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    //获取宝宝年龄
    getAgeUrl: `https://${host}/muyang/age`,

    //获取最新动态
    latestNotesUrl: `https://${host}/note/latest`
};

module.exports = config
