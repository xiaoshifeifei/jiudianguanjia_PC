<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-13 17:32:45
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-27 09:23:32
-->
<template>
  <el-dialog :visible="show" title="台卡制作" :before-close="onClose">
    <el-row v-if="!styleId" style="min-height:400px">
      <el-tabs v-model="styleName">
        <el-tab-pane
          v-for="item in styleData.rows"
          :key="item.RecID"
          :label="item.Title"
          :name="item.Title">
        </el-tab-pane>
      </el-tabs>
      <p style="text-align:center; padding:10px">选择台卡模板样式</p>
      <el-card>
        <el-col :sm="12">
          <el-image v-cloak fit="cover" :preview-src-list="[styleImg.FacePreviewUrl]" :src="styleImg.FacePreviewUrl"></el-image>
          <p style="text-align:center; padding:10px">台卡正面</p>
        </el-col>
        <el-col :sm="12">
          <el-image v-cloak fit="cover" :preview-src-list="[styleImg.BackPreviewUrl]" :src="styleImg.BackPreviewUrl"></el-image>
          <p style="text-align:center; padding:10px">台卡反面</p>
        </el-col>
      </el-card>
    </el-row>
    <el-row v-else>
      <el-tabs v-model="tabName">
        <el-tab-pane
          v-for="(item,index) in cardData.rows"
          :key="index"
          :label="item.MaterialName"
          :name="item.MaterialName"
        ></el-tab-pane>
      </el-tabs>
      <el-card >
        <el-row>
          <el-col :sm="12">
            <el-card class="card-img">
              <el-image
                fit="cover"
                v-cloak
                :preview-src-list="[material.CoverUrl]"
                :src="material.CoverUrl">
              </el-image>
            </el-card>
            <p style="font-size:20px; text-align:center;margin-top:10px">成品样图</p>
          </el-col>
          <el-col :sm="12" style="padding:20px;">
            <h3 class="card-title">方案说明：</h3>
            <p v-cloak>材料名称：{{material.MaterialName}}</p>
            <p v-cloak>单价：￥{{material.CurrentPrice}}</p>
            <p>总制作价格: <strong class="total-price">￥{{totalPrice}}</strong></p>
            <h3>说明</h3>
            <section>{{material.Instruction}}</section>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-form size="mini" ref="detail" :model="detail" label-width="120px" :rules="rules">
          <el-form-item label="收货人" prop="Consignee">
            <el-input v-model="detail.Consignee"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="Tel">
            <el-input maxlength="11" v-model="detail.Tel"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="DeliveryAddress">
            <el-input v-model="detail.DeliveryAddress"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-dialog width="500px" :visible="showPay" :close-on-click-modal="false" append-to-body :before-close="onClosePay">
        <el-card class="qr-img">
          <h3 style="text-align:center;font-size:20px;padding:10px;">微信支付</h3>
          <vue-qr :text="payQrCode" :size="400"></vue-qr>
          <p v-if="paySuccess" style="text-align:center;font-size:40px;color:#04BE02;">
            <el-icon class="el-icon-success"></el-icon>
          </p>
        </el-card>

      </el-dialog>
    </el-row>
    <span slot="footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary"  @click="onSave" v-if="styleId">确定</el-button>
      <el-button @click="onSelectStyle" v-else type="primary">物料制作</el-button>
    </span>
  </el-dialog>
</template>

