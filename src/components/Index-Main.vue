<!--
 * @Author: your name
 * @Date: 2022-02-05 22:22:35
 * @LastEditTime: 2022-05-29 16:45:49
 * @LastEditors: FalseEndLess 732176612@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\IndexMain.vue
-->
<template>
    <div class="page-content">
        <div class="profile-page">
            <div class="wrapper">
                <div class="page-header page-header-small" filter-color="green">
                    <div class="page-header-image" data-parallax="true">
                    </div>
                    <div class="container">
                        <div class="content-center">
                            <div class="cc-profile-image">
                                <a href="#"><img :class="IsLoadImg?'':'placeholder'" :onload="UserHeadOnLoad(this)"
                                        :src="UserDto.HeadImgUrl" alt="头像" /></a>
                            </div>
                            <div class="h2 title">{{UserDto.UserName}}</div>
                            <p class="category text-white">{{UserDto.Sign}}</p>
                            <a class="btn btn-primary aos-init " v-if="UserDto.ResumeUrl!=''" :href="UserDto.ResumeUrl"
                                data-aos="zoom-in" data-aos-anchor="data-aos-anchor" target="_blank">下载简历</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" id="about">
            <div class="container">
                <div class="card aos-init " data-aos="fade-up" data-aos-offset="10">
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="card-body">
                                <div class="h4 mt-0 title">自我介绍</div>
                                <p>{{UserDto.Introduction}}</p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="card-body">
                                <div class="h4 mt-0 title">基本信息</div>
                                <div class="row mt-1">
                                    <div class="col-sm-4"><strong class="text-uppercase">年龄:</strong></div>
                                    <div class="col-sm-8">{{UserDto.Age}}</div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-sm-4"><strong class="text-uppercase">邮箱:</strong></div>
                                    <div class="col-sm-8">{{UserDto.Email}}</div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-sm-4"><strong class="text-uppercase">手机:</strong></div>
                                    <div class="col-sm-8">{{UserDto.Phone}}</div>
                                </div>
                                <div class="row mt-2" v-if="IsApartEdu">
                                    <div class="col-sm-4"><strong class="text-uppercase">毕业学校:</strong></div>
                                    <div class="col-sm-8">{{EduInfos[0].School}}</div>
                                </div>
                                <div class="row mt-2" v-if="IsApartEdu">
                                    <div class="col-sm-4"><strong class="text-uppercase">所读专业:</strong></div>
                                    <div class="col-sm-8">{{EduInfos[0].Major}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" id="skill" v-show="SkillInfos.length!=0">
            <div class="container">
                <div class="h4 text-center mb-4 title">专业技能</div>
                <div class="card aos-init " data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <div class="card-body">
                        <div class="row" v-for="i in SkillInfos.length/2" :key="i">
                            <div class="col-md-6" v-for="j in 2" :key="j">
                                <div v-show="(i-1)*2+(j-1)<SkillInfos.length"
                                    class="progress-container progress-primary"><span
                                        class="progress-badge">{{SkillInfos[(i-1)*2+(j-1)].Skill}}</span>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-primary aos-init" data-aos="progress-full"
                                            data-aos-offset="1" data-aos-duration="2000" role="progressbar"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                            :style="'width: '+SkillInfos[(i-1)*2+(j-1)].Progress+'%;'"></div><span
                                            class="progress-value">{{SkillInfos[(i-1)*2+(j-1)].Progress}}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" id="experience" v-show="CompanyInfos.length!=0">
            <div class="container cc-experience">
                <div class="h4 text-center mb-4 title">工作经历</div>
                <div class="card" v-for="(item,index) in CompanyInfos" :key="index">
                    <div class="row">
                        <div class="col-md-3 bg-primary aos-init" data-aos="fade-right" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body cc-experience-header">
                                <p>{{item.Company}}</p>
                                <div class="h5">{{item.StartDate}} - {{item.EndDate}}</div>
                            </div>
                        </div>
                        <div class="col-md-9 aos-init" data-aos="fade-left" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body">
                                <div class="h5">{{item.Position}}-<span class="category"
                                        style="font-size:1rem">{{item.Department}}</span>
                                </div>
                                <p>{{item.Introduction}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" v-show="ProjectInfos.length!=0">
            <div class="container cc-experience">
                <div class="h4 text-center mb-4 title">项目经历</div>
                <div class="card" v-for="(item,index) in ProjectInfos" :key="index">
                    <div class="row">
                        <div class="col-md-3 bg-primary aos-init" data-aos="fade-right" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body cc-experience-header">
                                <div class="h5">{{item.Project}}</div>
                                <div style="font-size:1.25rem;padding-bottom:5px;">{{item.StartDate}} - {{item.EndDate}}
                                </div>
                                <div class="h5">
                                    {{item.Role}} - {{item.City}}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9 aos-init" data-aos="fade-left" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body">
                                <p>{{item.Introduction}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" v-show="!IsApartEdu">
            <div class="container cc-experience">
                <div class="h4 text-center mb-4 title">教育经历</div>
                <div class="card" v-for="(item,index) in EduInfos" :key="index">
                    <div class="row">
                        <div class="col-md-3 bg-primary aos-init" data-aos="fade-right" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body cc-experience-header">
                                <div class="h5">{{item.School}}</div>
                                <div style="font-size:1.25rem;padding-bottom:5px;">{{item.StartDate}} - {{item.EndDate}}
                                </div>
                                <div class="h5">
                                    {{item.Major}}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9 aos-init" data-aos="fade-left" data-aos-offset="50"
                            data-aos-duration="500">
                            <div class="card-body">
                                <p>{{item.Introduction}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ref,
        onMounted
    } from 'vue'
    import {
        GetUserInfo,
        GetSkillInfo,
        GetCompanyInfo,
        GetProjectInfo,
        GetEduInfo
    } from '../assets/js/interface.js';
    import {
        useRoute,
        useRouter
    } from 'vue-router'
    export default {
        props: ['UserDto', 'UserHeadOnLoad', 'IsLoadImg', 'SkillInfos', 'CompanyInfos', 'ProjectInfos', 'EduInfos','IsApartEdu'],
        setup(props) {
            const UserDto = ref({});
            const $route = useRoute()
            const $router = useRouter()
            const SkillInfos = ref([]);
            const CompanyInfos = ref([]);
            const ProjectInfos = ref([]);
            const IsLoadImg = ref(false);
            const EduInfos = ref([]);
            const IsApartEdu=ref(false);
            onMounted(async () => {
                let respone = await GetUserInfo($route.params.blogname);
                if (respone != null && respone.Status == 200) {
                    UserDto.value = respone.Data;
                    if (UserDto.value.HeadImgUrl == '')
                        IsLoadImg.value = false;
                } else {
                    this.$cookie.set('AutoLogin', 'false');
                    $router.push("/view/login");
                }

                respone = await GetSkillInfo($route.params.blogname);
                if (respone.Status == 200) {
                    SkillInfos.value = respone.Data;
                }

                respone = await GetCompanyInfo($route.params.blogname);
                if (respone.Status == 200) {
                    CompanyInfos.value = respone.Data;
                }

                respone = await GetProjectInfo($route.params.blogname);
                if (respone.Status == 200) {
                    ProjectInfos.value = respone.Data;
                }

                respone = await GetEduInfo($route.params.blogname);
                if (respone.Status == 200) {
                    EduInfos.value = respone.Data;
                    if(EduInfos.value.length==1&&EduInfos.value[0].Introduction=='')
                    {
                        IsApartEdu.value=true;
                    }
                }
            });

            const UserHeadOnLoad = function (img) {
                if (UserDto.value.HeadImgUrl != '') {
                    IsLoadImg.value = true;
                }
            }

            return {
                UserDto,
                UserHeadOnLoad,
                IsLoadImg,
                SkillInfos,
                CompanyInfos,
                ProjectInfos,
                EduInfos,
                IsApartEdu
            }
        }
    }
</script>

<style scoped>
    .progress-container {
        position: relative;
    }

    .progress-container+.progress-container,
    .progress-container~.progress-container {
        margin-top: 15px;
    }

    .progress-container .progress-badge {
        color: #888;
        font-size: 0.8571em;
        text-transform: uppercase;
    }

    .progress-container .progress {
        height: 1px;
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        background: rgba(222, 222, 222, 0.8);
        margin-top: 14px;
    }

    .progress-container .progress .progress-bar {
        -webkit-box-shadow: none;
        box-shadow: none;
        background-color: #888;
    }

    .progress-container .progress .progress-value {
        position: absolute;
        top: 2px;
        right: 0;
        color: #888;
        font-size: 0.8571em;
    }

    .progress-container.progress-neutral .progress {
        background: rgba(255, 255, 255, 0.3);
    }

    .progress-container.progress-neutral .progress-bar {
        background: #FFFFFF;
    }

    .progress-container.progress-neutral .progress-value,
    .progress-container.progress-neutral .progress-badge {
        color: #FFFFFF;
    }

    .progress-container.progress-primary .progress {
        background: rgba(3, 169, 244, 0.4);
    }

    .progress-container.progress-primary .progress-bar {
        background: var(--blue);
    }

    .progress-container.progress-primary .progress-value,
    .progress-container.progress-primary .progress-badge {
        color: var(--blue);
    }

    .progress-container.progress-info .progress {
        background: rgba(44, 168, 255, 0.3);
    }

    .progress-container.progress-info .progress-bar {
        background: #2CA8FF;
    }

    .progress-container.progress-info .progress-value,
    .progress-container.progress-info .progress-badge {
        color: #2CA8FF;
    }

    .progress-container {
        margin-bottom: 20px;
        font-size: 18px;
    }

    .progress-container .progress-bar {
        height: 5px;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: -webkit-transform 2s ease-in-out;
        transition: -webkit-transform 2s ease-in-out;
        transition: transform 2s ease-in-out;
        transition: transform 2s ease-in-out, -webkit-transform 2s ease-in-out;
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
    }

    .progress-container .progress {
        height: 5px;
        font-size: 18px;
    }

    .progress-container .aos-animate {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    .title {
        font-weight: 700;
    }

    .category {
        text-transform: uppercase;
        font-weight: 700;
        color: #9A9A9A;
    }

    .card {
        border: 0;
        border-radius: 0.1875rem;
        display: inline-block;
        position: relative;
        overflow: hidden;
        width: 100%;
        margin-bottom: 20px;
        -webkit-box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
    }

    .card .card-body {
        min-height: 170px;
    }

    .section {
        padding: 70px 0;
        position: relative;
        background: #FFFFFF;
    }

    .section .row+.category {
        margin-top: 15px;
    }

    .page-header {
        height: 100vh;
        max-height: 1050px;
        padding: 0;
        color: #FFFFFF;
        position: relative;
        background-position: center center;
        background-size: cover;
    }

    .page-header .page-header-image {
        position: absolute;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: url('../assets/img/bg.jpg');
        transform: translate3d(0px, 0px, 0px);
    }

    .page-header .container {
        height: 100%;
        z-index: 1;
        text-align: center;
        position: relative;
    }

    .page-header .container>.content-center {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        padding: 0 15px;
        color: #FFFFFF;
        width: 100%;
        max-width: 880px;
    }

    .page-header .category,
    .page-header .description {
        color: rgba(255, 255, 255, 0.5);
    }

    .page-header.page-header-small {
        height: 60vh;
        max-height: 440px;
    }

    .page-header:after,
    .page-header:before {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        display: block;
        left: 0;
        top: 0;
        content: "";
    }

    .page-header:before {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .page-header .container {
        z-index: 2;
    }

    .page-header {
        background: rgba(44, 44, 44, 0.2);
        background: -webkit-gradient(linear, left bottom, left top, from(rgba(44, 44, 44, 0.2)), to(#03a9f480));
        background: linear-gradient(0deg, rgba(44, 44, 44, 0.2), #03a9f480);
    }

    .page-header .btn {
        width: 140px;
    }

    /* Profile Image Style */
    @-webkit-keyframes pulsate {
        0% {
            -webkit-transform: scale(0.6, 0.6);
            transform: scale(0.6, 0.6);
            opacity: 0.0;
        }

        50% {
            opacity: 1.0;
        }

        100% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0.0;
        }
    }

    @keyframes pulsate {
        0% {
            -webkit-transform: scale(0.6, 0.6);
            transform: scale(0.6, 0.6);
            opacity: 0.0;
        }

        50% {
            opacity: 1.0;
        }

        100% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0.0;
        }
    }

    .cc-profile-image a {
        position: relative;
    }

    .cc-profile-image a:before {
        content: "";
        border: 15px solid rgba(3, 169, 244, 0.6);
        border-radius: 50%;
        height: 180px;
        width: 180px;
        position: absolute;
        left: 0;
        -webkit-animation: pulsate 1.6s ease-out;
        animation: pulsate 1.6s ease-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        opacity: 0.0;
        z-index: 99;
    }

    .cc-profile-image img {
        position: relative;
        border-radius: 50%;
        height: 180px;
        width: 180px;
        padding: 0;
        margin: 0;
        border: 15px solid transparent;
        z-index: 9999;
        -webkit-transition: all .3s ease-out;
        transition: all .3s ease-out;
    }

    .cc-profile-image a:hover img {
        -webkit-transform: scale(1.06, 1.06);
        transform: scale(1.06, 1.06);
    }

    .cc-profile-image a:hover:before {
        -webkit-animation: none;
        animation: none;
    }

    .cc-experience .cc-experience-header {
        padding-top: 40px;
        padding-right: 0;
        text-align: center;
        color: #fff;
        text-transform: uppercase;
    }
</style>