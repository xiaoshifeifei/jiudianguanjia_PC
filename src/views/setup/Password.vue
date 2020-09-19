<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-12 09:23:08
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-26 19:13:48
-->
<template>
  <el-dialog :visible="show" title="修改密码" :before-close="resetDetailForm" :close-on-click-modal="false">
    <el-form ref="detail" label-width="150px" :model="detail" :rules="rules">
      <el-form-item label="旧密码" prop="AdminPassword">
        <el-input type="password" show-password v-model="detail.AdminPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="NewAdminPassword">
        <el-input type="password" show-password v-model="detail.NewAdminPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="ConfirmPassword">
        <el-input type="password" show-password v-model="detail.ConfirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="resetDetailForm">取消</el-button>
      <el-button type="primary" @click="onSave">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePassword } from '@/api/setup'
import { validatePassword } from '@/utils/validate'
export default {
  data() {
    let newPassword = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入新密码'))
      } else if (value.length < 8 || value.length > 16) {
        cb(new Error('密码长度为8-16位'))
      } else if (!validatePassword(value)) {
        cb(new Error('密码必须字母、数字、符号组合'))
      } else {
        if (this.detail.ConfirmPassword !== '') {
          this.$refs.detail.validateField('ConfirmPassword')
        }
        cb()
      }
    }
    let confirmNewPassword = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入新密码'))
      } else if (value !== this.detail.NewAdminPassword) {
        cb(new Error('两次输入密码不一致'))
      } else {
        cb()
      }
    }
    return {
      show: false,
      detail: {
        AdminPassword: '',
        NewAdminPassword: '',
        ConfirmPassword: ''
      },
      rules: {
        AdminPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        NewAdminPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: newPassword, trigger: 'blur' }
        ],
        ConfirmPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: confirmNewPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetDetailForm() {
      this.$refs.detail.resetFields()
      this.show = false
    },
    onSave() {
      this.$confirm('确定修改并保存密码？', '修改密码', {
        type: 'warning'
      }).then(async () => {
        await updatePassword(this.detail)
        this.$message.success('密码修改成功')
        this.resetDetailForm()
      })
    }
  }
}
</script>

<style>

</style>
