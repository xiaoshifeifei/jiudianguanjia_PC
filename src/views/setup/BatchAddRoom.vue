<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-13 09:30:26
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-14 17:51:04
-->
<template>
  <el-dialog :visible="show" :before-close="onClose" :close-on-click-modal="false" title="批量新增" width="80%">
    <el-row style="height:100px;">
      <el-upload
        ref="upload"
        accept=".xlsx,.xls"
        action=""
        :limit="1"
        :on-change="onFileChange"
        :auto-upload="false"
        :file-list="[]">
        <el-button slot="trigger" icon="el-icon-folder-opened" size="small" type="primary">选择文件</el-button>
        <el-button size="small" icon="el-icon-download" @click="downloadTemplate" style="margin-left:20px;">模板文件下载</el-button>
        <div slot="tip" class="el-upload__tip">请下载并使用模板文件编辑房间导入</div>
      </el-upload>
    </el-row>
    <el-table style="width:100%;" :max-height="500" :data="rooms" size="mini">
      <el-table-column
        v-for="item in columns"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        align="center"
      ></el-table-column>
    </el-table>
    <span slot="footer">
      <el-button @click="onClose">取消</el-button>
      <el-button :disabled="error" v-loading="loading" type="primary" @click="onSave">上传</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { downRoomModel } from '@/api/room-relevant'
import { uploadRooms } from '@/api/setup'
import { importExcel, excel2Table } from '@/utils/doExcel/index'
export default {
  data() {
    return {
      templateUrl: `${process.env.VUE_APP_BASE_API}/hotel_room/template_download`,
      show: false,
      columns: [
        { prop: 'ID', label: '*序列号' },
        { prop: 'error', label: '数据说明' },
        { prop: 'RoomNumber', label: '*房号' },
        { prop: 'RoomFloor', label: '*楼层数' },
        { prop: 'Model', label: '*房型名称' },
        { prop: 'WiFiName', label: '*WIFI名称' },
        { prop: 'WiFiPwd', label: '*WIFI密码' },
        { prop: 'SerialNumber', label: '二维码编码' }
      ],
      rooms: [],
      loading: false,
      error: false
    }
  },
  mounted() {
    console.log(this.templateUrl)
  },
  methods: {
    onClose() {
      this.rooms = []
      this.error = false
      this.$refs.upload.clearFiles()
      this.show = false
    },
    // 上传
    async onSave() {
      if (!this.rooms.length) return this.$message.warning('至少导入一条数据')
      if (this.rooms.length > 120) return this.$message.waring('一次最多导入120条')
      this.loading = true
      try {
        let res = await uploadRooms(this.rooms)
        console.log(res)
        if (res.code !== 0) {
          this.$message.error(res.msg)
          this.handleError(res.data.errors)
          this.error = true
        } else {
          this.$message.success('批量上传成功')
          this.$parent.$parent.$parent.getRooms()
          this.onClose()
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    // 导入房间 错误信息处理
    handleError(arr) {
      if (!arr.length) return
      this.rooms = this.rooms.map(v => {
        arr.some((a, i) => {
          if (+v.ID === +a.ID) {
            v = Object.assign(v, a)
            arr.splice(i, 1)
            return true
          }
          return false
        })
        return v
      })
    },
    async downloadTemplate() {
      try {
        let res = await downRoomModel()
        this.downloadFile(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 下载文件
    downloadFile(obj, name, suffix) {
      const url = window.URL.createObjectURL(new Blob([obj], { type: 'application/vnd.ms-excel;charset=utf-8' }))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
      link.setAttribute('download', '批量增加房间模板')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onFileChange(file) {
      this.$refs.upload.clearFiles()
      this.error = false
      importExcel(file.raw, 'A2').then(arr => {
        this.rooms = excel2Table(arr, this.columns)
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
