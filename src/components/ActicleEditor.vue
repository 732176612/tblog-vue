<!--
 * @Author: your name
 * @Date: 2022-01-23 15:57:56
 * @LastEditTime: 2022-04-04 20:44:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\UserInfo.vue
-->
<template>
    <div class="row justify-content-center" style="padding-bottom:4rem">
        <div class="col-12">
            <form class="mb-4 needs-validation">
                <div class="card">
                    <div class="card-header">
                        <CheckInput :PlaceholderVal="'文章标题'" :CheckAction="CheckRepeatTitle" :RequiredVal=true
                            PatternVal="^.{1,30}$" :VerifyTipVal="'文章标题长度必须为1-30个字符'" ref="ActicleTitleInput">
                        </CheckInput>
                    </div>
                    <div class="card-body">
                        <div ref="summernote" class="summernote"></div>
                    </div>
                    <div class="card-footer text-muted">
                        <div class="rounded-1 px-2 pb-2 row" style="background-color:white">
                            <div class="d-flex align-items-center py-3 my-2 border-bottom col-xl-6 col-lg-12">
                                <label style="font-weight:400" class="w-25 text-end"> 封面图片:</label>
                                <div class="d-flex justify-content-center w-75">
                                    <div class="UpLoadPoster d-flex align-items-center justify-content-center"
                                        @click="this.$refs.PosterImg.click()">
                                        <img ref="ViewPosterImg" class="ViewPosterImg img-thumbnail" :src="PosterImg"
                                            alt="选择头像" />
                                        <!-- <i class="bi bi-plus-circle-dotted" style="font-size:2rem"></i> -->
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center py-3 my-2 border-bottom col-xl-6 col-lg-12">
                                <label style="font-weight:400" class="w-25 text-end">文章标签:</label>
                                <div
                                    class="d-flex justify-content-center align-content-around flex-wrap w-75 pl-2 text-center">
                                    <button v-show="ActicleTags.length<3" type="button"
                                        class="btn btn-outline-danger btn-sm mx-2 mb-2" data-bs-toggle="modal"
                                        data-bs-target="#addTagModal">
                                        <i class="bi bi-plus"></i>
                                        添加标签
                                    </button>
                                    <button type="button" class="btn btn-outline-danger btn-sm mx-2 mb-2"
                                        v-for="(item,index) in ActicleTags" :key="index"
                                        @click="OnClickActicleTags(index)">
                                        {{item}}
                                        <i class="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex align-items-center py-3 my-2 border-bottom col-xl-6 col-lg-12">
                                <label style="font-weight:400" class="w-25 text-end">文章类型:</label>
                                <div class="d-flex justify-content-center w-75 pl-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ActicleTypeRadio"
                                            id="Original" value="1" v-model="ActicleType">
                                        <label class="form-check-label" for="Original">
                                            原创
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ActicleTypeRadio"
                                            id="Reprint" value="2" v-model="ActicleType">
                                        <label class="form-check-label" for="Reprint">
                                            转载
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center py-3 my-2 border-bottom col-xl-6 col-lg-12">
                                <label style="font-weight:400" class="w-25 text-end">发布形式:</label>
                                <div class="d-flex justify-content-center w-75 pl-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="AccessRadio" id="Public"
                                            value="1" v-model="ActicleReleaseForm">
                                        <label class="form-check-label" for="Public">
                                            公共
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="AccessRadio" id="Private"
                                            value="2" v-model="ActicleReleaseForm">
                                        <label class="form-check-label" for="Private">
                                            私密
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="AccessRadio" id="Draft"
                                            value="3" v-model="ActicleReleaseForm">
                                        <label class="form-check-label" for="Draft">
                                            草稿
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="file" ref="PosterImg" hidden @change="OnPosterImgChange" />
            </form>
        </div>
        <div class="BottomNav">
            <div class="d-flex align-items-center justify-content-evenly h-100 p-1">
                <loadingbtn class="btn btn-success rounded-pill" :awaitAction="OnClickSaveDraft" :btnText="'保存草稿'">
                </loadingbtn>
                <loadingbtn class="btn btn-primary rounded-pill" :awaitAction="OnClickSaveActicle" :btnText="'发布博客'">
                </loadingbtn>
            </div>
        </div>

        <!-- 添加标签弹框 -->
        <div class="modal fade" id="addTagModal" tabindex="-1" aria-labelledby="TagModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="TagModalLabel">添加标签</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-target="#addTagModal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input ref="InputArtcleTag" type="text" class="form-control text-center"
                            placeholder="标签名(最长不超过10个字符)" pattern="^.{1,10}$" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="OnClickAddActicleTag">添加</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 预览弹框 -->
        <div class="modal fade p-0" id="ViewModal" tabindex="-1" aria-labelledby="ViewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ViewModalLabel">预览</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-target="#ViewModal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="ViewContent">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        CheckRepeatTitle,
        SaveActicle,
        UpLoadImgByFile,
        GetActicle
    } from '../assets/js/interface.js';
    import $ from 'jquery/dist/jquery'
    import 'summernote/dist/summernote-lite.js'
    import 'summernote/dist/summernote-lite.css'
    import {
        Modal
    } from 'bootstrap/dist/js/bootstrap.bundle'
    import PosterImgUrl from "../assets/svg/plus-circle-dotted.svg"
    export default {
        name: "ArtcleEditor",
        data() {
            return {
                Title: "",
                Content: "",
                PosterImg: PosterImgUrl,
                ActicleReleaseForm: "1",
                ActicleType: "1",
                ActicleTags: [],
                CheckRepeatTitle: CheckRepeatTitle,
            }
        },
        methods: {
            InitRickTextEditor() {
                let that = this;
                let height = window.innerHeight * 0.5;
                var viewButton = function (context) {
                    var ui = $.summernote.ui;
                    var button = ui.button({
                        contents: '<i class="bi bi-eye-fill"/>',
                        click: function () {
                            Modal.getOrCreateInstance(document.getElementById('ViewModal')).show();
                            $('#ViewContent').html($('.summernote').summernote('code'));
                        }
                    });

                    return button.render(); // return button as jquery object
                }

                $('.summernote').summernote({
                    height: height,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview', 'help']],
                        ['mybutton', ['view']]
                    ],
                    buttons: {
                        view: viewButton
                    },
                    callbacks: {
                        onInit: async function () {
                            await that.InitActicle();
                        },
                        onImageUpload: async function (files) {
                            let respone = await UpLoadImgByFile('ActicleImg', files[0]);
                            if (respone.Status == 200) {
                                $('.summernote').summernote('insertImage', respone.Data, 'img');
                                console.log(that.PosterImg);
                                if (that.PosterImg.indexOf('/svg/plus-circle-dotted.svg') != -1 && that
                                    .$refs.PosterImg.files.length == 0) {
                                    that.PosterImg = respone.Data;
                                }
                            }
                        }
                    }
                });
            },
            OnPosterImgChange() {
                if (this.$refs.PosterImg.files.length >= 1) {
                    let file = this.$refs.PosterImg.files[0];
                    if (file.size > 1 * 1024 * 1024) {
                        this.$toast.warning("图片大小不能超过2MB");
                        this.$refs.PosterImg.Value = '';
                        return;
                    }
                    let imgUrl = getObjectURL(file);
                    this.PosterImg = imgUrl;
                }
            },
            OnClickActicleTags(index) {
                this.ActicleTags = [
                    ...this.ActicleTags.slice(0, index),
                    ...this.ActicleTags.slice(index + 1)
                ];
            },
            OnClickAddActicleTag() {
                let tag = this.$refs.InputArtcleTag.value;

                if (this.ActicleTags.length >= 3) {
                    this.$toast.error("标签最多添加3个!");
                    return;
                }

                if (tag == '' || tag == undefined) {
                    this.$toast.warning('标签不能为空!');
                    return;
                }

                this.ActicleTags = [...this.ActicleTags, tag];
                Modal.getOrCreateInstance(document.getElementById('addTagModal')).hide();
            },
            async OnClickSaveActicle() {
                if (this.ActicleReleaseForm == '3') {
                    this.ActicleReleaseForm = '1';
                }
                await this.RequestSaveActicle(false);
            },
            async OnClickSaveDraft() {
                await this.RequestSaveActicle(true);
            },
            async RequestSaveActicle(isDraft) { //isDraft:是否为草稿
                if (!this.$refs.ActicleTitleInput.CheckValidity) {
                    this.$toast.error("文章标题有误");
                    return;
                }

                if (this.$refs.PosterImg.files.length != 0) {
                    let respone = await UpLoadImgByFile('acticleposter', this.$refs.PosterImg.files[0]);
                    if (respone == null || respone.Status == 500) {
                        this.$toast.error("文章封面上传失败");
                        return;
                    } else {
                        this.PosterImg = respone.Data;
                    }
                }
                let posterImg=this.PosterImg.indexOf('plus-circle-dotted')==-1?this.PosterImg:'';
                let respone = await SaveActicle({
                    "id": this.$route.query.id,
                    "title": this.$refs.ActicleTitleInput.InputValue,
                    "content": $('.summernote').summernote('code'),
                    "posterUrl": posterImg,
                    "tags": this.ActicleTags,
                    "acticleType": this.ActicleType,
                    "releaseForm": isDraft ? '3' : this.ActicleReleaseForm
                });
                if (respone.Status == 200) {
                    this.$router.push("/view/acticleView/" + this.$route.params.blogname + "?id=" + respone
                        .Data);
                }
            },
            async InitActicle() {
                if (this.$route.query.id != undefined) {
                    let respone = await GetActicle(this.$route.query.id);
                    if (respone.Status == 200) {
                        this.$refs.ActicleTitleInput.InputValue = respone.Data.Title;
                        this.ActicleTags = [...respone.Data.Tags];
                        this.PosterImg = respone.Data.PosterUrl;
                        $('.summernote').summernote('code', respone.Data.Content);
                        this.ActicleReleaseForm = respone.Data.ReleaseForm;
                        this.ActicleType = respone.Data.ActicleType;
                    }
                }
            }
        },
        async mounted() {
            let that = this;
            this.InitRickTextEditor();
            document.getElementById('addTagModal').addEventListener('hide.bs.modal', function (event) {
                that.$refs.InputArtcleTag.value = '';
            })
        }
    }
</script>

<style scoped>
    .BottomNav {
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 4rem;
        background-color: rgb(255, 255, 255);
        z-index: 1051;
        border-top: darkgray solid 1px;
    }

    .UpLoadPoster {
        border: 1px dashed #bfbfbf;
        border-radius: 4px;
        width: 90px;
        height: 90px;
    }

    .UpLoadPoster:hover {
        cursor: pointer;
        background-color: rgb(221, 221, 221);
    }

    .ViewPosterImg {
        max-height: 90px;
        width: auto;
    }
</style>