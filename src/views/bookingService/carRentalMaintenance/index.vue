<template>
  <div class="zy_bigcar LoadingArea">
    <el-card>
      <!-- 输入框  按钮区域 -->
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="6" :lg="5" :xl="3">
          <span class="zy_fontsize" style="font-size:16px">审核状态 ：</span>
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="zy_fontsize"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="6" :md="6" :lg="5" :xl="3">
          <span class="zy_fontsize" style="font-size:16px">是否上架 ：</span>
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in optionsOne"
              :key="item.value1"
              :label="item.labelOne"
              :value="item.valueOne"
              class="zy_fontsize"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="5">
          <el-input
            placeholder="输入租赁车辆/车牌号"
            v-model="keyword"
            clearable
          ></el-input>
        </el-col>
        <el-col :xs="11" :sm="8" :md="8" :lg="7" :xl="5">
          <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="——"
            start-placeholder="选择下单时间"
            end-placeholder="选择下单时间"
            value-format="yyyy-MM-dd"
            @change="changeTime"
          ></el-date-picker>
        </el-col>
        <el-col :xs="8" :sm="7" :md="7" :lg="6" :xl="5">
          <div class="grid-content bg-purple">
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
              @click="reset"
              >重置条件</el-button
            >
            <!-- <el-button class="golbal-btn" type="primary" @click="handleSearch">查询</el-button>
            <el-button class="golbal-btn" type="primary" @click="reset">重置</el-button>-->
          </div>
        </el-col>
        <div class="zy_pil">
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-edit-outline"
            @click="showTreaty"
            >用户协议</el-button
          >
          <!-- <el-button class="delete-btn" icon="el-icon-edit-outline"  @click="batchRemove()">用户协议</el-button> -->
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-download"
            @click="derive()"
            >批量导出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="golbal-btn"
            @click="facilityDialogVisible = true"
            >新增租赁</el-button
          >
        </div>
      </el-row>
      <!-- 列表区域 -->
      <el-table
        ref="table"
        :data="tableData"
        :height="maxHeight"
        border=""
        style="width: 100%"
        :key="randomKey"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :resizable="false"
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="GoodsName"
          label="租赁车辆"
        ></el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="CarNumber"
          label="车牌号"
        ></el-table-column>
        <el-table-column align="center" :resizable="false" label="物品图片">
          <template slot-scope="scope">
            <el-image
              :preview-src-list="[scope.row.CoverImgUrl]"
              :src="scope.row.CoverImgUrl"
              alt=""
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="RentPrice"
          label="租金/天"
        ></el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="CreateDate"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CheckStatus"
          label="审核状态"
          :resizable="false"
        >
          <template slot-scope="scope">
            {{
              scope.row.CheckStatus == -1
                ? "拒绝"
                : scope.row.CheckStatus == 0
                ? "待提交"
                : scope.row.CheckStatus == 1
                ? "待审核"
                : scope.row.CheckStatus == 2
                ? "审核通过"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="GoodsStatus"
          label="是否上架"
          :resizable="false"
        >
          <template slot-scope="scope">
            {{
              scope.row.GoodsStatus == 0
                ? "否"
                : scope.row.GoodsStatus == 1
                ? "是"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="OperatorName"
          label="操作人员"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          fixed="right"
          label="操作"
          width="210px"
        >
          <template width="180px" slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row.GoodsID)"
              >查看</el-button
            >
            <!-- 完成按钮 -->
            <el-button
              v-if="scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 0"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="putaway(scope.row.GoodsID)"
              >上架</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 1"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="soldOut(scope.row.GoodsID)"
              >下架</el-button
            >
            <!-- 编辑按钮 scope.row.CheckStatus===-1&&-->
            <el-button
              v-if="scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 0"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.GoodsID)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 0"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
              >删除</el-button
            >
            <!-- 提交按钮 scope.row.CheckStatus===-1&&-->
            <el-button
              v-if="scope.row.CheckStatus === -1 || scope.row.CheckStatus === 0"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="submitHandle(scope.row.GoodsID)"
              >提交</el-button
            >
            <!-- 取消按钮 scope.row.CheckStatus===-1&&-->
            <el-button
              v-if="scope.row.FacilityStatus === 0"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.FacilityID)"
              >删除</el-button
            >
            <!-- 编辑按钮 -->
            <el-button
              v-if="scope.row.CheckStatus === 1 && scope.row.GoodsStatus === 0"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              :disabled="true"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.GoodsID)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === -1 || scope.row.CheckStatus === 0"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.GoodsID)"
              >编辑</el-button
            >
            <!-- 提交按钮 :disabled="true"-->
            <!-- <el-button
              v-if="scope.row.CheckStatus===0"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              type="text"
              size="mini"
            >提交</el-button>-->

            <!-- 取消按钮 -->
            <el-button
              v-if="scope.row.CheckStatus === 1 && scope.row.GoodsStatus === 0"
              style="color:#aaaaaa"
              class="golbal-btn-text-danger"
              :disabled="true"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === -1 || scope.row.CheckStatus === 0"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.Page"
        :page-sizes="[10,20, 50, 100]"
        :page-size="pageSize"
        background=""
        layout="total, sizes,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新建设施对话框 -->
    <el-dialog
      title="新增租赁车型"
      :visible.sync="facilityDialogVisible"
      @close="addDialogClosed"
      width="60%"
    >
      <el-form
        :model="formInline"
        :rules="addFormRules"
        ref="addFormRef"
        :height="maxHeight"
        label-width="100px"
      >
        <el-form-item label="租车型号" prop="GoodsName">
          <el-input
            placeholder="请输入名称"
            v-model="formInline.GoodsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="租车车牌" prop="CarNumber">
          <el-input
            placeholder="请输入车牌"
            v-model="formInline.CarNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="租金/天" prop="RentPrice">
          <el-input
            placeholder="请输入租金"
            v-model="formInline.RentPrice"
          ></el-input>
        </el-form-item>
        <el-form-item label="可取消时间" prop="CanCancelOrderMinute">
          <el-input
            onkeyup="value=value.replace(/[^1234567890]+/g,'')"
            placeholder="请输入可取消订单时间"
            v-model="formInline.CanCancelOrderMinute"
          ></el-input>
        </el-form-item>
        <el-form-item label="物品图片" prop="CoverImgUrl">
          <el-upload
            :key="randomKey"
            action="#"
            class="upload-demo gmr-10"
            :show-file-list="false"
            list-type="picture-card"
            :http-request="uploadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formInline.CoverImgUrl"
              width="100"
              class="zy_imgChange"
              :src="formInline.CoverImgUrl"
              alt=""
            />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <div>
            支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k!
          </div>
        </el-form-item>
        <el-form-item label="租车标签" prop="Tags">
          <el-input
            placeholder="请输入租车标签"
            v-model="formInline.Tags"
          ></el-input>
        </el-form-item>
        <el-form-item label="租车详情" prop="Content" class="zy_wenben">
          <Tinymce
            ref="editor"
            v-model="formInline.Content"
            :height="250"
            :key="randomKey"
            :action="upUrl"
            imgFile="CoverImgFile"
          />
        </el-form-item>
      </el-form>
      <span class="zy_dialogFooter">
        <el-button type="primary" @click="onSaveNewCar">保 存</el-button>
        <el-button type="primary" @click="adminIncreaseDialogVisible"
          >提交审核</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增保存确认对话框 augmentDialogVisible -->
    <el-dialog :visible.sync="augmentDialogVisible" width="15%">
      <div slot="title" class="save-title">
        <i class="icon-warning el-icon-warning"></i>
        <span>操作说明</span>
      </div>
      <span
        style="color:red">点击保存该数据将自动更变为待提交状态且下架需重新审核后才可下架，请确认是否保存 ？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="augmentDialogVisible = false" style="margin-right:80px">取 消</el-button>
        <el-button type="primary" @click="increaseDialogVisible"
          >保 存</el-button
        >
      </span>
    </el-dialog>
       <!-- 编辑保存确认对话框 augmentDialogVisible -->
    <el-dialog :visible.sync="augmentDialogVisible" width="15%">
      <div slot="title" class="save-title">
        <i class="icon-warning el-icon-warning"></i>
        <span>操作说明</span>
      </div>
      <span
        style="color:red">点击保存该数据将自动更变为待提交状态且下架需重新审核后才可下架，请确认是否保存 ？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="augmentDialogVisible = false" style="margin-right:80px">取 消</el-button>
        <el-button type="primary" @click="increaseDialogVisible1"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看用户对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看租赁"
      :visible.sync="showDialogVisible"
      width="50%"
    >
      <el-form
        ref="addFormRef"
        class="zy_deletetr"
        :model="editForm"
        label-width="120px"
      >
        <el-form-item label="租赁车辆:">
          <el-input v-model="editForm.GoodsName" disabled></el-input>
        </el-form-item>
        <el-form-item label="车牌号:">
          <el-input v-model="editForm.CarNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="物品图片:">
          <el-image
            :preview-src-list="[editForm.CoverImgUrl]"
            :src="editForm.CoverImgUrl"
            alt=""
            style="width:100px;height:100px;"
          ></el-image>
        </el-form-item>
        <el-form-item label="租金/天:">
          <el-input disabled v-model="editForm.RentPrice"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-input disabled v-model="editForm.CreateDate"></el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-input
            :placeholder="
              editForm.CheckStatus === -1
                ? '驳回'
                : editForm.CheckStatus === 0
                ? '待提交'
                : editForm.CheckStatus === 1
                ? '待审核'
                : editForm.CheckStatus === 2
                ? '审核通过'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="是否上架:">
          <el-input
            :placeholder="
              editForm.GoodsStatus === 0
                ? '下架'
                : editForm.GoodsStatus === 1
                ? '上架'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="操作人员:">
          <el-input v-model="editForm.OperatorName" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑租赁"
      :visible.sync="changeDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="changeLine"
        :rules="addFormRules"
         ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="租车型号" prop="GoodsName">
          <el-input
            placeholder="请输入名称"
            v-model="changeLine.GoodsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="租车车牌" prop="CarNumber">
          <el-input
            placeholder="请输入车牌"
            v-model="changeLine.CarNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="租金/天" prop="RentPrice">
          <el-input
            placeholder="请输入租金"
            v-model="changeLine.RentPrice"
          ></el-input>
        </el-form-item>
        <el-form-item label="可取消时间" prop="CanCancelOrderMinute">
          <el-input
            placeholder="请输入可取消订单时间"
            v-model="changeLine.CanCancelOrderMinute"
          ></el-input>
        </el-form-item>
        <el-form-item label="物品图片" prop="CoverImgUrl">
          <el-upload
            action="#"
            :show-file-list="false"
            class="upload-demo gmr-10"
            list-type="picture-card"
            :http-request="uploadImgEdit"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-change="handleAvatarSuccess"
          >
            <img class="zy_imgChange" :src="changeLine.CoverImgUrl" alt="" />
          </el-upload>
        </el-form-item>
        <el-form-item label="租车标签" prop="Tags">
          <el-input
            placeholder="请输入租车标签"
            v-model="changeLine.Tags"
          ></el-input>
        </el-form-item>
        <el-form-item label="租车详情" prop="Content" class="zy_wenben">
          <Tinymce ref="editor" v-model="changeLine.Content" :height="250" />
        </el-form-item>
      </el-form>
      <div class="zy_dialogFooter">
        <el-button @click="editComi">保 存</el-button>
        <el-button type="primary" @click="compileDialogVisible()"
          >提交审核</el-button
        >
      </div>
    </el-dialog>
    <!-- 导出对话框 -->
    <el-dialog
      title="导出"
      :visible.sync="wakeDialogVisible"
      width="80%"
      lock-scroll
    >
      <el-table
        id="table_out"
        :data="tableDataSelect"
        border=""
        ref="multipleTable"
        header-cell-class-name="table-header"
        style="width: 100%;margin:30px auto 0 auto;"
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="GoodsName" label="租赁车辆" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.orderNumber }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="CarNumber" label="车牌号" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.roomnumber }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="CoverImgUrl" label="物品图片" align="center">
          <template slot-scope="scope">
            <div v-show="false" class="gt-hide-2">
              {{ scope.row.CoverImgUrl }}
            </div>
            <el-image
              :preview-src-list="[scope.row.CoverImgUrl]"
              :src="scope.row.CoverImgUrl"
              alt=""
              style="width = 70px;height:70px;"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="RentPrice" label="租金/天" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.cellphone }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="CreateDate" label="创建时间" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.wakeup }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="CheckStatus" label="审核状态" align="center">
          <template slot-scope="scope">
            {{
              scope.row.CheckStatus == -1
                ? "拒绝"
                : scope.row.CheckStatus == 0
                ? "待提交"
                : scope.row.CheckStatus == 1
                ? "待审核"
                : scope.row.CheckStatus == 2
                ? "审核通过"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="GoodsStatus" label="是否上架" align="center">
          <template slot-scope="scope">
            {{
              scope.row.GoodsStatus == 0
                ? "否"
                : scope.row.GoodsStatus == 1
                ? "是"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="OperatorName" label="操作人员" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.operation }}</span>
          </template>-->
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wakeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户协议对话框 -->
    <el-dialog
      title="用户协议"
      :visible.sync="userAgreementDialogVisible"
      width="40%"
    >
      <el-card v-if="treaty.Url">
        <el-row>
          <el-col :span="5">历史保存的协议：</el-col>
          <el-col :span="6">{{ treaty.CreateDate }}</el-col>
          <el-col :span="2">
            <el-button type="primary">
              <a
                :href="treaty.Url"
                download
                target="_blank"
                style="color:white;"
                >下载</a
              >
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-form
        :model="userRuleForm"
        :rules="userRules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上传用户协议">
          <el-upload
            :limit="1"
            ref="uploadPdf"
            accept=".pdf"
            :before-upload="beforePdfUpload"
            :on-change="userHandleSuccess"
            :http-request="uploadPdf"
            :on-success="uploadPdfSuccess"
            :on-remove="userHandleRemove"
            :on-exceed="onUploadPdfExceed"
            action=""
          >
            <!-- <i class="el-icon-upload"></i> -->
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="gc-888 gfs-12">
              请上传 pdf 文件,限制5Mb以内大小,最新保存的协议文件将会覆盖历史协议文件！
            </div>
          </el-upload>
          <el-dialog :visible.sync="userDialogVisible">
            <img width="100%" :src="imgArray" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userAgreementDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveTreaty"
          :disabled="!(pdfFile.length && pdfFile[0].url)"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  rentCarGoodsIndex,
  rentCarGoodsShow,
  rentCarGoodsCreate,
  rentCarGoodsUpdate,
  hotelFacilityImgUpload,
  rentCarGoodsDelete,
  rentCarGoodsUpDown,
  rentCarGoodsCheck,
  getTreaty,
  updateTreaty
} from '@/api/carrentalmaintenance'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getToken, getRefreshToken } from '@/utils/auth'
import { Loading } from 'element-ui'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Tinymce
  },
  data() {
    let checkGoodsName = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5-\,-\，]|[0-9]|[a-zA-Z]|[_-]/g
      let res = value.match(reg)
      if (res) {
        res = value.match(reg).join('')
      }

      if (res != value) {
        return callback(new Error('只能是汉字、字母、数字和下划线_及破折号-'))
      } else {
        return callback()
      }
    }
    let checkEmoji = (rule, value, callback) => {
      console.log('value',value);
      let reg = /[\u4e00-\u9fa5-\·]|[0-9]|[a-zA-Z]|[-]/g
      let res = value.match(reg)
      console.log("res",res);
      if (res) {
        res = value.match(reg).join('')
      }

      if (res != value) {
        return callback(new Error('只能是汉字、字母、数字'))
      } else {
        return callback()
      }
    }
    let checkFix = (rule, value, callback) => {
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
      uploadHeaders: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getToken()
      },
      // 租车协议
      treaty: {},
      uploadPdfUrl:
        process.env.VUE_APP_BASE_API + '/rent_car_goods/treaty_upload',
      // 上传
      upUrl: process.env.VUE_APP_BASE_API + '/rent_car_goods/cover_img_upload',
      // 上传
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      formInline: {
        GoodsName: '',
        CarNumber: '',
        RentPrice: '',
        CanCancelOrderMinute: '',
        CoverImgUrl: '',
        Tags: '',
        Content: ''
      },
      richData: '',
      changeLine: {
        GoodsID: '',
        GoodsName: '',
        CarNumber: '',
        RentPrice: '',
        CanCancelOrderMinute: '',
        CoverImgUrl: '',
        Tags: '',
        Content: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        GoodsName: [
          { required: true, message: '请输入租车型号', trigger: 'blur' },
          { validator: checkGoodsName, trigger: 'blur' }
        ],
        CarNumber: [
          { required: true, message: '请输入租车车牌', trigger: 'blur' },
          { validator: checkEmoji, trigger: 'blure' }
        ],
        RentPrice: [
          { required: true, message: '请输入租金/天', trigger: 'blur' },
          { validator: checkFix, trigger: 'blur' }
        ],
        CoverImgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        Tags: [
          { required: true, message: '请输入租车标签', trigger: 'blur' },
          { validator: checkGoodsName, trigger: 'blur' }
        ],
        Content: [
          { required: true, message: '请输入租车详情', trigger: 'blur' }
        ]
      },
      // 查询到的用户信息对象
      editForm: {
        GoodsName: '',
        CarNumber: '',
        CoverImgUrl: '',
        RentPrice: '',
        CreateDate: '',
        CheckStatus: '',
        GoodsStatus: '',
        OperatorName: ''
      },
      // 审核
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '待提交'
        },
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '-1',
          label: '驳回'
        }
      ],
      value: '',
      value2: '',
      // 上架
      optionsOne: [
        {
          valueOne: '',
          labelOne: '全部'
        },
        {
          valueOne: '1',
          labelOne: '上架'
        },
        {
          valueOne: '0',
          labelOne: '下架'
        }
      ],
      keyword: '',
      value1: '',
      startTime: '',
      endTime: '',
      pageSize: 10,
      ServiceGoodscategory: '',
      select: [],
      // 控制新增类别对话框的显示与隐藏
      facilityDialogVisible: false,
      // 控制查看用户对话框的显示与隐藏
      showDialogVisible: false,
      // 控制修改类别对话框的显示与隐藏
      changeDialogVisible: false,
      // 控制导出对话框的显示与隐藏
      wakeDialogVisible: false,
      // 控制新增保存确认对话框的显示与隐藏
      augmentDialogVisible: false,
      // 控制用户协议对话框的显示与隐藏
      userAgreementDialogVisible: false,
      // 用户协议
      userDialogVisible: false,
      // eslint-disable-next-line camelcase
      is_search: false,
      activeId: [], // 选中的id数组
      multipleSelection: [],
      multipleSelectionAll: [],
      idKey: 'GoodsID',
      // 导出对话框表格数据
      tableDataSelect: [],
      queryInfo: {
        Page: 1,
        Limit: 20
      },
      // 列表数据
      tableData: [],
      total: 0,
      randomKey: '',
      progressFlag: false,
      maxHeight: 300,
      // 用户协议
      userRuleForm: {},
      pdfFile: [],
      userRules: {},
      imgArray: [],

      // 修改租赁
      isJPG: false,
      isLt500k: 0
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    value1(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    value2(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    startTime(newVal, oldVal) {
      if (newVal == '' && this.startTime == '') {
        /*
         * this.isSearch = false
         * console.log('开始时间')
         */
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    endTime(newVal, oldVal) {
      if (newVal == '' && this.endTime == '') {
        /*
         * this.isSearch = false
         * console.log('结束时间')
         */
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    keyword(newVal, oldVal) {
      if (newVal == '') {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 150
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 199
      }
    })
    this.getServiceList()
  },
  methods: {
    // 编辑保存操作
    editComi() {
      console.log(111);
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.augmentDialogVisible = true
      })
    },
    increaseDialogVisible1() {
      // eslint-disable-next-line require-await
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.changeLine
        console.log("data",data);

        const res = await rentCarGoodsUpdate({
          GoodsID: this.changeLine.GoodsID,
          GoodsName: this.changeLine.GoodsName,
          CarNumber: this.changeLine.CarNumber,
          RentPrice: this.changeLine.RentPrice,
          CanCancelOrderMinute: this.changeLine.CanCancelOrderMinute,
          CoverImgUrl: this.changeLine.CoverImgUrl,
          Tags: this.changeLine.Tags,
          Content: this.changeLine.Content
        })

        // console.log(res)
        if (res.code !== 0) {
          this.$message.error('编辑订单失败！')
        }

        this.$message.success('编辑订单成功！')
        // 隐藏添加用户的对话框
        this.changeDialogVisible = false
        // this.facilityDialogVisible = false
        this.augmentDialogVisible = false
        // 重新获取用户列表数据
        this.getServiceList()
      })
      this.changeLine = {}
    },
    uploadImg(f) {
      // console.log(f)
      // eslint-disable-next-line camelcase
      // this.form.home_img = ''
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('CoverImgFile', f.file)
      axios({
        url: process.env.VUE_APP_BASE_API + '/rent_car_goods/cover_img_upload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          // eslint-disable-next-line no-useless-concat
          Authorization: 'Bearer' + ' ' + getToken()
        },
        onUploadProgress: progressEvent => {
          /*
           *  progressEvent.loaded:已上传文件大小
           *  progressEvent.total:被上传文件的总大小
           */
          /*
           * console.log(progressEvent.loaded)
           * console.log(progressEvent.total)
           */
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100
        }
      })
        .then(res => {
          /*
           * console.log(res)
           * console.log(this.progressPercent)
           */
          if (this.progressPercent === 100) {
            setTimeout(() => {
              this.progressFlag = false
              this.progressPercent = 0
              // eslint-disable-next-line camelcase
              // console.log(res)
              this.formInline.CoverImgUrl = res.data.data.url
            }, 200)
          }
          // console.log(that.formInline.CoverImgUrl)
        })
        .catch(error => {
          console.log(error)
        })
    },
    uploadImgEdit(f) {
      // console.log(f)
      // eslint-disable-next-line camelcase
      // this.form.home_img = ''
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('CoverImgFile', f.file)
      axios({
        url: process.env.VUE_APP_BASE_API + '/service_goods/cover_img_upload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          // eslint-disable-next-line no-useless-concat
          Authorization: 'Bearer' + ' ' + getToken()
        },
        onUploadProgress: progressEvent => {
          /*
           *  progressEvent.loaded:已上传文件大小
           *  progressEvent.total:被上传文件的总大小
           */
          /*
           * console.log(progressEvent.loaded)
           * console.log(progressEvent.total)
           */
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100
        }
      })
        .then(res => {
          /*
           * console.log(res)
           * console.log(this.progressPercent)
           */
          if (this.progressPercent === 100) {
            setTimeout(() => {
              this.progressFlag = false
              this.progressPercent = 0
              // eslint-disable-next-line camelcase
              this.changeLine.CoverImgUrl = res.data.data.url
            }, 200)
          }
          // console.log(that.formInline.CoverImgUrl)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getServiceList() {
      /*
       * console.log(this.value)
       * console.log(this.value1)
       */
      let data = {
        Page: this.queryInfo.Page,
        Limit: this.queryInfo.Limit
      }
      if (this.is_search) {
        data.CheckStatus = this.value
        data.GoodsStatus = this.value1
        data.StartTime = this.startTime
        data.EndTime = this.endTime
        data.Search = this.keyword
      }
      const res = await rentCarGoodsIndex(data)
      // console.log(res)
      if (res.code !== 0) return this.$message.error('获取列表失败')
      // 如果返回状态正常，将请求的数据保存到data中

      this.tableData = res.data.rows
      this.total = res.data.total
      this.randomKey = Math.random()
      this.Res = res
      if (this.tableData.length > 0) {
        this.$nextTick(() => {
          this.setSelectRow()
        })
      }
      // console.log(this.tableData)
    },
    // eslint-disable-next-line no-empty-function
    handleSizeChange(newSize) {
      // console.log(newSize)
      // eslint-disable-next-line camelcase
      this.is_search = false
      this.input = ''
      this.value1 = ''
      this.value = ''
      this.queryInfo.Limit = newSize
      // 重新按照pagesize发送请求，请求最新的数据
      this.getServiceList()
    },
    // eslint-disable-next-line no-empty-function
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.Page = newPage
      this.changePageCoreRecordData()
      // 重新按照pagenum发送请求，请求最新的数据
      this.getServiceList()
    },
    // 新增租赁车型 保存事件
    onSaveNewCar() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.augmentDialogVisible = true
      })
    },
    increaseDialogVisible() {
      // eslint-disable-next-line require-await
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.formInline

        const res = await rentCarGoodsCreate({
          GoodsName: data.GoodsName,
          CarNumber: data.CarNumber,
          RentPrice: data.RentPrice,
          CanCancelOrderMinute: data.CanCancelOrderMinute,
          CoverImgUrl: data.CoverImgUrl,
          Tags: data.Tags,
          Content: data.Content,
          Type: 1
        })

        // console.log(res)
        if (res.code !== 0) {
          this.$message.error('添加订单失败！')
        }

        this.$message.success('添加订单成功！')
        // 隐藏添加用户的对话框
        this.facilityDialogVisible = false
        this.augmentDialogVisible = false
        // 重新获取用户列表数据
        this.getServiceList()
      })
      this.changeLine = {}
    },
    adminIncreaseDialogVisible() {
      // eslint-disable-next-line require-await
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.formInline

        const res = await rentCarGoodsCreate({
          GoodsName: data.GoodsName,
          CarNumber: data.CarNumber,
          RentPrice: data.RentPrice,
          CanCancelOrderMinute: data.CanCancelOrderMinute,
          CoverImgUrl: data.CoverImgUrl,
          Tags: data.Tags,
          Content: data.Content,
          Type: 2
        })

        // console.log(res)
        if (res.code !== 0) {
          this.$message.error('添加订单失败！')
        }

        this.$message.success('添加订单成功！')
        // 隐藏添加用户的对话框
        this.facilityDialogVisible = false
        // 重新获取用户列表数据
        this.getServiceList()
      })
      this.changeLine = {}
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      /*
       * console.log('111111111')
       * console.log(dialogImageUrl)
       */
      this.$refs.addFormRef.resetFields()
      this.randomKey = Math.random()
      this.formInline.CarNumber = ''
      this.formInline.GoodsName = ''
      this.formInline.RentPrice = ''
      this.formInline.CanCancelOrderMinute = ''
      this.dialogImageUrl = ''
      this.formInline.Tags = ''
      this.formInline.CoverImgUrl = ''
      this.formInline.Content = ''
    },
    // 查看serviceGoodsCategoryShow
    async showEditDialog(ID) {
      // console.log(ID)

      const res = await rentCarGoodsShow({
        GoodsID: ID
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询订单信息失败！')
      }

      this.editForm = res.data
      // console.log(res.data.row)

      /*
       * console.log(this.$refs)
       * console.log(this.editForm.Content)
       * this.newcontent = this.editForm.Content
       */
      /*
       * this.$refs.content.getContent(res.data.Content)
       * this.$refs.content.innerHTML = this.editForm.Content
       */
      this.showDialogVisible = true
      this.getServiceList()
    },
    // 点击编辑获取当前数据
    async editEditDialog(ID) {
      // console.log(ID)

      const res = await rentCarGoodsShow({
        GoodsID: ID
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询订单信息失败！')
      }

      this.changeLine = res.data
      // console.log(res.data.row)

      /*
       * console.log(this.$refs)
       * console.log(this.editForm.Content)
       * this.newcontent = this.editForm.Content
       */
      /*
       * this.$refs.content.getContent(res.data.Content)
       * this.$refs.content.innerHTML = this.editForm.Content
       */
      this.changeDialogVisible = true
      this.getServiceList()
    },
    // 点击保存更新信息
    compileDialogVisible() {
      rentCarGoodsUpdate({
        GoodsID: this.changeLine.GoodsID,
        GoodsName: this.changeLine.GoodsName,
        CarNumber: this.changeLine.CarNumber,
        RentPrice: this.changeLine.RentPrice,
        CanCancelOrderMinute: this.changeLine.CanCancelOrderMinute,
        CoverImgUrl: this.changeLine.CoverImgUrl,
        Tags: this.changeLine.Tags,
        Content: this.changeLine.Content
      })
        .then(res => {
          // console.log(res)
          this.changeDialogVisible = false
          this.getServiceList()
          this.$message.success('订单更新')
        })
        .catch(err => {
          this.$message.error('订单更新失败')
        })
    },
    // 根据ID删除对应的用户信息
    async moveUserById(GoodsID) {
      /*
       * console.log(CommentID)
       * 弹框询问用户是否删除数据
       */

      const confirmResult = await this.$confirm(
        '此操作将永久删除该数据, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      /*
       * 如果用户确认删除，则返回值为字符串 confirm
       * 如果用户取消了删除，则返回值为字符串 cancel
       * console.log(confirmResult)
       */
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await rentCarGoodsDelete({ GoodsID })

      if (res.code !== 0) {
        return this.$message.error('删除订单失败！')
      }

      this.$message.success('删除订单成功！')
      this.getServiceList()
    },
    async submitHandle(GoodsID) {
      const confirmResult = await this.$confirm(
        '此操作将提交该数据, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      /*
       * 如果用户确认删除，则返回值为字符串 confirm
       * 如果用户取消了删除，则返回值为字符串 cancel
       * console.log(confirmResult)
       */
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消提交')
      }
      const res = await rentCarGoodsCheck({ GoodsID, OperateCheckStatus: 1 })

      if (res.code !== 0) {
        return this.$message.error('提交订单失败！')
      }

      this.$message.success('提交订单成功！')
      this.getServiceList()
    },
    // 下架
    async soldOut(ID) {
      const res = await rentCarGoodsUpDown({
        GoodsID: ID,
        OperateGoodsStatus: 0
      })
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('下架失败！')
      }

      this.$message.success('下架成功！')
      this.getServiceList()
    },
    // 上架
    async putaway(ID) {
      const res = await rentCarGoodsUpDown({
        GoodsID: ID,
        OperateGoodsStatus: 1
      })
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('上架失败！')
      }

      this.$message.success('上架成功！')
      this.getServiceList()
    },
    // 点击弹出导出对话框
    derive() {
      this.changePageCoreRecordData()
      // console.log(this.multipleSelectionAll)
      if (
        this.multipleSelectionAll == '' ||
        this.multipleSelectionAll.length == 0
      ) {
        let data = {}

        this.$message('请选择要操作的内容')
        return
      } else {
        this.tableDataSelect = this.multipleSelectionAll
      }
      this.wakeDialogVisible = true
      /*
       * console.log(this)
       * setTimeout(() => {
       *   if (this.$store.state.mumustore.multipleSelectionAll.length == 0) {
       *     this.$message('请选择要操作的内容')
       *     return
       *   }
       *   this.tableDataSelect = this.$store.state.mumustore.multipleSelectionAll
       *   console.log(this.$store.state.mumustore.multipleSelectionAll)
       *   this.deriveDialogVisible = true
       * }, 0)
       */
    },
    // 导出
    exportExcel() {
      // TODO 导出事件thgeExcel = false

      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      // console.log(document.querySelector('#table_out'))
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      this.deriveDialogVisible = false
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          '租车维护商品.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      this.multipleSelectionAll = []
      this.$refs.multipleTable.clearSelection()
      this.wakeDialogVisible = false
      return wbout
    },
    // 设置选中的方法
    setSelectRow() {
      // console.log(this.multipleSelectionAll)
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
    // activeId.push被选中的ID
    handleSelectionChange(val) {
      this.multipleSelection = val
      val.forEach((m, i) => {
        this.activeId.push(m[this.idKey])
      })
      // this.multipleSelectionAll = val
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      /*
       * console.log('记忆选择核心')
       * 标识当前行的唯一键的名称
       */
      const idKey = this.idKey
      const that = this
      // console.log(this.multipleSelectionAll.length)

      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      console.log(this.multipleSelectionAll)

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
      console.log(this.tableData)
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
    // 触发搜索按钮
    // eslint-disable-next-l+ine require-await
    handleSearch() {
      if (this.value2) {
        this.startTime = this.value2[0]
        this.endTime = this.value2[1]
      }
      if (
        (this.value == '' || this.value == null) &&
        (this.value1 == '' || this.value1 == null) &&
        (this.value2 == '' || this.value2 == null) &&
        this.keyword == ''
      ) {
        this.$message.error('请设置搜索条件')
        return
      }
      let that = this
      // eslint-disable-next-line camelcase
      this.is_search = true
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getServiceList()
    },
    // 重置
    reset() {
      this.value = ''
      this.value1 = ''
      this.value2 = ''
      this.keyword = ''
      // eslint-disable-next-line camelcase
      this.is_search = false
      this.getServiceList()
    },
    // 上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.changeLine.CoverImgUrl = this.formInline.CoverImgUrl
      // console.log(this.formInline.ImgUrl)

      // console.log(this.changeLine.ImgUrl)

      // console.log(this.changeLine.ImgUrl)
    },
    beforeAvatarUpload(file) {
      /*
       * const isJPG =
       *   file.type === 'image/jpeg' ||
       *   file.type === 'image/jpg' ||
       *   file.type === 'image/png' ||
       *   file.type === 'image/gif' ||
       *   file.type === 'image/bmp'
       * const isLt2M = file.size / 500 / 500 < 1
       */

      /*
       * if (!isJPG) {
       *   this.$message.error('请上传JPG，JPEG，PNG，GIF，BMP格式的图片并且小于500k，仅能上传一张图片')
       *   return false
       * }
       * if (!isLt2M) {
       *   this.$message.error('上传头像图片大小不能超过 500kb!')
       *   return false
       * }
       * return isJPG && isLt2M
       */
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
      this.isLt500k = (file.size / 1024 / 500) <= 1
      console.log(this.isLt500k)
      if (!this.isJPG) {
        this.$message.error('上传物品图片只能是 JPG / PNG /JPEG 格式!')
        return
      }
      if (!this.isLt500k) {
        this.$message.error('上传物品图片大小不能超过 500KB!')
        return
      }
      return this.isJPG && this.isLt500k
    },
    /**
     * 协议对话框
     */
    showTreaty() {
      this.userAgreementDialogVisible = true
      this.getHistoryTreaty()
    },
    /**
     * 获取 已上传的租车协议
     */
    async getHistoryTreaty() {
      try {
        let res = await getTreaty()
        if (res.code === 0) {
          this.treaty = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 保存租车协议
     */
    async saveTreaty() {
      let loading = Loading.service()
      try {
        let res = await updateTreaty(this.pdfFile[0].url)
        if (res.code === 0) {
          this.$message.success('协议保存成功')
          this.getHistoryTreaty()
          this.userAgreementDialogVisible = false
          this.imgArray = []
          this.pdfFile = []
          location.reload()
        } else {
          this.$message.error('协议保存失败，请新点击保存')
        }
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        loading.close()
      }, 800)
    },
    /**
     * 上传用户协议 pdf 限制5m
     */
    beforePdfUpload(file) {
      if (file.size > 1024 * 1024 * 5) {
        this.$message.warning('用户协议限制5M')
        return false
      }
      return true
    },
    userHandleRemove(file, fileList) {
      this.pdfFile = []
      // this.form.ImgUrls.splice(this.form.ImgUrls.indexOf(file.raw), 1)
    },
    userHandleUpload(file) {
      console.log(file)
    },
    userHandleSuccess(file, fileList) {
      console.log(file)
    },
    onUploadPdfExceed(files, fileList) {
      this.$message.warning('用户协议仅充许上传一份')
    },
    /**
     * 上传用户协议 pdf
     */
    uploadPdf(f) {
      const { uploadPdfUrl, uploadHeaders } = this
      console.log(f)
      let formdata = new FormData()
      formdata.append('Pdf', f.file)
      return new Promise((resolve, reject) => {
        axios({
          url: uploadPdfUrl,
          method: 'post',
          data: formdata,
          headers: uploadHeaders,
          onUploadProgress: progressEvent => {
            /*
             *  progressEvent.loaded:已上传文件大小
             *  progressEvent.total:被上传文件的总大小
             */
            /*
             * console.log(progressEvent.loaded)
             * console.log(progressEvent.total)
             */
            this.progressPercent =
              (progressEvent.loaded / progressEvent.total) * 100
            console.log(this.progressPercent)
          }
        })
          .then(res => {
            /*
             * console.log(res)
             * console.log(this.progressPercent)
             */
            if (this.progressPercent === 100) {
              setTimeout(() => {
                this.progressFlag = false
                this.progressPercent = 0
                resolve(res)
              }, 200)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    uploadPdfSuccess(res, file, fileList) {
      this.pdfFile.push({
        name: file.name,
        url: res.data.data.url
      })
    },
    userBeforeAvatarUpload(file) {
      let isJPG = false
      let imglength = true
      // console.log('上传验证')
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
      const isLt2M = file.size / 500 / 500 < 1
      if (!isJPG) {
        this.$message('上传图片只能是 JPG/PNG/JPEG/BMP/GIF 格式，仅能上传一张!')
      }
      if (!isLt2M) {
        // console.log('图片大小验证')
        this.$message('上传封面图片大小不能大于500kb')
      }
      console.log(this.form.ImgUrls.length)

      if (this.form.ImgUrls.length > 10) {
        imglength = false
        this.$message('最多只能上传10张图片')
      }

      return isJPG && isLt2M && imglength
    },
    changeTime(params) {
      if (params == null) {
         this.reset()
      }
    }
  }
}
</script>

<style lang="less">
.zy_bigcar {
  .zy_imgChange {
    width: 148px !important;
    height: 148px;
  }
  .golbal-btn-text {
    font-size: 15px !important;
  }
  .golbal-btn-text-danger {
    font-size: 15px !important;
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
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    font-size: 17px;
    color: #fff;
    background-color: #666 !important;
  }
  .el-tabs__nav .el-tabs__item:hover {
    color: #ccc !important;
  }
  .zy_lian {
    font-size: 14pt;
    color: #169bd5;
  }
  .zy_big {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    margin: 5px;
  }
  .zy_but {
    width: 84px;
    height: 32px;
    line-height: 8px;
    margin-top: 5px;
    font-size: 14pt;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-table {
    margin-top: 10px;
  }
  .zy_pil {
    float: right;
    margin-right: 60px;
  }
  .zy_tabss {
    margin: 15px;
  }
  .zy_fontsize {
    font-size: 10px;
  }
  .el-select {
    // 下拉选择框
    width: 100px;
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    min-width: 810px;
  }
  .el-dialog__body {
    overflow: auto;
    // transform: translateX(25%)
  }
  .zy_dialogFooter {
    display: flex;
    justify-content: space-around;
  }
  .demo-form-inline {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px;
  }
  .zy_el .el-alert__content {
    width: 100% !important;
  }
  .zy_toggle {
    display: flex;
  }
  .zy_first_form {
    width: 51%;
  }
  .zy_second_form {
    margin-top: 80px;
  }
  .zy_between {
    width: 49%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .zy_first_form .el-form--inline .el-form-item__label {
    width: 160px;
  }
  .el-form--inline .el-form-item {
    width: 100%;
  }
  .commentTextarea {
    width: 100%;
    .el-form-item__content {
      width: calc(100%);
      margin-top: 1px;
      textarea {
        width: 100%;
      }
    }
  }
  .zy_second_form .el-form--inline .el-form-item {
    width: 94%;
  }
  // img {
  //   width: 70px !important;
  // }
  fieldset,
  // img {
  //   border: 1px dashed #ccc !important;
  //   padding: 5px;
  //   width: 148px;
  // }
  .zy_pictureCard {
    display: flex;
  }
  .zy_fuwenben {
    width: 100%;
    height: 230px;
    border: 1px solid #ccc;
  }
  .zy_display {
    display: flex;
  }
  .el-row {
    line-height: 40px;
  }
  .delete-btn {
    width: 84px;
    height: 32px;
    padding: 5px 10px !important;
  }
  .zy_infoCenter {
    text-align: center;
  }
  .begin {
    margin: 0 10px;
  }
  .zy_facilityForm {
    display: flex;
    flex-wrap: wrap;
    > .zy_wenben {
      width: 90% !important;
      transform: none;
    }
    > .el-form-item {
      width: 35%;
    }
  }
  .zy_deletetr .el-form-item {
    transform: none !important;
  }
  .zy_facilityedit {
    transform: none !important;
  }
  .el-pagination {
    margin: 20px 0 20px 20px;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100% !important;
  }

  .save-title {
    font-size: 20px;
    .icon-warning {
      color: #ffba00;
      margin-right: 20px;
    }
  }
}
.zy_bigcar .el-dialog  {
  min-width: 100px !important;
}
.el-upload--picture-card {
  margin-left: 0;
}
</style>
