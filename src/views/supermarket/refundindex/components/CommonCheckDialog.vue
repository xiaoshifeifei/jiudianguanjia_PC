<template>
  <div id="common_check_dialog">
    <el-dialog
      title="查看详情"
      :visible.sync="dialogVisible"
       width="50%"
      :before-close="handleClose"
    >
      <div  class="item-box">
        <h3 class="item-title">基本信息</h3>
        <el-table
          :data="formatList"
          border
          style="width: 100%;marginTop:25px">
          <el-table-column
            prop="OrderSerialNo"
            align="center"
            label="订单号"
          >
          </el-table-column>
          <el-table-column
            label="订单类型"
            align="center"
          >
          <template slot-scope="scope">
            <span>{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':'土特产'}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="RoomNumber"
            align="center"
            label="房间号">
          </el-table-column>
          <el-table-column
            label="用户信息"
            align="center"
          >
          <template slot-scope="scope">
            <span>{{scope.row.UserName}}/{{scope.row.tel}}18088888888</span>
          </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="formatList"
          border
          style="width: 100%;marginTop:5px">
          <el-table-column
            prop="name"
            label="订单状态"
            align="center"
          >
          <template slot-scope="scope">
            <span>{{scope.row.OrderStatus==-2?"报损":scope.row.OrderStatus==-1?'已取消':scope.row.OrderStatus==1?'已确认/已下单':scope.row.OrderStatus==2?'已发货':
              scope.row.OrderStatus==3?'已签收/已完成':scope.row.OrderStatus==4?'最终完成':scope.row.OrderStatus==5?'已接单':'已结算'
              }}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="CreateDate"
            align="center"
            label="下单时间">
          </el-table-column>
          <el-table-column
            prop="RefundDate"
            align="center"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="UserName"
            align="center"
            label="操作人">
          </el-table-column>
        </el-table>
      </div>
      <div  class="item-box">
        <h3 class="item-title" style="marginTop:25px">商品信息</h3>
        <el-table
          :data="dialogData.orderDetail"
          border
          style="width: 100%;marginTop:25px">
          <el-table-column
            prop="OrderSerialNo"
            align="center"
            label="商品图片"
          >
          <template slot-scope="scope">
            <el-image
            :src="scope.row.GoodsCoverUrl"
            style="width: 50px; height: 50px"
            ></el-image>
          </template>
          </el-table-column>
          <el-table-column
            prop="GoodsName"
            align="center"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="Price"
            align="center"
            label="价格（￥）"
          >
          </el-table-column>
          <el-table-column
            prop="GoodsCount"
            align="center"
            label="数量"
          >
          <template slot-scope="scope">
            <span>{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':'土特产'}}</span>
          </template>
          </el-table-column>
          <el-table-column
            label="小计（￥）"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.Price*scope.row.GoodsCount}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="msg-box">
          <div class="msg-item">
            <p>优惠抵扣：{{dialogData.SendCash}}</p>
            <p>配送费：{{dialogData.SendCash}}</p>
            <p>应付合计：<span>${{dialogData.ActuallyPay}}</span></p>
          </div>
      </div>
      <div class="text-box">
        <h3 style="color:#000;marginBottom:10px">备注信息:</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. .
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="finish">同意</el-button>
        <el-button type="primary" @click="refund">拒绝</el-button>
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    'el-image-viewer': () =>
      import('element-ui/packages/image/src/image-viewer')
  },
  props: {
    dialogData: {
      type: [Object, String, Array],
      default() {
        return {
        }
      }
    },
    checkStatus: {
      type: Number,
      default: 0
    },
    checkStatus2: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgURL: '',
      previewState: false,
      formatList:[
      ],//列表数据

    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.commonCheckDialogState
    }
  },
  watch: {
    dialogData() {
      this.formatList.splice(0,1,this.dialogData)
    }
  },
  mounted() {
     this.formatList.splice(0,1,this.dialogData)
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'commonCheckDialogState',
        value: false
      })
    },
    finish(){//接单
      this.$emit('finish',this.dialogData.OrderID)
    },
    refund(){//拒绝
      this.$emit('refund',this.dialogData.OrderID)
    },
    finish2(){//完成
      this.$emit('finish2',this.dialogData.OrderID)
    },
    refund2(){//退款
      this.$emit('refund2',this.dialogData.OrderID)
    },
    previewImg(val) {
      this.imgURL = val
      this.previewState = true
    },
  },
}
</script>

<style lang="less">
#common_check_dialog {
  .el-dialog {
    .item-box{
      width: 100%;
      height: auto;
      margin-bottom: 5px;
      h3{
        font-size: 16px;
      }
    }
    .msg-box{
      width: 100%;
      height: 70px;
      margin-top: 20px;
      .msg-item{
        width: 150px;
        height: 100%;
        float: right;
        p{
          font-size: 15px;
          margin-bottom: 10px;
          span{
            font-size: 16px;
            font-weight: 600;
            color: red;
          }
        }
      }
    }
    .text-box{
        margin-top: 20px;
        width: 100%;
        min-height: 100px;
        padding: 10px;
        border: 1px solid #c6c6c6;
        border-radius: 9px;
        color: #000;
    }
    .btn-box{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-around;
      padding: 0 270px;
      margin-top: 30px;
    }
  }
}
</style>