<script>
import vueQr from 'vue-qr'
import socket from '@/api/_socket'
import {
  reqMaterialCards,
  reqSaveOrder,
  reqOrderPay,
  reqCardStyles,
  reqSaveCardStyle
} from '@/api/setup'
export default {
  components: {
    vueQr
  },
  data() {
    let validTel = (rule, value, cb) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return cb(new Error('手机号有误'))
      }
      cb()
    }
    return {
      paySuccess: false,
      show: false,
      showPay: false,
      payQrCode: '', // 支付二维码
      styleName: '',
      styleId: '',
      tabName: '',
      styleData: {
        rows: []
      },
      cardData: {
        rows: []
      },
      detail: {
        Consignee: '',
        Tel: '',
        DeliveryAddress: ''
      },
      rules: {
        Consignee: [{ required: true, message: '收货人不能为空', trigger: 'blur' }],
        Tel: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validTel, trigger: 'blur' }
        ],
        DeliveryAddress: [{ required: true, message: '收货地址不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    styleImg() {
      let imgObj = this.styleData.rows.find(v => v.Title === this.styleName)
      return imgObj || {}
    },
    material() {
      let material = this.cardData.rows.find(v => v.MaterialName === this.tabName)
      return material || {}
    },
    totalPrice() {
      let count = this.$parent.$parent.$parent.step4.data.rows.length
      let price = this.material.CurrentPrice || 0
      let totalPrice = (count + 1) * price
      return totalPrice.toFixed(2)
    }

  },
  mounted() {
    this.styleId = this.$parent.$parent.$parent.step1.QrcodeRecID
    this.getStyles()
  },
  methods: {
    // 样式列表
    async getStyles() {
      try {
        let res = await reqCardStyles()
        this.styleData = res.data
        this.styleName = res.data.rows[0].Title || ''
        this.getCards()
      } catch (error) {
        console.log(error)
      }
    },
    // 材料列表
    async getCards() {
      let res = await reqMaterialCards()
      this.cardData = res.data
      this.tabName = res.data.rows[0].MaterialName || ''
    },
    // 样式选择
    onSelectStyle() {
      this.$confirm('选择台卡后点击完成后续需要修改则联系运营人员并会收取制作台卡模板修改费用,不再显示模板选择', '操作提示', {
        type: 'warning',
        cancelButtonText: '重新选择',
        confirmButtonText: '选择样式'
      }).then(() => {
        return reqSaveCardStyle(this.styleImg.RecID)
        // return Promise.resolve()
      })
        .then(res => {
          this.styleId = this.styleImg.RecID
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 关闭
    onClose() {
      this.$refs.detail && this.$refs.detail.resetFields()
      this.show = false
    },
    // 提交制作 并付费
    onSave() {
      this.$refs.detail.validate(valid => {
        if (!valid) return
        this.$confirm('点击确定提交台卡制作订单？', '操作提示', {
          type: 'warning'
        }).then(() => {
          return reqSaveOrder({
            MaterialID: this.material.MaterialID,
            ...this.detail
          })
        })
          .then(res => {
            console.log(res)
            this.initSocket(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // socket
    initSocket(data) {
      socket.initPay(() => {
        socket.sendMsg([
          {
            type: 'auth',
            token: socket.token
          }
        ])

        socket.sendPing()
      }, (res) => {
        res = JSON.parse(res.data)
        if (res.type === 'auth' && res.code === 0) {
          let msg = {
            type: 'pay',
            channel: 'PAY_QRCODE_ORDER',
            token: socket.token,
            OrderID: data.OrderID,
            OrderSerialNo: data.OrderSerialNo
          }
          socket.sendMsg([msg])
          this.onOrderPay(data.OrderID)
        }
        else if (res.data && res.data.ResultCode === 'SUCCESS') {
          this.$parent.$parent.$parent.step5.order = res.data
          this.$notify({
            title: '订单支付成功',
            type: 'success',
            duration: 15000
          })
          this.paySuccess = true
          setTimeout(() => {
            this.onClosePay()
            this.$parent.$parent.$parent.initStep()
          }, 1000)
        }
      })
    },
    // 显示 支付二维码
    async onOrderPay(orderId) {
      try {
        let res = await reqOrderPay(orderId)
        console.log(res)
        this.payQrCode = res.data.wxcode_url
        this.showPay = true
      } catch (error) {
        console.log(error)
      }

    },
    // 关闭 支付二维码
    onClosePay() {
      socket.close()
      this.showPay = false
    }
  }
}
</script>

<style scoped>
.card-title{
  font-size: 20px;
  font-weight: bold;
}
  .total-price{
    font-size: 20px;
    color:red;
  }
  .card-img{
    width: 100%;
    min-height: 300px;
    border-radius: 10px;
  }
.qr-img img{
  display:block !important;
  margin:0 auto;
}
</style>
