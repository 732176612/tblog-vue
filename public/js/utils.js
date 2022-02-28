/*
 * @Author: your name
 * @Date: 2022-01-28 16:29:07
 * @LastEditTime: 2022-02-02 16:28:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\assets\js\utils.js
 */

/**
 * @des: 获取网页链接参数
 * @param {网页链接} URL
 * @return {所有参数对象}
 */
function getParameters(URL) {
    if (URL == undefined || URL == "")
        URL = location.href;
    URL = URL.split("?");
    if (URL[1] != undefined && URL[1] != "") {
        URL = JSON.parse(
            '{"' +
            decodeURI(URL[1])
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
            '"}'
        );
        return URL;
    } else {
        return {};
    }
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

async function getToken() {
    let token = await cookieStore.get("token");
    if (token != null) {
        return token.value;
    }
    return token;
}