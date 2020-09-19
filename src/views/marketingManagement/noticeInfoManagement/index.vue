<template>
  <div class="app-container LoadingArea">
    <div class="fsbw m-b15" ref="tableTop">
      <div class="fclw" style="width:calc(100% - 94px);">
        <div class="fcl m-r7 m-t6">
          <div>审核状态</div>
          <el-select v-model="status" clearable placeholder="审核状态" class="w110">
            <el-option label="全部" value></el-option>
            <el-option label="待提交" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="拒绝" value="-1"></el-option>
          </el-select>
        </div>
        <div class="fcl m-r7 m-t6">
          <div>上架状态</div>
          <el-select v-model="upStatus" clearable placeholder="上架状态" class="w110">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="golbal-btn m-t6"
          @click="handleSearch"
        >查询</el-button>
      </div>
      <div class="fcc h46">
        <el-button type="primary" class="golbal-btn m-t6 w84" @click="add">信息编辑</el-button>
      </div>
    </div>
    <el-table
      :max-height="tableHeight"
      :data="tableData"
      border
      fit
      ref="table"
      :height="maxHeight"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="公告内容" width="202" align="center">
        <template slot-scope="{row}">
          <span class="text_one">{{ row.Content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CheckStatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" min-width="80" align="center">
        <template slot-scope="{row}">
          <span>{{ row.StatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" min-width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" min-width="130" align="center">
        <template slot-scope="{row}">
          <span>{{row.OperatorUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" min-width="171px" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" class="golbal-btn-text" @click="see(row.NewsID)">查看</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus==2 && row.Status==1"
            @click="changeStatus(row.NewsID,row.Status)"
          >下架</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus==2 && row.Status==0"
            @click="changeStatus(row.NewsID,row.Status)"
          >上架</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.EatLiveStatus != 1 || row.Status != 2"
            :disabled="row.CheckStatus==1"
            @click="edit(row.NewsID)"
          >编辑</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus!=2"
            :disabled="row.CheckStatus==1"
            @click="commit(row.NewsID)"
          >提交</el-button>
          <el-button
            type="text"
            class="golbal-btn-text-danger"
            v-show="row.Status!=1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus==1"
            @click="del(row.NewsID)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getData"
    />
    <el-dialog
      title="公告信息编辑"
      :visible.sync="isShowCreate"
      width="40%"
      :before-close="handleDialogClose"
      style="margin-top:15vh;"
      class="fu-notice-info-dialog"
    >
      <el-form ref="noticeInfoDialog" :model="infoDetail" :rules="rules">
        <el-form-item label="移动端公告内容:" label-width="25%" style="margin-bottom:12px;" prop="Content">
          <el-input placeholder="50元通用优惠券轻松领" v-model="infoDetail.Content">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline fs23" maxlength="20"></i>
          </el-input>
        </el-form-item>
        <div class="h20"></div>
        <div class="fs13 c_c4c4c4 t-a_c">备注：此栏目为小程序上首页模块的公告提示，最多不可超过20个字符。</div>
      </el-form>
      <div class="h38"></div>
      <div class="fcsb pad0_10P">
        <el-button class="golbal-btn-reset" @click="handleDialogClose">取消</el-button>
        <el-button type="primary" class="golbal-btn" @click="save('noticeInfoDialog')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="公告信息查看"
      :visible.sync="isShowDetail"
      width="40%"
      :before-close="confirmisNoticeInfo"
      style="margin-top:10vh;"
      class="fu-notice-info-dialog"
    >
      <el-form :model="infoDetail">
        <el-form-item label="审核状态:" label-width="25%" style="margin-bottom:12px;">
          <span>{{infoDetail.CheckStatusText}}</span>
        </el-form-item>
        <el-form-item label="是否上架:" label-width="25%" style="margin-bottom:12px;">
          <span>{{infoDetail.StatusText}}</span>
        </el-form-item>
        <el-form-item label="移动端公告内容:" label-width="25%" style="margin-bottom:12px;">
          <span>{{infoDetail.Content}}</span>
        </el-form-item>
        <el-form-item label="操作人:" label-width="25%" style="margin-bottom:12px;">
          <span>{{infoDetail.OperatorUserName}}</span>
        </el-form-item>
        <el-form-item label="操作时间:" label-width="25%" style="margin-bottom:12px;">
          <span>{{infoDetail.UpdateDate}}</span>
        </el-form-item>
      </el-form>
      <div class="h38"></div>
      <div class="fcc">
        <el-button type="primary" class="golbal-btn" @click="confirmisNoticeInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getData, getDetail, add, edit, commit, upDown, del } from '@/api/noticeInfoManagement'
import Tinymce from '@/components/Tinymce'
import { isSpecialSymbols } from '@/utils/validate'
let _self
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, Tinymce },
  data() {
    const validateString = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入'))
      } else if (isSpecialSymbols(value)) {
        callback(new Error('不能输入特殊符号'))
      } else if (value.length > 20) {
        callback(new Error('最多不可超过20个字符'))
      } else {
        callback()
      }
    }
    return {
      status: '', // 审核状态
      upStatus: '', // 上架状态
      tableData: [], // 表格数据
      maxHeight: 300,
      infoDetail: {
        Content: ''
      }, // 详情数据
      tableHeight: 0, // 表格高度
      total: 0, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      isShowCreate: false, // 是否显示创建弹窗
      isSearch: false,
      addOrEdit: 0,
      isShowDetail: false,
      rules: { Content: [{ required: true, validator: validateString, trigger: 'blur' }] }
    }
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal == '' && _self.upStatus == '') {
        _self.isSearch = false
        _self.getData()
      }
    },
    upStatus(newVal, oldVal) {
      if (newVal == '' && _self.status == '') {
        _self.isSearch = false
        _self.getData()
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.tableTop.offsetHeight - 196 + 'px'
      // 监听窗口大小变化
      let self = this
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.tableTop.offsetHeight - 196 + 'px'
      }
    })
    this.$nextTick(function() {
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 150
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 199
      }
    })
    
  },
  destroyed() {
    window.onresize = null
  },
  created() {
    _self = this
    _self.getData()
  },
  methods: {
    // 获取数据
    getData() {
      let data = {
        Page: _self.page,
        Limit: _self.limit
      }
      if (_self.isSearch) {
        if (_self.status != '') {
          data.CheckStatus = _self.status
        }
        if (_self.upStatus != '') {
          data.Status = _self.upStatus
        }
      }
      return new Promise((resolve, reject) => {
        getData(data).then(res => {
          _self.tableData = res.data.row
          _self.total = res.data.total
          resolve()
        })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取详情
    getDetail(id) {
      let data = {
        NewsID: id
      }
      return new Promise((resolve) => {
        getDetail(data).then(res => {
          _self.infoDetail = res.data
          resolve()
        })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 提交
    commit(id) {
      let data = {
        NewsID: id
      }
      _self
        .$confirm('确定要提交吗？', '提示', {
          type: 'warning'
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            commit(data).then(res => {
              _self.$message.success('提交成功')
              _self.getData()
              resolve()
            })
              .catch((error) => {
                reject(error)
              })
          })
        })
    },
    // 查看
    see(id) {
      _self.getDetail(id)
      _self.isShowDetail = true
    },
    // 添加
    add() {
      _self.isShowCreate = true
      _self.addOrEdit = 0
    },
    // 修改上下架状态
    changeStatus(id, status) {
      let data = {
        NewsID: id
      }
      let str = ''
      if (status == 0) {
        str = '上架'
      } else {
        str = '下架'
      }
      _self
        .$confirm('确定要' + str + '吗？', '提示', {
          type: 'warning'
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            upDown(data).then(res => {
              _self.$message.success(str + '成功')
              _self.getData()
              resolve()
            })
              .catch((error) => {
                reject(error)
              })
          })
        })
    },
    // 修改
    edit(id) {
      _self.getDetail(id)
      _self.isShowCreate = true
      _self.addOrEdit = 1
    },
    save(ruleForm) {
      let obj = _self.infoDetail
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (obj.Content == '') {
            _self.$message.error('请输入内容')
            return
          }
          let data = {
            Content: obj.Content
          }
          if (_self.addOrEdit == 0) {
            return new Promise((resolve, reject) => {
              add(data).then(res => {
                _self.$message.success('创建成功')
                _self.getData()
                _self.handleDialogClose()
                resolve()
              })
                .catch((error) => {
                  reject(error)
                })
            })
          } else if (_self.addOrEdit == 1) {
            data.NewsID = obj.NewsID
            this.$confirm('点击保存该数据将自动更变为待提交状态且下架，需重新审核后才可上架，请确认是否保存?', '操作说明', {
              confirmButtonText: '保存',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              return new Promise((resolve, reject) => {
                edit(data).then(res => {
                  _self.$message.success('修改成功')
                  _self.getData()
                  _self.handleDialogClose()
                  resolve()
                })
                  .catch((error) => {
                    reject(error)
                  })
              })
                .catch((error) => {
                  _self.handleDialogClose()
                })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    del(id) {
      let ids = [id]
      let data = {
        NewsIDArr: ids
      }
      _self
        .$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            del(data).then(res => {
              _self.$message.success('删除成功')
              _self.getData()
              resolve()
            })
              .catch((error) => {
                reject(error)
              })
          })
        })
    },
    // 搜索按钮
    handleSearch() {
      if (_self.status == '' && _self.upStatus == '') {
        _self.$message.error('请设置搜索条件！')
        return
      }
      _self.page = 1
      _self.isSearch = true
      _self.getData()
    },
    handleDialogClose() {
      _self.infoDetail.Content = ''
      _self.isShowCreate = false
      this.$refs.noticeInfoDialog.resetFields()
    },
    confirmisNoticeInfo() {
      _self.infoDetail.Content = ''
      _self.isShowDetail = false
    },
    // ids.push被选中的ID
    handleSelectionChange(val) {
      console.log(11111)
    },
    // 上传图片
    upImg(a) {
      let form = new FormData()
      form.append('Image', a.file)
      return new Promise((resolve, reject) => {
        upCoverImg(form)
          .then(res => {
            _self.infoDetail.ImgUrl = res.data.url
          })
          .catch(error => reject(error))
      })
    },
    // 上传之前
    beforeAvatarUpload(file) {
      let isJPG = false
      switch (file.type) {
      case 'image/png':
        isJPG = true
        break
      case 'image/jpeg':
        isJPG = true
        break
      case 'image/jpg':
        isJPG = true
        break
      case 'image/gif':
        isJPG = true
        break
      case 'image/bmp':
        isJPG = true
        break
      default:
        isJPG = false
        break
      }
      const isLt2M = file.size / 1024 < 500
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG/BMP/GIF 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500k!')
        return false
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less">
.fu-notice-info-dialog > .el-dialog {
  min-width: 540px;
}

.el-message-box--center .el-message-box__title {
  justify-content: start;
}
.el-message-box--center .el-message-box__container {
  text-align: left;
  color: red;
}
.el-message-box--center .el-message-box__btns {
  display: flex;
  justify-content: space-around;
}
</style>
