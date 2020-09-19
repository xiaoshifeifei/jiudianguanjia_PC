<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-21 09:43:19
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-27 10:16:03
-->
<template>
  <el-container class="setup-container">
    <el-header height="160px">
      <div class="top-bar">
        <div class="logo"></div>
        <div class="user">
          <img :src="avatar" alt="" class="avatar" />
          <span>{{ getRealNameParams }}</span>
        </div>
      </div>
      <el-card>
        <div class="steps-wrapper">
          <el-steps :active="step">
            <el-step title="完善酒店信息"></el-step>
            <el-step title="绑定微信"></el-step>
            <el-step title="创建房型"></el-step>
            <el-step title="创建房间"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
      </el-card>
    </el-header>
    <el-main>
      <el-card v-if="step === 1">
        <el-form ref="step1" label-width="120px" :model="step1" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :sm="11">
              <el-row type="flex">
                <el-form-item label="酒店地址" prop="province">
                  <el-select
                    placeholder="省"
                    v-model="step1.province"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in step1.provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="index"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="0px" prop="city">
                  <el-select placeholder="市" v-model="step1.city" clearable>
                    <el-option
                      v-for="(item, index) in cityList"
                      :key="index"
                      :label="item.label"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="0px" prop="area">
                  <el-select placeholder="区" v-model="step1.area" clearable>
                    <el-option
                      v-for="(item, index) in areaList"
                      :key="index"
                      :value="index"
                      :label="item.label"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-form-item prop="Address">
                <el-input
                  prefix-icon="el-icon-location"
                  placeholder="详细地址"
                  v-model="step1.Address"
                ></el-input>
              </el-form-item>
              <el-form-item label="客服电话" prop="Tel">
                <el-input
                  prefix-icon="el-icon-phone-outline"
                  placeholder="固话格式如 0591-8888888"
                  v-model="step1.Tel"
                ></el-input>
              </el-form-item>
              <el-form-item label="配送金额" prop="SendCash">
                <el-input type="age" v-model.number="step1.SendCash"
                  ><template slot="prepend">￥</template></el-input
                >
              </el-form-item>
            </el-col>
            <el-col :sm="11">
              <el-form-item label="移动端公告">
                <el-input
                  placeholder="显示在小程序首页模块的公告提示信息"
                  v-model="step1.Notice"
                ></el-input>
              </el-form-item>
              <el-form-item label="发票二维码">
                <div class="img-wrapper" v-if="step1.InvoiceQrCodeUrl">
                  <el-image
                    :src="step1.InvoiceQrCodeUrl"
                    fit="cover"
                  ></el-image>
                  <div class="mark">
                    <span
                      @click="
                        () => {
                          step1.InvoiceQrCodeUrl = '';
                        }
                      "
                    >
                      <el-icon class="el-icon-delete-solid"></el-icon>
                    </span>
                  </div>
                </div>
                <el-upload
                  v-else
                  :on-exceed="
                    () => {
                      $message.warning('限上传一张，请删除后重新上传');
                    }
                  "
                  :limit="1"
                  action=""
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :http-request="uploadInvoiceQrImg"
                  :on-remove="
                    () => {
                      step1.InvoiceQrCodeUrl = '';
                    }
                  "
                  list-type="picture-card"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <strong>备注：</strong>
              </el-form-item>
              <el-form-item label="开票链接">
                <el-input v-model="step1.InvoiceUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <Password ref="password"/>
      </el-card>
      <el-card v-else-if="step === 2" class="flex-column-center">
        <h3 class="wx-title">绑定微信</h3>
        <iframe
          sandbox="allow-scripts allow-top-navigation allow-same-origin"
          :src="wxLogin"
          frameborder="0"
          scrolling="no"
          style="margin:0 auto; height:480px;"
        ></iframe>
        <!-- <div id="wx-login"></div> -->
        <!-- <el-button round>
          <h3>请使用微信扫描二维码绑定“知了酒店管理平台”</h3>
        </el-button> -->
      </el-card>
      <el-card v-else-if="step === 3">
        <el-row type="flex" justify="end">
          <el-button
            type="danger"
            @click="onDeleteRoomType(step3.multile.map(v => v.RoomTypeID))"
            >批量删除</el-button
          >
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="onRoomType(true)"
            >新增房型</el-button
          >
        </el-row>
        <el-table
          key="step3"
          v-loading="step3.loading"
          max-height="550px"
          ref="step3"
          style="width:100%"
          height="570"
          :data="step3.data.rows"
          @selection-change="onSelectionChange($event, 'step3')"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            v-for="item in roomTypeColumns"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            :min-width="120"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                icon="el-icon-edit"
                @click="onRoomType(false, scope.row)"
                >查看</el-link
              >
              <el-link
                type="danger"
                @click="onDeleteRoomType([scope.row.RoomTypeID])"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card v-else-if="step === 4">
        <el-row type="flex" justify="end">
          <el-button
            type="danger"
            @click="onDeleteRoom(step4.multile.map(v => v.RoomID))"
            >批量删除</el-button
          >
          <el-button @click="onBatchRooms">批量新增</el-button>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="onRoomNumber(true)"
            >新增房间</el-button
          >
        </el-row>
        <el-table
          key="step4"
          v-loading="step4.loading"
          ref="step4"
          style="width:100%"
          max-height="550"
          :data="step4.data.rows"
          @selection-change="onSelectionChange($event, 'step4')"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            v-for="item in roomNumberColumns"
            :key="item.label"
            :prop="item.prop"
            align="center"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            min-width="120px"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                icon="el-icon-edit"
                @click="onRoomNumber(false, scope.row)"
                >查看</el-link
              >
              <el-link type="danger" @click="onDeleteRoom([scope.row.RoomID])"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card v-else-if="step === 5">
        <el-row style="text-align:center">
          <el-icon class="el-icon-success my-success"></el-icon>
          <h3 class="wx-title">操作完毕</h3>
          <p>基本设置完成，请点击完成进入程序。</p>
        </el-row>
        <el-form
          size="mini"
          label-width="200px"
          style="background:#fbfbfb; width:500px; margin:20px auto;"
        >
          <el-form-item label="编辑人：">
            <span>{{ adminName || ''}}</span>
          </el-form-item>
          <!-- <el-form-item label="岗位：">
            <span>合伙人</span>
          </el-form-item> -->
          <el-form-item label="酒店名称：">
            <span>{{ step1.HotelName || '' }}</span>
          </el-form-item>
          <template v-if="step5.order.OrderID">
            <el-form-item label="物料实付金额：">
              <span>￥{{step5.order.TotalPrice || 0}}</span>
            </el-form-item>
            <el-form-item label="物料收货人：">
              <span>{{step5.order.Consignee || ''}}</span>
            </el-form-item>
            <el-form-item label="收货人联系电话：">
              <span>{{step5.order.Tel || ''}}</span>
            </el-form-item>
            <el-form-item label="物料收货地址：">
              <span>{{step5.order.DeliveryAddress || ''}}</span>
            </el-form-item>
            <el-form-item label="下单日期：">
              <span>{{step5.order.CreateDate || ''}}</span>
            </el-form-item>
            <el-form-item label="支付日期：">
              <span>{{step5.order.PayDate || ''}}</span>
            </el-form-item>
          </template>
        </el-form>
      </el-card>
      <el-row type="flex" justify="center"> </el-row>

      <section :ref="component" :is="component"></section>
    </el-main>
    <el-footer height="100px">
      <el-button
        type="primary"
        @click="() => (step = step - 1)"
        v-show="step > 1 && step < 5">上一步</el-button >
      <el-button type="primary" @click="doNext" v-show="step !== 2 && step < 5">下一步</el-button>
      <el-button type="success" @click="$router.replace({ path: '/' })" v-show="step === 5">完成</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import './wx'
