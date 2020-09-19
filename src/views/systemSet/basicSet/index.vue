<template>
  <div id="basic" class="main LoadingArea">
    <div class="base_title">酒店名称：{{ HotelName }}</div>
    <div class="base_form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        :hide-required-asterisk="false"
        label-width="120px"
      >
        <el-form-item label="酒店地址" prop="Address">
          <el-input
            prefix-icon="el-icon-map-location"
            v-model="ruleForm.Address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="Tel">
          <el-input v-model="ruleForm.Tel" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="是否设置配送费" prop="IsDelivery">
          <el-switch  v-model="ruleForm.IsDelivery"></el-switch>
        </el-form-item>
        <el-form-item label="配送金额" prop="DeliveryFee">
          <el-input v-model="ruleForm.SendCash" placeholder="￥0"></el-input>
        </el-form-item>
        <el-form-item label="起送金额" prop="TakeMoneyMin">
          <el-input
            v-model="ruleForm.TakeMoneyMin"
            placeholder="￥0.01"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务时间" prop="ServiceTime">
          <el-input
            type="age"
            v-model.number="ruleForm.ServiceTime"
            placeholder="15分钟"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票二维码" prop="InvoiceUrl">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="handleAvatarSuccess"
          >
            <div v-if="ruleForm.InvoiceQrCodeUrl">
              <img :src="ruleForm.InvoiceQrCodeUrl" class="avatar" />
              <div
                class="close el-icon-close"
                @click.stop="handleRemove()"
              ></div>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>
            支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k
          </div>
        </el-form-item>
        <el-form-item label="开票链接" prop="InvoiceUrl">
          <el-input v-model="ruleForm.InvoiceUrl" placeholder="开票链接"></el-input>
        </el-form-item>
        <el-form-item label="前台WIFI名称" prop="WifiName">
          <el-input v-model="ruleForm.WiFiName" placeholder="wifi"></el-input>
        </el-form-item>
        <el-form-item label="前台WIFI密码" prop="WifiPwd">
          <el-input
            v-model="ruleForm.WiFiPwd"
            placeholder="wifi密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">取消</el-button>
          <el-button type="primary" @click="saveBasicSetting">保存</el-button>
        </el-form-item>
      </el-form>
      <div class="ewm">
        <div class="ewm_txt">酒店前台二维码下载</div>
        <a :href="QrCodeUrl" download>
          <img class="erm_img" :src="QrCodeUrl" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from 'util'
import {
  GetBasicSettingInfo,
  UpdateBasicSettingInfo,
  UploadImage
} from '@/api/basicSet'

export default {
  data() {
    let validatePhone = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入客服电话'))
      } else if (!/^([0-9]{3,4})?-[0-9]{6,8}$/.test(value)) {
        cb(new Error('客服电话有误'))
      } else {
        cb()
      }
    }
    return {
      isJPG: false,
      isLt500k: 0,
      ruleForm: {
        Address: '',
        Tel: '',
        IsDelivery: false,
        SendCash: '',
        TakeMoneyMin: '',
        ServiceTime: '15',
        InvoiceQrCodeUrl: '',
        InvoiceUrl:'',
        WiFiName: '',
        WiFiPwd: '',
        ProvinceCode: '',
        CityCode: '',
        DistrictCode: ''
      },
      HotelName: '',
      QrCodeUrl: '',
      rules: {
        Address: [
          { required: true, message: '请输入酒店地址', trigger: 'blur' },
          // { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'  }
        ],
        Tel: [
          { required: true, message: '请输入客服电话', trigger: 'blur' },
          // { validator: validatePhone, trigger: 'blur' }
        ],
        ServiceTime: [
          { type: 'number', message: '请输入数字值', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getBasicInfo()
  },
  methods: {
    async getBasicInfo() {
      await GetBasicSettingInfo().then(res => {
        console.log("resres",res);
        this.QrCodeUrl = res.data.QrCodeUrl
        this.HotelName = res.data.HotelName
        this.ruleForm.Address = res.data.Address
        this.ruleForm.ProvinceCode = res.data.ProvinceCode
        this.ruleForm.CityCode = res.data.CityCode
        this.ruleForm.DistrictCode = res.data.DistrictCode
        this.ruleForm.Tel = res.data.Tel
        this.ruleForm.IsDelivery = res.data.SendCash != 0.00
        this.ruleForm.SendCash = res.data.SendCash
        this.ruleForm.TakeMoneyMin = res.data.MinSendCash
        this.ruleForm.ServiceTime = res.data.ServiceTime
        this.ruleForm.InvoiceQrCodeUrl = res.data.InvoiceQrCodeUrl
        this.ruleForm.InvoiceUrl = res.data.InvoiceUrl
        this.ruleForm.WiFiName = res.data.WiFiName
        this.ruleForm.WiFiPwd = res.data.WiFiPwd
      })
    },
    saveBasicSetting() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        UpdateBasicSettingInfo(this.ruleForm)
          .then(res => {
            this.$message.success('保存成功')
            this.getBasicInfo()
          })
          .catch(err => {
            this.$message.error(err)
          })
      })
    },
    resetForm() {
      this.getBasicInfo()
    },
    handleAvatarSuccess(a) {
      if (this.isJPG && this.isLt500k) {
        let form = new FormData()
        form.append('Image', a.file)
        UploadImage(form)
          .then(res => {
            this.ruleForm.InvoiceQrCodeUrl = res.data.url
          })
          .catah(err => {
            this.$message.error(err)
          })
      }
    },
    beforeAvatarUpload(file) {
      switch (file.type) {
      case 'image/jpeg':
        this.isJPG = true
        break
      case 'image/png':
        this.isJPG = true
        break
      case 'image/jpg':
        this.isJPG = true
        break
      case 'image/gif':
        this.isJPG = true
        break
      case 'image/bmp':
        this.isJPG = true
        break
      default:
        this.isJPG = false
        break
      }
      this.isLt500k = file.size / 1025 / 500 < 1
      if (!this.isJPG) {
        this.$message.error('上传图片只能是 JPG / PNG /JPEG 格式!')
        return
      }
      if (!this.isLt500k) {
        this.$message.error('上传图片大小不能超过 500KB!')
        return
      }
      return this.isJPG && this.isLt500k
    },

    // 移除上传图片
    handleRemove() {
      this.ruleForm.InvoiceQrCodeUrl = ''
    }
  }
}
</script>

<style lang="less">
#basic {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden ;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
  }
  .main {
    position: relative;
    font-family: PingFang-SC-Regular, SourceHanSans-normal;
    font-weight: 700;
    font-size: 14px;
    color: #606266;
  }
  .base_title {
    text-align: center;
    line-height: 60px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .base_form {
    width: 50%;
    margin: 0 auto;
  }
  .ewm {
    position: fixed;
    right: 0;
    bottom: 30%;
    width: 150px;
    text-align: center;
    z-index: 999;
  }
  .erm_img {
    width: 100px;
    min-height: 100px;
    margin-top: 22px;
  }
  .iptIcon {
    background: url(../../../assets/erweima/icon.png) no-repeat center;
  }
}
#basic .close {
  position: absolute;
  top: 0;
  right: -30px;
  font-size: 30px;
  font-weight: 700;
  color: black;
}
</style>
