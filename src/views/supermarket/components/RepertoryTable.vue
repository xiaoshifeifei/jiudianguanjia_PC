<!--
 * @Author: your name
 * @Date: 2020-05-27 10:08:08
 * @LastEditTime: 2020-05-27 14:36:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\repertoryTable.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :height="tableHeight"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="GoodsNumber"
        label="商品编号"
        align="center"
        width="200"
        :resizable="false"
      />
      <el-table-column
        prop="GoodsName"
        label="商品名称"
        width="200"
        align="center"
        :resizable="false"
      />
      <el-table-column
        label="规格"
        width="90"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <!-- <span>{{scope.row.SkuInfo==undefined?'':scope.row.SkuInfo[0].cate}}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="brand"
        label="商品类别"
        width="180"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':scope.row.BelongModule==2?'餐饮服务':'土特产'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="SupplierName"
        label="供应商"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="RealNum"
        label="入库数量"
        width="160"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="SoldCount"
        label="销售出库数量"
        width="120"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="RecoveryCount"
        label="报损出库数量"
        width="120"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="StockCount"
        label="剩余库存"
        width="180"
        align="center"
        sortable
        :resizable="false"
      />
      <el-table-column
        label="操作"
        align="center"
        fixed='right'
        width="130"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
            @click="check(scope.row)"
            type="text"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <slot name='page'></slot>
  <repertory-check-dialog 
  :dialogTabelData="dialogTabelData"
  @selectvaluefun="selectvaluefun"
  >
  </repertory-check-dialog>
  </div>
</template>

<script>
import RepertoryCheckDialog from '@/views/supermarket/repertory/components/RepertoryCheckDialog.vue'
import { 
  hotelDetail,//库存明细
  } from '@/api/supermarket.js'
export default {
  props: {
    tableData: {
      default: () => []
    },
    tableHeight: {
      type: [String, Number],
      default: '10'
    }
  },
  components: { RepertoryCheckDialog },
  data() {
    return {
      dialogTabelData:'',
      selectvalue:1,
      HotelGoodsSkuID:''
    }
  },
  methods: {
    check(val) {
      this.HotelGoodsSkuID=val.HotelGoodsSkuID
      hotelDetail({
        OrderType:this.selectvalue,
        HotelGoodsSkuID:val.HotelGoodsSkuID,
        Page:1,
        Limit:10
      }).then( (res)=>{
        this.dialogTabelData=res.data.rows
      })
      this.$store.dispatch('dialog/changeState', {
        key: 'repertoryCheckDialogState',
        value: true
      })
    },
    handleSelectionChange(val) {
      this.$emit('exportingtable',val)
    },
    selectvaluefun(val){
      this.selectvalue=val
      hotelDetail({
        OrderType:this.selectvalue,
        HotelGoodsSkuID:this.HotelGoodsSkuID,
        Page:1,
        Limit:10
      }).then( (res)=>{
        this.dialogTabelData=res.data.rows
      })
      this.$store.dispatch('dialog/changeState', {
        key: 'repertoryCheckDialogState',
        value: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
