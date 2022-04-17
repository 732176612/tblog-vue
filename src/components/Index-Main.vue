<!--
 * @Author: your name
 * @Date: 2022-02-05 22:22:35
 * @LastEditTime: 2022-03-15 17:02:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\IndexMain.vue
-->
<template>
    <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-10">
            <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                    <div class="text-center">
                        <img class="rounded-circle UserHeadImg" :src="UserDto.UserHeadImg" alt="User profile picture">
                    </div>
                    <h3 class="profile-username text-center">{{UserDto.UserName}}</h3>
                    <p class="text-muted text-center">{{UserDto.BlogName}}</p>
                    <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                            <b>文章数</b> <a class="float-end">0</a>
                        </li>
                        <li class="list-group-item">
                            <b>点赞数</b> <a class="float-end">0</a>
                        </li>
                    </ul>
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
    } from '../assets/js/interface.js';
    import headImgUrl from "../assets/svg/person.svg"

    import {
        useRoute,
        useRouter
    } from 'vue-router'
    export default {
        props: ['UserDto'],
        setup(props) {
            const UserDto = ref({
                BlogName: "",
                UserHeadImg: headImgUrl,
                UserName: "",
                IsInit: false
            })
            const $route = useRoute()
            const $router = useRouter()
            onMounted(async () => {
                let respone = await GetUserInfo({
                    "BlogName": $route.params.blogname
                });
                if (respone != null && respone.Status == 200) {
                    let model = respone.Data;
                    UserDto.value.UserName = model.UserName;
                    if (model.HeadImgUrl != '')
                        UserDto.value.UserHeadImg = model.HeadImgUrl;
                    UserDto.value.BlogName = model.BlogName;
                } else {
                    this.$cookie.set('AutoLogin', 'false');
                    $router.push("/view/login");
                }
            })

            return {
                UserDto
            }
        },
        mounted() {

        },
    }
</script>

<style scoped>
    .UserHeadImg {
        width: 30%;
        border: 3px solid var(--blue);
        margin: 0 auto;
        padding: 3px;
    }
</style>