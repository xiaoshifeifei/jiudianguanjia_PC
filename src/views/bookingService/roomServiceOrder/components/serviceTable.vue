<template>
  <div
    id="service_s2list"
    class="LoadingArea"
  >
    <div class="page-container">
      <div class="gdf-jcw ">
        <div class="gmb-5">
        <el-input
        v-model="keyword"
        clearable
        placeholder="输入房间号/订单号"
        class="handle-input gmr-5 gmv-5"
      ></el-input>
      <el-date-picker
        class="gmr-5 gmv-5"
        v-model="value"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="下单开始日期"
        end-placeholder="下单结束日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button
            class="gmv-3 golbal-btn m-l10"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
          <el-button
            class="gmv-3 golbal-btn-reset m-l10"
            type="primary"
            icon="el-icon-refresh-right"
            @click="cleanSearch"
          >重置条件</el-button>
      </div>

      <div class="gmb-5">
        <el-button
        type="primary"
        class="golbal-btn"
         icon="el-icon-download"
        @click="addProduct"
      >批量导出</el-button>
      </div>
      </div>
      <el-table
        ref="table"
        :data="tableData.rows"
        border
        class="table"
        :height="maxHeight"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"
          :resizable="false"
        />
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ (tableData.current_page - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="SerialNumber"
          align="center"
          label="订单号"
          min-width="180"
          :resizable="false"
        />
        <el-table-column
          prop="RoomNumber"
          align="center"
          label="房号"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          label="用户"
          align="center"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.UserName }}</template>
        </el-table-column>

        <el-table-column
          prop="ServiceItem"
          align="center"
          label="服务项目"
          min-width="150"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="ServiceGoodsCount"
          align="center"
          label="数量"
          min-width="150"
          :resizable="false"
        />
        <el-table-column
          label="状态"
          align="center"

          min-width="100"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus==0?'待配送':scope.row.OrderStatus==1?'已完成':scope.row.OrderStatus==-1?'已取消':scope.row.OrderStatus==2?'已接受':'' }}</template>
        </el-table-column>
        <el-table-column
          prop="CreateDate"
          align="center"
          label="下单时间"
          min-width="150"
          :resizable="false"
        />
        <el-table-column
          label="操作时间"
          align="center"
          min-width="150"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus===0?'------':scope.row.UpdateDate}}</template>
        </el-table-column>
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
           min-width="150"
          :resizable="false"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name=""
          min-width="180"
          fixed="right"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleDetails(scope.$index, scope.row.OrderID)"
            >查看</el-button>
            <el-button
              :disabled="scope.row.OrderStatus===-1 || scope.row.OrderStatus===1"
              type="text"
              @click="handleUpdate(scope.$index,scope.row.OrderStatus,scope.row.SerialNumber ,scope.row.OrderID)"
            >{{scope.row.OrderStatus === 0 ? '接受' : '完成'}}</el-button>
            <el-button
              :disabled="scope.row.OrderStatus=== -1 || scope.row.OrderStatus===1"
              type="text"
              @click="onCancelOrder(scope.row.OrderID)"
            >取消</el-button>
            <!-- <el-button
              v-if="scope.row.OrderStatus!=0"
              type="text"
              style="color:#aaaaaa"
            >处理</el-button>
            <el-button
              v-if="scope.row.OrderStatus!=0"
              type="text"
              style="color:#aaaaaa"
            >取消</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 5px 0">
        <el-pagination
          background
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          :current-page="parseInt(tableData.current_page)"
          layout="total, sizes,prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <service-dialog
     ref="serviceDetail"
      :addEmpShow1.sync='addEmpShow1'
      :addEmpShow2.sync='addEmpShow2'
      :tableData='exportlist'
      :cleanDetais='cleanDetais'
    ></service-dialog>

    <!-- 取消订单 时备注 -->
    <el-dialog
      title="取消订单"
      :before-close="()=>{showCancelDialog=false;cancelRemark=''}"
      center
      :visible.sync="showCancelDialog">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="cancelRemark">
      </el-input>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="()=>{cancelRemark='';showCancelDialog=false}">取 消</el-button>
        <el-button type="primary" @click="onCancelOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { serviceList, serviceChange, serviceCancel, serviceDetail, receiveServiceOrder } from '@/api/room-relevant'
