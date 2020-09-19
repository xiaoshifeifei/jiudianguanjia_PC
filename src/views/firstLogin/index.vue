<!--
 * @Author: your name
 * @Date: 2020-05-29 11:03:15
 * @LastEditTime: 2020-06-05 17:43:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\index.vue
-->
<template>
  <div id="firstLogin_box">
    <section class="step_box">
      <el-steps
        :active="active"
        finish-status="success"
      >
        <el-step title="完善酒店信息"></el-step>
        <el-step title="绑定微信"></el-step>
        <el-step title="创建房型"></el-step>
        <el-step title="创建房间"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </section>
    <!-- 完善酒店信息 -->
    <el-form
      :model="hotelForm"
      :rules="hotelFormRules"
      ref="hotelForm"
      label-width="120px"
    >
      <section
        class="hotel_info_box"
        v-if="active === 0"
      >
        <div>
          <h3>酒店基本信息</h3>
          <el-divider />
          <el-form-item
            label="酒店地址"
            required
          >
            <city-picker
              @selProvince='selectProvince'
              @selCity='seleckCity'
              @selArea='selectArea'
            ></city-picker>
          </el-form-item>
          <el-form-item prop="address">
            <el-input
              placeholder="请输入详细地址"
              v-model="hotelForm.address"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="客服电话"
            prop="telephone"
          >
            <el-input
              placeholder="请输入客服电话"
              v-model="hotelForm.telephone"
              size="small"
            ></el-input>
          </el-form-item>
          <p class="remark">备注：格式为0591-88888888</p>
        </div>
        <div>
          <h3>酒店宣传信息</h3>
          <el-divider />
          <el-form-item
            label="移动端公告"
            prop="notice"
          >
            <el-input
              placeholder="请输入移动端公告内容"
              v-model="hotelForm.notice"
              size="small"
            ></el-input>
          </el-form-item>
          <p class="remark">备注：此栏目为小程序上首页模块的公告提示</p>
          <el-form-item
            label="发票二维码"
            prop="invoiceQRCode"
          >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <h3>酒店配送信息</h3>
          <el-divider />
          <el-form-item label="是否设置配送费">
            <el-switch
              v-model="hotelForm.dispatchState"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            label="配送金额"
            :prop="hotelForm.dispatchState?'dispatching':''"
          >
            <el-input
              v-model="hotelForm.dispatching"
              size="small"
              :disabled="!hotelForm.dispatchState"
              placeholder="请输入配送费金额"
            ></el-input>
          </el-form-item>
        </div>
      </section>
    </el-form>
    <!-- 绑定微信 -->
    <section
      class="setp_two"
      v-if="active === 1"
    >
      <h1>绑定微信</h1>
      <img
        src="data:image/png;base64,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"
        alt=""
      >
      <div>请使用微信扫描二维码绑定“知了酒店管理平台”</div>
    </section>
    <!-- 创建房型 -->
    <section
      class="step_three"
      v-if="active === 2"
    >
      <div class="step_three_tools">
        <el-button
          @click="houseTypesDelete"
          type="primary"
          class="golbal-btn"
        >批量删除</el-button>
        <el-button
          @click="addHouseType"
          type="primary"
          class="golbal-btn"
        >新增房型</el-button>
      </div>
      <house-type-table
        ref="houseTypeTable"
        :houseTypeTableData="houseTypeTableData"
        :checkHandle="checkHandle"
        :updateHandle="updateHandle"
        :removeHandle="removeHandle"
        :houseTypeTableHeight="houseTypeTableHeight"
      >
      </house-type-table>
    </section>
    <!--创建房间-->
    <section
      class="step_four"
      v-if="active === 3"
    >
      <div class="step_four_tools">
        <el-button
          @click="housesDelete"
          type="primary"
          class="golbal-btn"
        >批量删除</el-button>
        <el-button
          @click="addHouses"
          type="primary"
          class="golbal-btn"
        >批量新增</el-button>
        <el-button
          @click="addHouse"
          type="primary"
          class="golbal-btn"
        >新增房间</el-button>
      </div>
      <house-table
        ref="houseTable"
        :houseTableData="houseTableData"
        :checkHandle="houseCheckHandle"
        :updateHandle="houseUpdateHandle"
        :removeHandle="houseRemoveHandle"
        :houseTableHeight="houseTableHeight"
      ></house-table>
    </section>
    <!-- 完成 - 1 -->
    <section
      class="step_five"
      v-if="active === 4"
    >
      <img
        src="@/icons/finish.png"
        alt=""
        class="finish_img"
      >
      <h1>操作完毕</h1>
      <p>基本设置完成，请点击完成进入程序。</p>
      <div class="pay_info_box">
        <table>
          <tr>
            <td>编辑人:</td>
            <td>赵洋儿</td>
          </tr>
          <tr>
            <td>岗位:</td>
            <td>合伙人</td>
          </tr>
          <tr>
            <td>酒店名称:</td>
            <td class="hotel_name">知了酒店</td>
          </tr>
          <br><br>
          <tr>
            <td>物料实付金额:</td>
            <td>￥800</td>
          </tr>
          <tr>
            <td>物料收货人:</td>
            <td>赵洋儿</td>
          </tr>
          <tr>
            <td>物料收获地址:</td>
            <td>福建省福州市仓山区浦上工业区钟楼站50号</td>
          </tr>
          <tr>
            <td>下单日期:</td>
            <td>2020-5-8-17:52</td>
          </tr>
        </table>
      </div>
    </section>
    <!-- 完成 - 2 -->
    <section
      class="step_six"
      v-if="active === 5"
    >
      <img
        src="@/icons/finish.png"
        alt=""
        class="finish_img"
      >
      <h1>操作完毕</h1>
      <p>基本设置完成，请点击完成进入程序。</p>
      <div class="pay_info_box">
        <table>
          <tr>
            <td>编辑人:</td>
            <td>赵洋儿</td>
          </tr>
          <tr>
            <td>岗位:</td>
            <td>合伙人</td>
          </tr>
          <tr>
            <td>酒店名称:</td>
            <td class="hotel_name">知了酒店</td>
          </tr>
          <br><br>
          <tr>
            <td>发送邮箱1:</td>
            <td>80125604@qq.com</td>
          </tr>
          <tr>
            <td>发送邮箱2:</td>
            <td>80125604@qq.com</td>
          </tr>
          <tr>
            <td>发送邮箱3:</td>
            <td>80125604@qq.com</td>
          </tr>
          <tr>
            <td>发送日期:</td>
            <td>2020-5-8-17:52</td>
          </tr>
        </table>
      </div>
    </section>
    <div class="btn_box">
      <el-button
        v-if="active !== 0 && active !== 4 && active !== 5"
        style="margin-top: 12px;"
        @click="prev"
        class="golbal-btn"
      >上一步</el-button>
      <el-button
        style="margin-top: 12px;"
        @click="next"
        v-if="active !== 4 && active !== 4 && active !== 5"
        type="primary"
        class="golbal-btn"
      >下一步</el-button>
      <el-button
        style="margin-top: 12px;"
        @click="finish"
        v-if="active >= 4"
        type="primary"
        class="golbal-btn"
      >完成</el-button>
    </div>
    <!-- 修改密码对话框 -->
    <update-password-dialog :saveHandle="passwordUpdate"></update-password-dialog>
    <!-- 新增房型对话框 -->
    <create-house-type-dialog
      :onState="createHouseTypeOnState"
      :saveHandle="saveHandle"
      ref="createHouseTypeDialog"
    ></create-house-type-dialog>
    <!-- 新增房间对话框 -->
    <create-house-dialog
      :onState="createHouseOnState"
      ref="createHouseDialog"
      :saveHandle="createHouseSaveHandle"
    ></create-house-dialog>
    <!-- 批量新增房间对话框 -->
    <create-houses-dialog
      :addHousesHandle="addHousesHandle"
      ref="createHousesDialog"
    ></create-houses-dialog>
    <!-- 生成台卡 第一步 选择台卡-->
    <generate-card :generateHandle="generateHandle"></generate-card>
    <!-- 生成台卡 第二步 确认方案 -->
    <generate-material-dialog :toGenerateHandle="toGenerateHandle"></generate-material-dialog>
    <!-- 生成台卡 第三步 确认基本信息 -->
    <generate-check-info-dialog
      :generateInfoData="generateInfoData"
      :confirmPayHandle="confirmPayHandle"
    ></generate-check-info-dialog>
    <!-- 生成台卡 第四步 确认付款 -->
    <el-dialog
      title="微信付款二维码"
      :visible.sync="payOfQRCode"
      width="30%"
      :before-close="payOfQRCodeHandleClose"
    >
      <img
        src="data:image/png;base64,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"
        alt=""
        class="payOfQRCodeImg"
      >
      <el-button @click="payOfNext">下一步</el-button>
    </el-dialog>
  </div>
