<!--
 * @Author: your name
 * @Date: 2020-05-27 10:08:25
 * @LastEditTime: 2020-05-27 15:20:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\repertoryDialog.vue
-->
<template>
  <div id='repertory_dialog'>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
    <div class="btn-box">
      <el-select v-model="selectvalue" placeholder="请选择" @change="selectvaluefun">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- <el-button
        @click="exporting"
        type="primary"
      >
      批量导出
      </el-button> -->
    </div>
    <el-table
      :data='dialogTabelData'
      border
      height="55vh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="OrderSerialNo"
        label="订单编号"
        align="center"
        width="220"
        :resizable="false"
      />
      <el-table-column
        prop="GoodsNumber"
        label="商品编号"
        width="220"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="GoodsName"
        label="商品名称"
        width="220"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="signID"
        label="商品类别"
        width="165"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':scope.row.BelongModule==2?'餐饮服务':'土特产'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="SupplierName"
        label="供应商/用户"
        width="215"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="Count"
        label="数量"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="CreateDate"
        label="时间"
        width="220"
        align="center"
        :resizable="false"
      />
    </el-table>
    <Pagination
      :total='total'
      :page.sync='currentPage'
      :limit.sync='pageSize'
      @pagination='pageChange'
    ></Pagination>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="handleClose"
        class="golbal-btn"
      >确 定</el-button>
    </div>
    </el-dialog>
    <!-- <Exportdialog
    :exportTableData='Exportdialog2'
    >
    </Exportdialog> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import Exportdialog from '@/views/supermarket/repertory/components/RepairExportDialog.vue'
export default {
  components: {
    Pagination,
    // Exportdialog
  },
  props: {
    dialogTabelData: {
      type: [String, Array]
    }
  },
  data() {
    return {
      popoverVisible: false,
      signTime: '',
      searchText: '',
      tableHeight: '',
      total: 88,
      currentPage: 1,
      pageSize: 20,
      // Exportdialog2:[],
      selectvalue:1,
        options: [{
          value: 1,
          label: '铺货入库'
        }, {
          value: 2,
          label: '销售出库'
        }, {
          value: 3,
          label: '报损出库'
        }],
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.repertoryCheckDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'repertoryCheckDialogState',
        value: false
      })
    },
    pageChange() {
      console.log(this.pageSize, this.currentPage)
    },
    selectvaluefun(){
      this.$emit('selectvaluefun',this.selectvalue)
    },
    // exporting() {//导出
    //   if(this.Exportdialog2.length==0){
    //     this.$message('请选择要操作的内容')
    //     return
    //   }else{
    //     this.$store.dispatch('dialog/changeState', {
    //       key: 'breakExportDialogState',
    //       value: true
    //     })
    //   }
    // },
    handleSelectionChange(item){//table选中数据变动
      this.Exportdialog2=item
    },
  }
}
</script>

<style lang="less">
#repertory_dialog {
  .el-dialog {
    margin: 5vh auto !important;
    height: 90vh;
    min-height: 90vh;
    .el-dialog__body {
      height: calc(90vh - 30px - 62px);
    }
    .btn-box{
      display: flex;
      align-items: center;
    }
  }
}
</style>
