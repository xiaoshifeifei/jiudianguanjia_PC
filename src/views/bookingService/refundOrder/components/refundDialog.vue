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
        <div class="gml-10">{{cleanDetais.SerialNumber}}</div>
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
          label="下单时间"
        >
         <div class="gml-10">{{cleanDetais.CreateDate}}</div>
        </el-form-item>
        </div>
        <div class="gmt-30 gmb-10 gfw-b">报修图片</div>
        <el-carousel
        ref="repairCarousel"
        class="gmb-10"
        arrow="always"
        trigger="click"
        height="100px"
        :autoplay='false'
        indicator-position="none">
          <el-carousel-item v-for="(item,index) in newList" :key="index">
            <div class="carousel_style gdf-jc">
              <el-image  v-for="(item1,index1) in item" :key="index1" class="gw-30 gh-100" :src="item1" @click="openimge(item1)">
              </el-image>
              <div v-if="item.length===2" class="gw-30 gh-100"></div>
            </div>
          </el-carousel-item>
          <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]" />
        </el-carousel>
        <el-form-item
          label="备注"
        >
         <div class="gml-10">{{cleanDetais.Remark}}</div>
        </el-form-item>
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
          prop="SerialNumber"
          align="center"
          label="订单号"
        />
        <el-table-column
          prop="RoomNumber"
          align="center"
          label="房号"
        />
        <el-table-column
          label="用户"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.UserName }}</template>
        </el-table-column>

        <el-table-column
          prop="CreateDate"
          align="center"
          label="下单时间"
        >
        </el-table-column>
        <el-table-column
          prop="BookDate"
          align="center"
          label="预订维修时间"
        />
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus==0?'待维修':scope.row.OrderStatus==1?'已完成':scope.row.OrderStatus==-1?'已取消':'' }}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.OrderStatus==0?'------':scope.row.UpdateDate}}</template>
        </el-table-column>
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
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
  components: {
    'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
  },
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
        return this.cleanDetais.OrderStatus == 0 ? '待维修' : this.cleanDetais.OrderStatus == 1 ? '已完成' : this.cleanDetais.OrderStatus == -1 ? '已取消' : ''
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
      this.$refs.repairCarousel.setActiveItem(0)
      this.$emit('update:addEmpShow2', false)
    },
    handleDialogClose2() {
      this.$emit('update:addEmpShow1', false)
    },
    selectChanged(e) {
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
        this.$refs.repairCarousel.setActiveItem(0)
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
