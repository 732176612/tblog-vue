/*
 * @Author: your name
 * @Date: 2022-01-28 16:29:07
 * @LastEditTime: 2022-03-06 19:03:59
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @des: 时间戳转换为几个月前,几周前,几天前,几分钟前
 * @param {*} dateStr
 * @return {*}
 */
function getDateDiff(dateStr) {
    var dateTimeStamp=Date.parse(dateStr.replace(/-/gi,"/"));
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}