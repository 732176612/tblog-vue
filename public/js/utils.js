/*
 * @Author: your name
 * @Date: 2022-01-28 16:29:07
 * @LastEditTime: 2022-05-28 15:47:01
 * @LastEditors: FalseEndLess 732176612@qq.com
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

function getCookie(cookie_name) {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);
    if (cookie_pos != -1) {
        cookie_pos = cookie_pos + cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}