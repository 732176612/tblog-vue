/*
 * @Author: your name
 * @Date: 2021-11-06 13:36:46
 * @LastEditTime: 2022-02-28 18:23:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\assets\js\interface.js
 */
import request from "./axios"
/**
 * @des: 获取正则表达式 (Phone,Mail)
 * @param {regexName} params
 * @return {*}
 */
export function VerifyRegex (params)
{
  return request({
    url: "/api/Common/VerifyRegex",
    method: "get",
    params
  },false)
}

/**
 * @des: 
 * @param {phoneOrMail} params
 * @return {*}
 */
export function CheckHavePhoneOrMail (params)
{
  return request({
    url: "/api/User/CheckHavePhoneOrMail",
    method: "get",
    params
  },false)
}

/**
 * @des: 请求验证码
 * @param {phoneOrMail} params
 * @return {*}
 */
export function RequestVCode (params)
{
  return request({
    url: "/api/User/RequestVCode",
    method: "get",
    params
  })
}

/**
 * @des: 普通用户注册
 * @param {email,phone,password,vCode} params
 * @return {*}
 */
export function RegisterUser (params)
{
  return request({
    url: "/api/User/RegisterUser",
    method: "POST",
    data: params,
    headers: { 'content-type': 'application/json' }
  })
}

/**
 * @des: 用户登录
 * @param {PhoneOrMail,Password} params
 * @return {token}
 */
export function LoginUser (params)
{
  return request({
    url: "/api/User/LoginUser",
    method: "POST",
    data: params,
    headers: { 'content-type': 'application/json' }
  })
}

export function LogOut ()
{
  return request({
    url: "/api/User/LogOut",
    method: "POST",
  })
}

/**
 * @des: 申请找回密码
 * @param {phoneOrMail} params
 * @return {*}
 */
export function RequestRecoverPwd (params)
{
  return request({
    url: "/api/User/RequestRecoverPwd",
    method: "get",
    params
  })
}

/**
 * @des: 找回密码-重设密码
 * @param {vcode,phoneOrMail,password} params
 * @return {*}
 */
export function ResponeRecoverPwd (params)
{
  return request({
    url: "/api/User/ResponeRecoverPwd",
    method: "POST",
    data: params,
    headers: { 'content-type': 'application/json' }
  })
}

/**
 * @des: 根据博客名称获取用户信息
 * @param {blogName} 
 * @return {*}
 */
export function GetUserInfo (params)
{
  return request({
    url: "/api/User/GetUserInfo",
    method: "GET",
    params
  },false)
}

/**
 * @des: 根据Token获取身份信息
 * @param {token} params
 * @return {*}
 */
export function SerializeJwt (params)
{
  return request({
    url: "/api/User/SerializeJwt",
    method: "get",
    params
  },false)
}

/**
 * @des: 检查博客名称是否存在
 * @param {BlogName} params
 * @return {*}
 */
export function CheckHaveBlogName (params)
{
  return request({
    url: "/api/User/CheckHaveBlogName",
    method: "get",
    params
  },false)
}

/**
 * @des: 保存用户信息
 * @param {blogName,headImgUrl,introduction,userName,sex,birthday} params
 * @return {*}
 */
export function SaveUserInfo (params)
{
  return request({
    url: "/api/User/SaveUserInfo",
    method: "POST",
    data: params,
    headers: { 'content-type': 'application/json' }
  })
}

/**
 * @des: 上传图片
 * @param {path(保存路径),formFile} params
 * @return {*}
 */
export function UpLoadImgByFile (path,formFile)
{
  let formData=new FormData();
  formData.append("files",formFile)
  return request({
    url: "/api/Media/UpLoadImgByFile?path="+path,
    method: "POST",
    data: formData,
    headers: { 'content-type': 'multipart/form-data' }
  },false)
}

/**
 * @des: 根据角色权限获取菜单
 * @return {*}
 */
export function GetMenus()
{
  return request({
    url: "/api/Menu/GetMenus",
    method: "get",
  },false)
}

/**
 * @des: 检查重复标题
 * @return {*}
 */
export function CheckRepeatTitle(title)
{
  return request({
    url: "/api/Acticle/CheckRepeatTitle?title="+title,
    method: "get",
  },false)
}

/**
 * @des: 保存文章
 * @param {title,content,posterUrl,tags[...],acticleType,releaseForm} params
 * @return {*}
 */
export function SaveActicle (params)
{
  return request({
    url: "/api/Acticle/SaveActicle",
    method: "POST",
    data: params,
    headers: { 'content-type': 'application/json' }
  })
}

/**
 * @des: 获取文章
 * @return {*}
 */
export function GetActicle(id)
{
  return request({
    url: "/api/Acticle/GetActicle?id="+id,
    method: "get",
  },false)
}