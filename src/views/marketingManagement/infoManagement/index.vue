<template>
  <div class="app-container LoadingArea">
    <div class="fsbw m-b15" ref="tableTop">
      <div class="fclw flexcss" style="width:55%;">
        <div class="fcl m-r7 m-t6">
          <div class="textmargin">审核状态</div>
          <el-select
            v-model="status"
            clearable
            placeholder="审核状态"
            class="w110"
          >
            <el-option label="全部" value></el-option>
            <el-option label="待提交" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="拒绝" value="-1"></el-option>
          </el-select>
        </div>
        <div class="fcl m-r7 m-t6">
          <div class="textmargin">上架状态</div>
          <el-select
            v-model="upStatus"
            clearable
            placeholder="上架状态"
            class="w110"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
        <el-input
          v-model="keyword"
          clearable
          placeholder="标题/作者"
          class="m-r7 m-t6"
          style="width:280px;"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="golbal-btn m-t6"
          @click="handleSearch"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-search"
          class="golbal-btn m-t6"
          @click="reset"
          >重置</el-button
        >
      </div>
      <div class="fcc h46">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="golbal-btn m-t6 w84"
          @click="add"
          >创建</el-button
        >
      </div>
    </div>
    <el-table
      :max-height="tableHeight"
      :data="tableData"
      border
      fit
      ref="table"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column label="标题" min-width="190" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.Title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="160" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.Author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" min-width="160" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.CreateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" min-width="80" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.VisitCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="80" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.CheckStatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" min-width="80" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.StatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        min-width="171px"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            class="golbal-btn-text"
            @click="see(row.NewsID)"
            >查看</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus == 2 && row.Status == 1"
            @click="changeStatus(row.NewsID, row.Status)"
            >下架</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus == 2 && row.Status == 0"
            @click="changeStatus(row.NewsID, row.Status)"
            >上架</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-if="row.StatusText === '否'"
            :disabled="row.CheckStatus == 1"
            @click="edit(row.NewsID)"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus != 2"
            :disabled="row.CheckStatus == 1"
            @click="commit(row.NewsID)"
            >提交</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text-danger"
            v-show="row.Status != 1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus == 1"
            @click="del(row.NewsID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getData"
    />
    <el-dialog
      class="fu_abow_dialog infoMangeDialog"
      :title="dialogtitle"
      :visible.sync="isShowCreate"
      width="88%"
      lock-scroll
      :before-close="handleDialogClose"
    >
      <el-form
        ref="form"
        :model="infoDetail"
        label-width="150px"
        :rules="infoRules"
      >
        <div class="fsb">
          <div class="w50P">
            <el-form-item label="标题" prop="Title" label-width="28%">
              <el-input
                v-model="infoDetail.Title"
                style="width:360px;"
                placeholder="新闻标题"
                maxlength="20"
                :disabled="addOrEdit == 2"
                show-word-limit
              >
                <!-- <i slot="suffix" class="el-input__icon el-icon-edit-outline fs23"></i> -->
              </el-input>
            </el-form-item>
            <el-form-item label="简介" prop="Description" label-width="28%">
              <el-input
                v-model="infoDetail.Description"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
                style="width:360px;"
                placeholder="请输入简介"
                maxlength="50"
                show-word-limit
                :disabled="addOrEdit == 2"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="Sort" label-width="28%">
              <el-input
                v-model="infoDetail.Sort"
                style="width:360px;"
                placeholder="100"
                :disabled="addOrEdit == 2"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-edit-outline fs23"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item
              label="审核通过后是否自动上架"
              prop="AutoUp"
              label-width="28%"
            >
              <el-switch
                v-model="infoDetail.AutoUp"
                active-color="#000000"
                inactive-color="#ffffff"
                :active-value="1"
                :inactive-value="0"
                class="switch-b1r_dcdfe6"
                :disabled="addOrEdit == 2"
              ></el-switch>
            </el-form-item>
          </div>
          <div class="w50P">
            <el-form-item label class="form-m-l50">
              <div class="flex">
                <div class="gdf-flexend gmr-10 w84">
                  <b> <i class="c_ff0000 m-r4">*</i>标题图 </b>
                </div>
                <div>
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    ref="upload"
                    action
                    :http-request="upImg"
                    :before-upload="beforeAvatarUpload"
                    :disabled="addOrEdit == 2"
                  >
                    <el-image
                      v-if="infoDetail.ImgUrl != ''"
                      :src="infoDetail.ImgUrl"
                      lazy
                      class="w200 h200"
                      @click="imgpreview(infoDetail.ImgUrl)"
                      :preview-src-list="imgpreviewarr"
                    />
                    <div
                      v-else
                      class="fcocc w200 h130 b1_dfe6ec_dash bc_fafafa"
                    >
                      <i class="el-icon-plus fs40"></i>
                      <div class="m-t8">上传</div>
                    </div>
                  </el-upload>
                </div>
              </div>
              <div class="c_c4c4c4 fs14 p-l35">
                请上传JPG,JPEG,GIF,BMP格式的图片并且小于500K，仅能上传一张图片
              </div>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-form-item label class="form-m-l50">
            <div class="gdf-flexend gmr-10 w84">
              <b> <i class="c_ff0000 m-r4">*</i>详情 </b>
            </div>
            <div class="pad0_54">
              <Tinymce
                ref="editor"
                v-model="infoDetail.Content"
                :height="350"
                :action="upUrl"
                imgFile="Image"
                v-if="addOrEdit != 2"
              />
              <div
                v-else
                v-html="infoDetail.Content"
                class="b1_dfe6ec heightaotu pad0_15"
              ></div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="fcl w100P pad0_40 bx h70" v-show="addOrEdit != 2">
        <!-- <div class="w28P fce bx p-r12">
          <el-button class="golbal-btn" @click="save('form', 0)"
            >保存</el-button
          >
        </div> -->
        <el-button type="primary" @click="save('form', 1)" class="mystyle">保存并提交</el-button>
        <!-- <div class="fcc w65P bx p-l12">
          <el-button
            class="golbal-btn w95 t-a_c  mystyle"
            type="primary"
            @click="save('form', 1)"
            >保存并提交</el-button
          >
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {
  upCoverImg,
  getData,
  getDetail,
  add,
  edit,
  commit,
  upDown,
  del
} from '@/api/infoManagement'
import Tinymce from '@/components/Tinymce'
import {
  isExamine,
  isNonzeroPositiveInteger,
  isSpecialSymbols
} from '@/utils/validate'
let _self
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, Tinymce },
  data() {
    const validateIntro = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入完整信息'))
      }
      if (!isExamine(value)) {
        callback(new Error('仅允许输入，。！、：请核实！'))
      } else {
        callback()
      }
    }
    const validateString = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入标题'))
      }
      if (isSpecialSymbols(value)) {
        callback(new Error('不能输入特殊符号'))
      } else {
        callback()
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入非零的正整数'))
      }
      if (!isNonzeroPositiveInteger(value)) {
        if (value === '0') {
          callback()
        }
        callback(new Error('请输入包含0的正整数'))
      } else {
        callback()
      }
    }
    return {
      upUrl: process.env.VUE_APP_BASE_API + '/news/upload_content',
      status: '', // 审核状态
      upStatus: '', // 上架状态
      keyword: '', // 搜索关键字
      tableData: [], // 表格数据
      infoDetail: {}, // 详情数据
      tableHeight: 0, // 表格高度
      total: 50, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      isShowCreate: false, // 是否显示创建弹窗
      isSearch: false,
      addOrEdit: 0,
      infoRules: {
        Title: [{ required: true, validator: validateString, trigger: 'blur' }], // 标题
        Description: [
          { required: true, validator: validateIntro, trigger: 'blur' }
        ], // 简介
        Sort: [{ required: true, validator: validateNumber, trigger: 'blur' }], // 排序
        Status: [
          {
            required: true,
            message: '审核通过后是否自动上架',
            trigger: 'change'
          }
        ] // 排序
      },
      imgpreviewarr:[],//查看大图
      dialogtitle:''
    }
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal == '' && _self.upStatus == '' && _self.keyword == '') {
        _self.isSearch = false
        _self.getData()
      }
    },
    upStatus(newVal, oldVal) {
      if (newVal == '' && _self.status == '' && _self.keyword == '') {
        _self.isSearch = false
        _self.getData()
      }
    },
    keyword(newVal, oldVal) {
      if (newVal == '' && _self.status == '' && _self.upStatus == '') {
        _self.isSearch = false
        _self.getData()
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.tableTop.offsetHeight - 196 + 'px'
      // 监听窗口大小变化
      let self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.tableTop.offsetHeight - 196 + 'px'
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
        if (_self.keyword != '') {
          data.SearchWord = _self.keyword
        }
        if (_self.status != '') {
          data.CheckStatus = _self.status
        }
        if (_self.upStatus != '') {
          data.Status = _self.upStatus
        }
      }
      console.log(data)
      return new Promise((resolve, reject) => {
        getData(data)
          .then(res => {
            _self.tableData = res.data.row
            _self.total = res.data.total
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取详情
    getDetail(id, callback) {
      let data = {
        NewsID: id
      }
      return new Promise(resolve => {
        getDetail(data)
          .then(res => {
            let obj = res.data
            _self.infoDetail = {
              NewsID: obj.NewsID, // 新闻ID
              Title: obj.Title, // 新闻标题
              Description: obj.Description, //	新闻简介
              Content: obj.Content, // 	新闻内容
              ImgUrl: obj.ImgUrl, // 新闻图片
              Sort: obj.Sort, // 	新闻排序
              Status: obj.Status,
              AutoUp: obj.AutoUp
            }
            callback(res)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查看
    see(id) {
      this.dialogtitle='查看资讯'
      _self.addOrEdit = 2
      _self.getDetail(id, res => {
        _self.isShowCreate = true
        this.$nextTick(() => {
          document.querySelector('.el-dialog__body').scrollTop = 0
        })
      })
    },
    // 添加
    add() {
      this.dialogtitle='创建资讯'
      _self.infoDetail = {
        NewsID: '', // 新闻ID
        Title: '', // 新闻标题
        Description: '', //	新闻简介
        Content: '', // 	新闻内容
        ImgUrl: '', // 新闻图片
        Sort: '', // 	新闻排序
        Status: 0
      }
      _self.isShowCreate = true
      this.$nextTick(() => {
        document.querySelector('.el-dialog__body').scrollTop = 0
      })
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
            upDown(data)
              .then(res => {
                _self.$message.success(str + '成功')
                _self.getData()
                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
        })
    },
    // 修改
    edit(id) {
      this.dialogtitle='编辑资讯'
      _self.getDetail(id, res => {
        _self.isShowCreate = true
        this.$nextTick(() => {
          document.querySelector('.el-dialog__body').scrollTop = 0
        })
        _self.addOrEdit = 1
        setTimeout(() => {
          _self.$refs.editor.setContent(res.data.Content)
        }, 500)
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
            commit(data)
              .then(res => {
                _self.$message.success('提交成功')
                _self.getData()
                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
        })
    },
    save(ruleForm, CheckStatus) {
      let obj = _self.infoDetail
      if (obj.Title == '') {
        _self.$message.error('请输入标题')
        return
      } else if (obj.Description == '') {
        _self.$message.error('请输入简介')
        return
      } else if (obj.Sort == '') {
        _self.$message.error('请输入排序')
        return
      } else if (obj.ImgUrl == '') {
        _self.$message.error('请上传图片')
        return
      } else if (obj.Content == '') {
        _self.$message.error('请输入详情')
        return
      }
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let data = {
            Title: obj.Title,
            ImgUrl: obj.ImgUrl,
            Description: obj.Description,
            Content: obj.Content,
            Sort: obj.Sort,
            AutoUp: obj.AutoUp,
            // Status: obj.Status,
            CheckStatus
          }
          if (_self.addOrEdit == 0) {
            return new Promise((resolve, reject) => {
              add(data)
                .then(res => {
                  _self.$message.success('创建成功')
                  _self.getData()
                  _self.handleDialogClose()
                  resolve()
                })
                .catch(error => {
                  reject(error)
                })
            })
          } else if (_self.addOrEdit == 1) {
            data.NewsID = obj.NewsID
            return new Promise((resolve, reject) => {
              edit(data)
                .then(res => {
                  _self.$message.success('修改成功')
                  _self.getData()
                  _self.handleDialogClose()
                  resolve()
                })
                .catch(error => {
                  reject(error)
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
            del(data)
              .then(res => {
                _self.$message.success('删除成功')
                _self.getData()
                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
        })
    },
    // 搜索按钮
    handleSearch() {
      if (_self.status == '' && _self.upStatus == '' && _self.keyword == '') {
        _self.$message.error('请设置搜索条件！')
        return
      }
      _self.page = 1
      _self.isSearch = true
      _self.getData()
    },
    handleDialogClose() {
      _self.infoDetail.NewsID = '' // 新闻ID
      _self.infoDetail.Title = '' // 新闻标题
      _self.infoDetail.Description = '' //	新闻简介
      _self.infoDetail.Content = '' // 	新闻内容
      _self.infoDetail.ImgUrl = '' // 新闻图片
      _self.infoDetail.Sort = '' // 	新闻排序
      _self.infoDetail.Status = 0
      if (_self.addOrEdit != 2) {
        setTimeout(() => {
          _self.$refs.editor.setContent('')
        }, 500)
      }
      _self.$refs.form.resetFields()
      _self.isShowCreate = false
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
    },
    // 查看大图
    imgpreview(imgurl){
      this.imgpreviewarr.push(imgurl)
    },
    //重置
    reset(){
      this.status= '' // 审核状态
      this.upStatus= '' // 上架状态
      this.keyword= ''// 搜索关键字
    }
  }
}
</script>
<style lang="less">
.infoMangeDialog > .el-dialog {
  min-width: 1008px !important; 
}
.heightaotu{
  min-height: 350px;
}
.textmargin{
  margin-right: 20px;
}
.flexcss{
  display: flex;
  justify-content: space-between;
}
.mystyle {
  margin-left: 92%;
}
</style>
