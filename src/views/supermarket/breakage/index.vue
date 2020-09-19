<!--
 * @Author: your name
 * @Date: 2020-05-25 17:28:52
 * @LastEditTime: 2020-05-28 14:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\breakage\Breakage.vue
-->
<template>
  <div id='breakage_box'>
    <el-tabs
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="便利店">
        <header-tool
          v-if="checkStatus === 0"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createBreakageHandle="createBreakageHandle"
        ></header-tool>
        <breakage-table
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
        </breakage-table>
      </el-tab-pane>
      <el-tab-pane label="送餐服务">
        <header-tool
          v-if="checkStatus === 1"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createBreakageHandle="createBreakageHandle"
        ></header-tool>
        <breakage-table
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
        </breakage-table>
      </el-tab-pane>
      <el-tab-pane label="土特产">
        <header-tool
          v-if="checkStatus === 2"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createBreakageHandle="createBreakageHandle"
        ></header-tool>
        <breakage-table
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
        </breakage-table>
      </el-tab-pane>
      <el-tab-pane label="情趣用品">
        <header-tool
          v-if="checkStatus === 3"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createBreakageHandle="createBreakageHandle"
        ></header-tool>
        <breakage-table
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
        </breakage-table>
      </el-tab-pane>
      <el-tab-pane label="全部">
        <header-tool
          v-if="checkStatus === 4"
          ref='headerTool'
          :tools="tools"
          :searchHandle='searchHandle'
          :exportHandle='exportHandle'
          :resetHandle='resetHandle'
          :createBreakageHandle="createBreakageHandle"
        ></header-tool>
        <breakage-table
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
        </breakage-table>
      </el-tab-pane>
    </el-tabs>
    <create-breakage-dialog></create-breakage-dialog>
    <break-check-dialog></break-check-dialog>
    <export-dialog :exportTableData="exportTableData"></export-dialog>
  </div>
</template>

<script>
import HeaderTool from '@/views/supermarket/components/HeaderTool.vue'
import CreateBreakageDialog from '@/views/supermarket/components/CreateBreakageDialog.vue'
import BreakageTable from '@/views/supermarket/components/BreakageTable.vue'
import BreakCheckDialog from '@/views/supermarket/components/BreakCheckDialog.vue'
import Pagination from '@/components/Pagination'
import ExportDialog from '@/views/supermarket/components/BreakageExportDialog.vue'

export default {
  components: {
    HeaderTool,
    CreateBreakageDialog,
    BreakageTable,
    BreakCheckDialog,
    Pagination,
    ExportDialog
  },
  data() {
    return {
      tools: {
        searchInput: false,
        breakageSearchInput: true,
        breakageBtn: true,
        operateTime: true,
        searchBtn: true,
        resetBtn: true,
        exportBtn: true,
        orderTime: false
      },
      tableHeight: '0',
      formatTableData: [],
      checkStatus: 0,
      tableData: [
        {
          orderID: '0001',
          goods: '可乐*1,雪碧*1,芬达*1,王老吉*1,焦糖玛奇朵*1',
          type: '便利店',
          state: '报损【破损】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0002',
          goods: '佛跳墙*1,五香卷*1,醉排骨*1,香米饭*1,双层吉士巨无霸*1',
          type: '送餐服务',
          state: '报损【破损】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0003',
          goods: '鱿鱼干*1,干贝*1,鱿鱼丝*1,对虾*1',
          type: '土特产',
          state: '报损【破损】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0004',
          goods: '可乐*1,雪碧*1,芬达*1,王老吉*1,焦糖玛奇朵*1',
          type: '便利店',
          state: '报损【破损】',
          operateTime: '2020-04-22 11:30'
        },
        {
          orderID: '0005',
          goods: '杜蕾斯*1,润滑油*1',
          type: '情趣用品',
          state: '报损【破损】',
          operateTime: '2020-04-22 11:30'
        }
      ],
      total: 88,
      currentPage: 1,
      pageSize: 20,
      exportTableData: [
        {
          orderID: '0005',
          goods: '杜蕾斯*1,润滑油*1',
          type: '情趣用品',
          state: '报损【破损】',
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
        key: 'breakExportDialogState',
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
        key: 'breakCheckDialogState',
        value: true
      })
    },
    createBreakageHandle() {
      this.$store.dispatch('dialog/changeState', {
        key: 'createBreakageDialogState',
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
#breakage_box {
  width: 100%;
  padding: 10px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}
</style>
