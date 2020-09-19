<template>
  <div class="app-container LoadingArea">
    <div class="fsbw m-b15" ref="tableTop">
      <div class="fclw" style="width:calc(100% - 94px);">
        <div class="fcl m-r7 m-t6">
          <div>审核状态</div>
          <el-select
            v-model="status"
            clearable
            placeholder="审核状态"
            class="w110"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="待提交" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="拒绝" value="-1"></el-option>
          </el-select>
        </div>
        <div class="fcl m-r7 m-t6">
          <div>上架状态</div>
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
        <div class="fcl m-r7 m-t6">
          <div>归属栏目</div>
          <el-select
            v-model="menuStatus"
            clearable
            placeholder="归属栏目"
            class="w110"
          >
            <el-option
              v-for="item in menuList"
              :key="item.MenuID"
              :label="item.MenuName"
              :value="item.MenuID"
            ></el-option>
          </el-select>
        </div>
        <el-input
          v-model="keyword"
          clearable
          placeholder="标题"
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
      :height="maxHeight"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column label="banner" align="center" min-width="130px">
        <template slot-scope="{ row }">
          <div v-if="row.Type == 1">
            <el-image
              v-if="row.BannerImg"
              :src="row.BannerImg"
              class="w100 h60"
              :preview-src-list="[row.BannerImg]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline fs30"></i>
              </div>
            </el-image>
            <div v-else class="avatar-uploader-icon b1_dfe6ec_dash">
              暂无图片
            </div>
          </div>
          <div v-else>
            <video
              v-if="row.BannerImg != ''"
              :src="row.BannerImg"
              class="w100 h60"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <div v-else class="avatar-uploader-icon b1_dfe6ec_dash">
              暂无视频
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" min-width="120px">
        <template slot-scope="{ row }">
          <span>{{ row.Title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" min-width="55px">
        <template slot-scope="{ row }">
          <span>{{ row.Sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属栏目" min-width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.MenuIDText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Banner位置" min-width="97px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.PositionText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="点击量"
        min-width="70px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span>{{ row.VisitCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        min-width="80px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span>{{ row.CheckStatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否上架"
        min-width="80px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span>{{ row.BannerStatusText }}</span>
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
            @click="see(row.BannerID)"
            >查看</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus == 2 && row.BannerStatus == 1"
            @click="changeStatus(row.BannerID, row.BannerStatus)"
            >下架</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus == 2 && row.BannerStatus == 0"
            @click="changeStatus(row.BannerID, row.BannerStatus)"
            >上架</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.BannerStatus != 1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus == 1"
            @click="edit(row.BannerID)"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus != 2"
            :disabled="row.CheckStatus == 1"
            @click="commit(row.BannerID)"
            >提交</el-button
          >

          <el-button
            type="text"
            class="golbal-btn-text-danger"
            v-show="row.BannerStatus != 1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus == 1"
            @click="del(row.BannerID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
       class="pagination"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getData"
    />
    <el-dialog
      class="fu_abow_dialog bannerCreateDialog"
      :title="myTitle"
      :visible.sync="isShowCreate"
      width="50%"
      lock-scroll
      :before-close="handleDialogClose"
    >
      <el-form
        :model="bannerDetail"
        :rules="rules"
        ref="createVideoForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="Title" label-width="28%">
          <el-input
            v-model="bannerDetail.Title"
            placeholder="请输入标题"
            class="w65P"
            :disabled="addOrEdit == 2"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-edit-outline fs23"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="轮播类型" prop="Type" label-width="28%">
          <el-radio-group
            v-model="bannerDetail.Type"
            :disabled="addOrEdit == 2"
          >
            <el-radio :label="1">图片</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="视频地址"
          prop="BannerImg"
          label-width="28%"
          v-show="bannerDetail.Type == 2"
        >
          <el-input
            v-model="bannerDetail.BannerImg"
            placeholder="请输入视频地址"
            class="w65P"
            :disabled="addOrEdit == 2"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-edit-outline fs23"
            ></i>
          </el-input>
        </el-form-item>
        <div class="fu-form-item" v-show="bannerDetail.Type == 2">
          <div class="fu-form-label"></div>
          <div class="fu-form-content">视频宽高比例为XXXpx*XXXpx</div>
        </div>
        <el-form-item
          label="跳转地址"
          prop="LinkUrl"
          label-width="28%"
          v-show="bannerDetail.Type == 1"
        >
          <el-input
            v-model="bannerDetail.LinkUrl"
            class="w65P"
            :disabled="addOrEdit == 2"
            placeholder="请输入跳转地址"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-edit-outline fs23"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="归属模块" prop="MenuID" label-width="28%">
          <el-radio-group
            v-model="bannerDetail.MenuID"
            :disabled="addOrEdit == 2"
          >
            <el-radio
              v-for="item in menuList"
              :key="item.MenuID"
              :label="item.MenuID"
              class="m-t4"
              >{{ item.MenuName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item
          :label="bannerDetail.Type == 1 ? '图片展示位置' : '视频展示位置'"
          prop="Position"
          label-width="28%"
        >
          <el-radio-group
            v-model="bannerDetail.Position"
            :disabled="addOrEdit == 2"
          >
            <el-radio :label="1">顶部</el-radio>
            <el-radio :label="2">内部</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item
          label="排序"
          prop="Sort"
          label-width="28%"
          v-show="bannerDetail.Type == 1"
        >
          <el-input
            v-model="bannerDetail.Sort"
            placeholder="请输入排序"
            class="w65P"
            :disabled="addOrEdit == 2"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-edit-outline fs23"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="VideoPosition"
          label-width="28%"
          style="margin-bottom:0;"
          v-show="bannerDetail.Type == 2"
        >
          <el-radio-group
            v-model="bannerDetail.VideoPosition"
            :disabled="addOrEdit == 2"
          >
            <el-radio :label="1">头部</el-radio>
            <el-radio :label="5">尾部</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="fu-form-item m-t20" v-show="bannerDetail.Type == 2">
          <div class="fu-form-label"></div>
          <div class="fu-form-content">
            此排序为视频在banner中在第一张或者最后一张
          </div>
        </div>
        <el-form-item label class="form-m-l0" prop="BannerStatus">
          <div class="gdf-c">
            <div class="gdf-flexend p-r12 w28P bx">
              <b> <i class="c_ff0000 m-r4">*</i>是否上架 </b>
            </div>
            <el-switch
              :disabled="addOrEdit == 2"
              v-model="bannerDetail.BannerStatus"
              active-color="#000000"
              inactive-color="#ffffff"
              :active-value="1"
              :inactive-value="0"
              class="switch-b1r_dcdfe6"
            ></el-switch>
          </div>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="BannerImg"
          label-width="28%"
          v-show="bannerDetail.Type == 1"
        >
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
              v-if="bannerDetail.BannerImg != ''"
              :src="bannerDetail.BannerImg"
              lazy
              class="w200 h130"
              :preview-src-list="[bannerDetail.BannerImg]"
            />
            <div v-else class="fcocc w200 h130 b1_dfe6ec_dash bc_fafafa">
              <i class="el-icon-plus fs40"></i>
              <div class="m-t8">上传</div>
            </div>
          </el-upload>
        </el-form-item>
        <div
          class="fu-form-item"
          style="margin-bottom:15px;"
          v-show="bannerDetail.Type == 1"
        >
          <div class="fu-form-label"></div>
          <div class="fu-form-content">
            请上传XXX*XXX像素，500k，JPG、JPEG、PNG、BMP、GIF，仅能上传一张
          </div>
        </div>
      </el-form>
      <div class="fcl w100P pad0_40 bx h70">
        <div class="w28P fce bx p-r12">
          <el-button class="golbal-btn" v-if="myStatus" @click="save('createVideoForm', 0)"
            >保存</el-button
          >
        </div>
        <div class="fcc w65P bx p-l12">
          <el-button
            class="golbal-btn w95 t-a_c"
            type="primary"
            v-if="myStatus"
            @click="save('createVideoForm', 1)"
            >保存并提交</el-button
          >
        </div>
        <div>
          <el-button class="golbal-btn" v-if="myStatuss" @click="handleDialogClose"
            >关闭</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {
  validURL,
  isNonzeroPositiveInteger,
  isSpecialSymbols
} from '@/utils/validate'
import {
  getData,
  getDetail,
  add,
  edit,
  commit,
  upDown,
  del,
  upload
} from '@/api/bannerManagement'
function validateNumber(rule, value, callback) {
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
function validateVideoNumber(rule, value, callback) {
  if (value == '') {
    callback()
  }
  if (!isNonzeroPositiveInteger(value)) {
    callback(new Error('请输入非零的正整数'))
  } else {
    callback()
  }
}
let _self
export default {
  components: { Pagination },
  data() {
    const validateUrl = (rule, value, callback) => {
      if (value == '') {
        callback()
      } else if (!validURL(value)) {
        callback(new Error('地址格式不正确'))
      } else {
        callback()
      }
    }
    const validateVideoUrl = (rule, value, callback) => {
      if (!validURL(value)) {
        callback(new Error('请上传图片'))
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
    return {
      maxHeight: 300,
      myStatus: true,
      myStatuss: false,
      myTitle: '',
      status: '', // 审核状态
      upStatus: '', // 上架状态
      keyword: '', // 搜索关键字
      menuStatus: '', // 归属栏目
      isSearch: false, // 是否触发搜索按钮
      menuList: [], // 归属栏目列表
      tableData: [], // 表格数据
      bannerDetail: {
        Title: '', // 标题
        Type: 1, // 类型 1图片，2视频
        BannerImg: '', // 视频/图片 地址 视频
        LinkUrl: '', // 图片跳转地址 图片
        MenuID: '', // 菜单ID 归属模块
        VideoPosition: '', // 视频位置 1第一张显示 5最后一张显示
        Position: '', // 所属位置:1顶部，2中部
        CheckStatus: '', // 审核状态:-1驳回;0待审核;1审核中;2审核通过
        BannerStatus: '', // 上下架：0下架;1上架
        Sort: '' // 排序
      }, // banner详情
      tableHeight: 0, // 表格高度
      total: 50, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      isShowCreate: false, // 是否显示创建弹窗
      rules: {
        Title: [{ required: true, validator: validateString, trigger: 'blur' }], // 标题
        Type: [
          { required: true, message: '请选择轮播类型', trigger: 'change' }
        ], // 轮播类型
        BannerImg: [
          { required: true, validator: validateVideoUrl, trigger: 'blur' }
        ], // 视频/图片 地址 视频
        MenuID: [
          { required: true, message: '请选择归属模块', trigger: 'change' }
        ], // 归属模块
        VideoPosition: [
          { required: true, message: '请选择排序', trigger: 'change' }
        ], // 视频位置 1第一张显示 5最后一张显示
        Position: [
          { required: true, message: '请选择展示位置', trigger: 'change' }
        ], // 所属位置:1顶部，2中部
        Sort: [{ required: true, validator: validateNumber, trigger: 'blur' }], // 排序
        LinkUrl: [{ validator: validateUrl, trigger: 'blur' }] // 图片跳转地址 图片
      },
      addOrEdit: 0 // 0添加操作 1编辑操作 2查看
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.tableTop.offsetHeight - 196 + 'px'
      window.onresize = function() {
        _self.tableHeight =
          window.innerHeight - _self.$refs.tableTop.offsetHeight - 196 + 'px'
      }
    })
    this.$nextTick(function() {
      console.log(this.$refs.table.$el)
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 180
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }
    })
    
  },
  destroyed() {
    window.onresize = null
  },
  watch: {
    status(newVal, oldVal) {
      if (
        newVal == '' &&
        _self.upStatus == '' &&
        _self.keyword == '' &&
        _self.menuStatus == ''
      ) {
        _self.isSearch = false
        _self.getData()
      }
    },
    upStatus(newVal, oldVal) {
      if (
        newVal == '' &&
        _self.status == '' &&
        _self.keyword == '' &&
        _self.menuStatus == ''
      ) {
        _self.isSearch = false
        _self.getData()
      }
    },
    keyword(newVal, oldVal) {
      if (
        newVal == '' &&
        _self.status == '' &&
        _self.upStatus == '' &&
        _self.menuStatus == ''
      ) {
        _self.isSearch = false
        _self.getData()
      }
    },
    menuStatus(newVal, oldVal) {
      if (
        newVal == '' &&
        _self.status == '' &&
        _self.upStatus == '' &&
        _self.keyword == ''
      ) {
        _self.isSearch = false
        _self.getData()
      }
    },
    'bannerDetail.Type': {
      handler(val, oldVal) {
        if (val == 1) {
          _self.rules.Sort[0].required = true
          _self.rules.Sort[0].validator = validateNumber
          _self.rules.VideoPosition[0].required = false
        } else if (val == 2) {
          _self.rules.Sort[0].required = false
          _self.rules.Sort[0].validator = validateVideoNumber
          _self.rules.VideoPosition[0].required = true
        }
      },
      deep: true
    }
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
          data.BannerStatus = _self.upStatus
        }
        if (_self.menuStatus != '') {
          data.MenuID = _self.menuStatus
        }
      }

      return new Promise((resolve, reject) => {
        getData(data)
          .then(res => {
            _self.tableData = res.data.row
            _self.total = res.data.total
            _self.menuList = res.data.menu
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取详情
    getDetail(id) {
      let data = {
        BannerID: id
      }
      return new Promise((resolve, reject) => {
        getDetail(data)
          .then(res => {
            let obj = res.data
            _self.bannerDetail = {
              BannerID: obj.BannerID, //	bannerID
              Title: obj.Title, // 标题
              Type: obj.Type, // 类型 1图片，2视频
              BannerImg: obj.BannerImg, // 视频/图片 地址 视频
              LinkUrl: obj.LinkUrl, // 图片跳转地址 图片
              MenuID: obj.MenuID, // 菜单ID 归属模块
              VideoPosition: obj.VideoPosition, // 图片/视频位置 1第一张显示 5最后一张显示
              Position: obj.Position, // 所属位置:1顶部，2中部
              CheckStatus: obj.CheckStatus, // 审核状态:-1驳回;0待审核;1审核中;2审核通过
              BannerStatus: obj.BannerStatus, // 上下架：0下架;1上架
              Sort: obj.Sort // 排序
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查看
    see(id) {
      _self.getDetail(id)
      _self.isShowCreate = true
      _self.addOrEdit = 2
      _self.myTitle = '查看banner'
      _self.myStatus = false
      _self.myStatuss = true
    },
    // 添加
    add() {
      _self.bannerDetail = {
        Title: '', // 标题
        Type: 1, // 类型 1图片，2视频
        BannerImg: '', // 视频/图片 地址 视频
        LinkUrl: '', // 图片跳转地址 图片
        MenuID: '', // 菜单ID 归属模块
        VideoPosition: '', // 视频位置 1第一张显示 5最后一张显示
        Position: '', // 所属位置:1顶部，2中部
        CheckStatus: '', // 审核状态:-1驳回;0待审核;1审核中;2审核通过
        BannerStatus: 0, // 上下架：0下架;1上架
        Sort: '' // 排序
      }
      _self.isShowCreate = true
      _self.addOrEdit = 0
      _self.myTitle = '新增banner'
    },
    // 修改
    edit(id) {
      _self.getDetail(id)
      _self.isShowCreate = true
      _self.addOrEdit = 1
      _self.myTitle = '编辑banner'
    },
    // 提交
    commit(id) {
      let data = {
        BannerID: id
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
    // 修改上下架状态
    changeStatus(id, status) {
      let data = {
        BannerID: id
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
    // 删除
    del(id) {
      let ids = [id]
      let data = {
        BannerIDArr: ids
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
      if (
        _self.menuStatus == '' &&
        _self.status == '' &&
        _self.upStatus == '' &&
        _self.keyword == ''
      ) {
        _self.$message.error('请设置搜索条件！')
        return
      }
      _self.page = 1
      _self.isSearch = true
      _self.getData()
    },
    // ids.push被选中的ID
    handleSelectionChange(val) {
      console.log(11111)
    },
    // 保存或者保存并提交
    save(ruleForm, CheckStatus) {
      let obj = _self.bannerDetail
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let data = {
            Title: obj.Title,
            Type: obj.Type,
            BannerImg: obj.BannerImg,
            BannerStatus: obj.BannerStatus,
            Position: obj.Position,
            MenuID: obj.MenuID,
            CheckStatus
          }
          if (obj.Type == 1) {
            data.LinkUrl = obj.LinkUrl
            data.Sort = obj.Sort
          }
          if (obj.Type == 2) {
            data.VideoPosition = obj.VideoPosition
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
            data.BannerID = obj.BannerID
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
    handleDialogClose() {
      _self.bannerDetail.Title = '' // 标题
      _self.bannerDetail.Type = 1 // 类型 1图片，2视频
      _self.bannerDetail.BannerImg = '' // 视频/图片 地址 视频
      _self.bannerDetail.LinkUrl = '' // 图片跳转地址 图片
      _self.bannerDetail.MenuID = '' // 菜单ID 归属模块
      _self.bannerDetail.VideoPosition = '' // 视频位置 1第一张显示 5最后一张显示
      _self.bannerDetail.Position = '' // 所属位置:1顶部，2中部
      _self.bannerDetail.CheckStatus = '' // 审核状态:-1驳回;0待审核;1审核中;2审核通过
      _self.bannerDetail.BannerStatus = 0 // 上下架：0下架;1上架
      _self.bannerDetail.Sort = '' // 排序
      _self.$refs.createVideoForm.resetFields()
      _self.isShowCreate = false
      _self.myStatus = true
      _self.myStatuss = false

    },
    // 上传图片
    upImg(a) {
      let form = new FormData()
      form.append('Image', a.file)
      return new Promise((resolve, reject) => {
        upload(form)
          .then(res => {
            _self.bannerDetail.BannerImg = res.data.url
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
.fu-form-label {
  width: 28%;
  float: left;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.fu-form-content {
  margin-left: 28%;
  font-size: 10px;
  margin-bottom: 3px;
}
.bannerCreateDialog > .el-dialog {
  min-width: 462px;
}
</style>
