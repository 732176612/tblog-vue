<!--
 * @Author: your name
 * @Date: 2022-01-23 15:57:56
 * @LastEditTime: 2022-04-17 17:22:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\UserInfo.vue
-->
<template>
  <div class="row justify-content-center  h-100">
    <div class="d-flex align-items-start">
      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
          type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">个人信息</button>
        <button class="nav-link" id="v-pills-edu-tab" data-bs-toggle="pill" data-bs-target="#v-pills-edu" type="button"
          role="tab" aria-controls="v-pills-edu" aria-selected="false" v-show="BlogName.length!=0">教育经历</button>
        <button class="nav-link" id="v-pills-skill-tab" data-bs-toggle="pill" data-bs-target="#v-pills-skill"
          type="button" role="tab" aria-controls="v-pills-skill" aria-selected="false"
          v-show="BlogName.length!=0">专业技能</button>
        <button class="nav-link" id="v-pills-work-tab" data-bs-toggle="pill" data-bs-target="#v-pills-work"
          type="button" role="tab" aria-controls="v-pills-work" aria-selected="false"
          v-show="BlogName.length!=0">工作经历</button>
        <button class="nav-link" id="v-pills-work-tab" data-bs-toggle="pill" data-bs-target="#v-pills-project"
          type="button" role="tab" aria-controls="v-pills-project" aria-selected="false"
          v-show="BlogName.length!=0">项目经历</button>
      </div>
      <div class="tab-content col-12" id="v-pills-tabContent">
        <div class="tab-pane fade show active col-10" id="v-pills-home" role="tabpanel"
          aria-labelledby="v-pills-home-tab">
          <h3 class="text-center mt-3" v-show="BlogName.length==0">欢迎来到TBlog,请补充你的个人信息</h3>
          <div class="card">
            <div class="card-header bg-white">
              <div style="font-size:1.25em;font-weight: 700;">个人信息</div>
            </div>
            <div class="card-body pt-0">
              <div class="d-flex flex-column my-3">
                <label class="form-label text-center">我的头像</label>
                <img ref="ViewHeadImg" class="userHeadImg rounded-circle" :src="UserHeadImg" alt="选择头像"
                  @click="this.$refs.UserHeadImg.click()" />
                <input type="file" ref="UserHeadImg" hidden @change="OnHeadImageChage" />
              </div>
              <form class="needs-validation">
                <div class="row">
                  <div class="col  my-1">
                    <label class="form-label">博客名称</label>
                    <input ref="BlogName" type="text" class="form-control"
                      :class="BlogName.length!=0? BlogNameInVailTip==''?'is-valid':'is-invalid':''"
                      :pattern="BlogNameRegex" @input="OnChangeCheckHaveBlogName" placeholder="(保存后不可修改)"
                      v-model="BlogName" required>
                    <div class="invalid-feedback">
                      {{BlogNameInVailTip}}
                    </div>
                  </div>
                  <div class="col  my-1">
                    <label class="form-label">姓名</label>
                    <input ref="UserName" type="text" class="form-control" v-model="UserName"
                      :class="IsSumbitUserInfo||UserName.length!=0?'was-validated':''" pattern="^.{1,20}$" required>
                    <div class="invalid-feedback">
                      不能为空,且长度不能超过20个字符
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col  my-1">
                    <label class="form-label">性别</label>
                    <div class="form-control d-flex">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="SexRadio" id="man" value="1" v-model="Sex">
                        <label class="form-check-label" for="man">男</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="SexRadio" id="women" value="2" v-model="Sex">
                        <label class="form-check-label" for="women">女</label>
                      </div>
                    </div>
                  </div>

                  <div class="col  my-1">
                    <label class="form-label">生日</label>
                    <input type="date" class="form-control" v-model="Birthday">
                  </div>
                </div>

                <div class="row my-1">
                  <div class="col">
                    <label class="form-label">个人介绍</label>
                    <textarea ref="Introduction" type="text" class="form-control " placeholder="个人介绍"
                      :class="IsSumbitUserInfo||Introduction.length!=0?'was-validated':''" pattern="^.{0,140}$"
                      v-model="Introduction"></textarea>
                    <div class="invalid-feedback">
                      长度不能超过140个字符
                    </div>
                  </div>
                </div>

                <div class="d-grid mt-3">
                  <loadingbtn class="btn-block btn-primary" :awaitAction="OnClickOpenBlog"
                    :btnText="BlogName.length==0?'开通博客':'保存'">
                  </loadingbtn>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="tab-pane fade col-10" id="v-pills-edu" role="tabpanel" aria-labelledby="v-pills-edu-tab">
          <EduInfo></EduInfo>
        </div>
        <div class="tab-pane fade col-10" id="v-pills-skill" role="tabpanel" aria-labelledby="v-pills-skill-tab">
          <SkillInfo></SkillInfo>
        </div>
        <div class="tab-pane fade col-10" id="v-pills-work" role="tabpanel" aria-labelledby="v-pills-work-tab">
          <CompanyInfo></CompanyInfo>
        </div>
        <div class="tab-pane fade col-10" id="v-pills-project" role="tabpanel" aria-labelledby="v-pills-project-tab">
          <Projectinfo></Projectinfo>
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
  import Projectinfo from './ProjectInfo.vue'
  import CompanyInfo from './CompanyInfo.vue'
  import EduInfo from './EduInfo.vue'
  import SkillInfo from './SkillInfo.vue'
  import headImgUrl from "../assets/img/Logo.png";
  export default {
    name: "UserInfo",
    components: {
      Projectinfo,
      CompanyInfo,
      EduInfo,
      SkillInfo
    },
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
        IsSumbitUserInfo: false,
      }
    },
    methods: {
      OnClickAddProjectInfo() {
        this.ProjectInfos = [{
          Project: "",
          Role: "",
          City: "",
          StartDate: "",
          EndDate: "",
          Introduction: ""
        }, ...this.ProjectInfos];
      },
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
          let respone = await GetUserInfo();
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
<style>
  .userHeadImg {
    border: 5px solid var(--blue);
    margin: 0 auto;
    height: 120px;
    width: 120px;
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

  .slider-selection {
    background: var(--blue);
  }

  .slider-handle {
    background: white;
    box-shadow: 0px 0px 5px 1px #00000052;
  }

  .tagTitle {
    font-size: 1.25em;
    font-weight: 700;
  }

  .inputTitle {
    border-left: 5px solid var(--blue);
    padding-left: 5px;
  }
</style>