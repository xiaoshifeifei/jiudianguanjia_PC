<template>
  <div id="apart_s2list" class="LoadingArea">
    <div class="container">
      <div ref="tableTop" class="gdf-fjw gmb-5">
        <div class>
          <el-input
            v-model="keyword"
            clearable
            placeholder="楼层号/房号/房型名称"
            class="handle-input gmr-5 gmv-3"
          />
          <el-button
            class="gmv-3 golbal-btn m-l10"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
            >查询</el-button
          >
          <el-button
            class="gmv-3 golbal-btn-reset m-l10"
            type="primary"
            icon="el-icon-refresh-right"
            @click="cleanSearch"
            >重置条件</el-button
          >
        </div>
        <div class="gmv-5">
          <el-button
            type="primary"
            icon="el-icon-delete"
            class="golbal-btn"
            @click="DelroomtypeM()"
            :disabled="isDisabled"
            >批量删除</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-download"
            class="golbal-btn"
            @click="addPutout(1)"
            :disabled="isAddPutout"
            >批量导出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-plus"
            class="golbal-btn"
            @click="addPutout(2)"
            >批量新增</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="golbal-btn"
            @click="AddNewRoom()"
            >创建房间</el-button
          >
        </div>
      </div>
      <el-table
        ref="table"
        :data="tableData"
        border
        class="table"
        :height="tableHeight"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"
          :resizable="false"
        />
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ (pc.PageNo - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="RoomNumber"
          align="center"
          label="房号"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          label="楼层"
          align="center"
          min-width="120"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.RoomFloor }}</template>
        </el-table-column>

        <el-table-column
          prop="Model"
          align="center"
          label="房型名称"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          prop="WiFiName"
          align="center"
          label="WIFI名称"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          prop="WiFiPwd"
          align="center"
          label="WIFI密码"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          prop="UpdateDate"
          align="center"
          label="编辑时间"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          prop="OperatorName"
          align="center"
          label="操作人员"
          min-width="120"
          :resizable="false"
        />
        <el-table-column
          label="二维码"
          align="center"
          min-width="100"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.QrCodeUrl.substring(0, 4) !== 'null'"
              class="table-td-thumb"
              :src="scope.row.QrCodeUrl"
              :preview-src-list="[scope.row.QrCodeUrl]"
            ></el-image>
            <div v-else>加载中</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="150"
          align="center"
          class-name="small-padding fixed-width"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="EitNewRoom(scope.$index, scope.row.RoomID)"
              >编辑</el-button
            >
            <el-button
              style="color:red"
              type="text"
              @click="
                Delroomtype(
                  scope.$index,
                  scope.row.RoomID,
                  scope.row.RoomNumber
                )
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 0 0">
        <el-pagination
          background
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          :current-page="pc.PageNo"
          layout="total, sizes,prev, pager, next, jumper"
          :total="pc.Total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-table
      id="table_out"
      ref="multipleTable"
      :data="multipleSelectionAll"
      border
      class="table"
      height="300"
      header-cell-class-name="table-header"
      style="width: 100%;margin:30px auto 0 auto;display:none"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="RoomNumber"
        align="center"
        label="房号"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        label="楼层"
        align="center"
        min-width="120"
        :resizable="false"
      >
        <template slot-scope="scope">{{ scope.row.RoomFloor }}</template>
      </el-table-column>

      <el-table-column
        prop="Model"
        align="center"
        label="房型名称"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        prop="WiFiName"
        align="center"
        label="WIFI名称"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        prop="WiFiPwd"
        align="center"
        label="WIFI密码"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        prop="UpdateDate"
        align="center"
        label="编辑时间"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        prop="OperatorName"
        align="center"
        label="操作人员"
        min-width="120"
        :resizable="false"
      />
      <el-table-column
        label="二维码"
        align="center"
        min-width="120"
        :resizable="false"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.QrCodeUrl }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="apart_dialog"
      title="创建房间"
      :before-close="handleDialogClose1"
      :visible.sync="editVisibleAdd"
      width="40%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <!-- <el-form-item label="操作人">
          <div>{{username}}</div>
        </el-form-item>-->
        <el-form-item label="房间名称" prop="RoomTypeID">
          <el-select
            style="margin-right: 20px;width:70%"
            @change="selectChanged($event)"
            clearable
            v-model="form.RoomTypeID"
            placeholder="请选择房间名称"
            filterable
            :filter-method="dataFilter"
          >
            <el-option
              v-for="item in roomNameList"
              :key="item.RoomTypeID"
              :label="item.RoomTypeName"
              :value="item.RoomTypeID"
            ></el-option>
          </el-select>
          <div class="mysty" @click="greatFan">
            点我创建房型
          </div>
        </el-form-item>
        <el-form-item label="楼层数" prop="RoomFloor">
          <el-input
            v-model="form.RoomFloor"
            placeholder="输入楼层数"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="房号" prop="RoomNumber">
          <el-input
            v-model="form.RoomNumber"
            placeholder="请输入房号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="WIFI 名称" prop="WiFiName">
          <el-input
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
            maxlength="15"
            v-model="form.WiFiName"
            placeholder="输入WIFI名称"
            type="type"
          />
        </el-form-item>
        <el-form-item label="WIFI 密码" prop="WiFiPwd">
          <el-input
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
            maxlength="15"
            v-model="form.WiFiPwd"
            placeholder="输入WIFI密码"
            type="type"
          />
        </el-form-item>
        <el-form-item label="二维码编码" prop="SerialNumber">
          <el-input
            v-if="addOrEit === '添加'"
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
            v-model="form.SerialNumber"
            placeholder="输入房间二维码编码"
            type="type"
          />
          <el-input
            v-if="addOrEit === '编辑'"
            :disabled="true"
            v-model="form.SerialNumber"
            placeholder
            type="type"
          />
        </el-form-item>
        <div style="width:64%;margin:auto;color:red;font-size:12px">如不输入房间二维码系统默认自动生成</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose1">取 消</el-button>
        <el-button type="primary" @click="saveEditAdd">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="apart_dialog"
      title="导出"
      :before-close="handleDialogClose2"
      :visible.sync="editVisibleAdd1"
      width="30%"
    >
      <el-form ref="formExport" :model="form" label-width="120px">
        <div class="gfw-b gmv-10">
          请选择导出数据(共{{ multipleSelectionAll.length }}条)
        </div>
        <el-select v-model="selectExport" class>
          <el-option key="1" label="房间数据表" value="1"></el-option>
          <el-option key="2" label="房间二维码" value="2"></el-option>
        </el-select>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose2">取消</el-button>
        <el-button type="primary" @click="saveExport">导出</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量添加"
      class="importfClass"
      :before-close="handleDialogClose3"
      :visible.sync="addHotelShow"
      width="90%"
      lock-scroll
    >
      <div class="gdf-c">
        <el-button type="primary" style="margin-right: 30px;">
          <input
            ref="upload"
            type="file"
            @change="importf(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </el-button>
        <div>
          <div>下载导入模板：</div>
          <div
            @click="batchExport"
            style="color: darkcyan
          ;cursor: pointer;"
          >
            房间导入模板下载
          </div>
        </div>
      </div>
      <el-table
        id="table_out"
        :data="excelData"
        border
        class="table"
        height="300"
        ref="excelData"
        header-cell-class-name="table-header"
        style="width: 100%;margin:30px auto 0 auto;"
      >
        <el-table-column :resizable="false" prop label="数据说明">
          <template slot-scope="scope">
            <div style="color: #ff0000;">{{ scope.row.err_msg }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="ID"
          label="序列号"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="RoomNumber"
          label="房号"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="RoomFloor"
          label="楼层数"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="Model"
          label="房型名称"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="WiFiName"
          label="WIFI名称"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="WiFiPwd"
          label="WIFI密码"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="SerialNumber"
          label="二维码编码"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose3">取 消</el-button>
        <el-button type="primary" @click="pushHotel">确定导入</el-button>
        <!-- <el-button type="primary" @click="printBtn">打印</el-button> -->
      </span>
      <div class="h14"></div>
    </el-dialog>

    <!-- 点击创建房型弹窗start -->、
    <el-dialog
      ref="form"
      class="house_dialog"
      title="创建房间"
      :before-close="handleDialogCloseVisible"
      :visible.sync="VisibleAdd"
      width="35%"
    >
      <el-form
        ref="myForm"
        :rules="myRules"
        :model="myForm"
        label-width="120px"
      >
        <!-- <el-form-item label="操作人">
          <div>{{username}}</div>
        </el-form-item> -->
        <el-form-item label="房型名称" prop="RoomTypeName">
          <el-input
            v-model="myForm.RoomTypeName"
            maxlength="25"
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
            placeholder="请输入房型名称"
          />
        </el-form-item>
        <el-form-item label="适住人数" prop="CustomerCount">
          <el-input
            placeholder="输入房型适住人数"
            maxlength="5"
            v-model="myForm.CustomerCount"
          />
        </el-form-item>
        <div class="gdf-c">
          <el-form-item label="床型大小" prop="BedSizeL">
            <el-input
              placeholder="输入床型长度"
              maxlength="5"
              v-model="myForm.BedSizeL"
            >
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
          <div class="gmh-5" style="height:40px">X</div>
          <el-form-item class="newElItem" label="" prop="BedSizeW">
            <el-input
              placeholder="输入床型宽度"
              maxlength="5"
              v-model="myForm.BedSizeW"
            >
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="房间大小" prop="RoomSize">
          <el-input
            placeholder="输入房间大小"
            maxlength="10"
            v-model="myForm.RoomSize"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCloseVisible">取 消</el-button>
        <el-button type="primary" @click="saveEditAddFan">保存</el-button>
      </span>
    </el-dialog>

    <!-- 点击创建房型弹窗end -->
  </div>
</template>
<script>
import { thirteenBitTimestamp } from '@/utils/index'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {
  AddHotelroomType,
  GetHotelroomListM,
  GetHotelroomSelectM,
  AddHotelroomM,
  EitHotelroomM,
  GetHotelroomDetailM,
  DelHotelroomM,
  downQrcodeByIds,
  downRoomModel,
  AddRoomModel
} from '@/api/room-relevant'
import { Loading } from 'element-ui'
import { Logger } from 'runjs/lib/common'
export default {
  name: 'Basetable',
  data() {
    let checklengthSerialNumber = (rule, value, callback) => {
      console.log('rule', rule)
      console.log('value', value)
      return 
    }

    let checklength = (rule, value, callback) => {
      let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      if (!value) {
        return callback()
      } else if (reg.test(value)) {
        return callback(new Error('存在非法字符'))
      } else {
        return callback()
      }
      /*
       * else if (value.length < 5) {
       * return callback(new Error('WIFI账号或者密码长度不能少于5位数'))
       *}
       */
    }
    let checkBedSizeL = (rule, value, callback) => {
      let reg = /^\+?[1-9]\d*$|^[+]{0,1}(\d+\.\d+)$/
      // let regNum=/\[^0-9\]/gi, ''
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('床型长度只能是大于零的正数'))
      }
    }
    let checkBedSizeW = (rule, value, callback) => {
      let reg = /^\+?[1-9]\d*$|^[+]{0,1}(\d+\.\d+)$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('床型宽度只能是大于零的正数'))
      }
    }
    let checkSymbols = (rule, value, callback) => {
      let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      if (!value) {
        return callback()
      } else if (reg.test(value)) {
        return callback(new Error('存在非法字符'))
      }
    }
    return {
      selectExport: '1',
      username: 'admin',
      roomNameList: [],
      copyroomNameList: [],
      addOrEit: '',
      keyword: '',
      tableData: [],
      excelData: [],
      multipleSelection: [], // 单个页面选中
      multipleSelectionAll: [], // 所有页面选中
      idKey: 'RoomID',
      pageSizeList: [10, 20, 50, 100],
      pageSize: 10,
      VisibleAdd: false,
      editVisibleAdd: false,
      editVisibleAdd1: false,
      addHotelShow: false,
      pageTotal: 0,
      form: {
        RoomTypeID: '',
        RoomFloor: '',
        RoomNumber: '',
        WiFiName: '',
        WiFiPwd: '',
        SerialNumber: ''
      },
      myForm: {
        RoomTypeName: '',
        CustomerCount: '',
        BedSizeL: '',
        BedSizeW: '',
        RoomSize: ''
      },
      myRules: {
        // 校验
        RoomTypeName: [
          {
            required: true,
            message: '房型名称不能为空',
            trigger: 'blur'
          },
          {
            validator: checkSymbols
          }
        ],
        CustomerCount: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[0-9]\d*$/,
            message: '适合人数只能是正整数'
          }
        ],
        BedSizeL: [
          {
            required: false,
            validator: checkBedSizeL,
            trigger: 'change'
          }
        ],
        BedSizeW: [
          {
            required: false,
            validator: checkBedSizeW,
            trigger: 'change'
          }
        ],
        RoomSize: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,9}(.\d{1,2})?$/,
            message: '房间大小只能是大于零的正数且最多两位小数'
          }
        ]
      },
      rules: {
        // 校验
        RoomTypeID: [
          {
            required: true,
            message: '请选择可接入酒店数',
            trigger: 'blur'
          }
        ],
        RoomFloor: [
          {
            required: true,
            message: '楼层数不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: '楼层数只能是正整数'
          }
        ],
        // eslint-disable-next-line camelcase
        RoomNumber: [
          {
            required: true,
            message: '请选择房型名称',
            trigger: 'blur'
          },
          {
            // pattern: /^\+?[1-9]\d*$/,
            message: '房号只能是正整数'
          }
        ],
        // eslint-disable-next-line camelcase
        WiFiName: [
          {
            required: true,
            message: 'WIFI 名称不能为空',
            trigger: 'blur'
          },
          {
            validator: checklength
          }
        ],
        WiFiPwd: [
          {
            required: true,
            message: 'WIFI 密码不能为空',
            trigger: 'blur'
          },
          {
            validator: checklength
          }
        ],
        // SerialNumber: [
        //   {
        //     message: '不填写则默认生成二维码,填写则会匹配系统已有二维码',
        //     trigger: 'blur'
        //   },
        //   {
        //     validator: checklengthSerialNumber
        //   }
        // ]
      },
      currentPage: 1,
      pc: {
        Total: 0,
        PageCount: 10,
        PageNo: 1
      },
      nowPage: '',
      eitId: '',
      isSearch: false,
      tableHeight: 0,
      isClean: false,
      version: '',
      isDisabled: false,
      isAddPutout: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      /*
       * console.log(window.innerHeight)
       * console.log(this.$refs.table.$el.offsetTop)
       * console.log(this.tableHeight)
       */
      this.tableHeight = `${window.innerHeight -
        this.$refs.tableTop.offsetHeight -
        186}px`
      console.log(this.tableHeight)
      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.tableTop.offsetHeight - 186 + 'px'
      }
    })
  },
  destroyed() {
    window.onresize = null
  },
  created() {
    let version = new Date().getTime()
    this.version = version
    this.getData(1)
    this.getSelectList()
  },
  watch: {
    keyword(newVal, oldVal) {
      if (newVal == '' && !this.isClean && this.isSearch) {
        this.isSearch = false
        this.getData(1)
      }
    }
  },
  methods: {
    // 提交房型
    async saveEditAddFan() {
      console.log(1111)
      let that = this
      let failedFields = {}
      this.$refs.myForm.validate((validate, invalidFields) => {
        if (!validate) {
          failedFields = invalidFields
        }
      })
      let obj = {}
      for (obj in failedFields) {
        // this.$refs[obj].focus()
        return
      }
      let result = await AddHotelroomType({
        RoomTypeName: this.myForm.RoomTypeName,
        CustomerCount: this.myForm.CustomerCount,
        BedSizeL: this.myForm.BedSizeL,
        BedSizeW: this.myForm.BedSizeW,
        RoomSize: this.myForm.RoomSize
      })
      if (result.code != 0) return
      this.$message.success('添加成功')
      this.VisibleAdd = false
      this.myForm = {
        RoomTypeName: '',
        CustomerCount: '',
        BedSizeL: '',
        BedSizeW: '',
        RoomSize: ''
      }
      this.getData(1)
      this.getSelectList()
      this.editVisibleAdd = true
    },
    greatFan() {
      this.VisibleAdd = true
    },
    // 创建房型
    handleDialogCloseVisible() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.VisibleAdd = false
      this.$refs.form.resetFields()
      this.form = {
        RoomTypeName: '',
        CustomerCount: '',
        BedSizeL: '',
        BedSizeW: '',
        RoomSize: ''
      }
    },
    async getSelectList() {
      let result = await GetHotelroomSelectM({})
      if (result.code != 0) return
      this.roomNameList = result.data
      console.log('this.roomNameList', this.roomNameList)
      this.copyroomNameList = result.data
    },
    selectChanged() {
      this.roomNameList = this.copyroomNameList
    },
    dataFilter(val) {
      if (val) {
        // val存在
        // eslint-disable-next-line array-callback-return
        this.roomNameList = this.copyroomNameList.filter(item => {
          // eslint-disable-next-line no-bitwise
          if (
            // eslint-disable-next-line no-bitwise
            !!~item.RoomTypeName.indexOf(val) ||
            // eslint-disable-next-line no-bitwise
            !!~item.RoomTypeName.toUpperCase().indexOf(val.toUpperCase())
          ) {
            return true
          }
        })
      } else {
        // val为空时，还原数组
        this.roomNameList = this.copyroomNameList
      }
    },
    async pushHotel() {
      let that = this
      if (this.excelData.length == 0) {
        this.$message('请选择文件')
        return
      }
      if (this.excelData.length > 150) {
        return this.$message.warning('一次最多支持导入150个房间')
      }
      let loading = Loading.service()
      let result = await AddRoomModel({
        HotelRooms: this.excelData
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      if (result.code != 0) {
        this.$message.error('上传失败，请查看数据说明')
        for (let i = 0; i < result.data.errors.length; i++) {
          for (let j = 0; j < this.excelData.length; j++) {
            if (result.data.errors[i].ID == this.excelData[j].ID) {
              this.$set(
                this.excelData[j],
                'err_msg',
                result.data.errors[i].error
              )
            }
          }
        }
        return
      }
      that.$message.success('上传成功')
      this.addHotelShow = false
      this.excelData = []
      that.getData(1)
      this.$refs.upload.value = ''
    },
    batchExport() {
      downRoomModel({})
        .then(res => {
          this.addHotelShow = false
          if (!res) return
          console.log(res)
          let blob = new Blob([res], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.setAttribute('download', '房间批量导入模板.xls') // 下载的文件
          link.click()
          window.URL.revokeObjectURL(link.href) // 释放内存
        })
        .catch(err => {
          this.addHotelShow = false
          console.log(err)
        })
    },
    importf(obj) {
      let _this = this
      _this.excelData = []
      this.file = event.currentTarget.files[0]
      let rABS = false // 是否将文件读取为二进制字符串
      let file = this.file

      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = ''
        let rABS = false // 是否将文件读取为二进制字符串
        let pt = this
        let workbook // 读取完成的数据
        // var excelData;
        let reader = new FileReader()
        reader.onprogress = function(e) {
          let total = file.size
          _this.progress = (e.loaded / total) * 100
        }
        reader.onload = function(e) {
          try {
            let bytes = new Uint8Array(reader.result)
            let length = bytes.byteLength
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            if (rABS) {
              workbook = XLSX.read(btoa(fixdata(binary)), {
                // 手动转化
                type: 'base64'
              })
            } else {
              workbook = XLSX.read(binary, {
                type: 'binary'
              })
            }
            // excelData = [];
          } catch (e) {
            console.log('文件类型不正确')
            return
          }
          let fromTo = ''
          console.log(workbook.Sheets)
          for (let sheet in workbook.Sheets) {
            console.log(sheet)
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              fromTo = workbook.Sheets[sheet]['!ref']
              fromTo = fromTo.replace('A1', 'A2')
              workbook.Sheets[sheet]['!ref'] = fromTo
              console.log(workbook.Sheets)
              let newData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              console.log([...newData], '////')
              newData.forEach((m, i) => {
                m['*序列号'] === '' ? null : (m.ID = m['*序列号'])
                m['*房号'] === '' ? null : (m.RoomNumber = m['*房号'])
                m['*楼层数'] === '' ? null : (m.RoomFloor = m['*楼层数'])
                m['*房型名称'] === '' ? null : (m.Model = m['*房型名称'])
                m['*WIFI名称'] === '' ? null : (m.WiFiName = m['*WIFI名称'])
                m['*WIFI密码'] === '' ? null : (m.WiFiPwd = m['*WIFI密码'])
                m['二维码编码'] === ''
                  ? null
                  : (m.SerialNumber = m['二维码编码'])

                delete m['*序列号']
                delete m['*房号']
                delete m['*楼层数']
                delete m['*房型名称']
                delete m['*WIFI名称']
                delete m['*WIFI密码']
                delete m['二维码编码']
              })
              _this.excelData = _this.excelData.concat(newData)
            }
          }
        }

        reader.readAsArrayBuffer(f)
      }

      let reader = new FileReader()
      if (rABS) {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsBinaryString(file)
      }
      this.$refs.upload.value = ''
    },
    async saveEditAdd() {
      let that = this
      let failedFields = {}
      this.$refs.form.validate((validate, invalidFields) => {
        console.log(invalidFields,78797987)
        if (!validate) {
          failedFields = invalidFields
        }
      })
      let obj = {}
      for (obj in failedFields) {
        // this.$refs[obj].focus()
        return
      }
      let loading = Loading.service()
      try {
        if (this.addOrEit === '添加') {
          let result = await AddHotelroomM({
            RoomTypeID: this.form.RoomTypeID,
            RoomFloor: this.form.RoomFloor,
            RoomNumber: this.form.RoomNumber,
            WiFiName: this.form.WiFiName,
            WiFiPwd: this.form.WiFiPwd
          })
          if (result.code != 0) return
          this.$message.success('房间二维码系统生成会延缓,请耐心等待')
          this.editVisibleAdd = false
          this.form = {
            RoomTypeID: '',
            RoomFloor: '',
            RoomNumber: '',
            WiFiName: '',
            WiFiPwd: ''
          }
          this.getData(1)
        } else {
          let result = await EitHotelroomM({
            RoomID: this.eitId,
            RoomTypeID: this.form.RoomTypeID,
            RoomFloor: this.form.RoomFloor,
            RoomNumber: this.form.RoomNumber,
            WiFiName: this.form.WiFiName,
            WiFiPwd: this.form.WiFiPwd
          })
          if (result.code != 0) return
          this.$message.success('修改成功')
          this.editVisibleAdd = false
          this.form = {
            RoomTypeID: '',
            RoomFloor: '',
            RoomNumber: '',
            WiFiName: '',
            WiFiPwd: ''
          }
          this.getData(1)
        }
      } catch (error) {
        console.log(error)
        loading.close()
        return
      }
      setTimeout(() => {
        loading.close()
        location.reload()
      }, 700)
    },
    AddNewRoom() {
      if (this.$route.query.id != '' && this.$route.query.id != null) {
        for (let i = 0; i < this.copyroomNameList.length; i++) {
          if (this.copyroomNameList[i].RoomTypeID === this.$route.query.id) {
            console.log('默认id')
            console.log(this.copyroomNameList[i].RoomTypeName)
            this.form.RoomTypeID = this.copyroomNameList[i].RoomTypeID
            break
          }
        }
      }
      this.addOrEit = '添加'
      this.editVisibleAdd = true
    },
    // 查看详情
    async EitNewRoom(row, id) {
      this.addOrEit = '编辑'
      this.eitId = id
      const result = await GetHotelroomDetailM({ RoomID: id })
      if (result.code != 0) {
        return
      }
      console.log(result)

      this.form.RoomTypeID = result.data.RoomTypeID
      this.form.RoomFloor = result.data.RoomFloor
      this.form.RoomNumber = result.data.RoomNumber
      this.form.WiFiName = result.data.WiFiName
      this.form.WiFiPwd = result.data.WiFiPwd
      this.username = result.data.OperatorName
      this.orderlist = result.data.order
      this.form.SerialNumber = result.data.SerialNumber

      this.editVisibleAdd = true
    },
    saveExport() {
      console.log(this.selectExport)
      let that = this
      if (this.selectExport === '1') {
        console.log('选择了数据表')
        // that.tableDataExport = this.multipleSelectionAll
        that.editVisibleAdd1 = false
        that.exportExcel()
      } else {
        console.log('选择了二维码')
        let RoomIDs = []
        this.multipleSelectionAll.forEach((m, i) => {
          RoomIDs.push(m.RoomID)
        })
        this.editVisibleAdd1 = false
        this.$message('正在打包，请稍等')
        downQrcodeByIds({
          RoomIDs
        })
          .then(res => {
            this.multipleSelectionAll = []
            this.$refs.table.clearSelection()
            this.selectExport = '1'
            if (!res) return
            console.log(res)
            let blob = new Blob([res], {
              type: 'application/zip;'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.setAttribute(
              'download',
              thirteenBitTimestamp(new Date().getTime()) + '房间二维码'
            ) // 下载的文件
            link.click()
            window.URL.revokeObjectURL(link.href) // 释放内存
          })

          .catch(err => {
            this.editVisibleAdd1 = false
            this.multipleSelectionAll = []
            this.$refs.table.clearSelection()
            this.selectExport = '1'
            console.log(err)
          })
      }
    },
    DelroomtypeM() {
      this.changePageCoreRecordData()
      if (this.multipleSelectionAll.length == 0) {
        this.isDisabled = true
        setTimeout(() => {
          this.isDisabled = false
        }, 3000)
        this.$message({
          message: '请选择要操作的内容',
          duration: 3000
        })
        return
      }
      console.log(this.multipleSelectionAll)
      let that = this
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          let RoomIDs = []
          this.multipleSelectionAll.forEach((m, i) => {
            RoomIDs.push(m.RoomID)
          })

          DelHotelroomM({
            RoomIDs
          })
            .then(result => {
              if (result.code != 0) return
              that.getData(1)
              that.$message.success('删除成功')
            })
            .catch(err => {
              console.log()
            })
        })
        .catch(err => {
          console.log('这是confirm')
        })
    },
    Delroomtype(index, id, name) {
      // 二次确认删除
      let that = this
      // eslint-disable-next-line no-useless-concat
      this.$confirm('确定要删除' + '<' + name + '>' + '房间吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          let RoomIDs = []
          RoomIDs.push(id)
          DelHotelroomM({
            RoomIDs
          })
            .then(result => {
              if (result.code != 0) return
              that.getData(1)
              that.$message.success('删除成功')
            })
            .catch(err => {
              console.log()
            })
        })
        .catch(err => {
          console.log('这是confirm')
        })
    },
    addPutout(puttype) {
      const that = this
      if (puttype == 1) {
        this.changePageCoreRecordData()
        if (this.multipleSelectionAll.length == 0) {
          this.isAddPutout = true
          setTimeout(() => {
            this.isAddPutout = false
          }, 3000)
          this.$message('请选择要操作的内容')
          return
        }
        if (this.multipleSelectionAll.length > 1000) {
          that.$message('导出数据不能超过1000条')
          return
        }
        this.editVisibleAdd1 = true
      } else {
        this.addHotelShow = true
      }
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
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.selectExport = '1'
      let tittle =
        thirteenBitTimestamp(new Date().getTime()) + '房间数据表.xlsx'
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
    },
    async getData(val) {
      let data = {
        Limit: this.pageSize,
        Page: val
      }
      if (this.$route.query.id != '' && this.$route.query.id != null) {
        data.RoomTypeID = this.$route.query.id
      }
      if (this.isSearch) {
        data.Keys = this.keyword
      }
      const result = await GetHotelroomListM(data)
      if (result.code != 0) {
        return
      }
      console.log(9999999, result)
      if (result.data.rows.length >= 0) {
        result.data.rows.forEach(item => {
          item.QrCodeUrl = item.QrCodeUrl + '?' + this.version
        })
      }
      this.isClean = false
      this.tableData = result.data.rows
      this.pc.Total = result.data.total
      this.pc.PageCount = result.data.total_page
      this.pc.PageNo = parseInt(result.data.current_page)
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    handleDialogClose1() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.editVisibleAdd = false
      this.$refs.form.resetFields()
      this.form = {
        RoomTypeID: '',
        RoomFloor: '',
        RoomNumber: '',
        WiFiName: '',
        WiFiPwd: ''
      }
    },
    handleDialogClose2() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.editVisibleAdd1 = false
      this.selectExport = '1'
      this.form = {
        RoomTypeID: '',
        RoomFloor: '',
        RoomNumber: '',
        WiFiName: '',
        WiFiPwd: ''
      }
    },
    handleDialogClose3() {
      // 监听点击取消或者点击右上角关闭或者点击外部关闭弹窗重置一切
      this.addHotelShow = false
      this.excelData = []
      this.$refs.upload.value = ''
      this.form = {
        RoomTypeID: '',
        RoomFloor: '',
        RoomNumber: '',
        WiFiName: '',
        WiFiPwd: ''
      }
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    // 分页合伙人列表
    handleCurrentChange(val) {
      const that = this
      this.nowPage = val
      this.changePageCoreRecordData()
      this.getData(val)
    },
    // 触发搜索按钮
    handleSearch() {
      const that = this
      this.isSearch = true
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    cleanSearch() {
      this.isClean = true
      this.keyword = ''
      this.isSearch = false
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getData(1)
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val)
      this.getData(1)
    }
  }
}
</script>

<style lang="less">
.img_w_pater {
  width: 60px;
  height: 60px;
}

#apart_s2list {
  .apart_dialog .el-dialog {
    margin: 10vh auto !important;
    min-width: 500px;
    // min-height: 500px;
    // height: 80vh;
    // overflow-y: scroll;
  }
  .el-form-item__content {
    line-height: 50px;
  }
  .el-form-item__label {
    line-height: 50px;
  }
  .importfClass {
    min-width: 1000px;
  }
  .apart_dialog .el-dialog__body {
    overflow: hidden;
    height: 50%;
    overflow-y: scroll;
    padding: 40px 40px;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
}

.dot {
  border: 2px solid #007aff;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: white;
  margin: auto;
  margin-bottom: -4px;
}

.item {
  flex: 1;
  border-bottom: 1px solid #d84c29;
}

.container {
  padding: 15px;
  background: #fff;
  min-width: 550px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 60px;
  height: 60px;
}
.mysty {
  color: #47abda;
  display: inline-block;
  cursor: pointer;
}
</style>
