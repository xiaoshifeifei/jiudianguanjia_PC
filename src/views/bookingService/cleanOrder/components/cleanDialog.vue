<template>
  <div id="clean_s2list" class="LoadingArea">
    <el-dialog
      class="clean_dialog"
      title="查看"
      :before-close="handleDialogClose1"
      :visible.sync="addEmpShow2"
      width="35%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <div class="gw-90 g-center">
          <el-form-item label="用户" prop="UserName" class="">
            <el-input
              style="width:70%"
              class=""
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
              :disabled="true"
              maxlength="10"
              placeholder=""
              v-model="form.UserName"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="楼层数" prop="FloorNumber">
            <el-select
              class=""
              :disabled="true"
              style="margin-right: 20px;width:70%"
              v-model="form.FloorNumber"
              @change="selectChanged($event)"
              placeholder="选择楼层数"
            >
              <el-option
                v-for="item1 in BookingList.HotelRoomFloor"
                :key="item1"
                :label="item1"
                :value="item1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房号" prop="RoomID">
            <el-select
              class=""
              :disabled="true"
              style="margin-right: 20px;width:70%"
              v-model="form.RoomNumber"
              @change="selectChanged1($event)"
              placeholder="选择房号"
            >
              <el-option
                v-for="item1 in BookingListRoom"
                :key="item1.RoomID"
                :label="item1.RoomNumber"
                :value="item1.RoomID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清扫时间" prop="BookDate">
            <el-col :span="11" class="" style="width:70% !important">
              <el-date-picker
                :disabled="true"
                v-model="form.BookDate"
                type="datetime"
                placeholder="选择清扫时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-col :span="11" class="" style="width:70% !important">
              <el-input :value="form.Remark" disabled :rows="2" type="textarea">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="取消备注" v-show="form.OrderStatus === -1">
            <el-col :span="11" class="" style="width:70% !important">
              <el-input
                :value="form.CancelRemark"
                disabled
                :rows="2"
                type="textarea"
              >
              </el-input>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div class="gtc">
          <el-button @click="handleDialogClose1">关闭</el-button>
        </div>
        <!-- <el-button
          type="primary"
          @click="saveEditAdd"
        >保存</el-button> -->
      </span>
    </el-dialog>
    <el-dialog
      class="clean_dialog"
      title="新建清扫订单"
      :before-close="handleDialogClose2"
      :visible.sync="addEmpShow3"
      width="35%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <div class="gw-90 g-center">
          <el-form-item label="用户" prop="UserName" class="">
            <el-input
              style="width:70%"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
              placeholder=""
              maxlength="10"
              v-model="form.UserName"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="楼层数" prop="FloorNumber">
            <el-select
              class="gw-70"
              style="margin-right: 20px;"
              v-model="form.FloorNumber"
              @change="selectChanged($event)"
              placeholder="选择楼层数"
            >
              <el-option
                v-for="item1 in BookingList.HotelRoomFloor"
                :key="item1"
                :label="item1"
                :value="item1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房号" prop="RoomID">
            <el-select
              class="gw-70"
              v-if="form.FloorNumber == ''"
              style="margin-right: 20px;"
              v-model="form.RoomID"
              @change="selectChanged1($event)"
              :disabled="true"
              placeholder="请先选择楼层数"
            >
              <el-option
                v-for="item1 in BookingListRoom"
                :key="item1.RoomID"
                :label="item1.RoomNumber"
                :value="item1.RoomID"
              ></el-option>
            </el-select>
            <el-select
              class="gw-70"
              v-if="form.FloorNumber != ''"
              style="margin-right: 20px;"
              v-model="form.RoomID"
              @change="selectChanged1($event)"
              placeholder="选择房号"
            >
              <el-option
                v-for="item1 in BookingListRoom"
                :key="item1.RoomID"
                :label="item1.RoomNumber"
                :value="item1.RoomID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清扫时间" prop="BookDate">
            <el-col :span="11" style="width:70%">
              <el-date-picker
                v-model="form.BookDate"
                type="datetime"
                placeholder="选择清扫时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                align="center"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer ">
        <div class="gdf-jc ">
          <el-button @click="handleDialogClose2" style="width:100px"
            >取 消</el-button
          >
          <el-button type="primary" style="width:100px" @click="saveEditAdd"
            >创建订单</el-button
          >
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="导出"
      :visible.sync="addEmpShow1"
      width="80%"
      :before-close="handleDialogClose3"
    >
      <el-table
        id="table_out"
        ref="multipleTable"
        :data="tableData"
        border
        class="table"
        height="300"
        header-cell-class-name="table-header"
        style="width: 100%;margin:30px auto 0 auto;"
      >
        <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
        <el-table-column label="序号" type="index" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="SerialNumber" align="center" label="订单号" />
        <!-- <el-table-column label="权益图片" align="center" width="100">
          <template slot-scope="scope">
            <div>'http://h.capasky.com/uploads/s2/goods/202005/26/c9196fda4ffc432ac64d536c9696123e.jpg'</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="RoomNumber" align="center" label="房号" />
        <el-table-column label="用户" align="center">
          <template slot-scope="scope">{{ scope.row.UserName }}</template>
        </el-table-column>

        <el-table-column prop="CreateDate" align="center" label="下单时间">
        </el-table-column>
        <el-table-column prop="BookDate" align="center" label="预订清扫时间" />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{
            scope.row.OrderStatus == 0
              ? "待清扫"
              : scope.row.OrderStatus == 1
              ? "已完成"
              : scope.row.OrderStatus == -1
              ? "已取消"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="scope">{{
            scope.row.OrderStatus == 0 ? "------" : scope.row.UpdateDate
          }}</template>
        </el-table-column>
        <el-table-column prop="OperatorName" align="center" label="操作人员" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose3">取 消</el-button>
        <el-button type="primary" @click="exportExcel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { thirteenBitTimestamp } from '@/utils/index'
import { GetBookingList, AddBooking } from '@/api/room-relevant'
export default {
  name: 'Basetable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    cleanDetais: {
      type: [Object, Array]
    },
    addEmpShow1: {
      type: Boolean,
      default: false
    },
    addEmpShow2: {
      type: Boolean,
      default: false
    },
    addEmpShow3: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let checkSymbols = (rule, value, callback) => {
      let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      if (!value) {
        return callback()
      } else if (reg.test(value)) {
        return callback(new Error('存在非法字符'))
      }
    }

    let checkBookDate = (rule, value, callback) => {
      const val = value.substring(11)
      if (val.slice(0, 2) < 5 || val.slice(0, 2) > 18) {
        return callback(new Error('服务时间是  05 : 30 - 18 : 30'))
      }
      if (val.slice(0, 2) == 5 && val.slice(3, 5) < 30) {
        return callback(new Error('服务时间是  05 : 30 - 18 : 30'))
      }

      if (val.slice(0, 2) == 18 && val.slice(3, 5) > 30) {
        return callback(new Error('服务时间是  05 : 30 - 18 : 30'))
      }
    }

    return {
      BookingList: [],
      BookingListRoom: [],
      form: {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        BookDate: ''
      },
      rules: {
        // 校验
        UserName: [
          {
            required: true,
            message: '用户不能为空',
            trigger: 'blur'
          },
          {
            validator: checkSymbols
          }
        ],
        FloorNumber: [
          {
            required: true,
            message: '请选择楼层数',
            trigger: 'blur'
          }
        ],
        RoomID: [
          {
            required: true,
            message: '请选择房号',
            trigger: 'blur'
          }
        ],
        BookDate: [
          {
            required: true,
            message: '请选择清扫时间',
            trigger: 'blur'
          },
          {
            validator: checkBookDate
          }
        ]
      }
    }
  },
  computed: {
    statusClean: {
      get() {
        return this.cleanDetais.OrderStatus == 0
          ? '待清扫'
          : this.cleanDetais.OrderStatus == 1
            ? '已完成'
            : this.cleanDetais.OrderStatus == -1
              ? '已取消'
              : ''
      },
      set(val) {
        this.cleanDetais.OrderStatus = val
      }
    },
    updataClean: {
      get() {
        return this.cleanDetais.OrderStatus == 0
          ? '------'
          : this.cleanDetais.UpdateDate
      },
      set(val) {
        this.cleanDetais.UpdateDate = val
      }
    }
  },
  created() {
    this.getbookingtolist()
  },
  methods: {
    handleDialogClose1() {
      this.$emit('update:addEmpShow2', false)
      this.$refs.form.resetFields()
      this.form = {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        BookDate: ''
      }
    },
    handleDialogClose2() {
      this.$emit('update:addEmpShow3', false)
      this.$refs.form.resetFields()
      this.form = {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        BookDate: ''
      }
    },
    handleDialogClose3() {
      // this.$refs.form.resetFields()
      this.$emit('update:addEmpShow1', false)
      // this.$emit('myMeth')
    },
    selectChanged(e) {
      console.log(e)
      console.log(this.BookingList)
      this.form.RoomID = ''
      this.BookingListRoom = this.BookingList.HotelRoom[e]
      console.log(this.BookingListRoom)
    },
    selectChanged1(e) {
      console.log('RoomNumber')
      console.log(e)
      console.log(this.BookingListRoom)
      this.BookingListRoom.forEach((m, i) => {
        if (m.RoomID === e) {
          this.form.RoomNumber = m.RoomNumber
        }
      })
      console.log(this.form.RoomID)
      console.log(this.form.RoomNumber)
    },
    async saveEditAdd() {
      console.log('this.form.BookDate', this.form.BookDate)
      let that = this
      let failedFields = {}
      this.$refs.form.validate((validate, invalidFields) => {
        if (!validate) {
          failedFields = invalidFields
        }
      })
      let obj = {}
      for (obj in failedFields) {
        // this.$refs[obj].focus();
        return
      }
      let result = await AddBooking({
        UserName: this.form.UserName,
        RoomID: this.form.RoomID,
        RoomNumber: this.form.RoomNumber,
        FloorNumber: this.form.FloorNumber,
        BookDate: this.form.BookDate
      })

      if (result.code != 0) return
      this.$emit('needChange')
      this.$emit('update:addEmpShow3', false)
      this.$refs.form.resetFields()
      this.form = {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        BookDate: ''
      }
    },
    async getbookingtolist() {
      let result = await GetBookingList({})
      console.log(result)
      this.BookingList = result.data
    },
    // 导出
    exportExcel() {
      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = ''
      wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      console.log(wb)
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      console.log(wbout)
      // eslint-disable-next-line camelcase
      this.$emit('update:addEmpShow1', false)

      let tittle = thirteenBitTimestamp(new Date().getTime()) + '清扫订单.xlsx'
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          tittle
        ) // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      history.go(0)
    }
  }
}
</script>

<style lang="less">
#clean_s2list {
  .clean_dialog .el-dialog {
    min-width: 650px;
    // overflow-y: scroll;
  }

  .clean_dialog .el-dialog__body {
    overflow: hidden;
    height: 50%;
    overflow-y: scroll;
    padding: 40px 40px;
  }
  .el-form-item__content {
    line-height: 50px;
  }
  .el-form-item__label {
    line-height: 50px;
  }
  .clean_dialog .el-dialog__footer {
    width: 60%;
    margin: auto;
  }
  // .timecom .el-input__inner{
  //   width: 300px !important;
  // }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
  .newElinput .el-input {
    width: 50% !important;
  }
}

.container {
  padding: 20px;
  background: #fff;
  min-width: 500px;
}
.el-time-spinner__wrapper {
  max-height: 207px;
}
</style>
