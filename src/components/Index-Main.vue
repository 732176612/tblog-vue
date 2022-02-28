<!--
 * @Author: your name
 * @Date: 2022-02-05 22:22:35
 * @LastEditTime: 2022-02-07 18:38:45
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
                    <h3 class="profile-username text-center">{{UserDto.BlogName}}</h3>
                    <p class="text-muted text-center">{{UserDto.UserName}}</p>
                    <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                            <b>粉丝数</b> <a class="float-end">1,322</a>
                        </li>
                        <li class="list-group-item">
                            <b>点赞数</b> <a class="float-end">543</a>
                        </li>
                        <li class="list-group-item">
                            <b>文章数</b> <a class="float-end">13,287</a>
                        </li>
                    </ul>
                    <div class="d-grid gap-2">
                        <a href="#" class="btn btn-primary btn-block"><b>关注我</b></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        computed
    } from 'vue'
    export default {
        data() {
            return {

            }
        },
        props: ['UserDto'],
        methods: {

        },
        setup(props) {
            const UserDto = computed(() => {
                return props.UserDto;
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