import ServiceDialog from '@/views/bookingService/roomServiceOrder/components/serviceDialog.vue'
export default {
  name: 'Basetable',
  components: {
    ServiceDialog
  },
  props: {
    tableData: {
      type: [Object, Array]
    },
    cleanstatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showCancelDialog: false, // 取消订单 备注 框
      cancelRemark: '', // 对取消订单备注
      addEmpShow1: false,
      addEmpShow2: false,
      exportlist: [],
      cleanDetais: [],
      keyword: '',
      value: '',
      multipleSelection: [], // 单个页面选中
      multipleSelectionAll: [], // 所有页面选中1`
      // eslint-disable-next-line camelcase
      multipleSelectionAll_l: [], // 所有页面选中
      idKey: 'OrderID',
      pageSizeList: [10, 20, 50, 100],
      pageSize: 10,
      delList: [],
      pageTotal: 0,
      nowPage: 1,
      pc: {
        Total: 0,
        PageCount: 10,
        PageNo: 1
      },
      maxHeight: 300,
      isClean: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.$refs.table.$el.offsetTop)
      this.maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 230
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 230
      }
    })
  },
  destroyed() {
    window.onresize = null
  },
  watch: {
    value(newVal, oldVal) {
      console.log(newVal)
      if ((newVal == '' || newVal == null) && !this.isClean && this.keyword == '' && this.$store.state.mumustore.isSeach) {
        this.$store.dispatch('mumustore/changeState', {
          key: 'isSeach',
          value: false
        })
        this.GetRoutineList(1)
      }
    },
    keyword(newVal, oldVal) {
      if (newVal == '' && !this.isClean && (this.value == '' || this.value == null) && this.$store.state.mumustore.isSeach) {
        this.$store.dispatch('mumustore/changeState', {
          key: 'isSeach',
          value: false
        })
        this.GetRoutineList(1)
      }
    }
  },

  methods: {
    async GetRoutineList(val) {
      console.log(this.cleanstatus)
      let data = {
        Limit: this.pageSize,
        Page: val
      }
      if (this.$store.state.mumustore.isSeach) {
        data.Search = this.keyword
        if (this.value != '' && this.value != null) {
          data.StartTime = this.value[0]
          data.EndTime = this.value[1]
        }
      }
      if (this.cleanstatus != 5) {
        data.OrderStatus = this.cleanstatus
        if (this.value != '' && this.value != null) {
          data.StartTime = this.value[0]
          data.EndTime = this.value[1]
        }
      }

      // eslint-disable-next-line default-case
      let result = await serviceList(data)
      this.isClean = false
      console.log(result)
      console.log('重新获取data')
      window.dispatchEvent(new CustomEvent('onRefreshRemind', {}))
      this.$emit('update:tableData', result.data)
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    cleanSearch() {
      this.isClean = true
      this.keyword = ''
      this.value = ''
      this.$store.dispatch('mumustore/changeState', {
        key: 'isSeach',
        value: false
      })
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.GetRoutineList(1)
    },
    addProduct() {
      this.changePageCoreRecordData()
      if (this.$store.state.mumustore.multipleSelectionAll.length == 0) {
        this.$message('请选择要操作的内容')
        return
      }
      if (this.$store.state.mumustore.multipleSelectionAll.length > 1000) {
        that.$message('导出数据不能超过1000条')
        return
      }
      this.exportlist = this.$store.state.mumustore.multipleSelectionAll
      console.log(this.$store.state.mumustore.multipleSelectionAll)
      this.addEmpShow1 = true
    },
    handleSearch() {
      if ((this.value == '' || this.value == null) && this.keyword == '') {
        this.$message('请设置搜索条件')
        return
      }
      this.$store.dispatch('mumustore/changeState', {
        key: 'isSeach',
        value: true
      })
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.GetRoutineList(1)
    },
    cleanSelect() {
      this.pageSize = 10
      this.keyword = ''
      this.value = ''
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.$store.dispatch('mumustore/changeState', {
        key: 'multipleSelectionAll',
        value: []
      })
    },
    // 查看详情
    async handleDetails(row, id) {
      let that = this
      let result = await serviceDetail({
        OrderID: id
      })
      if (result.code != 0) return
      this.cleanDetais = result.data
      console.log(this.cleanDetais)
      this.$nextTick(() => {
        this.$refs.serviceDetail.imgCount()
        this.addEmpShow2 = true
      })
    },
    // 修改状态
    handleUpdate(row, type, orderno, id) {
      let that = this
      if (type === 2) {
        this.$confirm(
          '确定要将此订单号为' + orderno + '改为已完成吗？',
          '提示',
          {
            type: 'warning'
          }
        )
          .then(result => {
            let OrderID = []
            OrderID.push(id)
            serviceChange({
              OrderIDs: OrderID,
              OperateOrderStatus: 1
            }).then(() => {
              that.GetRoutineList(this.nowPage)
              that.$message.success('订单已完成')
            })
              .catch(() => {
                console.log(12123)
              })
          })
          .catch(() => {
            console.log(12123)
          })
      } else if (type === 0) {
        this.$confirm('确定要接受该订单吗？', '提示', {
          type: 'warning'
        }).then(async () => {
          let res = await receiveServiceOrder(id)
          if (res.code === 0) {
            this.$message.success('订单已接受')
            this.GetRoutineList()
          }
        })
      }
    },
    /**
     * 取消订单
     * @param {Number} orderId
     */
    onCancelOrder(orderId) {
      if (!this.showCancelDialog) {
        this.cancelOrderId = orderId
        this.showCancelDialog = true
      } else {
        this.$confirm('确定要取消该订单吗？', '提示', {
          type: 'warning'
        })
          .then(result => {
            serviceCancel({
              OrderID: this.cancelOrderId,
              CancelOrderStatus: -1,
              CancelRemark: this.cancelRemark
            }).then(() => {
              this.cancelRemark = ''
              this.showCancelDialog = false
              this.GetRoutineList(this.nowPage)
              this.$message.success('订单已取消')
            })

          })
      }
    },
    // 设置选中的方法
    setSelectRow() {
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
      for (let i = 0; i < this.tableData.rows.length; i++) {
        if (selectAllIds.indexOf(this.tableData.rows[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData.rows[i], true)
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      console.log('记忆选择核心')
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        this.$store.dispatch('mumustore/changeState', {
          key: 'multipleSelectionAll',
          value: this.multipleSelectionAll
        })
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
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
      // 得到当前页没有选中的id
      this.tableData.rows.forEach(row => {
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
          this.$store.dispatch('mumustore/changeState', {
            key: 'multipleSelectionAll',
            value: this.multipleSelectionAll
          })
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      // this.$emit('update:tableData', [{ PartnerName: 6666, Tel: '13212312313' }])
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.GetRoutineList(1)
    },
    // 分页合伙人列表
    handleCurrentChange(val) {
      const that = this
      // eslint-disable-next-line camelcase
      this.nowPage = val
      this.changePageCoreRecordData()
      this.GetRoutineList(val)
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang='less'>
.handle-input {
  width: 300px;
  display: inline-block;
}
.page-container{
  min-width: 700px;
}
</style>
