<template>
  <div class="zy_bigsix LoadingArea">
    <el-card>
      <!-- 输入框  按钮区域 -->
      <el-row :gutter="10">
        <el-col :xs="7" :sm="6" :md="6" :lg="5" :xl="3">
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
        <el-col :xs="7" :sm="6" :md="6" :lg="5" :xl="3">
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
        <el-col :xs="6" :sm="6" :md="8" :lg="5" :xl="5">
          <el-input
            placeholder="输入服务项目"
            v-model="keyword"
            clearable
          ></el-input>
        </el-col>
        <el-col :xs="10" :sm="7" :md="7" :lg="6" :xl="5">
          <div class="grid-content bg-purple">
            <el-button
              class="golbal-btn"
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >查询</el-button
            >
            <el-button
              class="gmv-3 golbal-btn-reset m-l10"
              type="primary"
              icon="el-icon-refresh-right"
              @click="handleReset"
              >重置条件</el-button
            >
          </div>
        </el-col>
        <div class="zy_pil">
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-delete"
            @click="batchRemove()"
            >批量删除</el-button
          >
          <!-- <el-button class="delete-btn" @click="batchRemove()">批量删除</el-button> -->
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-plus"
            @click="facilityDialogVisible = true"
            >新增设施</el-button
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
          prop="FacilityName"
          label="服务项目"
        ></el-table-column>
        <el-table-column align="center" :resizable="false" label="可预定时间">
          <template slot-scope="scope"
            >{{ scope.row.ServiceBeginDate }} --
            {{ scope.row.ServiceEndDate }}</template
          >
        </el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="Sort"
          label="排序"
        ></el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="Price"
          label="预定金额"
        ></el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          prop="FacilityCount"
          label="设施数量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CheckStatus"
          label="审核状态"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.CheckStatus == -1
              ? "拒绝"
              : scope.row.CheckStatus == 0
              ? "待提交"
              : scope.row.CheckStatus == 1
              ? "待审核"
              : scope.row.CheckStatus == 2
              ? "审核通过"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="FacilityStatus"
          label="是否上架"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.FacilityStatus == 0
              ? "否"
              : scope.row.FacilityStatus == 1
              ? "是"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          fixed="right"
          label="操作"
        >
          <template width="180px" slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="showEditDialog(scope.row.FacilityID)"
              >查看</el-button
            >
            <!-- 完成按钮 -->
            <el-button
              v-if="
                scope.row.CheckStatus === 2 && scope.row.FacilityStatus === 0
              "
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="putaway(scope.row.FacilityID)"
              >上架</el-button
            >
            <el-button
              v-if="
                scope.row.CheckStatus === 2 && scope.row.FacilityStatus === 1
              "
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="soldOut(scope.row.FacilityID)"
              >下架</el-button
            >
            <!-- 编辑按钮 scope.row.CheckStatus===-1&&-->
            <el-button
              v-if="
                scope.row.CheckStatus === 2 && scope.row.FacilityStatus === 0
              "
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.FacilityID)"
              >编辑</el-button
            >
            <el-button
              v-if="
                scope.row.CheckStatus === 2 && scope.row.FacilityStatus === 0
              "
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.FacilityID)"
              >删除</el-button
            >
            <!-- 提交按钮 scope.row.CheckStatus===-1&&-->
            <el-button
              v-if="scope.row.CheckStatus === 0 || scope.row.CheckStatus === -1"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="updateFinishDialogVisible(scope.row.FacilityID)"
              >提交</el-button
            >
            <!-- 取消按钮 scope.row.CheckStatus===-1&&-->
            <!-- 编辑按钮 :disabled="true"-->
            <el-button
              v-if="scope.row.CheckStatus === -1 || scope.row.CheckStatus === 0"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.FacilityID)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === -1 || scope.row.CheckStatus === 0"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.FacilityID)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.CheckStatus === 1"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              :disabled="true"
              type="text"
              size="mini"
              @click="editEditDialog(scope.row.FacilityID)"
              >编辑</el-button
            >
            <!-- 提交按钮 -->
            <el-button
              v-if="scope.row.CheckStatus === 1"
              :disabled="true"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              type="text"
              size="mini"
              >提交</el-button
            >
            <!-- 取消按钮 :disabled="true"-->
            <el-button
              v-if="scope.row.CheckStatus === 1"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              :disabled="true"
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
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新建设施对话框 -->
    <el-dialog
      title="新增设施"
      :visible.sync="facilityDialogVisible"
      @close="addDialogClosed"
      width="60%"
    >
      <el-form
        :model="formInline"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="130px"
      >
        <el-form-item label="图片" prop="ImgUrl">
          <el-upload
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
              v-if="formInline.ImgUrl"
              width="100"
              class="zy_imgChange"
              :src="formInline.ImgUrl"
              alt=""
            />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <div
          class="tip"
          style="text-align:center; margin-bottom:20px;color:#999;"
        >
          支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k!
        </div>
        <el-form-item label="开放时间">
          <el-time-picker
            v-model="formInline.ServiceBeginDate"
            class="begin"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="选择预定开始时间"
            style="width:200px;"
            :picker-options="{ selectableRange: '00:00:00-23:59:59' }"
          ></el-time-picker>
          <span>——</span>
          <el-time-picker
            v-model="formInline.ServiceEndDate"
            class="begin"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="选择预定结束时间"
            style="width:200px;"
            :picker-options="{ selectableRange: `${zzzzyyy}:00 - 23:59:00` }"
          ></el-time-picker>
        </el-form-item>
        <div class="zy_facilityForm">
          <el-form-item label="服务项目" prop="FacilityName">
            <el-input v-model="formInline.FacilityName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="使用人数" prop="AllowPersonCount">
            <el-input
              onkeyup="value=value.replace(/[^1234567890]+/g,'')"
              v-model="formInline.AllowPersonCount"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="设施数量" prop="FacilityCount">
            <el-input
              type="age"
              v-model.number="formInline.FacilityCount"
            ></el-input>
          </el-form-item>

          <el-form-item label="预定金额" prop="Price">
            <el-col :span="10">
              <el-input
                oninput="value=value.replace(/[^0-9.]/g,'')"
                v-model="formInline.Price"
              ></el-input>
            </el-col>
            <el-col :span="5">
              <el-select v-model="chargeMethods.value" placeholder="请选择">
                <el-option
                  v-for="item in chargeMethods.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item
            label="每次时长(分钟)"
            prop="UseMinute"
            v-if="chargeMethods.value === 1"
          >
            <el-input
              v-model.number="formInline.UseMinute"
              type="age"
            ></el-input>
          </el-form-item>
          <el-form-item label="取消订单时间" prop="CanCancelOrderMinute">
            <el-input
              v-model.number="formInline.CanCancelOrderMinute"
              type="age"
              placeholder="可提前取消订单的时间"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="Sort">
            <el-input v-model.number="formInline.Sort"></el-input>
          </el-form-item>
          <!-- <el-form-item label="使用次数" prop="UseCount">
            <el-input
              onkeyup="value=value.replace(/[^1234567890]+/g,'')"
              v-model="formInline.UseCount"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="设施详情" prop="Content" class="zy_wenben">
            <Tinymce
              :key="randomKey"
              ref="editor"
              v-model="formInline.Content"
              :height="250"
              :action="upUrl"
              imgFile="ImgFile"
            />
          </el-form-item>
        </div>
      </el-form>
      <span class="zy_dialogFooter">
        <el-button type="primary" @click="increaseDialogVisible"
          >保 存</el-button
        >
        <el-button type="primary" @click="adminIncreaseDialogVisible"
          >保存并提交</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看用户对话框 -->
    <el-dialog title="查看设施" :visible.sync="showDialogVisible" width="50%">
      <el-form
        ref="addFormRef"
        class="zy_deletetr"
        :model="editForm"
        label-width="120px"
      >
        <el-form-item label="服务项目:">
          <el-input v-model="editForm.FacilityName" disabled></el-input>
        </el-form-item>
        <el-form-item label="可预定开始时间:">
          <el-input v-model="editForm.ServiceBeginDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="可预定结束时间:">
          <el-input v-model="editForm.ServiceEndDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input disabled v-model="editForm.Sort"></el-input>
        </el-form-item>
        <el-form-item label="预定金额:">
          <el-input disabled v-model="editForm.Price"></el-input>
        </el-form-item>
        <el-form-item label="使用人数:">
          <el-input v-model="editForm.AllowPersonCount" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-input
            :placeholder="
              editForm.CheckStatus === 0
                ? '待提交'
                : editForm.CheckStatus === 1
                ? '待审核'
                : editForm.CheckStatus === 2
                ? '审核通过'
                : editForm.CheckStatus === -1
                ? '拒绝'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="是否上架:">
          <el-input
            :placeholder="
              editForm.FacilityStatus === 0
                ? '否'
                : editForm.FacilityStatus === 1
                ? '是'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改设施" :visible.sync="changeDialogVisible" width="60%">
      <el-form
        :model="changeLine"
        :rules="addFormRules"
        ref="addFormRef"
        @close="addDialogClosed"
        label-width="125px"
      >
        <div>
          <el-form-item class="zy_facilityedit" label="图片" prop="ImgUrl">
            <div class="zy_display">
              <el-upload
                action="#"
                :show-file-list="false"
                class="upload-demo gmr-10"
                :http-request="uploadImgEdit"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarSuccess"
              >
                <img
                  :src="changeLine.ImgUrl"
                  alt=""
                  style="width = 148px;height:148px;"
                />
              </el-upload>
            </div>
          </el-form-item>
        </div>
        <div
          class="tip"
          style="text-align:center; margin-bottom:20px;color:#999;"
        >
          支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k!
        </div>
        <div class="zy_facilityForm">
          <el-form-item label="预订开始时间" prop="ServiceBeginDate">
            <el-time-picker
              v-model="changeLine.ServiceBeginDate"
              class="begin"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
            <!-- <el-input v-model="changeLine.ServiceBeginDate"></el-input> -->
          </el-form-item>
          <el-form-item label="预定结束时间" prop="ServiceEndDate">
            <el-time-picker
              v-model="changeLine.ServiceEndDate"
              class="begin"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
            <!-- <el-input v-model="changeLine.ServiceEndDate"></el-input> -->
          </el-form-item>
          <el-form-item label="服务项目" prop="FacilityName">
            <el-input v-model="changeLine.FacilityName"></el-input>
          </el-form-item>
          <el-form-item label="设施数量" prop="FacilityCount">
            <el-input v-model="changeLine.FacilityCount"></el-input>
          </el-form-item>
          <!-- <el-form-item label="使用人数" prop="AllowPersonCount">
            <el-input v-model="changeLine.AllowPersonCount"></el-input>
          </el-form-item> -->
          <el-form-item label="预定金额" prop="Price">
            <el-col :span="10">
              <el-input
                oninput="value=value.replace(/[^0-9.]/g,'')"
                v-model="changeLine.Price"
              ></el-input>
            </el-col>
            <el-col :span="5">
              <el-select v-model="changeLine.ChargeMethod" placeholder="请选择">
                <el-option
                  v-for="item in chargeMethods.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item
            label="每次时长"
            prop="UseMinute"
            v-if="changeLine.ChargeMethod === 1"
          >
            <el-input v-model="changeLine.OnceUseMinute"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="Sort">
            <el-input v-model.number="changeLine.Sort"></el-input>
          </el-form-item>

          <el-form-item label="可取消订单时间" prop="CanCancelOrderMinute">
            <el-input v-model="changeLine.CanCancelOrderMinute"></el-input>
          </el-form-item>
          <!-- <el-form-item label="使用次数" prop="UseCount">
            <el-input v-model="changeLine.UseCount"></el-input>
          </el-form-item> -->
          <el-form-item label="设施详情" prop="Content" class="zy_wenben">
            <Tinymce
              ref="editor"
              :action="upUrl"
              v-model="changeLine.Content"
              imgFile="ImgFile"
              :height="250"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="zy_dialogFooter">
        <el-button @click="changeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="compileDialogVisible"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  hotelFacilityIndex,
  hotelFacilityShow,
  hotelFacilityCreate,
  hotelFacilityUpdate,
  hotelFacilityImgUpload,
  hotelFacilityDelete,
  hotelFacilityUpDown,
  hotelFacilityCheck
} from '@/api/hotelFacility'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
import { getToken, getRefreshToken } from '@/utils/auth'
import { Logger } from 'runjs/lib/common'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Tinymce
  },
  data() {
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
    let checkEmoji = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5]|[0-9]|[a-zA-Z]|[_-]/g
      let res = value.match(reg)
      let strae = reg.test(value)
      if (res) {
        res = value.match(reg).join('')
      }
      console.log(strae)
      if (!value) {
        return callback(new Error('请输入服务项目'))
      }
      if (!strae) {
        return callback(new Error('请输入中文,数字,字母,下划线,破折号'))
      } else {
        return callback()
      }
    }


    let checkEmojin = (rule, value, callback) => {
      // console.log("rule",rule);
      // console.log("value",value);
      const myVal =  value.indexOf(".")
      const myValue = value.substring(myVal)
      console.log('myValue.indexOf(".")',myValue.indexOf("."));
      console.log('myValue.length <4',myValue.length <4);
      if (myValue.indexOf(".") == -1) {
        return callback()
      }
      if (myValue.indexOf(".") == 0 && myValue.length <4) {
        return callback()
      }else {
        return callback(new Error('只支持小数点后两位'))
      }
    }
    return {
      // 上传
      upUrl: process.env.VUE_APP_BASE_API + '/hotel_facility/img_upload',
      // 上传
      dialogImageUrl: '',
      pageSize: 10,
      dialogVisible: false,
      imageUrl: '',
      formInline: {
        ImgUrl: '',
        ServiceBeginDate: '',
        ServiceEndDate: '',
        FacilityName: '',
        AllowPersonCount: '',
        Sort: 0,
        Price: '',
        FacilityCount: '',
        UseMinute: '',
        CanCancelOrderMinute: '',
        UseCount: '',
        Content: ''
      },
      richData: '',
      chargeMethods: {
        value: 1,
        list: [
          { label: '按次', value: 1 },
          { label: '按小时', value: 2 }
        ]
      },
      changeLine: {
        FacilityID: '',
        ImgUrl: '',
        ServiceBeginDate: '',
        ServiceEndDate: '',
        FacilityName: '',
        AllowPersonCount: '',
        Sort: '',
        Price: '',
        FacilityCount: '',
        UseMinute: '',
        CanCancelOrderMinute: '',
        UseCount: '',
        Content: ''
      },
      zzzzyyy: '',
      // 添加表单的验证规则对象
      addFormRules: {
        /*
         * belongsCategory: [
         *   { required: true, message: '请输入排序', trigger: 'blur' },
         *   {
         *     min: 1,
         *     max: 10,
         *     message: '排序在1~10个字符之间',
         *     trigger: 'blur'
         *   }
         * ],
         */
        FacilityName: [
          { required: true, validator: checkEmoji, trigger: 'blur' }
        ],
        AllowPersonCount: [
          {
            required: true,
            validator: checkFix,
            message: '请输入使用人数',
            trigger: 'blur'
          }
        ],
        Price: [{ required: true,validator: checkEmojin, }],
        FacilityCount: [
          { required: true, message: '请输入设施数量' },
          { type: 'number', message: '设施数量须为数字值' }
        ],
        UseMinute: [
          { required: true, message: '请输入使用时间' },
          { type: 'number', message: '时长必须为数字值' }
        ],
        CanCancelOrderMinute: [
          { required: true, message: '请输入可取消订单时间' },
          { type: 'number', message: '可取消时间必须为数字值' }
        ],
        UseCount: [
          {
            required: true,
            validator: checkFix,
            message: '请输入使用次数',
            trigger: 'blur'
          }
        ],
        Tags: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        GoodsName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        ApplyLimitCount: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        ApplyMaxCount: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        Content: [
          { required: true, message: '请输入设施详情', trigger: 'blur' }
          /*
           * {
           *   min: 1,
           *   max: 10,
           *   message: '排序在1~10个字符之间',
           *   trigger: 'blur'
           * }
           */
        ],
        Sort: [
          { required: true, message: '请输入排序' },
          { type: 'number', message: '排序必须为数字值' }
          /*
           * {
           *   min: 1,
           *   max: 10,
           *   message: '排序在1~10个字符之间',
           *   trigger: 'blur'
           * }
           */
        ]
        /*
         * IfState: [
         *   { required: true, message: '请输入排序', trigger: 'blur' },
         *   {
         *     min: 1,
         *     max: 10,
         *     message: '排序在1~10个字符之间',
         *     trigger: 'blur'
         *   }
         * ],
         */
        /*
         *   CoverImgUrl: [
         *     { required: true, message: '请输入排序', trigger: 'blur' },
         *     {
         *       min: 1,
         *       max: 10,
         *       message: '排序在1~10个字符之间',
         *       trigger: 'blur'
         *     }
         *   ]
         */
      },
      // 查询到的用户信息对象
      editForm: {
        FacilityName: '',
        ServiceBeginDate: '',
        ServiceEndDate: '',
        Sort: '',
        Price: '',
        AllowPersonCount: '',
        CheckStatus: ''
      },
      // 审核
      options: [
        {
          value: '0',
          label: '待审核'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '-1',
          label: '驳回'
        },
        {
          value: '',
          label: '全部'
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
          labelOne: '是'
        },
        {
          valueOne: '0',
          labelOne: '否'
        }
      ],
      keyword: '',
      value1: '',
      ServiceGoodscategory: '',
      select: [],
      // 控制新增类别对话框的显示与隐藏
      facilityDialogVisible: false,
      // 控制查看用户对话框的显示与隐藏
      showDialogVisible: false,
      // 控制修改类别对话框的显示与隐藏
      changeDialogVisible: false,
      finishDialogVisible: false,
      // eslint-disable-next-line camelcase
      is_search: false,
      activeId: [], // 选中的id数组
      multipleSelection: [],
      multipleSelectionAll: [],
      idKey: 'FacilityID',
      queryInfo: {
        GoodsCategoryID: 1,
        Page: 1,
        Limit: 20
      },
      // 列表数据
      tableData: [],
      total: 0,
      randomKey: '',
      progressFlag: false,
      maxHeight: 0
    }
  },
  computed: {
    ServiceBeginDate() {
      return this.formInline.ServiceBeginDate
    }
  },
  watch: {
    ServiceBeginDate() {
      let reg = /[0-9]{2}/g
      let str = this.ServiceBeginDate.match(reg)
      let hours = str[0]
      if (hours === '23') {
        hours = '00'
      } else {
        hours = Number(str[0]) + 1
      }
      let minute = str[1]

      this.zzzzyyy = `${hours}:${minute}`
      /*
       * let hours
       * let minute
       */
      /*
       * this.
       * this.zzzzyyy = this.ServiceBeginDate +
       */
    },
    value1(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    value(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
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
        window.innerHeight - this.$refs.table.$el.offsetTop - 170
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 90
      }
    })
  },
  created() {
    this.getServiceList()
  },
  methods: {
    
    uploadImg(f) {
      // console.log(f)
      // eslint-disable-next-line camelcase
      // this.form.home_img = ''
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('ImgFile', f.file)
      axios({
        url: process.env.VUE_APP_BASE_API + '/hotel_facility/img_upload',
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
              // eslint-disable-next-line camelcase
              // console.log(res)
              this.formInline.ImgUrl = res.data.data.url
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
      formdata.append('ImgFile', f.file)
      axios({
        url: process.env.VUE_APP_BASE_API + '/hotel_facility/img_upload',
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
              // eslint-disable-next-line camelcase
              // console.log(res)
              this.changeLine.ImgUrl = res.data.data.url
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
        data.FacilityStatus = this.value1
        data.CheckStatus = this.value
        data.Search = this.keyword
      }
      const res = await hotelFacilityIndex(data)
      // console.log(res)
      if (res.code !== 0) return this.$message.error('获取列表失败')
      // 如果返回状态正常，将请求的数据保存到data中
      this.tableData = res.data.rows
      this.total = res.data.total
      this.randomKey = Math.random()
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
      // 重新按照pagenum发送请求，请求最新的数据
      this.getServiceList()
    },
    increaseDialogVisible() {
      // eslint-disable-next-line require-await
      this.$refs.addFormRef.validate(valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
    //  this.$confirm('点击保存该数据将自动更变为待提交状态且下架，需重新审核后才可上架，请确认是否保存?', '操作说明', {
    //           confirmButtonText: '保存',
    //           cancelButtonText: '取消',
    //           type: 'warning',
    //           center: true
        this.$confirm(
          '点击确定该数据奖变为待提交状态且下架需重新审核后才可上架,请确认是否保存？',
          '操作说明',
          {
            confirmButtonText: '保存',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        ).then(async () => {
          // 可以发起添加用户的网络请求
          const data = this.formInline
          const ChargeMethod = this.chargeMethods.value
          const res = await hotelFacilityCreate({
            ImgUrl: data.ImgUrl,
            ServiceBeginDate: data.ServiceBeginDate,
            ServiceEndDate: data.ServiceEndDate,
            FacilityName: data.FacilityName,
            // AllowPersonCount: data.AllowPersonCount,
            ChargeMethod,
            Sort: data.Sort,
            Price: data.Price,
            // FacilityCount: data.FacilityCount,
            OnceUseMinute: ChargeMethod === 1 ? data.UseMinute : 10,
            // UseMinute: data.UseMinute,
            CanCancelOrderMinute: data.CanCancelOrderMinute,
            // UseCount: data.UseCount,
            FacilityCount: data.FacilityCount,
            Content: data.Content,
            Type: 1
          })
            .then(res => {
              this.$message.success('新增设施成功！')
              // 隐藏添加用户的对话框
              this.facilityDialogVisible = false
              // 重新获取用户列表数据
              this.getServiceList()
              this.addDialogClosed()
            })
            .catch(err => {
              console.log(err)
            })
        })

        /*
         * console.log(res)
         * if (res.code !== 0) {
         *   return this.$message.error('添加用户失败！')
         */

        // }
      })
    },
    // 保存并提交
    adminIncreaseDialogVisible() {
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.formInline

        const res = await hotelFacilityCreate({
          ImgUrl: data.ImgUrl,
          ServiceBeginDate: data.ServiceBeginDate,
          ServiceEndDate: data.ServiceEndDate,
          FacilityName: data.FacilityName,
          FacilityCount: data.FacilityCount,
          Sort: data.Sort,
          Price: data.Price,
          ChargeMethod: this.chargeMethods.value,
          OnceUseMinute: this.chargeMethods.value === 1 ? data.UseMinute : 0,
          CanCancelOrderMinute: data.CanCancelOrderMinute,
          Content: data.Content,
          Type: 2
        })
          .then(res => {
            this.$message.success('添加设施成功！')
            // 隐藏添加用户的对话框
            this.facilityDialogVisible = false
            // 重新获取用户列表数据
            this.getServiceList()
            this.addDialogClosed()
          })
          .catch(() => {
            this.$message.error('添加设施失败！')
          })

        /*
         * console.log(res)
         * if (res.code !== 0) {
         *   return this.$message.error('添加用户失败！')
         */

        // }
      })
    },
    // 监听添加用户对话框的关闭事件

    addDialogClosed() {
      this.facilityDialogVisible = false
      // console.log(this.formInline.ImgUrl)
      this.formInline.ImgUrl = ''
      this.formInline.ServiceBeginDate = ''
      this.formInline.ServiceEndDate = ''
      this.formInline.FacilityName = ''
      this.formInline.AllowPersonCount = ''
      this.formInline.Sort = ''
      this.formInline.Price = ''
      this.formInline.FacilityCount = ''
      this.formInline.UseMinute = ''
      this.formInline.CanCancelOrderMinute = ''
      this.formInline.UseCount = ''
      this.formInline.Content = ''
      this.$refs.addFormRef.resetFields()
    },
    // 查看serviceGoodsCategoryShow
    async showEditDialog(ID) {
      // console.log(ID)

      const res = await hotelFacilityShow({
        FacilityID: ID
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
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

      const res = await hotelFacilityShow({
        FacilityID: ID
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
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
      hotelFacilityUpdate({
        FacilityID: this.changeLine.FacilityID,
        ImgUrl: this.changeLine.ImgUrl,
        ServiceBeginDate: this.changeLine.ServiceBeginDate,
        ServiceEndDate: this.changeLine.ServiceEndDate,
        FacilityName: this.changeLine.FacilityName,
        FacilityCount: this.changeLine.FacilityCount,
        Sort: this.changeLine.Sort,
        Price: this.changeLine.Price,
        ChargeMethod: this.changeLine.ChargeMethod,
        OnceUseMinute: this.changeLine.OnceUseMinute,
        CanCancelOrderMinute: this.changeLine.CanCancelOrderMinute,
        // UseCount: this.changeLine.UseCount,
        Content: this.changeLine.Content,
        Type: 1
      })
        .then(res => {
          // console.log(res)
          this.changeDialogVisible = false
          this.getServiceList()
          this.$message.success('设施维护订单更新成功')
        })
        .catch(err => {
          this.$message.error('设施维护订单更新失败')
        })
    },
    // 根据ID删除对应的用户信息
    async moveUserById(FacilityID) {
      /*
       * console.log(CommentID)
       * 弹框询问用户是否删除数据
       */
      // console.log(FacilityID)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该数据, 是否继续?',
        '提示',
        {
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
      const res = await hotelFacilityDelete({ FacilityIDs: [FacilityID] })

      if (res.code !== 0) {
        return this.$message.error('删除订单失败！')
      }

      this.$message.success('删除订单成功！')
      this.getServiceList()
    },
    // 点击批量删除
    async batchRemove() {
      this.changePageCoreRecordData()
      // console.log(this.multipleSelectionAll)

      if (
        this.multipleSelectionAll == '' ||
        this.multipleSelectionAll.length == 0
      ) {
        let data = {}
        this.$message('请选择要操作的内容')
      } else {
        this.tableDataSelect = []

        this.multipleSelectionAll.forEach((m, i) => {
          this.tableDataSelect[i] = m.FacilityID
        })
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
        const res = await hotelFacilityDelete({
          FacilityIDs: this.tableDataSelect
        })

        if (res.code !== 0) {
          return this.$message.error('删除订单失败！')
        }

        this.$message.success('删除订单成功！')
        this.multipleSelectionAll = []
        this.getServiceList()
      }
    },
    async updateFinishDialogVisible(FacilityID) {
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
      const res = await hotelFacilityCheck({
        FacilityID,
        OperateCheckStatus: 1
      })

      if (res.code !== 0) {
        return this.$message.error('提交订单失败！')
      }

      this.$message.success('提交订单成功！')
      this.getServiceList()
    },
    // 下架
    async soldOut(ID) {
      const res = await hotelFacilityUpDown({
        FacilityIDs: [ID],
        OperateFacilityStatus: 0
      })
      // console.log(res)
      if (res.code !== 0) {
        return this.$message.error('下架失败！')
      }

      this.$message.success('下架成功！')
      this.getServiceList()
    },
    // 上架
    async putaway(ID) {
      const res = await hotelFacilityUpDown({
        FacilityIDs: [ID],
        OperateFacilityStatus: 1
      })
      // console.log(res)
      if (res.code !== 0) {
        return this.$message.error('上架失败！')
      }

      this.$message.success('上架成功！')
      this.getServiceList()
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
      // console.log(this.multipleSelectionAll)

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
      /*
       * 得到当前页没有选中的id
       * console.log(this.tableData)
       */
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
      if (this.value == null && this.value1 == null && this.keyword == '') {
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
    handleReset() {
      this.value1 = ''
      this.input = ''
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
      this.changeLine.ImgUrl = this.formInline.ImgUrl
      // console.log(this.formInline.ImgUrl)

      // console.log(this.changeLine.ImgUrl)

      // console.log(this.changeLine.ImgUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 500 < 1

      if (!isJPG) {
        this.$message.error('请上传JPG，JPEG，PNG，GIF，BMP格式的图片并且小于500k，仅能上传一张图片')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!')
        return false
      }
      return isJPG && isLt2M
    },
    // 提交功能
    noFinsh() {
      this.finishDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.zy_bigsix {
  .zy_imgChange {
    width: 148px;
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
  .el-dialog__title {
    font-size: 10px;
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
    overflow-x: hidden;
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
  .zy_elImage {
    width: 100px;
    height: 100px;
  }
  fieldset,
  img {
    border: 1px dashed #ccc !important;
    padding: 5px;
    width: 148px;
  }
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
  // .el-form-item {
  //   transform: translateX(30%);
  // }
  .zy_facilityTime {
    display: flex;
    width: 52% !important;
    transform: translateX(50%);
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
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
  .el-pagination {
    margin-top: 10px;
  }
  .el-select > .el-input {
    width: 104px;
  }
}
.el-upload--picture-card {
  margin-left: 350px;
}
.el-message-box--center .el-message-box__title {
  justify-content: start;
}
.el-message-box--center .el-message-box__container {
  text-align: left;
  color: red;
}
</style>
