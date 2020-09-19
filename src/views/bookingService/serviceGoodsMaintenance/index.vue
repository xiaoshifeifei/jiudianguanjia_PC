<template>
  <div class="zy_bigthree LoadingArea">
    <el-card>
      <!-- 输入框  按钮区域 -->
      <el-row :gutter="24">
        <el-col :span="6">
          <el-input
            placeholder="类别名称"
            v-model="keyword"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button
              class="golbal-btn"
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >查询</el-button
            >
            <el-button
              class="gmv-3 golbal-btn-reset m-l10"
              type="primary"
              icon="el-icon-refresh-right"
              @click="handleReset"
              >重置条件</el-button
            >
          </div>
        </el-col>
        <div class="zy_pil">
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-delete"
            @click="batchRemove()"
            >批量删除</el-button
          >
          <!-- <el-button class="delete-btn" @click="batchRemove()">批量删除</el-button> -->
          <el-button
            class="golbal-btn"
            type="primary"
            icon="el-icon-plus"
            @click="serviceDialogVisible = true"
            >新增类目</el-button
          >
        </div>
      </el-row>
      <!-- 列表区域 -->
      <el-table
        ref="table"
        :data="tableData"
        :height="maxHeight"
        border=""
        style="width: 100%"
        :key="randomKey"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :resizable="false"
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          prop="CategoryName"
          label="类别名称"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          prop="Sort"
          label="排序"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          prop="ServiceGoodsCount"
          label="物品总数"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          prop="UpdateDate"
          label="操作时间"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          fixed="right"
          label="操作"
          width="210px"
        >
          <template width="180px" slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="viewEditDialog(scope.row.GoodsCategoryID)"
              >查看</el-button
            >
            <!-- 编辑按钮 -->
            <el-button
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="
                openDialog(
                  scope.row.GoodsCategoryID,
                  scope.row.CategoryName,
                  scope.row.Sort
                )
              "
              >编辑</el-button
            >
            <!-- 物品按钮 -->
            <el-button
              class="golbal-btn-text"
              @click="
                btnsClick(scope.row.GoodsCategoryID, scope.row.CategoryName)
              "
              type="text"
              size="mini"
              >物品</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsCategoryID)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.Page"
        :page-sizes="[10,20, 50, 100]"
        :page-size="pageSize"
        background=""
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增类别对话框 -->
    <el-dialog
      title="新增类别"
      :visible.sync="serviceDialogVisible"
      width="60%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFormRef"
        :inline="true"
        :model="formInline"
        :rules="myRules"
        class="demo-form-inline"
      >
        <el-form-item label="类别名称 :" prop="CategoryName">
          <el-input
            v-model="formInline.CategoryName"
            placeholder="其他类"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序 :" prop="Sort">
          <el-input v-model="formInline.Sort" placeholder="90"></el-input>
        </el-form-item>
      </el-form>
      <div class="zy_dialogFooter">
        <el-button @click="serviceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 查看用户对话框 -->
    <el-dialog title="查看类别" :visible.sync="viewDialogVisible" width="50%">
      <el-form ref="addFormRef" :model="editForm" label-width="100px">
        <el-form-item label="分类ID :" prop="GoodsCategoryID">
          <el-input v-model="editForm.GoodsCategoryID" disabled />
        </el-form-item>
        <el-form-item label="类别名称 :" prop="CategoryName">
          <el-input v-model="editForm.CategoryName" disabled />
        </el-form-item>
        <el-form-item label="酒店ID :" prop="HotelID">
          <el-input v-model="editForm.HotelID" disabled />
        </el-form-item>
        <el-form-item label="分类状态 :" prop="CategoryStatus">
          <el-input
            :placeholder="
              editForm.CategoryStatus === 0
                ? '下架'
                : editForm.CategoryStatus === 1
                ? '上架'
                : ''
            "
            disabled
          />
        </el-form-item>
        <el-form-item label="排序 :" prop="Sort">
          <el-input v-model="editForm.Sort" disabled />
        </el-form-item>
        <el-form-item label="创建时间 :" prop="CreateDate">
          <el-input v-model="editForm.CreateDate" disabled />
        </el-form-item>
        <el-form-item label="更新时间 :" prop="UpdateDate">
          <el-input v-model="editForm.UpdateDate" disabled />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="修改类别"
      :visible.sync="changeDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFormRef"
        :inline="true"
        :model="changeLine"
        class="demo-form-inline"
      >
        <el-form-item label="类别名称 :" prop="CategoryName">
          <el-input
            v-model="changeLine.CategoryName"
            placeholder="其他类"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序 :" prop="Sort">
          <el-input
            maxlength="9"
            show-word-limit
            v-model="changeLine.Sort"
            placeholder="90"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="zy_dialogFooter">
        <el-button @click="changeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="amendDialogVisible()"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  serviceGoodsCategoryIndex,
  serviceGoodsCategoryCreate,
  serviceGoodsCategoryShow,
  serviceGoodsCategoryUpdate,
  serviceGoodsCategoryDelete
} from '@/api/serviceGoodsCategory'
export default {
  data() {
    return {
      formInline: {
        CategoryName: '',
        Sort: ''
      },
      changeLine: {
        CategoryName: '',
        Sort: ''
      },
      // 添加表单的验证规则对象

      keyword: '',
      // 查询到的用户信息对象
      editForm: {
        GoodsCategoryID: '',
        CategoryName: '',
        HotelID: '',
        BelongModule: '',
        CategoryStatus: '',
        Sort: '',
        IsDelete: '',
        CreateDate: '',
        UpdateDate: ''
      },
      // 审核
      options: [
        {
          value: '选项1',
          label: '待审核'
        },
        {
          value: '选项2',
          label: '审核中'
        },
        {
          value: '选项3',
          label: '审核通过'
        },
        {
          value: '选项4',
          label: '驳回'
        },
        {
          value: '选项5',
          label: '全部'
        }
      ],
      value: '',
      // 上架
      optionsOne: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '是'
        },
        {
          value: '选项3',
          label: '否'
        }
      ],
      input: '',
      pageSize: 10,
      value1: '',
      // 控制新增类别对话框的显示与隐藏
      serviceDialogVisible: false,
      // 控制修改类别对话框的显示与隐藏
      changeDialogVisible: false,
      // 控制查看用户对话框的显示与隐藏
      viewDialogVisible: false,
      // eslint-disable-next-line camelcase
      is_search: false,
      activeId: [], // 选中的id数组
      multipleSelection: [],
      multipleSelectionAll: [],
      idKey: 'GoodsCategoryID',
      queryInfo: {
        Page: 1,
        Limit: 20
      },
      maxHeight: 300,
      // 列表数据
      tableData: [],
      total: 0,
      randomKey: '',
      Res: '',
      dialogContentID: '',
      myRules: {
        // 校验
        Sort: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[0-9]\d*$/,
            message: '排序不能为负数'
          }
        ]

      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      // console.log(newVal)
      if (newVal == '' || newVal == null || newVal == 'undefined') {
        this.$store.dispatch('mumustore/changeState', {
          key: 'isSeach',
          value: false
        })
        this.getServiceList()
      }
    },
    keyword(newVal, oldVal) {
      if (newVal == '') {
        this.$store.dispatch('mumustore/changeState', {
          key: 'isSeach',
          value: false
        })
        this.getServiceList()
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      // / console.log(this.$refs.table.$el)
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 170
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 100
      }
    })
    this.getServiceList()
  },
  methods: {
    async getServiceList(val) {
      let data = {
        Limit: this.queryInfo.Limit,
        Page: this.queryInfo.Page
      }
      if (this.$store.state.mumustore.isSeach) {
        data.Search = this.keyword
        // console.log(data)
      }
      console.log('datadata555', data)
      const res = await serviceGoodsCategoryIndex(data)
      console.log('resresres1111111', res)
      // console.log(res)
      if (res.code !== 0) return this.$message.error('获取列表失败')
      // 如果返回状态正常，将请求的数据保存到data中
      this.tableData = res.data.rows
      this.total = res.data.total
      this.randomKey = Math.random()
      this.Res = res
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    // eslint-disable-next-line no-empty-function
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.Limit = newSize
      // 重新按照pagesize发送请求，请求最新的数据
      this.getServiceList()
    },
    // eslint-disable-next-line no-empty-function
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.Page = newPage
      this.changePageCoreRecordData()
      // 重新按照pagenum发送请求，请求最新的数据
      this.getServiceList()
    },
    addDialogVisible() {
      // eslint-disable-next-line require-await
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.formInline
        const res = await serviceGoodsCategoryCreate(data)
        // console.log(res)
        if (res.code !== 0) {
          this.$message.error('添加物品类别失败！')
        }

        this.$message.success('添加物品类别成功！')
        // 隐藏添加用户的对话框
        this.serviceDialogVisible = false
        // 重新获取用户列表数据
        this.getServiceList()
      })
    },
    openDialog(ID, dev, index) {
      this.changeDialogVisible = true
      this.changeLine.CategoryName = dev
      this.changeLine.Sort = index
      this.dialogContentID = ID
    },
    // eslint-disable-next-line require-await
    async amendDialogVisible() {
      // let state = ''

      /*
       * this.Res.data.rows.forEach((item, index) => {
       *   try {
       *     if (item.Sort === Number(this.changeLine.Sort)) {
       *       this.$message.error('你输入的排序已重复')
       *       // console.log('aa')
       *       state = false
       *       throw new Error('')
       *       // eslint-disable-next-line no-unreachable
       *       // return false
       *     } else {
       *       state = true
       *     }
       *   } catch (error) {
       *     // console.log(error)
       *     return false
       *   }
       * })
       */
      // if (state) {
      const res = await serviceGoodsCategoryUpdate({
        GoodsCategoryID: this.dialogContentID,
        CategoryName: this.changeLine.CategoryName,
        Sort: this.changeLine.Sort
      })
        .then(res => {
          // console.log(res)
          this.changeDialogVisible = false
          this.getServiceList()
          this.$message.success('客房服务物品分类更新')
        })
        .catch(err => {
          // this.$message.error('客房服务物品分类更新失败')
        })
      /*
       * if (resData.code !== 0) {
       *
       * } else {
       *   this.$message.success('客房服务物品分类更新')
       * }
       */
      // }
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 查看serviceGoodsCategoryShow
    async viewEditDialog(ID) {
      // console.log(ID)
      const res = await serviceGoodsCategoryShow({ GoodsCategoryID: ID })
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data

      this.viewDialogVisible = true
    },
    // 点击物品跳转页面
    btnsClick(val, name) {
      // console.log(name)
      console.log("val需要的ID",val);
      const th = this
      th.$router.push({
        path: 'menu1-1',
        query: {
          id: val,
          CategoryName: name
        }
      })
    },
    // 根据ID删除对应的用户信息
    async moveUserById(GoodsCategoryID) {
      /*
       * console.log(CommentID)
       * 弹框询问用户是否删除数据
       */
      // console.log(this)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该数据, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      /*
       * 如果用户确认删除，则返回值为字符串 confirm
       * 如果用户取消了删除，则返回值为字符串 cancel
       * console.log(confirmResult)
       */
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await serviceGoodsCategoryDelete({
        GoodsCategoryIDs: [GoodsCategoryID]
      })

      if (res.code !== 0) {
        return this.$message.error('删除物品类别失败！')
      }

      this.$message.success('删除物品类别成功！')
      this.getServiceList()
    },
    // 点击批量删除
    async batchRemove() {
      this.changePageCoreRecordData()
      // console.log(this.multipleSelectionAll)

      if (
        this.multipleSelectionAll == '' ||
        this.multipleSelectionAll.length == 0
      ) {
        let data = {}
        this.$message('请选择要操作的内容')
      } else {
        this.tableDataSelect = []

        this.multipleSelectionAll.forEach((m, i) => {
          this.tableDataSelect[i] = m.GoodsCategoryID
        })
        const confirmResult = await this.$confirm(
          '此操作将永久删除该数据, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        /*
         * 如果用户确认删除，则返回值为字符串 confirm
         * 如果用户取消了删除，则返回值为字符串 cancel
         * console.log(confirmResult)
         */
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        const res = await serviceGoodsCategoryDelete({
          GoodsCategoryIDs: this.tableDataSelect
        })

        if (res.code !== 0) {
          return this.$message.error('删除用户失败！')
        }

        this.$message.success('删除用户成功！')
        this.multipleSelectionAll = []
        this.getServiceList()
        // console.log(this.tableDataSelect)
        /*
         * this.tableDataSelect = this.multipleSelectionAll
         * this.moveUserById()
         */
      }
      // this.moveUserById(GoodsCategoryID)

      /*
       * console.log(this)
       * setTimeout(() => {
       *   if (this.$store.state.mumustore.multipleSelectionAll.length == 0) {
       *     this.$message('请选择要操作的内容')
       *     return
       *   }
       *   this.tableDataSelect = this.$store.state.mumustore.multipleSelectionAll
       *   console.log(this.$store.state.mumustore.multipleSelectionAll)
       *   this.deriveDialogVisible = true
       * }, 0)
       */
    },
    // 设置选中的方法
    setSelectRow() {
      // console.log(this.multipleSelectionAll)
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // activeId.push被选中的ID
    handleSelectionChange(val) {
      this.multipleSelection = val
      val.forEach((m, i) => {
        this.activeId.push(m[this.idKey])
      })
      // this.multipleSelectionAll = val
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      /*
       * console.log('记忆选择核心')
       * 标识当前行的唯一键的名称
       */
      const idKey = this.idKey
      const that = this
      // console.log(this.multipleSelectionAll.length)

      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      // console.log(this.multipleSelectionAll)

      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      /*
       * 得到当前页没有选中的id
       * console.log(this.tableData)
       */
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    // 触发搜索按钮
    handleSearch() {
      if ((this.value == '' || this.value == null) && this.keyword == '') {
        this.$message.error('请设置搜索条件')
        return
      }
      this.$store.dispatch('mumustore/changeState', {
        key: 'isSeach',
        value: true
      })
      this.getServiceList()
    },
    handleReset() {
      this.keyword = ''
      // eslint-disable-next-line camelcase
      this.is_search = false
      this.getServiceList()
    }
  }
}
</script>

<style lang="less">
.zy_bigthree {
  .golbal-btn-text {
    font-size: 15px !important;
  }
  .golbal-btn-text-danger {
    font-size: 15px !important;
  }
  .el-tabs__nav .el-tabs__item:hover {
    color: #ccc !important;
  }
  .zy_lian {
    font-size: 15px;
  }
  .zy_big {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    margin: 5px;
  }
  .zy_but {
    width: 84px;
    height: 32px;
    line-height: 8px;
    margin-top: 5px;
    font-size: 14pt;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-table {
    margin-top: 10px;
  }
  .zy_pil {
    float: right;
    margin-right: 60px;
  }
  .zy_tabss {
    margin: 15px;
  }
  .zy_fontsize {
    font-size: 10px;
  }
  .el-select {
    // 下拉选择框
    width: 100px;
  }
  .el-dialog__title {
    font-size: 10px;
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
  }
  .el-dialog__body {
    overflow: auto;
    // transform: translateX(25%)
  }
  .zy_dialogFooter {
    display: flex;
    justify-content: space-around;
  }
  .demo-form-inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center !important;
  }
  .el-form-item {
    width: 100%;
  }
  .el-form-item__label {
    width: 100px;
  }
  .zy_el .el-alert__content {
    width: 100% !important;
  }
  .el-row {
    line-height: 40px;
  }
  .delete-btn {
    width: 84px;
    height: 32px;
    padding: 5px 10px !important;
  }
  .el-pagination {
    margin-top: 10px;
  }
  .el-form--inline .el-form-item__content {
    width: 50%;
  }
}
</style>
