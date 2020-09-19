<!--
 * @Author: your name
 * @Date: 2020-06-03 17:51:57
 * @LastEditTime: 2020-06-04 09:41:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\UpdatePassword.vue
-->
<template>
  <div id='updatePasswordDialog'>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div
        class="msg_box"
        v-show="msgBoxState"
      ><span>新密码两次输入不匹配</span>
        <el-button
          type="text"
          @click="closeMsgBox"
        >x</el-button>
      </div>
      <el-form
        :model="form"
        :rules='formRules'
        label-width="130px"
        ref="pwdForm"
      >
        <el-form-item label="用户">
          <el-input
            :disabled="true"
            v-model='form.user'
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            show-password
            v-model='form.newPassword'
            size="small"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="再次输入新密码"
          prop="rePassword"
        >
          <el-input
            show-password
            v-model='form.rePassword'
            size="small"
            placeholder="再次输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          class="golbal-btn"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="save('pwdForm')"
          class="golbal-btn"
          :disabled="saveState"
        >修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let checkPWD = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]{8,16}$/g
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确格式的密码'))
      } else {
        return callback()
      }
    }
    return {
      form: {
        newPassword: '',
        rePassword: ''
      },
      formRules: {
        newPassword: [{ required: true, validator: checkPWD, trigger: 'blur' }],
        rePassword: [{ required: true, validator: checkPWD, trigger: 'blur' }]
      },
      msgBoxState: false,
      saveState: false
    }
  },
  props: {
    saveHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件保存')
      }
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.updatePasswordDialog
    }
  },
  watch: {
    msgBoxState() {
      if (this.msgBoxState) {
        this.saveState = true
        let timer = setInterval(() => {
          this.msgBoxState = false
          this.saveState = false
          clearInterval(timer)
        }, 3000)
      }
    }
  },
  methods: {
    handleClose() {
      // TODO 判断保存状态 以保存则 关闭对话框
      this.$store.dispatch('dialog/changeState', {
        key: 'updatePasswordDialog',
        value: false
      })
      this.$alert(
        '红色星号信息为必填项，填写完毕后才可以进行下一步',
        '欢迎使用知了酒店运营管理平台',
        {
          confirmButtonText: '好的'
        }
      )
    },
    save(formName) {
      // TODO 修改操作
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.newPassword !== this.form.rePassword) {
            this.msgBoxState = true
          } else {
            alert('submit!')
            this.handleClose()
            // this.saveHandle()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeMsgBox() {
      this.msgBoxState = false
    }
  }
}
</script>

<style lang="less" >
#updatePasswordDialog {
  .msg_box {
    border: 1px solid red;
    background-color: rgba(255, 0, 0, 0.068);
    height: 25px;
    color: rgb(131, 131, 131);
    padding: 0 10px;
    margin-bottom: 10px;
    span {
      display: inline-block;
      line-height: 23px;
      height: 23px;
    }
    .el-button {
      float: right;
      padding: 0;
      margin: 0;
      color: rgb(131, 131, 131);
    }
  }
}
</style>
