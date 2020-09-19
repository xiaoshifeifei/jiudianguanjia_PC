<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-11 17:55:40
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-14 18:52:11
-->
<template>
  <el-dialog title="房间编辑" :visible="show" :close-on-click-modal="false" :before-close="resetDetailForm">
    <el-form ref="detail" label-width="120px" :model="detail" :rules="rules">
      <el-form-item label="房型名称" prop="RoomTypeID">
        <el-select v-model="detail.RoomTypeID" placeholder="房型选择">
          <el-option
            v-for="item in roomTypes"
            :key="item.RoomTypeID"
            :value="item.RoomTypeID"
            :label="item.RoomTypeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层数" prop='RoomFloor'>
        <el-input type="age" v-model.number="detail.RoomFloor"></el-input>
      </el-form-item>
      <el-form-item label="房号" prop='RoomNumber'>
        <el-input type="age" v-model.number="detail.RoomNumber"></el-input>
      </el-form-item>
      <el-form-item label="WIFI名称" prop="WiFiName">
        <el-input v-model="detail.WiFiName"></el-input>
      </el-form-item>
      <el-form-item label="WIFI密码" prop="WiFiPwd">
        <el-input v-model="detail.WiFiPwd"></el-input>
      </el-form-item>
      <el-form-item label="二维码编码">
        <el-input v-model="detail.SerialNumber"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="resetDetailForm">取消</el-button>
      <el-button @click="onSave" type="primary" v-loading="loading">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAddRoom, reqUpdateRoom } from '@/api/setup'
export default {
  data() {
    return {
      isAdd: false,
      show: false,
      detail: {},
      rules: {
        RoomTypeID: [{ required: true, message: '请选择房型', trigger: 'change' }],
        RoomNumber: [
          { required: true, message: '房号不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ],
        RoomFloor: [
          { required: true, message: '楼层不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ],
        WiFiName: [{ required: true, message: 'wifi名称', trigger: 'change' }],
        WiFiPwd: [{ required: true, message: 'wifi密码', trigger: 'change' }]
      },
      roomTypes: [],
      loading: false
    }
  },
  created() {
    this._detail = {
      RoomTypeID: '',
      RoomNumber: '',
      RoomFloor: '',
      WiFiName: '',
      WiFiPwd: '',
      SerialNumber: ''
    }
    this.detail = { ...this._detail }
  },
  mounted() {
    this.roomTypes = this.$parent.$parent.$parent.step3.data.rows
  },
  methods: {
    resetDetailForm() {
      this.detail = { ...this._detail }
      this.$nextTick(() => {
        this.$refs.detail.clearValidate()
        this.show = false
        this.isAdd = false
      })
    },
    onSave() {
      this.$refs.detail.validate(async valid => {
        if (!valid)　return
        this.loading = true
        try {
          if (this.isAdd) {
            await reqAddRoom(this.detail)
            this.$message.success('房间新增成功')
          } else {
            await reqUpdateRoom(this.detail)
            this.$message.success('房间修改成功')
          }
          this.resetDetailForm()
          this.$parent.$parent.$parent.getRooms()
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
