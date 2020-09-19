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
        label="用户"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="phoneNum"
        label="手机号"
        align="center"
        :resizable="false"
      />
      <el-table-column
          label="订单类别"
          align="center"
          :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':'土特产'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="TotalPrice"
        label="费用"
        align="center"
        :resizable="false"
      />
      <el-table-column
          label="状态"
          align="center"
          :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.Status==-1?"已取消":scope.row.Status==0?'待接单':scope.row.Status==1?'待配送':scope.row.Status==2?'已完成':'已退款'}}</span>
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
          <div v-if=" checkStatus2==7 || checkStatus2==8">
            <div v-if="scope.row.Status==0">
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
                接单
              </el-button>
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="refund(scope.row)"
              >
                拒绝
              </el-button>
            </div>
            <div v-else-if="scope.row.Status==1">
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
                @click="finish2(scope.row)"
              >
                完成
              </el-button>
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="refund2(scope.row)"
              >
                退款
              </el-button>
            </div>
            <div v-else-if="scope.row.Status==2">
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
                @click="refund2(scope.row)"
              >
                退款
              </el-button>
            </div>
            <div v-else-if="scope.row.Status==-1 || scope.row.Status==3">
              <el-button
                type='text'
                class="golbal-btn-text"
                @click="check(scope.row)"
              >
                查看
              </el-button>
            </div>
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
      @finish2="finish2"
      @refund2="refund2"
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
        <el-button v-if="checkStatus==0" type="primary" @click="refund">确 定</el-button>
        <el-button v-if="checkStatus==1||checkStatus==2" type="primary" @click="refund2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import commonCheckDialog from '@/views/supermarket/components/CommonCheckDialog.vue'
import { 
  GetConveniencestoreDetail,//便利店订单详情
  GetConveniencestoreAccept , //便利店接单
  GetConveniencestoreRefused, //便利店拒绝
  GetConveniencestoreFinish, //便利店完成
  GetConveniencestoreOut,//便利店退款
  localDetail,//土特产详情
  GetSextoyDetail,//情趣用品详情
  GetSextoyAccept,//情趣用品接单
  GetSextoyRefused,//情趣用品拒绝
  GetSextoyOut,//情趣用品退款
  } from '@/api/supermarket.js'
import { Alert } from 'element-ui'
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
      checkStatus3:0
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
      if(this.checkStatus2==7){
        GetConveniencestoreDetail({
            OrderID:val.OrderID
          })
          .then( (res) =>{
            this.dialogData=res.data
            this.$store.dispatch('dialog/changeState', {
              key: 'commonCheckDialogState',
              value: true
            })
          } )
      }else if(this.checkStatus2==9){
        localDetail({
            OrderID:val.OrderID
          })
          .then( (res) =>{
            this.dialogData=res.data
            this.$store.dispatch('dialog/changeState', {
              key: 'commonCheckDialogState',
              value: true
            })
          } )
      }else if(this.checkStatus2==8){
        GetSextoyDetail({
            OrderID:val.OrderID
          })
          .then( (res) =>{
            this.dialogData=res.data
            this.$store.dispatch('dialog/changeState', {
              key: 'commonCheckDialogState',
              value: true
            })
          } )
      }
    },
    finish(val) {//接单
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
          if(this.checkStatus2==7){
            GetConveniencestoreAccept({
              OrderID:OrderID,
              ReceiveOrderStatus:5
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
          }else if(this.checkStatus2==9){
            GetConveniencestoreAccept({
              OrderID:OrderID,
              ReceiveOrderStatus:5
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
          }else if(this.checkStatus2==8){
            GetSextoyAccept({
              OrderID:OrderID,
              ReceiveOrderStatus:5
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
          }
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    finish2(val) {//完成
      var OrderID=null
      if(typeof(val)==='number'){
        OrderID=val
      }else{
        OrderID=val.OrderID
      }
      this.$confirm('确定完成配送吗', '完成订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GetConveniencestoreFinish({
            OrderID:OrderID,
            DeliveryOrderStatus:2
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
          if(this.checkStatus2==7){
            GetConveniencestoreRefused({
              OrderID:this.OrderID,
              CancelOrderStatus: -1,
              CancelRemark: this.cancelRemark
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
          }else if(this.checkStatus2==8){
            GetSextoyRefused({
              OrderID:this.OrderID,
              CancelOrderStatus: -1,
              CancelRemark: this.cancelRemark
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
          }
        })
      }
    },
    refund2(val) {///退款
      this.title='退款备注弹窗'
      if (!this.showCancelDialog) {
        this.showCancelDialog = true
        if(typeof(val)==='number'){
          this.OrderID=val
        }else{
          this.OrderID=val.OrderID
        }
      } else {
        this.$confirm('退款给用户，退款需酒店、知了平台审核。确定要取消该订单吗?', '提示', {
          type: 'warning'
        }).then(result => {
          if(this.checkStatus2==7){
            GetConveniencestoreOut({
              OrderID:this.OrderID,
              RefundOrderStatus: 1,
              RefundRemark: this.cancelRemark
            }).then(() => {
              this.showCancelDialog = false
              this.cancelRemark = ''
              this.$message.success('退款成功!')
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$emit('reset')
            }).catch((err)=>{
              this.showCancelDialog = false
              this.cancelRemark = ''
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$emit('reset')
            })
          }else if(this.checkStatus2==8){
            GetSextoyOut({
              OrderID:this.OrderID,
              RefundOrderStatus: 1,
              RefundRemark: this.cancelRemark
            }).then(() => {
              this.showCancelDialog = false
              this.cancelRemark = ''
              this.$message.success('退款成功!')
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$emit('reset')
            }).catch((err)=>{
              this.showCancelDialog = false
              this.cancelRemark = ''
              this.$store.dispatch('dialog/changeState', {
                key: 'commonCheckDialogState',
                value: false
              })
              this.$emit('reset')
            })
          }

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
