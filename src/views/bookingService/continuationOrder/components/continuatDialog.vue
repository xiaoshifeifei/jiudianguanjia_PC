<template>
  <div
    id="contin_s2list"
    class="LoadingArea"
  >
    <el-dialog
      class="clean_dialog"
      :title="addOrEit"
      :before-close="handleDialogClose"
      :visible.sync="addEmpShow2"
      width="40%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item
          label="订单号"
        >
        <el-input placeholder="" v-model="cleanDetais.OrderSerialNo" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="房号"
        >
        <el-input placeholder="" v-model="cleanDetais.RoomNumber" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="用户"
        >
        <el-input placeholder="" v-model="cleanDetais.UserName" :disabled="true">
        </el-input>
        </el-form-item>

        <el-form-item
          label="下单时间"
        >
        <el-input placeholder="" v-model="cleanDetais.CreateDate" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="入住时间"
        >
        <el-input placeholder="" v-model="cleanDetais.ContinueLiveDate" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="离店时间"
        >
        <el-input placeholder="" v-model="cleanDetais.CheckOutDate" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="操作时间"
        >
        <el-input placeholder="" v-model="cleanDetais.UpdateDate" :disabled="true">
        </el-input>
        </el-form-item>
        <el-form-item
          label="状态"
        >
        <el-input placeholder="" v-model="statusClean" :disabled="true">
        </el-input>
        </el-form-item>
        <!-- <el-form-item
          label="操作时间"
        >
        <el-input placeholder="" v-model="updataClean" :disabled="true">
        </el-input>
        </el-form-item> -->
        <el-form-item
          label="操作人员"
        >
        <el-input placeholder="" v-model="cleanDetais.OperatorName" :disabled="true">
        </el-input>
        </el-form-item>
      </el-form>
      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEditAdd"
        >保存</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="导出"
      :visible.sync="addEmpShow1"
      width="80%"
      :before-close="handleDialogClose"
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
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="OrderSerialNo"
          align="center"
          label="订单号"
          min-width="180"
          :resizable="false"
        />
        <el-table-column
          prop="RoomNumber"
          align="center"
          label="房号"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          label="用户"
          align="center"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.UserName }}</template>
        </el-table-column>

        <el-table-column
          prop="CreateDate"
          align="center"
          label="下单时间"
          min-width="150"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="Tel"
          align="center"
          label="手机"
          min-width="150"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="BookDate"
          align="center"
          label="入住时间-离店时间"
          min-width="150"
          :resizable="false"
        >
        <template slot-scope="scope">{{scope.row.ContinueLiveDate}}--{{scope.row.CheckOutDate}}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"

          min-width="100"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus==0?'待处理':scope.row.OrderStatus==1?'已完成':scope.row.OrderStatus==-1?'已取消':scope.row.OrderStatus == 2?'已结单':'' }}}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
          min-width="150"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus===0?'------':scope.row.UpdateDate}}</template>
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button
          type="primary"
          @click="exportExcel()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { thirteenBitTimestamp } from '@/utils/index'
import {
  GetBookingList
} from '@/api/room-relevant'
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
    }
  },
  data() {
    return {
      addOrEit: '查看',
      input1: '',
      input2: '',
      BookingList: [],
      StartTime: '',
      form: {
        RoomID: '',
        RoomNumber: '',
        StartTime: ''
      },
      rules: {
        // 校验
        RoomID: [
          {
            required: true,
            message: '请选择楼层',
            trigger: 'blur'
          }
        ],
        RoomNumber: [
          {
            required: true,
            message: '请选择房号',
            trigger: 'blur'
          }
        ],
        StartTime: [
          {
            required: true,
            message: '请选择清扫时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    statusClean: {
      get() {
        return this.cleanDetais.OrderStatus == 0 ? '待处理' : this.cleanDetais.OrderStatus == 1 ? '已完成' : this.cleanDetais.OrderStatus == -1 ? '已取消' :  this.cleanDetais.OrderStatus == 2 ? '已结单' : ''
      },
      set(val) {
        this.cleanDetais.OrderStatus = val
      }
    },
    updataClean: {
      get() {
        return this.cleanDetais.OrderStatus == 0 ? '------' : this.cleanDetais.UpdateDate
      },
      set(val) {
        this.cleanDetais.UpdateDate = val
      }
    }
  },
  created() {
    // this.getbookingtolist()
  },
  methods: {
    handleDialogClose() {
      this.$emit('update:addEmpShow1', false)
      this.$emit('update:addEmpShow2', false)
    },
    selectChanged(e) {
      console.log(this.form.RoomID)
      console.log(e)
    },
    saveEditAdd() {
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

      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      // eslint-disable-next-line camelcase
      this.$emit('update:addEmpShow1', false)

      let tittle = thirteenBitTimestamp(new Date().getTime()) + '续住订单.xlsx'
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
    }
  }
}
</script>

<style lang='less'>
#contin_s2list {
  .clean_dialog .el-dialog {
    margin: 10vh auto !important;
    height: 70vh;
    min-height: 600px;
    // overflow-y: scroll;
  }

  .clean_dialog .el-dialog__body {
   width: 100% !important;
      table-layout: fixed !important;
      padding: 0;
      //z-index: 1;
      height: 85%;
      overflow-y: scroll;
      padding: 0 40px;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }

}

.container {
  padding: 20px;
  background: #fff;
  min-width: 500px;
}

</style>
