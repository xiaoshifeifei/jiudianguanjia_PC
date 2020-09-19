<template>
  <div class="login-container">
    <div class="container_box">
      <div class="container_left"></div>
      <div class="container_right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">
              <img src="../../icons/zlLogo.png" alt="" class="zlLogo" />
              知了酒店 <span>管理平台</span>
            </h3>
          </div>
          <el-form-item prop="AdminName">
            <p>账号</p>
            <el-input
              ref="username"
              v-model="loginForm.AdminName"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="AdminPassword">
              <p>密码</p>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.AdminPassword"
                show-password
                placeholder="请输入登录密码"
                name="password"
                tabindex="2"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </el-tooltip>
          <el-row type="flex">
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;padding:15px;"
              @click.native.prevent="handleLogin"
              >登 录</el-button
            >
            <el-button size="mini" style="height:45px;" @click="useWxLogin">
              <el-image
                :src="require('@/icons/icon-wx.jpg')"
                class="icon-wx"
              ></el-image>
            </el-button>
          </el-row>
        </el-form>
      </div>
      <div class="container_foot">
        请使用Chrome浏览器以获得最佳使用体验
      </div>
    </div>

    <div class="footer-text">Copyright @ 知了科技</div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { firstLoginState } from '@/api/firstLogin.js'
import { getOrderReminder } from '@/api/navBar.js'

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入账号'))
      } else {
        return callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码有误，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        AdminName: '',
        AdminPassword: ''
      },
      loginRules: {
        AdminName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        AdminPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    // eslint-disable-next-line camelcase
    const { status, uid, token, refresh_token } = this.$route.query
    if (status === '1') {
      this.$store.dispatch('user/loginByScanCode', {
        // eslint-disable-next-line camelcase
        uid, token, refresh_token
      }).then(res => {
        this.$router.push({
          path: this.redirect || '/'
        })
        this.$store.dispatch('wsdata/getRemindInfo')
      })
        .catch(err => {
          console.log(err)
        })
    } else if (status === '-1') {
      this.$message.warning('未绑定微信号')
      this.$router.replace({ path: this.$route.path })
    } else if (status === '0') {
      this.$message.error('帐号已禁用')
      this.$router.replace({ path: this.$route.path })
    }
  },
  mounted() {
    if (this.loginForm.AdminName === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.AdminPassword === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    useWxLogin() {
      let baseUrl = process.env.VUE_APP_BASE_API
      let appid = process.env.VUE_APP_APPID
      // eslint-disable-next-line camelcase
      let redirect_uri = encodeURIComponent(`${baseUrl}/wechat/auth`)
      let href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=#wechat_redirect`
      location.href = href
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      /*
       *  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
       *  return false
       */
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              // this.getRemindInfo()
              this.$store.dispatch('wsdata/getRemindInfo')
              firstLoginState().then(res => {
                let step = res.data.step
                switch (step) {
                case -1:
                case 6:
                  this.$router.push({
                    path: this.redirect || '/',
                    query: this.otherQuery
                  })

                  /*
                   * this.$router.push({
                   *   path: '/setup',
                   *   query: { step }
                   * })
                   */
                  break
                /*
                 * case 0:
                 * this.$router.push({
                 * path: this.redirect || '/',
                 * query: this.otherQuery
                 * })
                 *break
                 */
                default:
                  this.$router.replace({ path: '/setup' })
                  break
                }
                this.loading = false
              })
            })
            .catch(err => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    /*
     * afterQRScan() {
     *   if (e.key === 'x-admin-oauth-code') {
     *     const code = getQueryObject(e.newValue)
     *     const codeMap = {
     *       wechat: 'code',
     *       tencent: 'code'
     *     }
     *     const type = codeMap[this.auth_type]
     *     const codeName = code[type]
     *     if (codeName) {
     *       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
     *         this.$router.push({ path: this.redirect || '/' })
     *       })
     *     } else {
     *       alert('第三方登录失败')
     *     }
     *   }
     * }
     */
    /*
     * async getRemindInfo() {
     *   let res = await getOrderReminder()
     *   let resData = res.data
     *   let obj = {
     *     remindCountOfWake: +resData.Handle.WakeOrder.OrderCount || 0,
     *     remindCountOfContinueLive: +resData.Handle.ContinueLiveOrder.OrderCount || 0,
     *     remindCountOfFacility: +resData.Handle.FacilityOrder.OrderCount || 0,
     *     remindCountOfRentCar: +resData.Handle.RentCarOrder.OrderCount || 0,
     *     remindCountOfInvoice: +resData.Handle.InvoiceOrder.OrderCount || 0,
     *     remindCountOfClear: Number(resData.Handle.CleanOrder.OrderCount) || 0,
     *     remindCountOfRepair: Number(resData.Handle.RepairOrder.OrderCount) || 0,
     *     remindCountOfService: Number(resData.Handle.ServiceOrder.OrderCount) || 0,
     *     remindCountOfCheckOut: Number(resData.Handle.CheckOutOrder.OrderCount) || 0
     *   }
     *   this.$store.dispatch('wsdata/changeState', {
     *     key: 'navBarData',
     *     value: obj
     *   })
     * }
     */
  }
}
</script>

<style lang="scss">
.icon-wx {
  width: 30px;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

/* reset element-ui css */
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../icons/bg.png");
  background-size: 100% 100%;
  min-width: 1450px;
  min-height: 720px;
  overflow: hidden;
  .container_box {
    position: relative;
    width: 63vw;
    height: 65vh;
    min-width: 913.5px;
    min-height: 461.5px;
    margin: 17vh auto;
    background-image: url("../../icons/whitebg.png");
    background-size: 100% 100%;
    padding-top: 16.6vh;
    overflow: hidden;

    .container_left {
      display: inline-block;
      width: 25vw;
      height: 32vh;
      min-width: 380px;
      min-height: 264px;
      margin-left: 14%;
      background-image: url("../../icons/loginImg.png");
      background-size: 100% 100%;
    }
    .container_right {
      vertical-align: top;
      display: inline-block;
      width: 24vw;
      height: 32vh;
      min-width: 380px;
      min-height: 264px;
      .el-form {
        width: 80%;
        .el-form-item {
          margin-bottom: 20px;
          p {
            color: gray;
          }
        }
      }
      .zlLogo {
        width: 17px;
        height: 27px;
        vertical-align: bottom;
      }
      .title {
        font-weight: bold;
        font-size: 25px;
        span {
          color: gray;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
    .container_foot {
      position: absolute;
      width: 100%;
      text-align: center;
      color: gray;
      font-size: 15px;
      bottom: 3vh;
    }
  }
  .footer-text {
    width: 100%;
    position: absolute;
    color: white;
    bottom: 1.5vh;
    text-align: center;
  }
}
</style>
