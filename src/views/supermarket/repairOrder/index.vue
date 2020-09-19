<!--
 * @Author: your name
 * @Date: 2020-05-26 16:10:47
 * @LastEditTime: 2020-05-28 15:08:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\repairOrder\index.vue
-->
<template>
  <div id='repair_box'>
    <el-tabs type="border-card">
      <el-tab-pane label="便利店">
        <header-tool
          v-if="checkStatus === 0"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createRepairHandle="createRepairHandle"
        ></header-tool>
        <repair-table
          v-if="checkStatus === 0"
          ref="table"
          :tableData="formatTableData"
          :tableHeight='tableHeight'
          :removeHandle="removeHandle"
          :checkHandle="checkHandle"
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </repair-table>
      </el-tab-pane>
      <el-tab-pane label="送餐服务">
        <header-tool
          v-if="checkStatus === 1"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createRepairHandle="createRepairHandle"
        ></header-tool>
        <repair-table
          v-if="checkStatus === 1"
          ref="table"
          :tableData="formatTableData"
          :tableHeight='tableHeight'
          :removeHandle="removeHandle"
          :checkHandle="checkHandle"
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </repair-table>
      </el-tab-pane>
      <el-tab-pane label="土特产">
        <header-tool
          v-if="checkStatus === 2"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createRepairHandle="createRepairHandle"
        ></header-tool>
        <repair-table
          v-if="checkStatus === 2"
          ref="table"
          :tableData="formatTableData"
          :tableHeight='tableHeight'
          :removeHandle="removeHandle"
          :checkHandle="checkHandle"
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </repair-table>
      </el-tab-pane>
      <el-tab-pane label="情趣用品">
        <header-tool
          v-if="checkStatus === 3"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createRepairHandle="createRepairHandle"
        ></header-tool>
        <repair-table
          v-if="checkStatus === 3"
          ref="table"
          :tableData="formatTableData"
          :tableHeight='tableHeight'
          :removeHandle="removeHandle"
          :checkHandle="checkHandle"
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </repair-table>
      </el-tab-pane>
      <el-tab-pane label="全部">
        <header-tool
          v-if="checkStatus === 4"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createRepairHandle="createRepairHandle"
        ></header-tool>
        <repair-table
          v-if="checkStatus === 4"
          ref="table"
          :tableData="formatTableData"
          :tableHeight='tableHeight'
          :removeHandle="removeHandle"
          :checkHandle="checkHandle"
        >
          <template #page>
            <Pagination
              :total='total'
              :page.sync='currentPage'
              :limit.sync='pageSize'
              @pagination='pageChange'
            ></Pagination>
          </template>
        </repair-table>
      </el-tab-pane>
    </el-tabs>
    <create-repair-dialog></create-repair-dialog>
    <repair-check-dialog></repair-check-dialog>
    <export-dialog :exportTableData="exportTableData"></export-dialog>
  </div>
</template>

<script>
import HeaderTool from '@/views/supermarket/components/HeaderTool.vue'
import CreateRepairDialog from '@/views/supermarket/components/CreateRepairDialog.vue'
import RepairTable from '@/views/supermarket/components/RepairTable.vue'
import RepairCheckDialog from '@/views/supermarket/components/RepairCheckDialog.vue'
import Pagination from '@/components/Pagination'
import ExportDialog from '@/views/supermarket/components/RepairExportDialog.vue'

export default {
  components: {
    HeaderTool,
    CreateRepairDialog,
    RepairTable,
    RepairCheckDialog,
    Pagination,
    ExportDialog
  },
  data() {
    return {
      tools: {
        searchInput: false,
        breakageSearchInput: true,
        breakageBtn: false,
        operateTime: true,
        searchBtn: true,
        resetBtn: true,
        exportBtn: true,
        orderTime: false,
        repairBtn: true
      },
      tableHeight: '0',
      formatTableData: [],
      tableData: [
        {
          orderID: '0001',
          goods: '可乐*1,雪碧*1,芬达*1,王老吉*1,焦糖玛奇朵*1',
          type: '便利店',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0002',
          goods: '佛跳墙*1,五香卷*1,醉排骨*1,香米饭*1,双层吉士巨无霸*1',
          type: '送餐服务',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0003',
          goods: '鱿鱼干*1,干贝*1,鱿鱼丝*1,对虾*1',
          type: '土特产',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0004',
          goods: '可乐*1,雪碧*1,芬达*1,王老吉*1,焦糖玛奇朵*1',
          type: '便利店',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0005',
          goods: '杜蕾斯*1,润滑油*1',
          type: '情趣用品',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        }
      ],
      total: 88,
      checkStatus: 0,
      currentPage: 1,
      pageSize: 20,
      exportTableData: [
        {
          orderID: '0005',
          goods: '杜蕾斯*1,润滑油*1',
          type: '情趣用品',
          state: '已付款【微信】',
          operateTime: '2020-04-22 11:30'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
      case '0':
        this.checkStatus = 0
        break
      case '1':
        this.checkStatus = 1
        break
      case '2':
        this.checkStatus = 2
        break
      case '3':
        this.checkStatus = 3
        break
      case '4':
        this.checkStatus = 4
        break
      default:
        break
      }
    },
    searchHandle() {
      // TODO 查询
      console.log(this.$refs.headerTool.orderText)
      console.log('这是父组件传入的search')
      let searchText = this.$refs.headerTool.orderText
      let [startTime, endTime] = this.$refs.headerTool.operateTime
      console.log(searchText, startTime, endTime)
    },
    exportHandle() {
      // TODO 导出
      console.log(this.$refs.table.multipleSelection)
      console.log('这是父组件传入的export')
      this.$store.dispatch('dialog/changeState', {
        key: 'repairExportDialogState',
        value: true
      })
    },
    resetHandle() {
      // TODO 重新获取 全部数据
      console.log('这是父组件传入的reset')
    },
    removeHandle(val) {
      console.log(val)
    },
    checkHandle(val) {
      console.log(val)
      this.$store.dispatch('dialog/changeState', {
        key: 'repairCheckDialogState',
        value: true
      })
    },
    createRepairHandle() {
      this.$store.dispatch('dialog/changeState', {
        key: 'createRepairDialogState',
        value: true
      })
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
        this.maxHetableHeightight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 220
      }
    })
    this.tableData.forEach((item, index, arr) => {
      if (item.goods.length > 14) {
        arr[index].goods = arr[index].goods.substr(0, 14) + '...'
      }
    })
    this.formatTableData = this.tableData
  }
}
</script>

<style lang="less" scoped>
#repair_box {
  width: 100%;
  padding: 10px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}
</style>
