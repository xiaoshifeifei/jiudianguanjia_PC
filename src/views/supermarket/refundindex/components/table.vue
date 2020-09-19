<!--
 * @Author: your name
 * @Date: 2020-05-22 10:03:06
 * @LastEditTime: 2020-05-29 09:29:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\OrderTable.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :height="maxhight"
      @selection-change="handleSelectionChange"
      ref="table"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="OrderSerialNo"
        label="订单号"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="RoomNumber"
        label="房间号"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="UserName"
        label="用户信息"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span>{{scope.row.serName}}/{{scope.row.phoneNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="金额"
          prop="TotalPrice"
          align="center"
          :resizable="false"
      />
      <el-table-column
        prop="CreateDate"
        label="申请时间"
        align="center"
        :resizable="false"
      />
      <el-table-column
          label="状态"
          align="center"
          :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.RecordStatus==-12?"退款关闭":scope.row.RecordStatus==-2?'退款被驳回':scope.row.RecordStatus==-1?'用户取消退款':scope.row.RecordStatus==1?'审核中':scope.row.RecordStatus==2?'审核通过':scope.row.RecordStatus==3?'退款中':scope.row.RecordStatus==4?'已退款':''}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateDate"
        label="下单时间"
        align="center"
        :resizable="false"
      />
      <!-- 便利店操作按钮 -->
      <el-table-column
        label="操作"
        align="center"
        min-width="100"
        :resizable="false"
      >
        <template slot-scope="scope">
            <div v-if="checkStatus
            
            
            
            
            ==0">
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="check(scope.row)"
              >
                查看
              </el-button>
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="finish(scope.row)"
              >
                同意
              </el-button>
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="refund(scope.row)"
              >
                拒绝
              </el-button>
            </div>
            <div v-else>
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="check(scope.row)"
              >
                查看
              </el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <slot name='page'></slot>
    <common-check-dialog 
      :dialogData='dialogData'
      :checkStatus="checkStatus"
      :checkStatus2="checkStatus2"
      @finish="finish"
      @refund="refund"
    >
    </common-check-dialog>
    <el-dialog
      :visible="showCancelDialog"
      :title="title"
      width="600px"
      center
      :before-close="
        () => {
          showCancelDialog = false;
          cancelRemark = '';
        }
      "
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="cancelRemark"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              showCancelDialog = false;
              cancelRemark = '';
            }
          "
          >取 消</el-button
        >
        <el-button  type="primary" @click="refund">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import commonCheckDialog from '@/views/supermarket/refundindex/components/CommonCheckDialog.vue'
import { 
  refundDetail,//退款订单详情
  refundFinish,//退款订单同意
  refundRefused,//退款订单驳回
  } from '@/api/supermarket.js'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    checkStatus: {//判断状态页面
      // type: Number,
      default: 0
    },
    checkStatus2:{//页面判断
       default: 0
    }
  },
  components: {
    commonCheckDialog,
  },
  data() {
    return {
      showCancelDialog: false, // 取消待处理订单弹窗
      cancelRemark:'',//取消订单备注
      multipleSelection: [],//选中的数据
      dialogData: '',
      maxhight:300,
      OrderID:null,//订单ID,拒绝时使用
      title:'',
    }
  },
  created(){
    
  },
  mounted() {
    // this.maxHeight =
    //   window.innerHeight - this.$refs.table.$el.offsetTop  
    //   window.onresize = () => {
    //     this.maxHeight =
    //       window.innerHeight - this.$refs.table.$el.offsetTop 
    //   }
  },
  methods: {
    check(val) {//查看
        refundDetail({
            OrderID:val.OrderID
          })
          .then( (res) =>{
            this.dialogData=res.data
            this.$store.dispatch('dialog/changeState', {
              key: 'commonCheckDialogState',
              value: true
            })
          } )
    },
    finish(val) {//同意
      var OrderID=null
      if(typeof(val)==='number'){
        OrderID=val
      }else{
        OrderID=val.OrderID
      }
      this.$confirm('确定接受该订单吗', '完成订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
            refundFinish({
              OrderID:OrderID,
              PassRefundStatus:2
            })
            .then( (res) =>{
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$message({
                  type: 'success',
                  message: '操作成功!'
              })
              this.$emit('reset')
            } ).catch((err)=>{
              this.$message({
                type: 'info',
                message: '操作异常'
              })
            })
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    refund(val) {///拒绝
      this.title='拒绝弹窗备注'
      if (!this.showCancelDialog) {
        this.showCancelDialog = true
        if(typeof(val)==='number'){
          this.OrderID=val
        }else{
          this.OrderID=val.OrderID
        }
      } else {
        this.$confirm('拒绝后需退款给用户，退款需酒店、知了平台审核，确定要拒绝该订单吗?', '提示', {
          type: 'warning'
        }).then(result => {
            refundRefused({
              OrderID:this.OrderID,
              RejectRefundStatus: -2,
              RefundCheckRemark: this.cancelRemark
            }).then(() => {
              this.showCancelDialog = false
              this.cancelRemark = ''
              this.$message.success('订单已拒绝')
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$emit('reset')
            })
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('exportingtable',this.multipleSelection)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
