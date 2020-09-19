<!--
 * @Author: your name
 * @Date: 2020-05-21 11:11:15
 * @LastEditTime: 2020-06-09 18:01:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\allorders\Allorders.vue
-->
<template>
  <div id='allorder_box'>
    <el-tabs
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="待处理">
        <header-tool
          v-if="checkStatus === 0"
          ref='headerTool'
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
        ></header-tool>
        <order-table
          v-if="checkStatus === 0"
          ref="table"
          :tableData="tableData"
          :tableHeight='tableHeight'
          :checkHandle='checkHandle'
          :finishHandle='finishHandle'
          :refundHandle='refundHandle'
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </order-table>
      </el-tab-pane>
      <el-tab-pane label="已完成">
        <header-tool
          v-if="checkStatus === 1"
          ref='headerTool'
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
        ></header-tool>
        <order-table
          v-if="checkStatus === 1"
          ref="table"
          :tableData="tableData"
          :tableHeight='tableHeight'
          :checkHandle='checkHandle'
          :finishHandle='finishHandle'
          :refundHandle='refundHandle'
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </order-table>
      </el-tab-pane>
      <el-tab-pane label="已取消">
        <header-tool
          v-if="checkStatus === 2"
          ref='headerTool'
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
        ></header-tool>
        <order-table
          v-if="checkStatus === 2"
          ref="table"
          :tableData="tableData"
          :tableHeight='tableHeight'
          :checkHandle='checkHandle'
          :finishHandle='finishHandle'
          :refundHandle='refundHandle'
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </order-table>
      </el-tab-pane>
      <el-tab-pane label="已退款">
        <header-tool
          v-if="checkStatus === 3"
          ref='headerTool'
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
        ></header-tool>
        <order-table
          v-if="checkStatus === 3"
          ref="table"
          :tableData="tableData"
          :tableHeight='tableHeight'
          :checkHandle='checkHandle'
          :finishHandle='finishHandle'
          :refundHandle='refundHandle'
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </order-table>
      </el-tab-pane>
      <el-tab-pane label="全部">
        <header-tool
          v-if="checkStatus === 4"
          ref='headerTool'
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
        ></header-tool>
        <order-table
          v-if="checkStatus === 4"
          ref="table"
          :tableData="tableData"
          :tableHeight='tableHeight'
          :checkHandle='checkHandle'
          :finishHandle='finishHandle'
          :refundHandle='refundHandle'
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </order-table>
      </el-tab-pane>
    </el-tabs>
    <common-check-dialog :dialogData='dialogData'></common-check-dialog>
    <export-dialog :exportTableData="exportTableData"></export-dialog>
  </div>
</template>
<script>
import HeaderTool from '@/views/supermarket/components/HeaderTool.vue'
import OrderTable from '@/views/supermarket/components/OrderTable.vue'
import Pagination from '@/components/Pagination'
import commonCheckDialog from '@/views/supermarket/components/CommonCheckDialog.vue'
import ExportDialog from '@/views/supermarket/components/CommonExportDialog.vue'
import { GetAllOrder, GetOneOrder, Check } from '@/api/supermarket.js'

export default {
  components: {
    HeaderTool,
    OrderTable,
    Pagination,
    commonCheckDialog,
    ExportDialog
  },
  data() {
    return {
      tableData: [],
      tableHeight: '0',
      checkStatus: 0,
      total: 88,
      currentPage: 1,
      pageSize: 20,
      dialogData: '测试数据',
      exportTableData: []
    }
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
      case '0':
        this.checkStatus = 0
        this.tableData = [
          {
            orderID: '000001',
            roomID: '0101',
            user: '蔡卓涛',
            phoneNum: '13055753890',
            servise: '便利店',
            cost: '30',
            state: '待配送',
            orderTime: '2020-04-03'
          }
        ]
        break
      case '1':
        this.checkStatus = 1
        this.tableData = [
          {
            orderID: '000002',
            roomID: '0102',
            user: '涛涛',
            phoneNum: '13055753890',
            servise: '送餐服务',
            cost: '28',
            state: '已完成',
            orderTime: '2020-04-04'
          }
        ]
        break
      case '2':
        this.checkStatus = 2
        this.tableData = [
          {
            orderID: '000003',
            roomID: '0103',
            user: 'customerTao',
            phoneNum: '13055753890',
            servise: '土特产',
            cost: '30',
            state: '已取消',
            orderTime: '2020-04-04'
          }
        ]
        break
      case '3':
        this.checkStatus = 3
        this.tableData = [
          {
            orderID: '000004',
            roomID: '0104',
            user: 'Taotao',
            phoneNum: '13055753890',
            servise: '情趣用品',
            cost: '30',
            state: '已退款',
            orderTime: '2020-04-05'
          }
        ]
        break
      case '4':
        this.checkStatus = 4
        this.tableData = [
          {
            orderID: '000006',
            roomID: '0106',
            user: '濤濤',
            phoneNum: '13055753890',
            servise: '土特产',
            cost: '30',
            state: '代发货',
            orderTime: '2020-04-06'
          }
        ]
        break
      default:
        break
      }
    },
    searchHandle() {
      // TODO 查询
      console.log(this.$refs.headerTool)
      console.log('这是父组件传入的search')
      let searchText = this.$refs.headerTool.searchText
      let [startTime, endTime] = this.$refs.headerTool.orderTime
      console.log(startTime, endTime)
    },
    exportHandle() {
      // TODO 导出
      console.log(this.$refs.table.multipleSelection)
      console.log('这是父组件传入的export')
      this.$store.dispatch('dialog/changeState', {
        key: 'commonExportDialogState',
        value: true
      })
    },
    resetHandle() {
      // TODO 重新获取 全部数据
      console.log('这是父组件传入的reset')
    },
    async checkHandle(val) {
      // TODO 查看事件
      this.$store.dispatch('dialog/changeState', {
        key: 'commonCheckDialogState',
        value: true
      })
      let res = await GetOneOrder()
      this.dialogData = res.data
      console.log('这是父组件传入的查看事件')
      console.log(val.orderID)
    },
    async finishHandle(val) {
      // TODO 完成事件
      console.log('这是父组件传入的完成事件')
      console.log(val)
      let res = await Check()
      this.tableData = res.data.rows
    },
    refundHandle(val) {
      // TODO 退款事件
      console.log('这是父组件传入的退款事件')
      console.log(val)
    },
    pageChange() {
      console.log(this.pageSize, this.currentPage)
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 220
      window.onresize = () => {
        this.tableHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 220
        console.log(this.$refs.table.$el.offsetTop)
      }
    })
  },
  created() {
    // // TODO 读取数据
    let res = GetAllOrder()
    console.log(res,79)
    this.tableData = res.data.rows
    this.currentPage = res.data.current_Page
    this.total = res.data.total
    this.$on('test', () => {
      console.log('触发test')
    })
  }
}
</script>

<style lang="less" scoped>
#allorder_box {
  width: 100%;
  padding: 10px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}
</style>


