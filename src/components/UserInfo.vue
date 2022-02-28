<!--
 * @Author: your name
 * @Date: 2022-01-23 15:57:56
 * @LastEditTime: 2022-02-07 18:37:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\UserInfo.vue
-->
<template>
  <div class="row justify-content-center">
    <div class="col-10 col-xl-8 col-lg-8 col-md-6 col-sm-8">
      <h3 v-show="BlogName.length==0">欢迎来到TBlog!</h3>
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-center">
            <div class="position-relative" style="width: 20%;min-width:100px;">
              <img ref="ViewHeadImg" class="userHeadImg rounded-circle w-100" :src="UserHeadImg" alt="选择头像"
                @click="this.$refs.UserHeadImg.click()" />
              <input type="file" ref="UserHeadImg" hidden @change="OnHeadImageChage" />
              <h5 class="pt-2 textStyle" v-show="UserHeadImg.Length==0">选择头像</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <p style="font-size:1.25em;">个人信息</p>
          <div class="form-group justify-content-center">
            <form class="needs-validation">
              <div class="input-group mb-3">
                <input ref="BlogName" type="text" class="form-control mt-1 text-center"
                  :class="BlogName.length!=0? BlogNameInVailTip==''?'is-valid':'is-invalid':''" :pattern="BlogNameRegex"
                  @input="OnChangeCheckHaveBlogName" placeholder="博客名称(保存后不可修改)" v-model="BlogName" required>
                <div class="invalid-feedback">
                  {{BlogNameInVailTip}}
                </div>
              </div>
              <div class="input-group mb-3" :class="IsSumbit||UserName.length!=0?'was-validated':''">
                <input ref="UserName" type="text" class="form-control text-center" placeholder="您的姓名" v-model="UserName"
                  pattern="^.{1,20}$" required>
                <div class="invalid-feedback">
                  不能为空,且长度不能超过20个字符
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3 mb-4 form-control">
                <label style="font-weight:400">性别：</label>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="SexRadio" id="man" value="1" v-model="Sex">
                  <label class="form-check-label" for="man">
                    男
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="SexRadio" id="women" value="2" v-model="Sex">
                  <label class="form-check-label" for="women">
                    女
                  </label>
                </div>
              </div>
              <input type="date" class="form-control mt-3 text-center" placeholder="生日" v-model="Birthday">
              <div class="input-group mb-3" :class="IsSumbit||Introduction.length!=0?'was-validated':''">
                <textarea ref="Introduction" type="text" class="form-control mt-3 text-center" placeholder="个人介绍"
                  pattern="^.{0,140}$" v-model="Introduction"></textarea>
                <div class="invalid-feedback">
                  长度不能超过140个字符
                </div>
              </div>
              <div class="d-grid gap-2">
                <loadingbtn class="btn-block btn-primary" :awaitAction="OnClickOpenBlog" :btnText="BlogName.length==0?'开通博客':'保存'">
                </loadingbtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    VerifyRegex,
    CheckHaveBlogName,
    SaveUserInfo,
    UpLoadImgByFile,
    SerializeJwt,
    GetUserInfo,
  } from '../assets/js/interface.js';
  import headImgUrl from "../assets/svg/person.svg";
  export default {
    name: "UserInfo",
    data() {
      return {
        UserHeadImg: headImgUrl,
        Birthday: "",
        BlogName: "",
        BlogNameRegex: "",
        BlogNameInVailTip: "",
        UserName: "",
        Introduction: "",
        Sex: "1",
        IsSumbit: false
      }
    },
    methods: {
      async GetVerifyRegex() {
        let regexs = (await VerifyRegex({
          regexName: "BlogName"
        })).Data;

        for (var regex in regexs) {
          if (regexs[regex].Key == 'BlogName') {
            this.BlogNameRegex = regexs[regex].Value;
          }
        }
      },
      OnHeadImageChage() {
        if (this.$refs.UserHeadImg.files.length >= 1) {
          let file = this.$refs.UserHeadImg.files[0];
          if (file.size > 1 * 1024 * 1024) {
            this.$toast.warning("图片大小不能超过2MB");
            this.$refs.UserHeadImg.Value = '';
            return;
          }
          let imgUrl = getObjectURL(file);
          this.$refs.ViewHeadImg.src = imgUrl;
        }
      },
      async OnClickOpenBlog() {
        if (this.BlogNameInVailTip != "" || !this.$refs.UserName.checkValidity() || !this.$refs.Introduction
          .checkValidity()) {
          this.$toast.error("个人信息填报有误");
          return;
        }

        if (this.$refs.UserHeadImg.files.length != 0) {
          let respone = await UpLoadImgByFile('headimg', this.$refs.UserHeadImg.files[0]);
          if (respone == null || respone.Status == 500) {
            this.$toast.error("头像上传失败");
            return;
          } else {
            this.UserHeadImg = respone.Data;
          }
        }
        let respone = await SaveUserInfo({
          Birthday: this.Birthday,
          BlogName: this.BlogName,
          UserName: this.UserName,
          Introduction: this.Introduction,
          Sex: this.Sex,
          HeadImgUrl: this.UserHeadImg
        });
        if (respone != null && respone.Status == 200) {
          this.$router.push("/view/index/" + this.BlogName);
        }
      },
      async OnChangeCheckHaveBlogName() {
        if (this.BlogName.length != 0) {
          if (this.$refs.BlogName.checkValidity()) {
            var respone = await CheckHaveBlogName({
              'BlogName': this.BlogName
            });
            if (respone != null && respone.Status == 500) {
              this.BlogNameInVailTip = '该博客名称已被注册';
            } else {
              this.BlogNameInVailTip = '';
            }
          } else {
            this.BlogNameInVailTip = '博客名称格式不正确';
          }
        } else {
          this.BlogNameInVailTip = '';
        }
      }
    },
    async mounted() {
      this.Birthday = this.$dayjs().format('YYYY-MM-DD');
      let token = this.$cookie.get('token');
      if (token == undefined) {
        let that = this;
        this.$toast.info("登陆信息已失效，请重新登陆");
        setTimeout(() => {
          that.$router.push("/view/login");
        }, 1000);
      } else {
        if (this.$route.params.blogname == undefined) {
          let respone = await SerializeJwt({
            token
          });
          if (respone.Data.BlogName != null && respone.Data.BlogName != '') {
            this.$router.push("/view/userinfo/" + respone.Data.BlogName);
          }
        } else {
          this.BlogName = this.$route.params.blogname;
          this.$refs.BlogName.readOnly = 'readonly';
          let respone = await GetUserInfo({
            "BlogName": this.$route.params.blogname
          });
          if (respone != null && respone.Status == 200) {
            let userDto = respone.Data;
            this.UserName = userDto.UserName;
            this.Sex = userDto.Sex;
            this.Birthday = userDto.Birthday;
            this.Introduction = userDto.Introduction;
            if (userDto.HeadImgUrl != '')
              this.UserHeadImg = userDto.HeadImgUrl;
          }
        }
      }
      await this.GetVerifyRegex();
    }
  }
</script>
<style scoped>
  .userHeadImg {
    border: 5px solid var(--blue);
    margin: 0 auto;
    padding: 3px;
  }

  .userHeadImg:hover {
    animation: selectHeadImg 2s infinite;
    -webkit-animation: selectHeadImg 5s infinite;
    cursor: cell;
  }

  ::-webkit-input-placeholder {
    color: #476166;
    font-size: 1rem;
  }

  .textStyle {
    color: #476166;
    font-size: 1rem;
  }

  @keyframes selectHeadImg {
    0% {
      border-color: var(--orange);
    }

    66% {
      border-color: var(--blue);
    }

    100% {
      border-color: var(--orange);
    }
  }
</style>