import RoomType from './RoomType'
import Password from './Password'
import BatchAddRoom from './BatchAddRoom'
import RoomNumber from './RoomNumber'
import MakeCard from './MakCard'
import provinceData from '@/assets/city-data/province_db'
import cityData from '@/assets/city-data/city_db'
import areaData from '@/assets/city-data/area_db'
import { GetBasicSettingInfo, UploadImage } from '@/api/basicSet'
import {
  reqHotelBasicInfo,
  updateHotelInfo,
  reqAddRoomType,
  reqRoomyTypeDetail,
  reqUpdateRoomType,
  reqDeleteRoomType,
  reqRoomTypes,
  reqSetupStep
} from '@/api/setup'
import { GetHotelroomListM, DelHotelroomM } from '@/api/room-relevant'
import { getToken } from '@/utils/auth.js'
import { getAccountList } from '@/api/jurisdiction'
export default {
  components: {
    RoomType,
    Password,
    BatchAddRoom,
    RoomNumber,
    MakeCard
  },
  data() {
    return {

      getRealNameParams:"",
      RealNameParams: '',
      step: 1,
      // eslint-disable-next-line camelcase
      component: '',
      roomTypeColumns: [
        { prop: 'RoomTypeName', label: '房型名称' },
        { prop: 'RoomSize', label: '房间大小' },
        { prop: 'BedSizeText', label: '床型大小' },
        { prop: 'CustomerCount', label: '适住人数' },
        { prop: 'UpdateDate', label: '编辑时间' },
        { prop: 'OperatorName', label: '操作人员' }
      ],
      roomNumberColumns: [
        { prop: 'RoomNumber', label: '房号' },
        { prop: 'RoomFloor', label: '楼层' },
        { prop: 'Model', label: '房型名称' },
        { prop: '', label: '电话' },
        { prop: 'WiFiName', label: 'WIFI名称' },
        { prop: 'WiFiPwd', label: 'WIFI密码' },
        { prop: 'UpdateDate', label: '编辑时间' },
        { prop: 'OperatorName', label: '操作人员' }
      ],
      step1: {
        HotelName: '',
        region: 3,
        provinceList: provinceData,
        province: '',
        city: '',
        area: '',
        Address: '',
        InvoiceQrCodeUrl: '',
        InvoiceUrl: '',
        Notice: '',
        SendCash: '',
        Tel: ''
      },
      step3: {
        loading: false,
        data: {
          rows: [],
          // eslint-disable-next-line camelcase
          current_page: 1,
          total: 0,
          limit: 100
        },
        multile: []
      },
      step4: {
        loading: false,
        roomType: {},
        data: {
          rows: [],
          // eslint-disable-next-line camelcase
          current_page: 1,
          total: 0,
          limit: 100
        },
        multile: []
      },
      step5: {
        order: {}
      },
      rules: {
        province: [{ required: true, message: '请选择省份' }],
        city: [{ required: true, message: '请选择市' }],
        area: [{ required: true, message: '请选择地区' }],
        Address: [{ required: true, message: '详细地址不能为空' }],
        Tel: [{ required: true, message: '客服电话不能为空', trigger: 'blur' }],
        SendCash: [{ type: 'number', message: '请输入数字值', trigger: 'blur' }]
      }
    }
  },
  computed: {
    wxLogin() {
      let baseUrl = process.env.VUE_APP_BASE_API
      let appid = process.env.VUE_APP_APPID
      let token = getToken() || ''
      // eslint-disable-next-line camelcase
      let redirect_uri = encodeURIComponent(`${baseUrl}/wechat/bind`)
      return `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${token}#wechat_redirect`
    },
    adminName() {
      return this.$store.state.user.adminName
    },
    avatar() {
      let url =
        this.$store.state.user.userInfo.Headimgurl ||
        require('@/icons/avatar.png')
      return url
    },
    cityList() {
      let p = this.step1.province || 0
      return cityData[p]
    },
    areaList() {
      let p = this.step1.province || 0,
        c = this.step1.city || 0
      return areaData[p][c]
    }
  },
  created() {
    const getRealNames = sessionStorage.getItem('getRealName')
    this.getRealNameParams = getRealNames
    this.getInfoRoles()
    // eslint-disable-next-line camelcase
    const { bind_status, msg } = this.$route.query
    // eslint-disable-next-line camelcase
    if (bind_status === '0') {
      this.$router.replace({ path: this.$route.path })
      this.$nextTick(() => {
        this.$message.error(msg)
      })
    } else {
      // eslint-disable-next-line camelcase
      if (bind_status === '1') {
        this.$router.replace({ path: this.$route.path })
        this.$nextTick(() => {
          this.$message.success(msg)
        })
      }
      this.initStep()
    }
  },
  mounted() {
    this.getHotelBasicInfo()
    this.getRoomTypes()
  },
  methods: {
    initStep() {
      this.component = ''
      reqSetupStep()
        .then(res => {
          console.log(res)
          let step = res.data.step
          if (step === 0) {
            step = 1
          }
          else if (step === 4 || step === 5) {
            step = 4
          } else if (step === 6) {
            step = 5
          }
          this.step = step
          if (this.step === 1) {
            setTimeout(() => {
              this.$refs.password.show = true
            }, 100)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getInfoRoles() {
      console.log(222)
      try {
        let res = await getAccountList({
          Keywords: '',
          Page: 1,
          Limit: 20
        })
        console.log('res',res);
        const aaa = res.data.rows.filter(item => {
          return this.$store.state.user.userInfo.AdminID == item.RoleID
        })
        aaa.map(item => {
          console.log("item",item);
          sessionStorage.setItem('getRoleName', item.RoleName)
          this.RealNameParams = item.RealName
        })
      } catch (error) {}
    },
    // 酒店信息
    async getHotelBasicInfo() {
      try {
        let res = await reqHotelBasicInfo()
        this.step1 = Object.assign(this.step1, res.data)
        this.handleInfo(
          res.data.ProvinceCode,
          res.data.CityCode,
          res.data.DistrictCode
        )
      } catch (error) {
        console.log(error)
      }
    },
    // 处理 省市区
    handleInfo(provinceCode, cityCode, districtCode) {
      let p = provinceData.findIndex(v => +v.value === provinceCode)
      this.step1.province = p
      this.$nextTick(() => {
        let c = cityData[p].findIndex(v => +v.value === cityCode)
        this.step1.city = c
        this.$nextTick(() => {
          let d = areaData[p][c].findIndex(v => +v.value === districtCode)
          this.step1.area = d
        })
      })
    },
    beforeUpload() {},
    // 上传开票二维码
    async uploadInvoiceQrImg(file) {
      let formData = new FormData()
      formData.append('Image', file.file)
      let res = await UploadImage(formData)
      this.step1.InvoiceQrCodeUrl = res.data.url
    },
    // 下一步
    doNext() {
      if (this.step === 1) {
        this.$refs.step1.validate(async valid => {
          if (!valid) return
          await updateHotelInfo({
            Tel: this.step1.Tel,
            ProvinceCode: this.step1.provinceList[this.step1.province].value,
            CityCode: this.cityList[this.step1.city].value,
            DistrictCode: this.areaList[this.step1.area].value,
            Address: this.step1.Address,
            SendCash: this.step1.SendCash,
            Notice: this.step1.Notice,
            InvoiceQrCodeUrl: this.step1.InvoiceQrCodeUrl,
            InvoiceUrl: this.step1.InvoiceUrl
          })
          this.$message.success('酒店信息已更新')
          this.step = 2
        })
      } else if (this.step === 3) {
        if (!this.step3.data.rows.length) {
          return this.$message.warning('至少添加一个房型才可进行下一步')
        }
        this.step = 4
      } else if (this.step === 4) {
        let length = this.step4.data.rows.length
        if (!length)
          return this.$message.warning('至少添加一个房间才可进行下一步')
        this.$confirm(
          `贵酒店台卡已生成，总数【${length}张+前台1张】是否进行制作？`,
          '制作台卡',
          {
            type: 'warning',
            cancelButtonText: '取消并下一步',
            confirmButtonText: '台卡制作'
          }
        )
          .then(() => {
            this.component = 'MakeCard'
            this.$nextTick(() => {
              this.$refs.MakeCard.show = true
            })
          })
          .catch(() => {
            this.step = 5
          })
      } else {
        this.step = this.step + 1
      }
    },
    // 获取房型列表
    async getRoomTypes() {
      this.step3.loading = true
      try {
        let res = await reqRoomTypes({
          Keys: '',
          Page: this.step3.data.current_page,
          Limit: this.step3.data.limit
        })
        this.step3.data = {
          ...this.step3.data,
          ...res.data
        }
        this.toggleSelection(res.data.rows, 'step3', 'RoomTypeID')
      } catch (error) {
        console.log(error)
      }
      this.step3.loading = false
    },
    // 房型 表单 操作
    onRoomType(isAdd, row) {
      this.component = 'RoomType'
      let [BedSizeL, BedSizeW] = ['', '']
      if (!isAdd) {
        [BedSizeL, BedSizeW] = row.BedSizeText.replace(/m/g, '').split('*') || [
          '',
          ''
        ]
      }
      this.$nextTick(() => {
        this.$refs.RoomType.isAdd = isAdd
        this.$refs.RoomType.detail = {
          ...this.$refs.RoomType.detail,
          ...row,
          BedSizeL,
          BedSizeW
        }
        this.$refs.RoomType.show = true
      })
    },
    // 删除房型
    onDeleteRoomType(ids) {
      if (!ids.length) return this.$message.warning('请选择要删除的房型')
      this.$confirm('确定要删除所选房型吗？', '删除提示', {
        type: 'warning'
      }).then(async () => {
        try {
          await reqDeleteRoomType(ids)
          this.$message.success('房型已删除')
          this.getRoomTypes()
        } catch (error) {
          console.log(error)
        }
      })
    },
    /**
     * 表格多选
     * @param {Array} val 选中的数组
     * @param {String} key 表格 ref
     */
    onSelectionChange(val, key) {
      clearTimeout(this.tableTimer)
      this.tableTimer = setTimeout(() => {
        clearTimeout(this.tableTimer)
        this[key].multile = val
      }, 50)
    },
    /**
     * 表格多选
     * @param {Array} resList 表格列表数据
     * @param {String} tableRef 表格 ref
     * @param {Number} key 表格项 唯一值 用来 比对 是否 选中
     */
    toggleSelection(resList, tableRef, key) {
      this.$nextTick(() => {
        let rows = this[tableRef].multile || []
        console.log(rows)
        if (rows.length) {
          this[tableRef].multile = resList.map(v => {
            let row = rows.some(row => {
              if (row[key] === v[key]) {
                this.$refs[tableRef].toggleRowSelection(v)
                return true
              } else {
                return false
              }
            })
            return row && v
          })
        } else {
          this.$refs[tableRef] && this.$refs[tableRef].clearSelection()
        }
      })
    },
    // 获取房间列表
    async getRooms() {
      this.step4.loading = true
      this.step4.data.rows = []
      try {
        let res = await GetHotelroomListM({
          Page: this.step4.data.current_page,
          Limit: this.step4.data.limit
        })
        this.$nextTick(() => {
          this.step4.data = {
            ...this.step4.data,
            ...res.data
          }
          this.toggleSelection(res.data.rows, 'step4', 'RoomID')
        })
      } catch (error) {
        console.log(error)
      }
      this.step4.loading = false
    },
    // 批量新增房间
    onBatchRooms() {
      this.component = 'BatchAddRoom'
      this.$nextTick(() => {
        this.$refs.BatchAddRoom.show = true
      })
    },
    // 删除房间
    onDeleteRoom(ids) {
      if (!ids.length) return this.$message.warning('请选择要删除的房间')
      this.$confirm(
        '确定要删除所选【' + ids.length + '个】房间吗？',
        '删除提示',
        {
          type: 'warning'
        }
      )
        .then(() => {
          return DelHotelroomM({ RoomIDs: ids })
        })
        .then(() => {
          this.$message.success('房间删除成功')
          this.getRooms()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 房间 编辑 新增
    onRoomNumber(isAdd, row) {
      this.component = 'RoomNumber'
      this.$nextTick(() => {
        let RoomTypeID = ''
        if (!isAdd) {
          this.step3.data.rows.some(v => {
            if (v.RoomTypeName === row.Model) {
              RoomTypeID = v.RoomTypeID
              return true
            }
            return false
          })
        }
        this.$refs.RoomNumber.isAdd = isAdd
        this.$refs.RoomNumber.show = true
        this.$refs.RoomNumber.detail = {
          ...this.$refs.RoomNumber.detail,
          ...row,
          RoomTypeID
        }
      })
    }
  },
  watch: {
    'step1.province'(value) {
      this.step1.city = ''
      this.step1.area = ''
      this.step1.region = value + ''
    },
    'step1.city'() {
      this.step1.area = ''
    },
    step() {
      if (this.step === 3) {
        this.getRoomTypes()
      } else if (this.step === 4) {
        this.getRooms()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-container {
  height: 100%;
}
.steps-wrapper {
  padding: 10px 50px 0 50px;
}
.flex-column-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wx-title {
  font-size: 30px;
  font-weight: bold;
}
.my-success {
  font-size: 70px;
  color: #04be02;
}
.el-header {
  padding: 0;
}
.el-footer {
  border-top: 1px solid #efefef;
}
.top-bar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .user {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-link {
  margin: 0 5px;
}
.img-wrapper {
  width: 148px;
  height: 148px;
  border: 1px dashed #ccc;
  position: relative;
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
  .mark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 30px;
    cursor: pointer;
    opacity: 0;
  }
  &:hover .mark {
    opacity: 1;
  }
}
</style>
