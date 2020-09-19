<!--
 * @Author: your name
 * @Date: 2020-05-25 17:25:22
 * @LastEditTime: 2020-06-05 14:48:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\repertory\Repertory.vue
-->
<template>
  <div id='repertory_box'>
    <div class="btn-box">
        <el-input
          v-model="searchText"
          class="searchTextinput"
          placeholder="输入商品编号/商品名称/商品类别"
        />
        <el-button
          type="primary"
          slot="reference"
          @click="searchbtn"
        >
        查询
        </el-button>
        <el-button
          type="primary"
          @click="resetHandle"
        >
        重置
        </el-button>
        <el-button
          @click="exporting"
          type="primary"
        >
        批量导出
        </el-button>
    </div>
    <repertory-table
      @exportingtable="exportingtable"
      :tableData="tableData"
      :tableHeight="tableHeight"
      ref='table'
    >
      <template #page>
        <Pagination
          :total='total'
          :page.sync='currentPage'
          :limit.sync='pageSize'
          @pagination='pageChange'
        ></Pagination>
      </template>
    </repertory-table>
    <Exportdialog
      :exportTableData='Exportdialog'
    >
    </Exportdialog>
  </div>
</template>
<script>

import RepertoryTable from '@/views/supermarket/components/RepertoryTable.vue'
import Pagination from '@/components/Pagination'
import Exportdialog from '@/views/supermarket/repertory/components/RepairExportDialog.vue'
import { 
  hotelGoods,//库存列表
  } from '@/api/supermarket.js'
export default {
  components: { RepertoryTable, Pagination , Exportdialog},
  data() {
    return {
      activeNames: ['1'],
      Exportdialog:[],//table选中数据
      searchText: '',
      total: 88,
      currentPage: 1,
      pageSize: 20,
      tableData: [
      ],
      tableHeight: 300,
      dialogTabelData: []
    }
  },
  created(){
    this.getdata()
  },
  methods: {
    exporting() {//导出
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
    exportingtable(item){//table选中数据变动
      this.Exportdialog=item
    },
    getdata(Search,Page,Limit){
      hotelGoods({
          Search:Search==undefined?null:Search,
          Page:Page==undefined?'':Page,
          Limit:Limit==undefined?'':Limit,
        })
        .then( (res) =>{
          this.tableData=res.data.rows
        })
    },
    searchbtn() {//查询
      this.getdata(this.searchText)
    },
    pageChange() {
      console.log(this.pageSize, this.currentPage)
    },
    resetHandle() {
      this.searchText = ''
      this.getdata()
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.tableHeight =
    //     window.innerHeight - this.$refs.table.$el.offsetTop - 184
    //   window.onresize = () => {
    //     this.maxHetableHeightight =
    //       window.innerHeight - this.$refs.table.$el.offsetTop - 184
    //   }
    // })
  }
}
</script>

<style lang="less">
#repertory_box {
  padding: 20px;

  .el-button {
    margin-left: 10px;
  }
  .btn-box{
    width: 60%;
    display: flex;
    padding-bottom: 20px;
    .searchTextinput{
      width: 250px;
      height: 40px !important;
    }
  }
}
</style>
