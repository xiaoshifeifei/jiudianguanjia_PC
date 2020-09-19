<!--
 * @Author: your name
 * @Date: 2020-05-26 09:20:51
 * @LastEditTime: 2020-06-02 10:03:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\CreateBreakageDialog.vue
-->
<template>
  <div id="create_repair_dialog">
    <el-dialog
      title="新建补单"
      :visible="dialogVisible"
        width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-form-item
          label="选择付款方式"
          prop="type"
          :rules="{ required: true, message: '付款方式不能为空', trigger: 'change'}"
        >
          <el-select v-model="form.type">
            <el-option
              label="微信"
              value="1"
            ></el-option>
            <el-option
              label="支付宝"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择商品"
        >
          <div
            v-for="(goods,index) in form.goodsItem"
            :key="index"
            class="goods_item"
          >
            <el-form-item
              :prop="'goodsItem.'+index+'.HotelGoodsSkuID'"
              :rules="{ required: true, message: '商品不能为空', trigger: 'change'}"
            >
              <el-select
                v-model="goods.HotelGoodsSkuID"
                placeholder="请选择商品"
              >
                <el-option
                  v-for="item in goodsItem"
                  :key="item.HotelGoodsSkuID"
                  :label="item.GoodsName"
                  :value="item.HotelGoodsSkuID"
                >
                </el-option>
              </el-select>
            </el-form-item>
            X
            <el-form-item
              :prop="'goodsItem.'+index+'.HotelGoodsSkuID'"
            >
              <el-input
                style="width:70%"
                placeholder="请输入内容"
                v-model.number="goods.GoodsCount"
              >
              </el-input>
              (数量)
            </el-form-item>
            <el-button
              @click.prevent="removeGoods(goods)"
              type="danger"
              icon="el-icon-delete"
              circle
              :disabled="removeGoodsState"
              size='mini'
            ></el-button>
          </div>
          <el-button style="marginTop:20px" type="primary" size="mini" @click="addGoodsItem">添加</el-button>
        </el-form-item>
        <el-form-item 
          label="房间号"
          prop="num"
          :rules="{ required: true, message: '房间号码不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="form.num"
            placeholder="请选择房间"
            value-key
            @change="changenum"
          >
            <el-option
              v-for="item in HotelRoom"
              :key="item.RoomNumber"
              :label="item.RoomNumber"
              :value="item.RoomID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
          prop="remark"
          label="备注"
          :rules="{ required: true, message: '备注不能为空', trigger: 'change'}"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="备注【字数不得多于300字】"
            v-model="form.remark"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          type="primary"
          class="golbal-btn cancel-btn"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submit('form')"
          class="golbal-btn submit-btn"
        >立即付款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetConveniencestoreNew , GetConveniencestoreRoom , GetConveniencestoreGoods} from '@/api/supermarket.js'
export default {
  data() {
    return {
      goodsItem: [
        { label: '海苔-喜之郎（￥4.00）', value: 'a' },
        { label: '雨伞-天堂伞（￥15.00）', value: 'b' }
      ],
      form: {
        type:'',
        goodsItem: [{ HotelGoodsSkuID: '', GoodsCount: 1 }],
        num:'',
        remark:''
      },
      removeGoodsState: true,
      HotelRoom:[],//房间数据
      HotelRoomName:'',//选中的房间号码
    }
  },
  props:{
    repairdata:{
      type:Number,
      default:1
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.createRepairDialogState
    }
  },
  mounted (){
    GetConveniencestoreGoods({//订单商品数据
      BelongModule:this.repairdata,
    }).then( (res)=>{
      this.goodsItem=res.data.GoodsSku
      console.log(this.goodsItem)
    }),
    GetConveniencestoreRoom({//酒店客房数据
    }).then( (res)=>{
      // this.goodsItem=res.data.GoodsSku
      this.HotelRoom=res.data.HotelRoom
    })
  },
  methods: {
    handleClose() {//关闭窗口
      this.$store.dispatch('dialog/changeState', {
        key: 'createRepairDialogState',
        value: false
      })
      this.$refs.form.resetFields()
    },
    changenum(id){
     let selectedWorkName = {};
     selectedWorkName = this.HotelRoom.find((item)=>{
       return item.RoomID===id
         //筛选出匹配数据，是对应数据的整个对象
     });
      this.HotelRoomName=selectedWorkName.RoomNumber
    },
    submit(formName) {//提交创建
      this.$refs[formName].validate(valid => {
        if (valid) {
          GetConveniencestoreNew({
            PayType:this.form.type,
            RoomID:this.form.num,
            RoomNumber:this.HotelRoomName,
            Goods:this.form.goodsItem,
            Remark:this.form.remark
          }).then( (res)=>{
            this.$store.dispatch('dialog/changeState', {
              key: 'createRepairDialogState',
              value: false
            })
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.$refs.form.resetFields()
          } )
        } else {
          return false
        }
      })
    },
    addGoodsItem() {
      // TODO 添加条目数
      this.form.goodsItem.push({ HotelGoodsSkuID: '', GoodsCount: 1 })
      if (this.form.goodsItem.length !== 1) this.removeGoodsState = false
    },
    removeGoods(item) {
      if (this.form.goodsItem.length !== 1) {
        let index = this.form.goodsItem.indexOf(item)
        if (index !== -1) {
          this.form.goodsItem.splice(index, 1)
        }
        if (this.form.goodsItem.length === 1) this.removeGoodsState = true
      }
    }
  }
}
</script>

<style lang="less">
#create_repair_dialog {
  .el-dialog {
  
  }
  .goods_item {
    .el-form-item {
      display: inline-block;
      margin: 10px 0;
    }
  }
  .multiply {
    text-align: center;
  }
}
</style>
