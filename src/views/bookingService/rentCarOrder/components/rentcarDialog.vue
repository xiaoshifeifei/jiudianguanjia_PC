<template>
  <div
    id="repair_s2list"
    class="LoadingArea"
  >
    <el-dialog
      class="clean_dialog"
      :title="addOrEit"
      :before-close="handleDialogClose1"
      :visible.sync="addEmpShow2"
      width="40%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <div class="gw-60 g-center">
          <el-form-item
          label="订单号"
        >
        <div class="gml-10">{{cleanDetais.OrderSerialNo}}</div>
        </el-form-item>
          <el-form-item
          label="房号"
        >
        <div class="gml-10">{{cleanDetais.RoomNumber}}</div>
        </el-form-item>
        <el-form-item
          label="用户"
        >
        <div class="gml-10">{{cleanDetais.UserName}}</div>
        </el-form-item>
        <el-form-item
          label="手机"
        >
         <div class="gml-10">{{cleanDetais.Tel}}</div>
        </el-form-item>
        <el-form-item
          label="租赁物品"
        >
         <div class="gml-10">{{cleanDetais.GoodsName}}</div>
        </el-form-item>
        <el-form-item
          label="租车车牌"
        >
         <div class="gml-10">{{cleanDetais.CarNumber}}</div>
        </el-form-item>
        <el-form-item
          label="订单状态"
        >
         <div class="gml-10">{{statusClean}}</div>
        </el-form-item>
        <el-form-item
          label="租车时间"
        >
         <div class="gml-10">{{cleanDetais.RentBeginDate}}</div>
        </el-form-item>
        <el-form-item
          label="租车图片"
        >
         <div class="gml-10 gw-40p gh-40p">
           <el-image class="table-td-thumb" :src="cleanDetais.CoverImgUrl" :preview-src-list="[cleanDetais.CoverImgUrl]">
            </el-image>
         </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
              type="textarea"
              readonly
              :rows="4"
              :value="cleanDetais.Remark"
            ></el-input>
        </el-form-item>
        <el-form-item label="取消订单" v-show="cleanDetais.OrderStatus === -1">
            <el-input
              type="textarea"
              readonly
              :rows="4"
              :value="cleanDetais.CancelRemark"
            ></el-input>
        </el-form-item>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <!-- <el-button @click="handleDialogClose1">取 消</el-button> -->
        <el-button
          type="primary"
          @click="saveEditAdd(1)"
        >确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导出"
      :visible.sync="addEmpShow1"
      width="80%"
      :before-close="handleDialogClose2"
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
          prop="CarNumber"
          align="center"
          label="租赁车辆"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          label="车牌号"
          align="center"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.GoodsName }}</template>
        </el-table-column>

        <el-table-column label="租车图片" align="center" width="100" :resizable="false">
          <template slot-scope="scope">
            <div class="gt-hide-2">
              {{scope.row.CoverImgUrl}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="RentPrice"
          align="center"
          label="租金/天"
          min-width="150"
          :resizable="false"
        />
        <el-table-column
          prop="RentBeginDate"
          align="center"
          label="租车时间"
          min-width="150"
          :resizable="false"
        />
        <el-table-column
          prop="RentEndDate"
          align="center"
          label="归还时间"
          min-width="150"
          :resizable="false"
        />
        <el-table-column
          label="状态"
          align="center"

          min-width="100"
          :resizable="false"
        >
        <template slot-scope="scope">
          {{scope.row.Status==0?'待租赁'
            :scope.row.Status==1?'已租赁'
            :scope.row.Status==-1?'已取消'
            :scope.row.Status==2?'已归还'
            :scope.row.Status==3?'已接受'
            :'' }}</template>
        </el-table-column>
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
          min-width="150"
          :resizable="false"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleDialogClose2">取 消</el-button>
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
      url: '',
      showViewer: false,
      newList: '',
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
        return this.cleanDetais.Status == 1 ? '已租赁' : this.cleanDetais.Status == -1 ? '已取消' : this.cleanDetais.Status == 2 ? '已归还' : this.cleanDetais.Status == 0 ? '待租赁' : ''
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
    console.log(11)
  },
  methods: {
    openimge(img) {
      this.url = img
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    },
    handleDialogClose1() {
      this.newList = []
      this.$emit('update:addEmpShow2', false)
    },
    handleDialogClose2() {
      this.$emit('update:addEmpShow1', false)
    },
    selectChanged(e) {
      console.log(5555555)
      console.log(this.form.RoomID)
      console.log(e)
    },
    imgCount() {
      this.newList = []
      let temList = []
      for (let index = 0; index < this.cleanDetais.ImgUrls.length; index++) {
        if ((index + 1) % 3 === 0) {
          temList.push(this.cleanDetais.ImgUrls[index])
          this.newList.push(temList)
          temList = []
        } else {
          temList.push(this.cleanDetais.ImgUrls[index])
        }
        if (index + 1 === this.cleanDetais.ImgUrls.length) {
          this.newList.push(temList)
        }
      }
    },
    saveEditAdd(type) {
      let that = this
      if (type == 1) {
        this.newList = []
        this.$emit('update:addEmpShow2', false)
      } else {
        let failedFields = {}
        this.$refs.form.validate((validate, invalidFields) => {
          if (!validate) {
            failedFields = invalidFields
          }
        })
        let obj = {}
        for (obj in failedFields) {
          return
        }
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

      let tittle = thirteenBitTimestamp(new Date().getTime()) + '维修订单.xlsx'
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
#repair_s2list {
  .clean_dialog .el-dialog {
    margin: 10vh auto !important;
    height: 70vh;
    min-height: 600px;
    min-width: 700px;
  }

  .clean_dialog .el-dialog__body {
   width: 100% !important;
      table-layout: fixed !important;
      height: 80%;
      overflow-y: scroll;
      padding: 0 40px;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
  .clean_dialog .el-dialog__footer{
    text-align: center;
  }
.el-carousel__item .carousel_style {
    margin: 0 auto;
    width: 70%;
    height: 100%;
  }

}
.el-dialog__headerbtn {
    font-size: 22px;
}
.container {
  padding: 20px;
  background: #fff;
  min-width: 500px;
}
</style>
