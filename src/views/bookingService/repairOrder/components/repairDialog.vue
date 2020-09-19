<template>
  <div
    id="repair_s2list"
    class="LoadingArea"
  >
    <el-dialog
      class="clean_dialog"
      title="查看"
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
        <!-- <el-form-item
          label="手机"
        >
         <div class="gml-10">{{cleanDetais.Tel}}</div>
        </el-form-item> -->
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
        <div class="gtc">
          <el-button
          type="primary"
          @click="saveEditAdd(1)"
        >确定</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      class="clean_dialog"
      title="新建维修订单"
      :before-close="handleDialogClose2"
      :visible.sync="addEmpShow3"
      width="30%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item
          label="用户"
          prop="UserName"
           class=""
        >
        <div class="gw-60">
          <el-input class="gw-100" placeholder="" maxlength="15" v-model="form.UserName">
        </el-input>
        </div>
        </el-form-item>
        <el-form-item
          label="楼层数"
          prop="FloorNumber"
        >
         <div class="gw-60">
           <el-select class="gw-100" style="margin-right: 20px;" v-model="form.FloorNumber" @change="selectChanged($event)" placeholder="选择楼层数">
					<el-option v-for="item1 in BookingList.HotelRoomFloor" :key="item1" :label="item1" :value="item1"></el-option>
				</el-select>
         </div>
        </el-form-item>
        <el-form-item
          label="房号"
          prop="RoomID"
        >
         <div class="gw-60">
           <el-select class="gw-100" v-if="form.FloorNumber==''" style="margin-right: 20px;" v-model="form.RoomID" @change="selectChanged1($event)" :disabled="true" placeholder="请先选择楼层数">
					<el-option v-for="item1 in BookingListRoom" :key="item1.RoomID" :label="item1.RoomNumber" :value="item1.RoomID"></el-option>
				</el-select>
        <el-select class="gw-100" v-if="form.FloorNumber!=''" style="margin-right: 20px;" v-model="form.RoomID" @change="selectChanged1($event)" placeholder="选择房号">
					<el-option v-for="item1 in BookingListRoom" :key="item1.RoomID" :label="item1.RoomNumber" :value="item1.RoomID"></el-option>
				</el-select>
         </div>
        </el-form-item>
        <el-form-item
          label="图片"
        >
        <el-upload
          action
          ref="upload"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :http-request="handleUpload"
          :on-change="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="imgArray" alt="">
        </el-dialog>
        <div class="gc-888 gfs-12">请上传JPG、JPEG、PNG、GIF、BMP格式的图片并且小于500k，最多上传5张</div>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="Remark"
        >
        <el-input type="textarea" :rows="3" placeholder="" maxlength="50" show-word-limit v-model="form.Remark">
        </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="gdf-jc">
          <el-button @click="handleDialogClose2"  style="width:100px">取 消</el-button>
        <el-button
          type="primary"
           style="width:100px"
          @click="saveEditAdd(2)"
        >创建订单</el-button>
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
        <!-- <el-table-column
          prop="BookDate"
          align="center"
          label="预订维修时间"
        /> -->
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
        <el-button @click="handleDialogClose3">取 消</el-button>
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
  GetBookingList,
  AddRepair,
  uploadRepair
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
    },
    addEmpShow3: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let checkSymbols = (rule, value, callback) => {
      let regt = /^\S*$/
      let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      if (!value) {
        return callback()
      } else if (reg.test(value)) {
        return callback(new Error('存在非法字符'))
      } else if (!regt.test(value)) {
        return callback(new Error('存在非法字符'))
      }
    }
    return {
      url: '',
      showViewer: false,
      dialogVisible: false,
      newList: '',
      BookingList: [],
      BookingListRoom: [],
      imgArray: [],
      form: {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        Remark: '',
        ImgUrls: []
      },
      rules: {
        // 校验
        UserName: [
          {
            required: true,
            message: '用户不能为空',
            trigger: 'blur'
          }, {
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
        Remark: [
          {
            required: true,
            message: '请添加备注',
            trigger: 'blur'
          }, {
            validator: checkSymbols
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
    this.getbookingtolist()
  },
  methods: {
    openimge(img) {
      this.url = img
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.form.ImgUrls.splice(this.form.ImgUrls.indexOf(file.raw), 1)
    },
    handleUpload(file) {
      console.log(file)
    },
    handleSuccess(file, fileList) {
      let that = this
      console.log(file)
      this.form.ImgUrls.push(file.raw)
      /*
       * const _URL = window.URL || window.webkitURL
       * this.imgArray.push(_URL.createObjectURL(file.raw.url))
       */
    },
    beforeAvatarUpload(file) {
      let isJPG = false
      let imglength = true
      console.log('上传验证')
      switch (file.type) {
      case 'image/png':
        isJPG = true
        break
      case 'image/jpeg':
        isJPG = true
        break
      case 'image/jpg':
        isJPG = true
        break
      case 'image/gif':
        isJPG = true
        break
      case 'image/bmp':
        isJPG = true
        break
      default:
        isJPG = false
        break
      }
      const isLt2M = file.size / 500 / 500 < 2
      if (!isJPG) {
        this.$message('上传图片只能是 JPG/PNG/JPEG/BMP/GIF 格式!')
      }
      if (!isLt2M) {
        console.log('图片大小验证')
        this.$message('上传封面图片大小不能大于500kb')
      }
      console.log(this.form.ImgUrls.length)

      if (this.form.ImgUrls.length > 5) {
        imglength = false
        this.$message('最多只能上传5张图片')
      }

      return isJPG && isLt2M && imglength
    },
    selectChanged(e) {
      console.log(e)
      this.form.RoomID = ''
      this.BookingListRoom = this.BookingList.HotelRoom[e]
      console.log(this.BookingListRoom)
    },
    selectChanged1(e) {
      console.log('RoomNumber')
      console.log(e)
      this.BookingListRoom.forEach((m, i) => {
        if (m.RoomID === e) {
          this.form.RoomNumber = m.RoomNumber
        }
      })
      console.log(this.form.RoomID)
      console.log(this.form.RoomNumber)
    },
    handleDialogClose1() {
      this.newList = []
      this.$refs.repairCarousel.setActiveItem(0)
      this.$emit('update:addEmpShow2', false)
    },
    handleDialogClose2() {
      this.$emit('update:addEmpShow3', false)
      this.$refs.form.resetFields()
      this.$refs.upload.clearFiles()
      this.imgArray = []
      this.form = {
        UserName: '',
        RoomID: '',
        RoomNumber: '',
        FloorNumber: '',
        ImgUrls: [],
        Remark: ''
      }
    },
    handleDialogClose3() {
      this.$emit('update:addEmpShow1', false)
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
    async saveEditAdd(type) {
      let that = this
      if (type === 1) {
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
        // this.$refs[obj].focus();
          return
        }
        let newImages = ''
        if (this.form.ImgUrls != '') {
          let imgFilesObj = new FormData()
          this.form.ImgUrls.forEach((item, index) => {
            imgFilesObj.append(`ImgFiles[${index}]`, item)
          })
          console.log(imgFilesObj)
          let uploadresult = await uploadRepair(imgFilesObj)

          if (uploadresult.code != 0) return
          console.log(uploadresult)
          newImages = uploadresult.data.ImgUrls
        } else {
          newImages = this.form.ImgUrls
        }


        let result = await AddRepair({
          UserName: this.form.UserName,
          RoomID: this.form.RoomID,
          RoomNumber: this.form.RoomNumber,
          FloorNumber: this.form.FloorNumber,
          ImgUrls: newImages,
          Remark: this.form.Remark
        })
        if (result.code != 0) return
        this.$emit('needChange')
        this.$emit('update:addEmpShow3', false)
        this.$refs.form.resetFields()
        this.$refs.upload.clearFiles()
        this.imgArray = []
        this.form = {
          UserName: '',
          RoomID: '',
          RoomNumber: '',
          FloorNumber: '',
          ImgUrls: '',
          Remark: ''
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
      padding: 30px 40px;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
  .clean_dialog .el-dialog__footer{
    width: 60%;
    margin: auto;
  }
.el-carousel__item .carousel_style {
    margin: 0 auto;
    width: 70%;
    height: 100%;
  }
  .newElinput .el-input {
    width: 50% !important;
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
