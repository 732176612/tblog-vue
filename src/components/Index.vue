<!--
 * @Author: your name
 * @Date: 2022-01-23 15:57:56
 * @LastEditTime: 2022-02-16 17:59:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\components\UserInfo.vue
-->
<template>
  <div class="d-flex h-100 mx-auto flex-column px-xl-5 px-lg-5 px-md-4 px-sm-3">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="UserDto.UserHeadImg" alt="mdo" width="48" height="48" class="rounded-circle NavUserImg">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" :href="'/view/index/articleEditor/'+UserDto.BlogName">写文章</a></li>
            <li><a class="dropdown-item" :href="'/view/index/UserInfo/'+UserDto.BlogName">个人信息</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="OnClickLogOut">注销</a></li>
          </ul>
        </div>
      </div>

      <ul class="nav nav-masthead col-12 col-md-auto mb-2 justify-content-center mb-md-0" style="font-size:1.25rem">
        <a v-for="(item,index) in Menus" :key="index" class="nav-link" :class="item.Name==$route.name?'active':''"
          @click="OnClickMenuBtn(item)">
          {{item.Name}}
        </a>
      </ul>

      <div class="col-md-3 text-end">
        <input type="search" class="form-control text-center" placeholder="文章关键词" aria-label="Search">
      </div>
    </header>

    <main role="main" class="h-100">
      <div class="container h-100">
        <router-view :UserDto="UserDto"/>
      </div>
    </main>

    <footer class="mastfoot mt-auto border-top">
      <div class="inner text-center py-2">
        <a href="http://beian.miit.gov.cn" target="_blank" class="h6 mt-5 text-black-50">©TBlog -
          粤ICP备20006712号。</a>
      </div>
    </footer>
  </div>
</template>

<script>
  import {
    SerializeJwt,
    GetUserInfo,
    GetMenus,
    LogOut
  } from '../assets/js/interface.js';
  import headImgUrl from "../assets/svg/person.svg";
  export default {
    name: "Index",
    data() {
      return {
        UserDto: {
          BlogName: "",
          UserHeadImg: headImgUrl,
          UserName: "",
        },
        Menus: []
      }
    },
    methods: {
      async InitMenus() {
        let respone = await GetMenus();
        if (respone != null && respone.Status == 200) {
          this.Menus = respone.Data;
        }
      },
      async InitUserInfo() {
        this.UserDto.BlogName = this.$route.params.blogname;
        let respone = await GetUserInfo({
          "BlogName": this.$route.params.blogname
        });
        if (respone != null && respone.Status == 200) {
          let userDto = respone.Data;
          this.UserDto.UserName = userDto.UserName;
          if (userDto.HeadImgUrl != '')
            this.UserDto.UserHeadImg = userDto.HeadImgUrl;
        }
      },
      OnClickLogOut() {
        LogOut();
        this.$cookie.remove('token');
        this.$router.push("/view/login");
      },
      OnClickMenuBtn(item) {
        this.$router.push(item.Url + "/" + this.UserDto.BlogName);
      },
      async CheckToken() {
        let token = await getToken();
        if (token == null) {
          this.$toast.warning('您还未登陆，请登陆');
          await this.$router.push("/view/login");
        } else if (this.$route.params.blogname == undefined) {
          let respone = await SerializeJwt({
            token
          });
          if (respone.Data.BlogName != null && respone.Data.BlogName != '') {
            await this.$router.push("/view/index/" + respone.Data.BlogName);
          }
          return true;
        } else {
          return true;
        }
      }
    },
    async mounted() {
      if (await this.CheckToken()) {
        await this.InitUserInfo();
        await this.InitMenus();
      }
    }
  }
</script>

<style scoped>
  .UserHeadImg {
    width: 30%;
  }

  .nav-masthead .nav-link {
    padding: .25rem 0;
    font-weight: 700;
    color: rgba(0, 0, 0, .5);
    background-color: transparent;
    border-bottom: .25rem solid transparent;
  }

  .nav-masthead .nav-link:hover,
  .nav-masthead .nav-link:focus {
    border-bottom-color: rgba(0, 0, 0, .25);
  }

  .nav-masthead .nav-link+.nav-link {
    margin-left: 1rem;
  }

  .nav-masthead .active {
    color: #212529;
    border-bottom-color: var(--blue);
  }

  .NavUserImg {
    border: 3px solid var(--blue);
    padding: 3px;
  }
</style>