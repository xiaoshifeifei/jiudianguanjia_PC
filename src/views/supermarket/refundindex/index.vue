<template>
  <div id='conveniencestore_box'>
    <el-tabs
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="待审核">
        <header-tool
          v-if="checkStatus === 0"
          ref='headerTool'
          @searchbtn='searchbtn'
          @exporting='exportingheader'
          @reset='reset'
          @createRepair='createRepair'
        ></header-tool>
        <order-table
          v-if="checkStatus === 0"
          ref="table"
          :tableData="tableData"
          :checkStatus='checkStatus'
          :checkStatus2='checkStatus2'
          @exportingtable="exportingtable"
          @reset='reset'
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
      <el-tab-pane label="已同意待平台审核">
        <header-tool
          v-if="checkStatus === 1"
          ref='headerTool'
          @searchbtn='searchbtn'
          @exporting='exportingheader'
          @reset='reset'
          @createRepair='createRepair'
        ></header-tool>
        <order-table
          v-if="checkStatus === 1"
          ref="table"
          :tableData="tableData"
          :checkStatus='checkStatus'
          :checkStatus2='checkStatus2'
          @exportingtable="exportingtable"
          @reset='reset'
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
          v-if="checkStatus === 2"
          ref='headerTool'
          @searchbtn='searchbtn'
          @exporting='exportingheader'
          @reset='reset'
          @createRepair='createRepair'
        ></header-tool>
        <order-table
          v-if="checkStatus === 2"
          ref="table"
          :tableData="tableData"
          :checkStatus='checkStatus'
          :checkStatus2='checkStatus2'
          @exportingtable="exportingtable"
          @reset='reset'
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
      <el-tab-pane label="已拒绝">
        <header-tool
          v-if="checkStatus === -1"
          ref='headerTool'
          @searchbtn='searchbtn'
          @exporting='exportingheader'
          @reset='reset'
          @createRepair='createRepair'
        ></header-tool>
        <order-table
          v-if="checkStatus === -1"
          ref="table"
          :tableData="tableData"
          :checkStatus='checkStatus'
          :checkStatus2='checkStatus2'
          @exportingtable="exportingtable"
          @reset='reset'
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
    <Exportdialog
      :exportTableData='Exportdialog'
    >
    </Exportdialog>
    <CreateRepairDialog :repairdata='repairdata'></CreateRepairDialog>
  </div>
</template>
<script>
import HeaderTool from '@/views/supermarket/refundindex/components/header.vue'
import OrderTable from '@/views/supermarket/refundindex/components/table.vue'
import Pagination from '@/components/Pagination'
import { refundIndex } from '@/api/supermarket.js'
import Exportdialog from '@/views/supermarket/components/BreakageExportDialog.vue'
import CreateRepairDialog from '@/views/supermarket/components/CreateRepairDialog.vue'
export default {
  components: {
    HeaderTool,
    OrderTable,
    Pagination,
    Exportdialog,
    CreateRepairDialog
  },
  data() {
    return {
      tableData: [],
      multipleSelectionAll: [], // 选中数据
      checkStatus: 0,//table切换
      checkStatus2:7,
      total: 0,//数据总数
      currentPage: 1,
      pageSize: 10,
      Exportdialog:[],//table选中数据
      valtext:null,//关键词
      StartTime:null,//开始时间
      EndTime:null,//结束时间
      repairdata:1,//补单模块
    }
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
      case '0'://待处理
        this.checkStatus = 0
        this.getData(0)
        break
      case '1'://已同意待平台审核
        this.checkStatus = 1
        this.getData(1)
        break
      case '2'://已退款
        this.checkStatus = 2
        this.getData(2)
        break
      case '3'://:已拒绝
        this.checkStatus = -1
        this.getData(-1)
        break
      default:
        break
      }
    },
    searchbtn(valtext,valtime) {//查询
      this.getData(this.checkStatus,valtext,valtime[0],valtime[1])
    },
    reset() {//重置查询/刷新页面
      this.getData(this.checkStatus)
    },
    exportingheader() {//header组件触发导出
      if(this.Exportdialog.length==0){
        this.$message('请选择要操作的内容')
        return
      }else{
        this.$store.dispatch('dialog/changeState', {
          key: 'breakExportDialogState',
          value: true
        })
      }
    },
    exportingtable(item){//table组件触发选中数据变动
      this.Exportdialog=item
    },
    createRepair(){//header组件触发的新建补单
      this.repairdata=1
      this.$store.dispatch('dialog/changeState', {
        key: 'createRepairDialogState',
        value: true
      })
    },
    pageChange(item) {
      this.getData(this.checkStatus,this.valtext,this.StartTime,this.EndTime,this.currentPage,this.pageSize)
    },
    getData(tag,Search,StartTime,EndTime,Page,Limit){//获取列表数据
      refundIndex({
            Status:tag==undefined?null:tag,
            Search:Search==undefined?null:Search,
            StartTime:StartTime==undefined?null:StartTime,
            EndTime:EndTime==undefined?null:EndTime,
            Page:Page==undefined?1:Page,
            Limit:Limit==undefined?10:Limit,
      }).then( (res) => {
        this.tableData = res.data.rows
        this.total=res.data.total
      })
    }
  },
  mounted() {

  },
  created() {
    // 首页获取待处理订单列表数据
    this.getData(0)
  }
}
</script>

<style lang="less" scoped>
#conveniencestore_box {
  width: 100%;
  padding: 10px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}
</style>