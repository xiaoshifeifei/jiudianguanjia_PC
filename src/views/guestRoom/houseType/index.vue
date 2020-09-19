<template>
  <div id="house_s2list" class="LoadingArea">
    <div class="container">
      <div ref="tableTop" class="gdf-fjw gmb-5">
        <div class>
          <el-input
            v-model="keyword"
            clearable
            placeholder="房型名称/操作人员"
            class="handle-input gmr-5 gmv-3"
          ></el-input>
          <el-button
            class="gmv-3 golbal-btn m-l10"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
            >查询</el-button
          >
          <el-button
            class="gmv-3 golbal-btn-reset m-l10"
            type="primary"
            icon="el-icon-refresh-right"
            @click="cleanSearch"
            >重置条件</el-button
          >
        </div>
        <div class="gmv-5">
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-delete"
            @click="DelroomtypeM()"
            >批量删除</el-button
          >
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-plus"
            @click="AddNewRoom()"
            >新增房型</el-button
          >
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="table"
        :height="tableHeight"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ (pc.PageNo - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RoomTypeName"
          align="center"
          label="房型名称"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope">
            <div
              @click="handleUpdate(scope.$index, scope.row.RoomTypeID)"
              style="color:#1890ff;cursor:pointer"
            >
              {{ scope.row.RoomTypeName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="房间大小"
          align="center"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope"
            >{{ scope.row.RoomSize }} m<sup>2</sup>
          </template>
        </el-table-column>
        <el-table-column
          prop="BedSizeText"
          align="center"
          label="床型大小"
          min-width="120"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="CustomerCount"
          align="center"
          label="适住人数"
          min-width="120"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          prop="UpdateDate"
          align="center"
          label="编辑时间"
          min-width="120"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          prop="RoomCount"
          align="center"
          label="房间数量"
          min-width="120"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
          min-width="120"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="120"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.$index, scope.row.RoomTypeID)"
              >查看</el-button
            >
            
            <el-button
              type="text"
              @click="EitNewRoom(scope.$index, scope.row.RoomTypeID)"
              >编辑</el-button
            >
            <el-button
              type="text"
              style="color:red"
              @click="
                Delroomtype(
                  scope.$index,
                  scope.row.RoomTypeID,
                  scope.row.RoomTypeName
                )
              "
              >删除</el-button
            >
            <el-button
              type="text"
              @click="
                handleExport(
                  scope.$index,
                  scope.row.RoomTypeID,
                  scope.row.RoomTypeName
                )
              "
              >导出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        id="table_out"
        style="display:none"
        ref="table1"
        :data="tableDataExport"
        border
        class="table"
        :height="tableHeight"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ (pc.PageNo - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RoomNumber"
          align="center"
          label="房号"
          :resizable="false"
        />
        <el-table-column label="楼层" align="center" :resizable="false">
          <template slot-scope="scope">{{ scope.row.RoomFloor }}</template>
        </el-table-column>

        <el-table-column
          prop="Model"
          align="center"
          label="房型名称"
          :resizable="false"
        />
        <el-table-column
          prop="WiFiName"
          align="center"
          label="WIFI名称"
          :resizable="false"
        />
        <el-table-column
          prop="WiFiPwd"
          align="center"
          label="WIFI密码"
          :resizable="false"
        />
        <el-table-column
          prop="UpdateDate"
          align="center"
          label="编辑时间"
          :resizable="false"
        />
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
          :resizable="false"
        />
        <el-table-column
          prop="QrCodeUrl"
          align="center"
          label="二维码"
          :resizable="false"
        />
      </el-table>
      <div style="margin: 20px 0 0 0">
        <el-pagination
          background
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pc.PageNo"
          layout="total, sizes,prev, pager, next, jumper"
          :total="pc.Total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      ref="form"
      class="house_dialog"
      :title="addOrEit"
      :before-close="handleDialogClose1"
      :visible.sync="editVisibleAdd"
      width="35%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <!-- <el-form-item label="操作人">
          <div>{{username}}</div>
        </el-form-item> -->
        <el-form-item label="房型名称" prop="RoomTypeName">
          <el-input
            v-model="form.RoomTypeName"
            maxlength="25"
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
            placeholder="请输入房型名称"
          />
        </el-form-item>
        <el-form-item label="适住人数" prop="CustomerCount">
          <el-input
            placeholder="输入房型适住人数"
            maxlength="5"
            v-model="form.CustomerCount"
          />
        </el-form-item>
        <div class="gdf-c">
          <el-form-item label="床型大小" prop="BedSizeL">
            <el-input
              placeholder="输入床型长度"
              maxlength="5"
              v-model="form.BedSizeL"
            >
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
          <div class="gmh-5" style="height:40px">X</div>
          <el-form-item class="newElItem" label="" prop="BedSizeW">
            <el-input
              placeholder="输入床型宽度"
              maxlength="5"
              v-model="form.BedSizeW"
            >
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="房间大小" prop="RoomSize">
          <el-input
            placeholder="输入房间大小"
            maxlength="10"
            v-model="form.RoomSize"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose1">取 消</el-button>
        <el-button type="primary" @click="saveEditAdd">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="house1_dialog"
      title="导出"
      :before-close="handleDialogClose2"
      :visible.sync="editVisibleAdd1"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <div class="gfw-b gmv-10">请选择导出数据({{ ExportName }})</div>
        <el-select v-model="selectExport" class="">
          <el-option key="1" label="房间数据表" value="1"></el-option>
          <el-option key="2" label="房间二维码" value="2"></el-option>
        </el-select>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose2">取消</el-button>
        <el-button type="primary" @click="saveExport">导出</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getToken, getRefreshToken } from '@/utils/auth'
import axios from 'axios'
import { thirteenBitTimestamp } from '@/utils/index'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {
  GetHotelroomList,
  GetHotelroomDetail,
  AddHotelroomType,
  EitHotelroomType,
  DelHotelroomType,
  HotelroomExport,
  downQrcodeByType
} from '@/api/room-relevant'
export default {
  name: 'basetable',

  data() {
    let checkBedSizeL = (rule, value, callback) => {
      let reg = /^\+?[1-9]\d*$|^[+]{0,1}(\d+\.\d+)$/
      // let regNum=/\[^0-9\]/gi, ''
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('床型长度只能是大于零的正数'))
      }
    }
    let checkBedSizeW = (rule, value, callback) => {
      let reg = /^\+?[1-9]\d*$|^[+]{0,1}(\d+\.\d+)$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('床型宽度只能是大于零的正数'))
      }
    }
    let checkSymbols = (rule, value, callback) => {
      let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      if (!value) {
        return callback()
      } else if (reg.test(value)) {
        return callback(new Error('存在非法字符'))
      }
    }
    return {
      username: '',
      selectExport: '1',
      addOrEit: '添加',
      ExportName: '',
      keyword: '',
      tableData: [],
      tableDataExport: [],
      multipleSelection: [], // 单个页面选中
      multipleSelectionAll: [], // 所有页面选中
      idKey: 'RoomTypeID',
      pageSizeList: [10, 20, 50, 100],
      pageSize: 10,
      editVisibleAdd: false,
      editVisibleAdd1: false,
      pageTotal: 0,
      input1: '',
      input2: '',
      form: {
        RoomTypeName: '',
        CustomerCount: '',
        BedSizeL: '',
        BedSizeW: '',
        RoomSize: ''
      },
      rules: {
        // 校验
        RoomTypeName: [
          {
            required: true,
            message: '房型名称不能为空',
            trigger: 'blur'
          },
          {
            validator: checkSymbols
          }
        ],
        CustomerCount: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[0-9]\d*$/,
            message: '适合人数只能是正整数'
          }
        ],
        BedSizeL: [
          {
            required: false,
            validator: checkBedSizeL,
            trigger: 'change'
          }
        ],
        BedSizeW: [
          {
            required: false,
            validator: checkBedSizeW,
            trigger: 'change'
          }
        ],
        RoomSize: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,9}(.\d{1,2})?$/,
            message: '房间大小只能是大于零的正数且最多两位小数'
          }
        ]
      },
      currentPage: 1,
      pc: {
        Total: 0,
        PageCount: 10,
        PageNo: 1
      },
      nowPage: '',
      eitId: '',
      isSearch: false,
      tableHeight: 0,
      isClean: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(window.innerHeight)
      console.log(this.$refs.table.$el.offsetTop)
      console.log(this.tableHeight)
      this.tableHeight =
        window.innerHeight - this.$refs.tableTop.offsetHeight - 186 + 'px'
      console.log(this.tableHeight)
      // 监听窗口大小变化
      let self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.tableTop.offsetHeight - 186 + 'px'
      }
    })
  },
  destroyed() {
    window.onresize = null
  },
  created() {
    this.getData(1)
  },
  watch: {
    keyword(newVal, oldVal) {
      if (newVal == '' && !this.isClean && this.isSearch) {
        this.isSearch = false
        this.getData(1)
      }
    }
  },
  methods: {
    async saveEditAdd() {
      let that = this
      let failedFields = {}
      this.$refs.form.validate((validate, invalidFields) => {
        if (!validate) {
          failedFields = invalidFields
        }
      })
      let obj = {}
      for (obj in failedFields) {
        // this.$refs[obj].focus()
        return
      }
      if (this.addOrEit === '添加') {
        let result = await AddHotelroomType({
          RoomTypeName: this.form.RoomTypeName,
          CustomerCount: this.form.CustomerCount,
          BedSizeL: this.form.BedSizeL,
          BedSizeW: this.form.BedSizeW,
          RoomSize: this.form.RoomSize
        })
        if (result.code != 0) return
        this.$message.success('添加成功')
        this.editVisibleAdd = false
        this.form = {
          RoomTypeName: '',
          CustomerCount: '',
          BedSizeL: '',
          BedSizeW: '',
          RoomSize: ''
        }
        this.getData(1)
      } else {
        let result = await EitHotelroomType({
          RoomTypeID: this.eitId,
          RoomTypeName: this.form.RoomTypeName,
          CustomerCount: this.form.CustomerCount,
          BedSizeL: this.form.BedSizeL,
          BedSizeW: this.form.BedSizeW,
          RoomSize: this.form.RoomSize
        })
        if (result.code != 0) return
        this.$message.success('修改成功')
        this.editVisibleAdd = false
        this.form = {
          RoomTypeName: '',
          CustomerCount: '',
          BedSizeL: '',
          BedSizeW: '',
          RoomSize: ''
        }
        this.getData(1)
      }
    },
    // 导出
    exportExcel() {
      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = ''
      wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      console.log(wb)
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      console.log(wbout)

      let tittle =
        thirteenBitTimestamp(new Date().getTime()) + '房间数据表.xlsx'
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          tittle
        ) // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
    },
    saveExport() {
      console.log(this.selectExport)
      let that = this
      if (this.selectExport === '1') {
        console.log('选择了数据表')
        HotelroomExport({
          RoomTypeID: this.eitId
        })
          .then(result => {
            if (result.code != 0) return
            that.tableDataExport = result.data.rows
            console.log(that.tableDataExport)

            this.$nextTick(() => {
              that.editVisibleAdd1 = false
              that.exportExcel()
            })
          })
          .catch(err => {
            console.log()
          })
      } else {
        console.log('选择了二维码')
        downQrcodeByType({
          RoomTypeID: this.eitId
        })
          .then(res => {
            this.editVisibleAdd1 = false
            if (!res) return
            console.log(res)
            let blob = new Blob([res], {
              type: 'application/zip;'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.setAttribute(
              'download',
              thirteenBitTimestamp(new Date().getTime()) + '房间二维码'
            ) // 下载的文件
            link.click()
            window.URL.revokeObjectURL(link.href) // 释放内存
          })
          .catch(err => {
            this.editVisibleAdd1 = false
            console.log(err)
          })
      }
    },
    // 查看详情
    AddNewRoom() {
      this.addOrEit = '创建房型'
      this.editVisibleAdd = true
    },
    async EitNewRoom(index, id) {
      this.addOrEit = '编辑'
      let that = this
      this.eitId = id
      let result = await GetHotelroomDetail({
        RoomTypeID: id
      })
      if (result.code != 0) return
      console.log(result)
      let newroomsize = result.data.BedSize.split('*')
      this.form.RoomTypeName = result.data.RoomTypeName
      this.form.CustomerCount = result.data.CustomerCount
      this.form.BedSizeL = newroomsize[0]
      this.form.BedSizeW = newroomsize[1]
      this.form.RoomSize = result.data.RoomSize
      this.username = result.data.OperatorName
      this.editVisibleAdd = true
    },
    handleExport(index, id, name) {
      this.eitId = id
      this.ExportName = name
      this.editVisibleAdd1 = true
    },
    DelroomtypeM() {
      this.changePageCoreRecordData()
      if (this.multipleSelectionAll.length == 0) {
        this.$message('请选择要操作的内容')
        return
      }
      if (this.tableData.length < 2) {
        this.$message('目前房型数量只有一个，无法删除')
        return
      }
      console.log(this.multipleSelectionAll)
      let that = this
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          let RoomTypeIDs = []
          this.multipleSelectionAll.forEach((m, i) => {
            RoomTypeIDs.push(m.RoomTypeID)
          })

          DelHotelroomType({
            RoomTypeIDs
          })
            .then(result => {
              if (result.code != 0) return
              that.getData(1)
              that.$message.success('删除成功')
            })
            .catch(err => {
              console.log()
            })
        })
        .catch(err => {
          console.log('这是confirm')
        })
    },
    Delroomtype(index, id, name) {
      // 二次确认删除
      let that = this
      // eslint-disable-next-line no-useless-concat
      this.$confirm('确定要删除' + '<' + name + '>' + '房型吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          let RoomTypeIDs = []
          RoomTypeIDs.push(id)
          DelHotelroomType({
            RoomTypeIDs
          })
            .then(result => {
              if (result.code != 0) return
              that.getData(1)
              that.$message.success('删除成功')
            })
            .catch(err => {
              console.log()
            })
        })
        .catch(err => {
          console.log('这是confirm')
        })
    },
    handleUpdate(row, id) {
      this.$router.push({
        path: '/guestRoom/apartMent',
        query: {
          id
        }
      })
    },

    async getData(val) {
      let data = {
        Limit: this.pageSize,
        Page: val
      }
      if (this.isSearch) {
        data.Keys = this.keyword
      }
      let result = await GetHotelroomList(data)
      if (result.code != 0) return
      console.log(result)
      this.isClean = false
      this.tableData = result.data.rows
      this.pc.Total = result.data.total
      this.pc.PageCount = result.data.total_page
      this.pc.PageNo = parseInt(result.data.current_page)
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey
      let selectAllIds = []
      let that = this
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
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey
      let that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      let selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      let selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      let noSelectIds = []
      // 得到当前页没有选中的id
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
    handleDialogClose1() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.editVisibleAdd = false
      this.$refs.form.resetFields()
      this.form = {
        RoomTypeName: '',
        CustomerCount: '',
        BedSizeL: '',
        BedSizeW: '',
        RoomSize: ''
      }
    },
    handleDialogClose2() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.editVisibleAdd1 = false
      this.selectExport = '1'
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    // 分页合伙人列表
    handleCurrentChange(val) {
      let that = this
      this.nowPage = val
      this.changePageCoreRecordData()
      this.getData(val)
    },

    // 触发搜索按钮
    handleSearch() {
      let that = this

      /*
       * if (this.keyword == '') {
       *   that.$message.error('请选择或输入搜索条件')
       *   return
       * }
       */
      this.isSearch = true
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    cleanSearch() {
      this.isClean = true
      this.keyword = ''
      this.isSearch = false
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val)
      this.getData(1)
    }
  }
}
</script>

<style lang="less">
.img_w_pater {
  width: 200px;
  height: 150px;
}

#house_s2list {
  .house_dialog .el-dialog {
    margin: 10vh auto !important;
    min-width: 650px;
    // min-height: 400px;
    // height: 80vh;
    // overflow-y: scroll;
  }
  .house1_dialog .el-dialog {
    margin: 10vh auto !important;
    min-width: 500px;
  }
  .house1_dialog .el-dialog__body {
    overflow: hidden;
    height: 50%;
    overflow-y: scroll;
    padding: 0 40px;
  }
  .el-form-item__content {
    line-height: 50px;
  }
  .el-form-item__label {
    line-height: 50px;
  }
  .house_dialog .el-dialog__body {
    overflow: hidden;
    height: 50%;
    overflow-y: scroll;
    padding: 40px 40px;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
  .newElItem .el-form-item__label {
    width: 20px !important;
  }
  .newElItem .el-form-item__content {
    margin-left: 0px !important;
  }
}

.container {
  padding: 15px;
  background: #fff;
  min-width: 550px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 60px;
  height: 60px;
}
</style>
