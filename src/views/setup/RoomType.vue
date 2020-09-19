<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-11 17:22:54
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-14 18:25:07
-->
<template>
  <el-dialog :visible="show" title="房型管理" :close-on-click-modal="false" :before-close="resetDetailForm">
    <el-form label-width="120px" ref="detail" :model="detail" :rules="rules">
      <el-form-item label="创建人：">
        <el-input disabled :value="$store.state.user.adminName"></el-input>
      </el-form-item>
      <el-form-item label="房型名称：" prop="RoomTypeName">
        <el-input v-model="detail.RoomTypeName"></el-input>
      </el-form-item>
      <el-form-item label="适住人数：" prop="CustomerCount">
        <el-input v-model="detail.CustomerCount"><template slot="append">人</template></el-input>
      </el-form-item>
      <el-row type="flex">
        <el-form-item label="床型大小：" prop="BedSizeL">
          <el-input v-model="detail.BedSizeL"><template slot="append">长(M)</template></el-input>
        </el-form-item>
        <el-form-item label-width="0px" prop="BedSizeW">
          <el-input v-model="detail.BedSizeW"><template slot="append">宽(M)</template></el-input>
        </el-form-item>
      </el-row>
      <el-form-item label="房间大小" prop="RoomSize">
        <el-input v-model="detail.RoomSize"><template slot="append">M²</template></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="resetDetailForm">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqUpdateRoomType, reqAddRoomType } from '@/api/setup'
export default {
  data() {
    return {
      isAdd: false,
      show: false,
      detail: {},
      rules: {
        RoomTypeName: [{ required: true, message: '房型名称不能为空' }],
        CustomerCount: [{ required: true, message: '适住人数不能为空' }],
        BedSizeL: [{ required: true, message: '床长不能为空' }],
        BedSizeW: [{ required: true, message: '床宽不能为空' }],
        RoomSize: [{ required: true, message: '房间大小不能为空' }]
      }
    }
  },
  created() {
    this._detail = {
      RoomTypeName: '',
      CustomerCount: '',
      BedSizeL: '',
      BedSizeW: '',
      RoomSize: ''
    }
    this.detail = { ...this._detail }
  },
  methods: {
    resetDetailForm() {
      this.detail = { ...this._detail }
      this.$nextTick(() => {
        this.$refs.detail.clearValidate()
        this.show = false
      })
    },
    onSave() {
      this.$refs.detail.validate(valid => {
        if (!valid) return
        this.$confirm('点击确定保存房型编辑', '操作提示', {
          type: 'warning'
        }).then(() => {
          if (this.isAdd) {
            return reqAddRoomType(this.detail)
          } else {
            return reqUpdateRoomType(this.detail)
          }
        })
          .then(() => {
            if (this.isAdd) {
              this.$message.success('房型新增成功')
            } else {
              this.$message.success('房型编辑已保存')
            }
            this.resetDetailForm()
            this.$parent.$parent.$parent.getRoomTypes()
          })
      })
    }
  }
}
</script>

<style>

</style>
