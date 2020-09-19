<template>
  <div class="app-container">
    <div class="fsbw m-b15" ref="tableTop">
      <div class="fclw" style="width:calc(100% - 94px);">
        <div class="fcl m-r7 m-t6">
          <div>订单状态</div>
          <el-select v-model="orderStatus" clearable placeholder="审核状态" class="w110">
            <el-option label="全部状态" value="-1"></el-option>
            <el-option label="已支付" value="1"></el-option>
            <el-option label="待支付" value="2"></el-option>
            <el-option label="待退款" value="3"></el-option>
            <el-option label="已退款" value="4"></el-option>
          </el-select>
        </div>
        <!-- <el-input
          v-model="keyword"
          clearable
          placeholder="标题/作者/操作人员"
          class="m-r7 m-t6"
          style="width:280px;"
        ></el-input> -->
        <el-button type="primary" class="golbal-btn m-t6" @click="handleSearch">查询</el-button>
      </div>
      <div class="fcc h46">
        <el-button type="primary" class="golbal-btn m-t6 w84">批量导出</el-button>
      </div>
    </div>
    <el-table
      :max-height="tableHeight"
      :data="tableData"
      border
      fit
      ref="table"
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="结算时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salesAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="正常订单总量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补单总额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.repairOrderAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退货总额" align="center">
        <template slot-scope="{row}">
          <span>{{row.returnTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="挂账总额" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.accountTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="酒店自营总额" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.hotelSelfTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算状态" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.settlementTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.operationTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.operator}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template>
          <span class="c_p golbal-btn-text">结算</span>
          <span class="c_p golbal-btn-text m-l6">导出订单</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      orderStatus: '', // 订单状态
      keyword: '', // 搜索关键字
      tableData: [
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        },
        {
          orderTime: '2020/3/26 20:22',
          salesAmount: '￥60',
          orderTotal: 60,
          repairOrderAmount: '$10',
          returnTotal: 60,
          accountTotal: '$90',
          hotelSelfTotal: '￥80',
          settlementTotal: '未结算',
          operationTime: '2020/4/27/10:22',
          operator: '蔡卓超'
        }
      ], // 表格数据
      tableHeight: 0, // 表格高度
      total: 50, // 总数
      page: 1, // 页码
      limit: 20 // 一页几条
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.tableTop.offsetHeight - 196 + 'px'
      // 监听窗口大小变化
      let self = this
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.tableTop.offsetHeight - 196 + 'px'
      }
    })
  },
  methods: {
    // 搜索按钮
    handleSearch() {
      console.log(1)
    },
    // ids.push被选中的ID
    handleSelectionChange(val) {
      console.log(11111)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
