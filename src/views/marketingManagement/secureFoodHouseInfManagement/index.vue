<template>
  <div class="app-container LoadingArea">
    <div class="fsbw m-b15" ref="tableTop">
      <div class="fclw" style="width:calc(100% - 94px);">
        <div class="fcl m-r7 m-t6">
          <div>审核状态</div>
          <el-select v-model="status" clearable placeholder="审核状态" class="w110">
            <el-option label="全部" value=""></el-option>
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
        <!-- <el-input
          v-model="keyword"
          clearable
          placeholder="标题/作者/操作人员"
          class="m-r7 m-t6"
          style="width:280px;"
        ></el-input>-->
        <el-button type="primary" icon="el-icon-search" class="golbal-btn m-t6" @click="handleSearch">查询</el-button>
      </div>
      <div class="fcc h46">
        <el-button type="primary"  class="golbal-btn m-t6 w84" @click="add">信息编辑</el-button>
      </div>
    </div>
      <div class="comment_list table_list">
    <el-table
      :height="maxHeight"
      :max-height="tableHeight"
      :data="tableData"
      border
      fit
      ref="table"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="住户情况统计" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.RandomMinVal }} ~ {{ row.RandomMaxVal }}</span>
        </template>
      </el-table-column>

      <el-table-column label="阅读数" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.VisitCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CheckStatusText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{row.EatLiveStatusText}}</span>
        </template>
      </el-table-column>

       <el-table-column label="发布时间" min-width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{row.OperatorUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" min-width="171px" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" class="golbal-btn-text" @click="see(row.RecID)">查看</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus==2 && row.EatLiveStatus==1"
            @click="changeStatus(row.RecID,row.EatLiveStatus)"
          >下架</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus==2 && row.EatLiveStatus==0"
            @click="changeStatus(row.RecID,row.EatLiveStatus)"
          >上架</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.EatLiveStatus != 1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus==1"
            @click="edit(row.RecID)"
          >编辑</el-button>
          <el-button
            type="text"
            class="golbal-btn-text"
            v-show="row.CheckStatus!=2"
            :disabled="row.CheckStatus==1"
            @click="commit(row.RecID)"
          >提交</el-button>
          <el-button
            type="text"
            class="golbal-btn-text-danger"
            v-show="row.EatLiveStatus!=1 || row.CheckStatus != 2"
            :disabled="row.CheckStatus==1"
            @click="del(row.RecID)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination_fix"><pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getData"
    /></div>
     </div>
    <el-dialog
      class="fu_abow_dialog safety-food-fu"
      title="创建安心食住"
      :visible.sync="isShowCreate"
      width="88%"
      lock-scroll
      :before-close="handleDialogClose"
    >
      <el-form ref="form" :model="eatLiveDetail" label-width="150px">
        <div>
          <el-form-item label class="form-m-l50">
            <div class="gdf-c">
              <b>住户情况统计：</b>
              <div class="gdf-flexend gmr-10 w84">
                <b>
                  <i class="c_ff0000 m-r4">*</i>最小值
                </b>
              </div>
              <el-input
                v-model="eatLiveDetail.RandomMinVal"
                style="width:120px;"
                :disabled="addOrEdit==2"
              ></el-input>
              <div class="pad0_15">~</div>
              <div class="gdf-flexend gmr-10 w84">
                <b>
                  <i class="c_ff0000 m-r4">*</i>最大值
                </b>
              </div>
              <el-input
                v-model="eatLiveDetail.RandomMaxVal"
                style="width:120px;"
                :disabled="addOrEdit==2"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label class="form-m-l50">
            <div class="gdf-c">
              <div class="gdf-flexend gmr-10 w154">
                <b>
                  <i class="c_ff0000 m-r4">*</i>审核通过后是否上架
                </b>
              </div>
              <el-switch
                v-model="eatLiveDetail.EatLiveStatus"
                active-color="#000000"
                inactive-color="#ffffff"
                :active-value="1"
                :inactive-value="0"
                class="switch-b1r_dcdfe6"
                :disabled="addOrEdit==2"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item label class="form-m-l50">
            <div class="gdf-flexend gmr-10 w84">
              <b>
                <i class="c_ff0000 m-r4">*</i>清扫情况
              </b>
            </div>
            <div class="pad0_54">
              <Tinymce
                ref="clean"
                v-model="eatLiveDetail.CleanSituation"
                :height="350"
                :action="upUrl"
                imgFile="Image"
                v-if="addOrEdit!=2"
              />
              <div
                v-else
                v-html="eatLiveDetail.CleanSituation"
                class="b1_dfe6ec h350 pad0_15"
                style="overflow:auto"
              ></div>
            </div>
          </el-form-item>
          <el-form-item label class="form-m-l50">
            <div class="gdf-flexend gmr-10 w84">
              <b>
                <i class="c_ff0000 m-r4">*</i>布草情况
              </b>
            </div>
            <div class="pad0_54">
              <Tinymce
                ref="linen"
                v-model="eatLiveDetail.SetupSituation"
                :height="350"
                :action="upUrl"
                imgFile="Image"
                v-if="addOrEdit!=2"
              />
              <div
                v-else
                v-html="eatLiveDetail.SetupSituation"
                class="b1_dfe6ec h350 pad0_15"
                style="overflow:auto"
              ></div>
            </div>
          </el-form-item>
          <el-form-item label class="form-m-l50">
            <div class="gdf-flexend gmr-10 w84">
              <b>
                <i class="c_ff0000 m-r4">*</i>食品安全
              </b>
            </div>
            <div class="pad0_54">
              <Tinymce
                ref="foodSafety"
                v-model="eatLiveDetail.GoodsSituation"
                :height="350"
                :action="upUrl"
                imgFile="Image"
                v-if="addOrEdit!=2"
              />
              <div
                v-else
                v-html="eatLiveDetail.GoodsSituation"
                class="b1_dfe6ec h350 pad0_15"
                style="overflow:auto"
              ></div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="fcc w100P pad0_40 bx h70" v-show="addOrEdit!=2">
        <div class="w50P fcc bx">
          <el-button class="golbal-btn" @click="save(0)">保存</el-button>
        </div>
        <div class="fcc w50P bx">
          <el-button class="golbal-btn w95 t-a_c" type="primary" @click="save(1)">保存并提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
import { getData, getDetail, add, edit, del, commit, upDown } from '@/api/secureFoodHouseInfManagement'
let _self
export default {
  components: { Pagination, Tinymce },
  data() {
    return {
      maxHeight: 300,
      upUrl: process.env.VUE_APP_BASE_API + '/eatlive/upload',
      status: '', // 审核状态
      upStatus: '', // 上架状态
      keyword: '', // 搜索关键字
      tableData: [], // 表格数据
      eatLiveDetail: {
        RecID: 0,
        RandomMinVal: '', //		住户情况统计最小值
        RandomMaxVal: '', // 	住户情况统计最大值
        CleanSituation: '', // 清扫情况
        SetupSituation: '', // 	布草情况
        GoodsSituation: '', // 	食品安全
        EatLiveStatus: 0 // 上下架状态:0:下架;1上架
      }, // 详情数据
      tableHeight: 0, // 表格高度
      total: 50, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      isShowCreate: false, // 是否显示创建弹窗
      isSearch: false,
      addOrEdit: 0 // 0添加操作 1编辑操作 2查看
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
          data.BannerStatus = _self.upStatus
        }
        if (_self.keyword) {
          data.SearchWord = _self.keyword
        }
      }
      return new Promise((resolve, reject) => {
        getData(data).then(res => {
          _self.tableData = res.data.rows
          _self.total = res.data.total
          resolve()
        })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取详情
    getDetail(id, callback) {
      let data = {
        RecID: id
      }
      return new Promise((resolve, reject) => {
        getDetail(data).then(res => {
          let obj = res.data
          _self.eatLiveDetail = {
            RecID: obj.RecID, // ID
            RandomMinVal: obj.RandomMinVal, //		住户情况统计最小值
            RandomMaxVal: obj.RandomMaxVal, // 	住户情况统计最大值
            CleanSituation: obj.CleanSituation, // 清扫情况
            SetupSituation: obj.SetupSituation, // 	布草情况
            GoodsSituation: obj.GoodsSituation, // 	食品安全
            EatLiveStatus: obj.EatLiveStatus // 上下架状态:0:下架;1上架
          }
          callback(res)
          resolve()
        })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 查看
    see(id) {
      _self.addOrEdit = 2
      _self.getDetail(id, (res) => {
        _self.isShowCreate = true
        this.$nextTick(() => {
          document.querySelector('.el-dialog__body').scrollTop = 0
        })
      })
    },
    // 添加
    add() {
      _self.eatLiveDetail = {
        RandomMinVal: '', //		住户情况统计最小值
        RandomMaxVal: '', // 	住户情况统计最大值
        CleanSituation: '', // 清扫情况
        SetupSituation: '', // 	布草情况
        GoodsSituation: '', // 	食品安全
        EatLiveStatus: 0 // 上下架状态:0:下架;1上架
      }
      _self.isShowCreate = true
      this.$nextTick(() => {
        document.querySelector('.el-dialog__body').scrollTop = 0
      })
      _self.addOrEdit = 0
    },
    // 修改
    edit(id) {
      _self.addOrEdit = 1
      _self.getDetail(id, (res) => {
        _self.isShowCreate = true
        this.$nextTick(() => {
          document.querySelector('.el-dialog__body').scrollTop = 0
        })
        setTimeout(() => {
          _self.$refs.foodSafety.setContent(res.data.GoodsSituation)
          _self.$refs.clean.setContent(res.data.CleanSituation)
          _self.$refs.linen.setContent(res.data.SetupSituation)
        }, 500)
      })
    },
    // 删除
    del(id) {
      let ids = [id]
      let data = {
        RecIDArr: ids
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
    // 提交
    commit(id) {
      let data = {
        RecID: id
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
    // 修改上下架状态
    changeStatus(id, status) {
      let data = {
        RecID: id
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
              let str = ''
              if (status == 0) {
                str = '上架'
              } else {
                str = '下架'
              }
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
    save(CheckStatus) {
      let obj = _self.eatLiveDetail
      if (obj.RandomMinVal == '') {
        _self.$message.error('请输入住户情况统计最小值')
        return
      } else if (obj.RandomMinVal <= 0) {
        _self.$message.error('住户情况统计最小值要大于0')
        return
      } else if (obj.RandomMaxVal == '') {
        _self.$message.error('请输入住户情况统计最大值')
        return
      } else if (obj.RandomMaxVal <= 0) {
        _self.$message.error('住户情况统计最大值要大于0')
        return
      } else if (obj.CleanSituation == '') {
        _self.$message.error('请输入清扫情况')
        return
      } else if (obj.SetupSituation == '') {
        _self.$message.error('请输入布草情况')
        return
      } else if (obj.GoodsSituation == '') {
        _self.$message.error('请输入食品安全')
        return
      }
      let data = {
        RandomMinVal: obj.RandomMinVal,
        RandomMaxVal: obj.RandomMaxVal,
        CleanSituation: obj.CleanSituation,
        SetupSituation: obj.SetupSituation,
        GoodsSituation: obj.GoodsSituation,
        EatLiveStatus: obj.EatLiveStatus,
        CheckStatus
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
        data.RecID = obj.RecID
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
      }
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
      if (_self.addOrEdit != 2) {
        _self.$refs.foodSafety.setContent('')
        _self.$refs.clean.setContent('')
        _self.$refs.linen.setContent('')
      }
      // _self.$refs.form.resetFields()
      _self.isShowCreate = false
    },
    // ids.push被选中的ID
    handleSelectionChange(val) {
      console.log(11111)
    }
  }
}
</script>
<style lang="less">
.fu_abow_dialog.safety-food-fu > .el-dialog {
  min-width: 798px;
}
  .comment_list {
    margin-left: 15px;
  }
  // .pagination_fix {
  //   width: 100%;
  //   height:100px;
  //   background-color: yellow;
  //   position: fixed;
  //   bottom: 0;
  // }

</style>