</template>

<script>
import CityPicker from '@/components/cityPicker'
import CreateHouseTypeDialog from '@/views/firstLogin/components/CreateHouseTypeDialog.vue'
import HouseTypeTable from '@/views/firstLogin/components/HouseTypeTable.vue'
import CreateHouseDialog from '@/views/firstLogin/components/CreateHouseDialog.vue'
import HouseTable from '@/views/firstLogin/components/HouseTable.vue'
import GenerateCard from '@/views/firstLogin/components/GenerateCard.vue'
import updatePasswordDialog from '@/views/firstLogin/components/UpdatePasswordDialog.vue'
import CreateHousesDialog from '@/views/firstLogin/components/CreateHousesDialog.vue'
import GenerateMaterialDialog from '@/views/firstLogin/components/GenerateMaterialDialog.vue'
import GenerateCheckInfoDialog from '@/views/firstLogin/components/GenerateCheckInfoDialog.vue'

export default {
  components: {
    CityPicker,
    CreateHouseTypeDialog,
    HouseTypeTable,
    CreateHouseDialog,
    HouseTable,
    GenerateCard,
    updatePasswordDialog,
    CreateHousesDialog,
    GenerateMaterialDialog,
    GenerateCheckInfoDialog
  },
  data() {
    let checkTel = (rule, value, callback) => {
      let reg = /^\d{3}-\d{8}$|^\d{4}-\d{8}$/g
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确的固话号码'))
      } else {
        return callback()
      }
    }
    let checkInt = (rule, value, callback) => {
      let x = String(value).indexOf('.') + 1
      let y = String(value).length - x
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (value < 0) {
        return callback(new Error('该值不能为负数'))
      } else if (isNaN(value)) {
        return callback(new Error('只能为数字'))
      } else if (y > 2 && y !== value.length) {
        return callback(new Error('仅支持两位小数'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      // 第一步
      hotelForm: {
        address: '',
        telephone: '',
        notice: '',
        invoiceQRCode: '',
        dispatching: '',
        dispatchState: true
      },
      hotelFormRules: {
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        telephone: [{ required: true, validator: checkTel, trigger: 'blur' }],
        dispatching: [{ required: true, validator: checkInt, trigger: 'blur' }]
      },
      imageUrl: '',
      province: '',
      city: '',
      area: '',
      /*
       * 第二步
       * 第三步
       */
      createHouseTypeOnState: 0,
      houseTypeTableData: [
        {
          creator: '张三',
          houseName: '尊享大床房',
          houseSize: '92m',
          badSize: '90m*90m',
          numOfPeople: '1人',
          editTime: '2020-06-03',
          editor: '张胜男'
        }
      ],
      // 第四步
      houseTableData: [
        {
          creator: '张三',

          houseID: '0506',
          numOfFloor: '5楼',
          houseName: '尊享大床房',
          telephone: '12345678',
          WIFIName: 'zhiliao',
          WIFIPWD: 'zhiliao123',
          editTime: '2020-04-22',
          editor: '张三'
        }
      ],
      createHouseOnState: 0,
      // 第五步
      loadingImgState: false,
      timer: '',
      resetTemplateState: false,

      // other
      houseTableHeight: '100',
      houseTypeTableHeight: '100',

      generateInfoData: {} // 物料基本信息
    }
  },
  computed: {
    payOfQRCode() {
      return this.$store.state.dialog.generatePayQRCodeDialogState
    }
  },
  watch: {
    loadingImgState() {
      if (this.loadingImgState) {
        this.timer = setInterval(() => {
          this.loadingImgState = false
          clearInterval(this.timer)
        }, 3000)
      }
    },
    active() {
      if (this.active === 1) {
        this.$alert(
          '扫描二维码绑定微信号，之后登入可使用微信扫一扫直接登入',
          '操作说明',
          {
            confirmButtonText: '好的'
          }
        )
      } else if (this.active === 2) {
        // 判断 houseTypeTableData 是否有数据
        this.$alert(
          '使用前必须创建一个房型，之后还可再做修改和添加。',
          '操作说明',
          {
            confirmButtonText: '好的',
            callback: action => {
              this.$store.dispatch('dialog/changeState', {
                key: 'createHouseTypeDialogState',
                value: true
              })
            }
          }
        )
        this.$nextTick(function() {
          this.houseTypeTableHeight =
            window.innerHeight - this.$refs.houseTypeTable.$el.offsetTop - 110
          window.onresize = () => {
            this.houseTypeTableHeight =
              window.innerHeight - this.$refs.houseTypeTable.$el.offsetTop - 110
          }
        })
      } else if (this.active === 3) {
        this.$alert(
          '使用前必须创建一个房间，之后还可再做修改和添加。',
          '操作说明',
          {
            confirmButtonText: '好的',
            callback: action => {
              this.$store.dispatch('dialog/changeState', {
                key: 'createHouseDialogState',
                value: true
              })
            }
          }
        )
        this.$nextTick(function() {
          this.houseTableHeight =
            window.innerHeight - this.$refs.houseTable.$el.offsetTop - 110
          window.onresize = () => {
            this.houseTableHeight =
              window.innerHeight - this.$refs.houseTable.$el.offsetTop - 110
          }
        })
        this.timer = ''
      } else if (this.active === 4) {
        this.loadingImgState = true
        this.timer = setInterval(() => {
          this.loadingImgState = false
          clearInterval(this.timer)
        }, 3000)
      }
    }
  },
  methods: {
    next() {
      if (this.active !== 3) {
        if (this.active++ > 3) this.active = 0
      } else {
        this.$store.dispatch('dialog/changeState', {
          key: 'GenerateCardDialogState',
          value: true
        })
      }
      console.log(this.active)
      switch (this.active) {
      case 0:
        console.log(this.province, this.city, this.area)
        // TODO 验证表单完整性 提交至后端
        /*
         *
         * if (this.province === '' || this.city === '' || this.area === '') {
         *   this.$message.error('酒店地址不能为空')
         *   return false
         * }
         * this.$refs.hotelForm.validate(valid => {
         *   if (valid) {
         *     alert('submit!')
         */

        /*
         *   } else {
         *     console.log('error submit!!')
         *     return false
         *   }
         * })
         */
        break
      case 1:
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
      default:
        break
      }
    },
    prev() {
      if (this.active-- < 0) this.active = 0
    },
    // 完成
    finish() {
      // TODO 跳转至登录页
      if (this.active++ > 4) this.active = 0
    },
    payOfNext() {
      if (this.active++ > 4) this.active = 0
      this.$store.dispatch('dialog/changeState', {
        key: 'generatePayQRCodeDialogState',
        value: false
      })
    },
    passwordUpdate() {
      // TODO 传入的修改密码操作
    },
    // 选择省份
    selectProvince(val) {
      this.province = val[0].label
      this.city = val[1].label
      this.area = val[2].label
    },
    // 选择城市
    seleckCity(val) {
      this.city = val[0].label
      this.area = val[1].label
    },
    // 选择区县
    selectArea(val) {
      this.area = val[0].label
    },
    beforeAvatarUpload(file) {
      // TODO 上传图片
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      // TODO 上传图片
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    saveHandle() {
      if (this.createHouseTypeOnState === 0) {
        console.log('首次保存')
      } else {
        console.log('变成更新')
      }
      // TODO 保存数据至数据库
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseTypeDialogState',
        value: false
      })
      /*
       * 先判断房型名称是否重复
       * 是：弱弹窗 显示 ‘你输入的房型名称有误，请重新输入’
       */
    },
    /* ========创建房型============= */
    // 批量删除
    houseTypesDelete() {
      // TODO 批量删除

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 新增房型
    addHouseType() {
      this.createHouseTypeOnState = 0
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseTypeDialogState',
        value: true
      })
    },
    checkHandle(val) {
      // TODO 查看
      this.createHouseTypeOnState = 1
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseTypeDialogState',
        value: true
      })
      // console.log(this.$refs.CreateHouseTypeDialog)

      this.$refs.createHouseTypeDialog.msgBoxState = false
      this.$refs.createHouseTypeDialog.form = this.houseTypeTableData[0]
    },
    updateHandle(val) {
      this.createHouseTypeOnState = 2
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseTypeDialogState',
        value: true
      })
    },
    removeHandle(val) {
      // TODO 删除
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /* ===================创建房间=============== */
    housesDelete() {
      // TODO 批量删除
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 批量新增房间
    addHouses() {
      // TODO 打开批量添加对话框
      this.$store.dispatch('dialog/changeState', {
        key: 'createHousesDialogState',
        value: true
      })
    },
    // 传入的批量新增
    addHousesHandle() {
      // 表格数据
      let createHousesTableData = this.$refs.createHousesDialog.tableData
      // TODO 数据库修改成功之后关闭对话框
      /*
       * this.$store.dispatch('dialog/changeState', {
       * key: 'createHousesDialogState',
       * value: false
       * })
       */
      console.log(createHousesTableData)
    },
    // 新增房间
    addHouse() {
      this.createHouseOnState = 0
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseDialogState',
        value: true
      })
    },
    houseCheckHandle(val) {
      // TODO 房间查看
      this.createHouseOnState = 1
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseDialogState',
        value: true
      })
      this.$refs.createHouseDialog.form = this.houseTableData[0]
    },
    houseUpdateHandle(val) {
      // TODO 房间更新事件
      this.createHouseOnState = 2
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseDialogState',
        value: true
      })
      this.$refs.createHouseDialog.form = this.houseTableData[0]
    },
    houseRemoveHandle(val) {
      // TODO 房间删除
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    createHouseSaveHandle() {
      if (this.createHouseOnState === 0) {
        console.log('首次保存')
      } else {
        console.log('变成更新')
      }
      // TODO 保存数据至数据库
      this.$store.dispatch('dialog/changeState', {
        key: 'createHouseDialogState',
        value: false
      })
    },
    // 生成台卡
    generateHandle() {
      if (this.resetTemplateState) {
        this.loadingImgState = true
        this.timer = setInterval(() => {
          this.loadingImgState = false
          clearInterval(this.timer)
        }, 3000)
      } else {
        this.$confirm(
          '选择台卡后点击完成后续则无法修改台卡模板。如后续需要修改则联系运营人员并会收取台卡模板修改费用',
          '操作说明',
          {
            confirmButtonText: '选择样式',
            cancelButtonText: '重新选择',
            type: 'warning'
          }
        )
          .then(() => {
            /*
             * if (this.active++ > 3) this.active = 0
             * TODO 打开选择方案 对话 框
             */
            this.$store.dispatch('dialog/changeState', {
              key: 'generateMaterialDialogState',
              value: true
            })
          })
          .catch(() => {
            this.$store.dispatch('dialog/changeState', {
              key: 'GenerateCardDialogState',
              value: true
            })
          })
      }
      // TODO 保存台卡信息 跳转至下一步
    },
    // 重新生成台卡
    resetTemplate() {
      this.resetTemplateState = true
      this.$store.dispatch('dialog/changeState', {
        key: 'GenerateCardDialogState',
        value: true
      })
    },
    // 平台制作
    toGenerateHandle() {
      this.$store.dispatch('dialog/changeState', {
        key: 'generateCheckInfoDialogState',
        value: true
      })
    },
    // 确认付款
    confirmPayHandle() {
      this.$store.dispatch('dialog/changeState', {
        key: 'generateCheckInfoDialogState',
        value: false
      })
      this.$store.dispatch('dialog/changeState', {
        key: 'generatePayQRCodeDialogState',
        value: true
      })
    },
    payOfQRCodeHandleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'generatePayQRCodeDialogState',
        value: false
      })
    }
  },
  mounted() {
    // TODO 检查当前账户 正在执行的步骤 修改active的值
    if (this.active === 0) {
      this.$store.dispatch('dialog/changeState', {
        key: 'updatePasswordDialog',
        value: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
#firstLogin_box {
  padding: 10px;
  width: 100%;
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .step_box {
    width: 70%;
    margin: 0 auto;
  }
  .hotel_info_box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100vh - 220px);
    justify-content: space-between;
    & > div {
      flex-basis: 49%;
      height: 50%;
      padding: 10px;
    }
    .remark {
      color: rgb(179, 179, 179);
      margin-left: 120px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .setp_two {
    width: 100%;
    height: 100%;
    height: calc(100vh - 220px);
    & > h1,
    & > img,
    & > div {
      display: block;
      padding-top: 15px;
      margin: 0px auto 30px;
      text-align: center;
    }
    & > h1 {
      font-size: 2em;
      font-weight: bold;
    }
    & > div {
      width: 20%;
      height: 10vh;
      padding: 2.2vh;
      border: 1px solid rgb(199, 199, 199);
      border-radius: 50px;
      font-size: 1rem;
    }
  }
  .step_three {
    width: 100%;
    height: 100%;
    height: calc(100vh - 220px);
    .step_three_tools {
      text-align: right;
      margin-bottom: 10px;
    }
  }
  .step_four {
    width: 100%;
    height: 100%;
    height: calc(100vh - 220px);
    .step_four_tools {
      text-align: right;
      margin-bottom: 10px;
    }
  }
  .step_five {
    width: 100%;
    height: 100%;
    height: calc(100vh - 220px);
    text-align: center;
    .loading_img {
      width: 50%;
      height: 100%;
      display: block;
      margin: 0 auto;
    }
    h1 {
      font-size: 2em;
      font-weight: bold;
      display: block;
      margin: 0px auto 30px;
      padding-top: 15px;
      text-align: center;
    }
  }
  .step_six {
    width: 100%;
    height: 100%;
    height: calc(100vh - 220px);
    text-align: center;
    .loading_img {
      width: 50%;
      height: 100%;
      display: block;
      margin: 0 auto;
    }
    h1 {
      font-size: 2em;
      font-weight: bold;
      display: block;
      margin: 0px auto 30px;
      padding-top: 15px;
      text-align: center;
    }
  }
  .btn_box {
    text-align: center;
  }
  .payOfQRCodeImg {
    margin: 0 auto;
    display: block;
    width: 50%;
  }
  .pay_info_box {
    text-align: center;
    width: 35%;
    margin: 5vh auto 0;
    background-color: rgba(238, 238, 238, 0.61);
    padding: 20px;
    table {
      width:63%;
      display: inline-block;
      tr {
        td {
          text-align: left;
          padding-bottom: 10px;
        }
        td:nth-of-type(1) {
          text-align: right;
          padding-right: 10px;
        }
      }
      .hotel_name{
        font-size: 1.25rem;
      }
      .hotel_name::after{
        content: '';
        margin-bottom: 20px;
      }
    }

  }
   .finish_img{
      width: 10%;
    }
}
</style>
