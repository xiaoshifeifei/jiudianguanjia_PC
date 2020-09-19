<template>
  <div class="zy_bigthird LoadingArea">
    <el-card>
      <!-- 输入框  按钮区域 -->
      <el-row :gutter="10">
        <div style="width:100%;height:45px">
          <el-col :xs="8" :sm="7" :md="7" :lg="5" :xl="5">
            <span class="zy_fontsize" style="font-size:16px">审核状态 ：</span>
            <el-select v-model="value" @change="isCheck">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="zy_fontsize"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :xs="8" :sm="7" :md="7" :lg="5" :xl="5">
            <span class="zy_fontsize" style="font-size:16px">是否上架 ：</span>
            <el-select v-model="value1" placeholder="请选择" @change="isRise">
              <el-option
                v-for="item in optionsOne"
                :key="item.value1"
                :label="item.labelOne"
                :value="item.valueOne"
                class="zy_fontsize"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :xs="7" :sm="7" :md="8" :lg="5" :xl="5">
            <el-input
              placeholder="物品名称/物品标题"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :xs="8" :sm="7" :md="7" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-button class="golbal-btn" type="primary" @click="handleSearch"
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
        </div>
        <div class="zy_pil">
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-delete"
            @click="batchRemove()"
            >批量删除</el-button
          >
          <el-button
            type="success"
            class="golbal-btn"
            icon="el-icon-edit"
            @click="checkGoods(multipleSelection)"
            >批量提交</el-button
          >
          <el-button
            type="primary"
            class="golbal-btn"
            icon="el-icon-plus"
            @click="serviceDialogVisible = true"
            >新增物品</el-button
          >
        </div>
      </el-row>
      <!-- 列表区域 -->
      <el-table
        ref="table"
        :data="tableData"
        :height="maxHeight"
        border
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
          :resizable="false"
          prop="GoodsName"
          label="物品名称"
          align="center"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          min-width="100px"
          align="center"
          :resizable="false"
          prop="Tags"
          label="物品标题"
        ></el-table-column>
        <el-table-column
          min-width="110px"
          align="center"
          :resizable="false"
          label="商品封面图片"
        >
          <template slot-scope="scope">
            <div class="zy_elImage">
              <el-image
                :preview-src-list="[scope.row.CoverImgUrl]"
                :src="scope.row.CoverImgUrl"
                alt
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100px"
          align="center"
          :resizable="false"
          prop="Sort"
          label="排序"
        ></el-table-column>
        <el-table-column
          min-width="100px"
          align="center"
          prop="CheckStatus"
          label="审核状态"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.CheckStatus == -1
              ? "驳回"
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
          min-width="100px"
          align="center"
          prop="GoodsStatus"
          label="是否上架"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.GoodsStatus == 0
              ? "否"
              : scope.row.GoodsStatus == 1
              ? "是"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          align="center"
          fixed="right"
          label="操作"
          width="190px"
        >
          <template width="180px" slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="
                showEditDialog(scope.row.GoodsCategoryID, scope.row.GoodsID,scope.row)
              "
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
            <!-- 编辑按钮 -->
            <el-button
              v-if="
                !(scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 1)
              "
              :disabled="scope.row.CheckStatus === 1"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="
                showEditDialogOne(scope.row.GoodsCategoryID, scope.row.GoodsID)
              "
              >编辑</el-button
            >
            <!-- 取消按钮 -->
            <!-- <el-button
              v-if="scope.row.CheckStatus===2&&scope.row.GoodsStatus===0"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
            >删除</el-button>-->
            <!-- 编辑按钮 -->
            <!-- <el-button
              v-if="scope.row.CheckStatus===-1||scope.row.CheckStatus===1"
              class="golbal-btn-text"
              type="text"
              size="mini"
              @click="showEditDialogOne(scope.row.GoodsCategoryID,scope.row.GoodsID)"
            >编辑</el-button>-->
            <!-- 提交按钮 -->
            <el-button
              v-if="scope.row.CheckStatus !== 2"
              class="golbal-btn-text"
              type="text"
              size="mini"
              :disabled="scope.row.CheckStatus === 1"
              @click="checkGoods([scope.row])"
              >提交</el-button
            >
            <!-- 取消按钮 -->
            <el-button
              v-if="
                !(scope.row.CheckStatus === 2 && scope.row.GoodsStatus === 1)
              "
              :disabled="scope.row.CheckStatus === 1"
              class="golbal-btn-text-danger"
              type="text"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
              >删除</el-button
            >
            <!-- 编辑按钮 -->
            <!-- <el-button
              v-if="scope.row.CheckStatus===0"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              type="text"
              size="mini"
              :disabled="true"
              @click="showEditDialogOne(scope.row.GoodsCategoryID,scope.row.GoodsID)"
            >编辑</el-button>-->
            <!-- 提交按钮 -->
            <!-- <el-button
              v-if="scope.row.CheckStatus===0"
              style="color:#aaaaaa"
              :disabled="true"
              class="golbal-btn-text"
              type="text"
              size="mini"
            >提交</el-button>-->
            <!-- 取消按钮 -->
            <!-- <el-button
              v-if="scope.row.CheckStatus !==2 && scope.row.CheckStatus !==1"
              style="color:#aaaaaa"
              class="golbal-btn-text"
              type="text"
              :disabled="true"
              size="mini"
              @click="moveUserById(scope.row.GoodsID)"
            >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.Page"
        :page-sizes="[20, 50, 100]"
        :page-size="queryInfo.Limit"
        background
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增类别对话框 -->
    <el-dialog
      title="新增物品"
      :visible.sync="serviceDialogVisible"
      width="70%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFormRef"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :rules="addFormRules"
        @close="addDialogClosed"
      >
        <div class="zy_toggle">
          <div class="zy_first_form">
            <el-form-item label="所属类别 :" prop="belongsCategory">
              <!-- <el-input 
                v-model="formInline.belongsCategory"
                readonly
              ></el-input> -->
              <el-select v-model="formInline.GoodsCategoryID" @change="clickElSelect()">
                <el-option
                  v-for="item in select"
                  :key="item.GoodsCategoryID"
                  :label="item.CategoryName"
                  :value="item.GoodsCategoryID"
                  class="zy_fontsize"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称 :" prop="GoodsName">
              <el-input
                maxlength="20"
                show-word-limit
                v-model="formInline.GoodsName"
                placeholder="万能胶"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品标题 :" prop="Tags">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="formInline.Tags"
                placeholder="万能胶"
              ></el-input>
            </el-form-item>
            <el-form-item label="一天可领取次数 :" prop="DayMaxCount">
              <el-input
                onkeyup="value=value.replace(/[^1234567890]+/g,'')"
                v-model="formInline.DayMaxCount"
                placeholder="2"
              ></el-input>
            </el-form-item>
            <el-form-item label="一天最多可领取数量 :" prop="DayMaxGoodsCount">
              <el-input
                onkeyup="value=value.replace(/[^1234567890]+/g,'')"
                v-model="formInline.DayMaxGoodsCount"
                placeholder="2"
              ></el-input>
            </el-form-item>
          </div>
          <div class="zy_between">
            <!-- <el-form
            
            ref="addFormRef"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            :rules="addFormRules"
            >-->
            <el-form-item label="封面图" prop="CoverImgUrl">
              <el-upload
                action="#"
                class="upload-demo gmr-10"
                :show-file-list="false"
                :http-request="uploadImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="formInline.CoverImgUrl"
                  width="100"
                  class="zy_imgChange"
                  :src="formInline.CoverImgUrl"
                  alt
                />
                <i v-else class="el-icon-plus"></i>
              </el-upload>
              <div>
                支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k
              </div>
            </el-form-item>
            <el-form-item label="是否上架 :" prop="IfState">
              <el-switch
                v-model="value1"
                active-text="上架"
                inactive-text="下架"
              ></el-switch>
              <span>(此功能待完成)</span>
            </el-form-item>
          </div>
        </div>
        <div class="zy_second_form">
          <!-- <el-form
          ref="addFormRef"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          :rules="addFormRules"
          >-->
          <el-form-item label="排序 :" prop="Sort">
            <el-input v-model="formInline.Sort" placeholder="100"></el-input>
          </el-form-item>
          <el-form-item label="详情 :" class="zy_tinymmm" prop="Content">
            <Tinymce
              ref="editor"
              v-model="formInline.Content"
              :key="randomKey"
              :height="250"
              :action="upUrl"
              imgFile="CoverImgFile"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="zy_dialogFooter">
        <el-button @click="increaseDialogVisible">保 存</el-button>
        <el-button type="primary" @click="finishFalse">保存并提交</el-button>
      </div>
    </el-dialog>
    <!-- 查看用户对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看物品"
      :visible.sync="showDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <div class="zy_toggle">
        <div class="zy_first_form">
          <el-form
            ref="addFormRef"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="所属类别 :" prop="belongsCategory">
              <div>{{ editForm.CategoryName }}</div>
            </el-form-item>
            <el-form-item label="商品名称 :" prop="GoodsName">
              <div>{{ editForm.GoodsName }}</div>
            </el-form-item>
            <el-form-item label="商品标题 :" prop="Tags">
              <div>{{ editForm.Tags }}</div>
            </el-form-item>
            <el-form-item label="一天可领取次数 :" prop="DayMaxCount">
              <div>{{ editForm.DayMaxCount }}</div>
            </el-form-item>
            <el-form-item label="一天最多可领取数量 :" prop="DayMaxGoodsCount">
              <div>{{ editForm.DayMaxGoodsCount }}</div>
            </el-form-item>
            <el-form-item label="排序 :" prop="Sort">
              <div>{{ editForm.Sort }}</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="zy_between">
          <el-form
            ref="addFormRef"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="封面图" prop="CoverImgUrl">
              <el-image
                :preview-src-list="[editForm.CoverImgUrl]"
                :src="editForm.CoverImgUrl"
                alt
                style="width = 70px;height:70px;"
              ></el-image>
            </el-form-item>
            <el-form-item label="是否上架 :" prop="GoodsStatus">
              <div>
                {{
                  editForm.GoodsStatus === 0
                    ? "否"
                    : editForm.GoodsStatus === 1
                    ? "是"
                    : ""
                }}
              </div>
            </el-form-item>
            <el-form-item label="操作时间 :" prop="CreateDate">
              <div>{{ editForm.CreateDate }}</div>
            </el-form-item>
            <el-form-item label="操作人员 :" prop="AdminName">
              <div>{{ editForm.AdminName }}</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="zy_second_form">
        <el-form
          ref="addFormRef"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="详情 :" prop="Content" class="commentTextarea">
            <div class="zy_fuwenben" v-html="newcontent"></div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="物品编辑"
      :visible.sync="changeDialogVisible"
      width="55%"
      @close="addDialogClosed"
    >
      <div class="zy_toggle">
        <div class="zy_first_form">
          <el-form
            ref="a"
            :inline="true"
            :model="editForm"
            class="demo-form-inline"
            :rules="addFormRules"
          >
            <el-form-item label="所属类别 :" prop="belongsCategory">
              <!-- <el-input :value="editForm.CategoryName" readonly=""></el-input> -->
              <el-select v-model="editForm.GoodsCategoryID" @click.native="clickElSelect()">
                <el-option
                  v-for="item in select"
                  :key="item.GoodsCategoryID"
                  :label="item.CategoryName"
                  :value="item.GoodsCategoryID"
                  class="zy_fontsize"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称 :" prop="GoodsName">
              <el-input
                maxlength="20"
                show-word-limit
                v-model="editForm.GoodsName"
                placeholder="万能胶"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品标题 :" prop="Tags">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="editForm.Tags"
                placeholder="万能胶"
              ></el-input>
            </el-form-item>
            <el-form-item label="一天可领取次数 :" prop="DayMaxCount">
              <el-input
                v-model="editForm.DayMaxCount"
                placeholder="2"
              ></el-input>
            </el-form-item>
            <el-form-item label="一天最多可领取数量 :" prop="DayMaxGoodsCount">
              <el-input
                v-model="editForm.DayMaxGoodsCount"
                placeholder="2"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="zy_between">
          <el-form
            ref="addFormRef"
            :inline="true"
            :model="changeLine"
            class="demo-form-inline"
            :rules="addFormRules"
          >
            <el-form-item label="封面图" prop="CoverImgUrl">
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
                >
                  <img
                    v-if="editForm.CoverImgUrl"
                    width="100"
                    class="zy_imgChange"
                    :src="editForm.CoverImgUrl"
                    alt
                  />
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="是否上架" prop="IfState">
              <el-switch
                v-model="value2"
                active-text="上架"
                inactive-text="下架"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="zy_second_form">
        <el-form
          ref="addFormRef"
          :inline="true"
          :model="editForm"
          class="demo-form-inline"
          :rules="addFormRules"
        >
          <el-form-item label="排序 :" prop="Sort">
            <el-input v-model="editForm.Sort" placeholder="100"></el-input>
          </el-form-item>
          <el-form-item label="详情 :" prop="Content" class="zy_tinymmm">
            <Tinymce
              ref="editor"
              v-model="editForm.Content"
              :height="250"
              :action="upUrl"
              imgFile="CoverImgFile"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="zy_dialogFooter">
        <el-button @click="compileDialogVisible = true">保 存</el-button>
        <el-button type="primary" @click="updateEditDialogVisible"
          >保存并提交</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑保存对话框 -->
    <el-dialog
      title="操作说明"
      :visible.sync="compileDialogVisible"
      width="30%"
    >
      <div class="zy_caozuo">
        <span>
          点击保存该数据将自动更变为待提交状
         态且下架需重新审核后才可上架，请确认是否保存？
        </span>
      </div>
      <div class="zy_dialogFooter">
        <el-button @click="compileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDialogVisible">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  serviceGoodsIndex,
  serviceGoodsCreate,
  serviceGoodsCoverImgUpload,
  bookingServiceGoodsItem,
  serviceGoodsShow,
  serviceGoodsUpdate,
  serviceGoodsDelete,
  serviceGoodsUpDown,
  serviceGoodsCheck
} from '@/api/serviceGoods'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
import { getToken, getRefreshToken } from '@/utils/auth'
import { Loading } from 'element-ui'
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
      } else if (y <= 0 && y !== value.length) {
        return callback(new Error('仅支持两位小数'))
      } else {
        callback()
      }
    }
    let checkEmoji = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5]/g
      let res = value.match(reg)
      if (res) {
        res = value.match(reg).join('')
      }

      if (res != value) {
        return callback(new Error('只能是汉字'))
      } else {
        return callback()
      }
    }
    return {
      // 上传
      upUrl: process.env.VUE_APP_BASE_API + '/service_goods/cover_img_upload',
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      formInline: {
        GoodsCategoryID: '',
        belongsCategory: '',
        GoodsName: '',
        DayMaxCount: '',
        DayMaxGoodsCount: '',
        Sort: '',
        Content: '',
        Tags: '',
        CoverImgUrl: '',
        IfState: ''
      },
      myGoodsCategoryID:'',
      richData: '',
      changeLine: {
        GoodsID: '',
        GoodsCategoryID: '',
        CoverImgUrl: '',
        GoodsName: '',
        Tags: '',
        belongsCategory: '',
        DayMaxCount: '',
        DayMaxGoodsCount: '',
        Sort: '',
        Content: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        belongsCategory: [
          { required: true, message: '请输入所属类别', trigger: 'blur' }
        ],
        GoodsName: [{ required: true, validator: checkEmoji, trigger: 'blur' }],
        DayMaxCount: [
          {
            required: true,
            min: 0,
            max: 100,
            message: '0~100',
            trigger: 'blur'
          }
        ],
        DayMaxGoodsCount: [
          {
            required: true,
            message: '请输入一天最多可领取数量',
            trigger: 'blur'
          }
        ],
        CoverImgUrl: [
          { required: true, message: '请输入封面图', trigger: 'blur' }
        ],
        IfState: [
          // { required: true, message: '请选择是否上架', trigger: 'blur' }
        ],
        Tags: [{ required: true, validator: checkEmoji, trigger: 'blur' }],
        ApplyLimitCount: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '排序在1~10个字符之间',
            trigger: 'blur'
          }
        ],
        ApplyMaxCount: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '排序在1~10个字符之间',
            trigger: 'blur'
          }
        ],
        Content: [
          { required: true, message: '请输入物品详情', trigger: 'blur' }
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
          { required: true, message: '请输入排序', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '排序在1~10个字符之间',
            trigger: 'blur'
          }
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
        CategoryName: '',
        GoodsName: '',
        Tags: '',
        DayMaxCount: '',
        belongsCategory: '',
        DayMaxGoodsCount: '',
        Sort: '',
        Content: '',
        CoverImgUrl: '',
        GoodsStatus: '',
        CreateDate: '',
        AdminName: ''
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
          labelOne: '是'
        },
        {
          valueOne: '0',
          labelOne: '否'
        }
      ],
      input: '',
      value1: '',
      ServiceGoodscategory: '',
      select: [],
      // 控制新增类别对话框的显示与隐藏
      serviceDialogVisible: false,
      // 控制查看用户对话框的显示与隐藏
      showDialogVisible: false,
      // 控制修改类别对话框的显示与隐藏
      changeDialogVisible: false,
      // 控制编辑保存对话框
      compileDialogVisible: false,
      // eslint-disable-next-line camelcase
      is_search: false,
      activeId: [], // 选中的id数组
      multipleSelection: [],
      multipleSelectionAll: [],
      idKey: 'GoodsID',
      queryInfo: {
        GoodsCategoryID: 1,
        Page: 1,
        Limit: 20,
        Search: '',
        GoodsStatus: '',
        CheckStatus: ''
      },
      // 列表数据
      tableData: [],
      total: 0,
      randomKey: '',
      progressFlag: false,
      newcontent: '',
      maxHeight: 300
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
    input(newVal, oldVal) {
      if (newVal == '') {
        this.getServiceList()
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      // console.log(this.$refs.table.$el)
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 170
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 100
      }
    })
    this.clickElSelect()
  },
  created() {
    this.getServiceList()
  },
  computed: {
    GoodsCategoryID() {
      return this.$store.state.zy.GoodsCategoryID
    }
  },
  methods: {
    // 下拉筛选
    isCheck(e) {
      console.log(e)
      this.queryInfo.CheckStatus = e
      this.getServiceList()
    },
    isRise(e) {
      this.queryInfo.GoodsStatus = e
      this.getServiceList()
    },

    // 下拉
    async clickElSelect() {
      // console.log('---------------------')
      const resSelect = await bookingServiceGoodsItem()
      console.log('resSelect',resSelect)
      if (resSelect.code !== 0) return this.$message.error('获取列表失败')
      // 如果返回状态正常，将请求的数据保存到data中
        this.select = resSelect.data.ServiceGoodscategory
      // this.select = [this.$route.query]
      // console.log("this.select",this.select);
      // console.log('this.formInline.GoodsCategoryID',this.formInline.GoodsCategoryID);
      this.myGoodsCategoryID = this.formInline.GoodsCategoryID
      

      this.formInline.belongsCategory = this.$route.query.CategoryName
    },
    uploadImg(f) {
      // console.log(f)
      // eslint-disable-next-line camelcase
      // this.form.home_img = ''
      let that = this
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
              that.formInline.CoverImgUrl = res.data.data.url
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
      let that = this
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
              that.editForm.CoverImgUrl = res.data.data.url
            }, 200)
          }
          // console.log(that.formInline.CoverImgUrl)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getServiceList() {
      let data = {
        GoodsCategoryID: this.$route.query.id,
        Page: this.queryInfo.Page,
        Limit: this.queryInfo.Limit,
        Search: this.queryInfo.Search,
        GoodsStatus: this.queryInfo.GoodsStatus,
        CheckStatus: this.queryInfo.CheckStatus
      }
      if (this.is_search) {
        data.CheckStatus = this.value
        data.GoodsStatus = this.value1
        data.Search = this.input
      }

      console.log(data)

      const res = await serviceGoodsIndex(data)
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
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        this.$confirm(
          '点击确定该数据奖自动变更为待提交状态且下加需重新审核后才可上架，请确认是否保存？',
          '保存提示',
          {
            type: 'warning'
          }
        ).then(async () => {
          // 可以发起添加用户的网络请求
          const data = this.formInline
          data.GoodsCategoryID = this.$route.query.id

          const res = await serviceGoodsCreate({
            GoodsCategoryID: data.GoodsCategoryID,
            GoodsName: data.GoodsName,
            DayMaxCount: data.DayMaxCount,
            DayMaxGoodsCount: data.DayMaxGoodsCount,
            Sort: data.Sort,
            Content: data.Content,
            Tags: data.Tags,
            IfState: data.IfState,
            CoverImgUrl: data.CoverImgUrl
          })
          this.$message.success('新增物品成功！')
          // 隐藏添加用户的对话框
          this.serviceDialogVisible = false
          // 重新获取用户列表数据
          this.getServiceList()
        })
      })
      this.changeLine = {}
    },
    finishFalse() {
      console.log(1111);
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        console.log(222);
        if (!valid) return
        // 可以发起添加用户的网络请求
        const data = this.formInline
        console.log('datadatadata',data);
        console.log("this.formInline",this.formInline);
        // this.$route.query.id
        data.GoodsCategoryID = this.myGoodsCategoryID
        console.log("data.GoodsCategoryID",data.GoodsCategoryID);
        console.log(333);
        const res = await serviceGoodsCreate({
          GoodsCategoryID: data.GoodsCategoryID,
          CoverImgUrl: data.CoverImgUrl,
          GoodsName: data.GoodsName,
          Tags: data.Tags,
          DayMaxCount: data.DayMaxCount,
          DayMaxGoodsCount: data.DayMaxGoodsCount,
          Sort: data.Sort,
          Content: data.Content,
          Type: 2
        })
        console.log(res.data)
        // console.log(res)
        if (res.code !== 0) {
          this.$message.error('新增物品失败！')
        } else {
          this.$message.success('新增物品成功！')
          // 隐藏添加用户的对话框
          this.serviceDialogVisible = false
          // 重新获取用户列表数据
          this.getServiceList()
        }
      })
      this.changeLine = {}
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      /*
       * console.log(dialogImageUrl)
       * this.formInline.belongsCategory = ''
       */
      this.formInline.GoodsCategoryID=""
      this.formInline.belongsCategory=""
      this.formInline.GoodsName=""
      this.formInline.DayMaxCount=""
       this.formInline.DayMaxGoodsCount=""
      this.formInline.Sort=""
      this.formInline.Tags=""
      this.formInline.CoverImgUrl=""

      this.formInline.IfState = ''

      this.formInline.Content = ''
      
      this.dialogImageUrl = ''
      this.randomKey = Math.random()
      this.$refs.addFormRef.resetFields()
    },
    // 查看serviceGoodsCategoryShow
    async showEditDialog(ID, dev,row) {
      // console.log(ID)
      console.log('rowrowrow',row);

      const res = await serviceGoodsShow({
        CategoryName: this.$route.query.CategoryName,
        GoodsCategoryID: ID,
        GoodsID: dev
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }

      this.editForm = res.data
      this.editForm.CategoryName = this.$route.query.CategoryName
      // console.log(res.data.row)

      /*
       * console.log(res)
       * console.log(this.editForm.ApplyLimitCount)
       */
      this.newcontent = this.editForm.Content
      /*
       * this.$refs.content.getContent(res.data.Content)
       * this.$refs.content.innerHTML = this.editForm.Content
       */
      this.showDialogVisible = true
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
      const res = await serviceGoodsDelete({ GoodsIDs: [GoodsID] })

      if (res.code !== 0) {
        return this.$message.error('删除客房物品失败！')
      }

      this.$message.success('删除客房物品成功！')
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
          this.tableDataSelect[i] = m.GoodsID
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
        const res = await serviceGoodsDelete({
          GoodsIDs: this.tableDataSelect
        })

        if (res.code !== 0) {
          return this.$message.error('删除客房物品失败！')
        }

        this.$message.success('删除客房物品成功！')
        this.multipleSelectionAll = []
        this.getServiceList()
      }
    },
    /**
     * 提交审核 可批量 商品数据
     * @param {Array}  goodsArray
     */
    async checkGoods(goodsArray) {
      if (!goodsArray || !goodsArray.length) {
        return this.$message.warning('请选择要操作的内容')
      }
      let GoodsID = []
      goodsArray.reduce((arr, v) => {
        if (v.CheckStatus === 0) {
          arr.push(v.GoodsID)
        }
        return arr
      }, GoodsID)
      if (!GoodsID.length) {
        return this.$message('请选择可提交的内容')
      }
      let loadingInstance = Loading.service()
      try {
        let res = await serviceGoodsCheck(GoodsID)
        if (res.code !== 0) {
          this.$message.error('提交失败，请重新提交')
        } else {
          this.$message.success('提交成功')
          this.getServiceList()
        }
      } catch (error) {
        this.$message.error('提交失败，请重新提交')
      }
      loadingInstance.close()
    },
    async showEditDialogOne(ID, dev) {
      // console.log(ID)

      const res = await serviceGoodsShow({
        CategoryName: this.$route.query.CategoryName,
        GoodsCategoryID: ID,
        GoodsID: dev
      })
      // console.log(this.$route.query.CategoryName)
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }

      this.editForm = res.data
      console.log(res.data)
      this.editForm.CategoryName = this.$route.query.CategoryName
      // console.log(res.data.row)

      /*
       *console.log(this.$refs)
       *console.log(this.editForm.Content)
       */
      this.newcontent = this.editForm.Content
      /*
       * this.$refs.content.getContent(res.data.Content)
       * this.$refs.content.innerHTML = this.editForm.Content
       */
      this.changeDialogVisible = true
    },
    // 点击编辑获取GoodsID
    openDialog(ID, GoodsCategoryID, GoodsName, Tags, Sort, CoverImgUrl) {
      // console.log(ApplyLimitCount, ApplyMaxCount, Content)
      this.changeDialogVisible = true
      this.changeLine.GoodsID = ID
      this.changeLine.GoodsCategoryID = GoodsCategoryID
      this.changeLine.GoodsName = GoodsName
      this.changeLine.Tags = Tags

      this.changeLine.CoverImgUrl = CoverImgUrl
      this.changeLine.Sort = Sort
    },
    updateEditDialogVisible() {
      console.log("this.editForm",this.editForm);
      serviceGoodsUpdate({
        GoodsID: this.editForm.GoodsID,
        GoodsCategoryID: this.editForm.GoodsCategoryID,
        GoodsName: this.editForm.GoodsName,
        DayMaxCount: this.editForm.DayMaxCount,
        DayMaxGoodsCount: this.editForm.DayMaxGoodsCount,
        Tags: this.editForm.Tags,
        Content: this.editForm.Content,
        CoverImgUrl: this.editForm.CoverImgUrl,
        Sort: this.editForm.Sort,
        Type: 2
      })
        .then(res => {
          // console.log(res)
          this.changeDialogVisible = false
          this.getServiceList()
          this.$message.success('客房服务物品更新成功')
        })
        .catch(err => {
          this.$message.error('客房服务物品更新失败')
        })
    },
    /**
     * 客房物品编辑  保存
     */
    updateDialogVisible() {
      serviceGoodsUpdate({
        GoodsID: this.editForm.GoodsID,
        GoodsCategoryID: this.editForm.GoodsCategoryID,
        GoodsName: this.editForm.GoodsName,
        DayMaxCount: this.editForm.DayMaxCount,
        DayMaxGoodsCount: this.editForm.DayMaxGoodsCount,
        Tags: this.editForm.Tags,
        Content: this.editForm.Content,
        CoverImgUrl: this.editForm.CoverImgUrl,
        Sort: this.editForm.Sort,
        Type: 1
      })
        .then(res => {
          // console.log(res)
          this.compileDialogVisible = false
          this.changeDialogVisible = false
          this.getServiceList()
          this.$message.success('客房服务物品更新成功')
        })
        .catch(err => {
          this.$message.error('客房服务物品更新失败')
        })
    },
    // 下架
    async soldOut(ID) {
      const confirmResult = await this.$confirm(
        '正在进行下架操作, 是否继续?',
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
        return this.$message.info('已取消下架')
      }
      const res = await serviceGoodsUpDown({
        GoodsIDs: [ID],
        OperateGoodsStatus: 0
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
      const confirmResult = await this.$confirm(
        '正在进行上架操作, 是否继续?',
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
        return this.$message.info('已取消上架')
      }
      const res = await serviceGoodsUpDown({
        GoodsIDs: [ID],
        OperateGoodsStatus: 1
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
    // eslint-disable-next-line require-await
    handleSearch() {
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
      this.value = ''
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
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt500k = file.size / 1024 <= 500
      console.log(file.size / 1024)
      if (!isJPG) {
        this.$message.error('支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k')
        return false
      }
      if (!isLt500k) {
        this.$message.error('支持png、jpg、jpeg、bmp、gif格式，建议尺寸宽高为750*750px，不超过500k')
        return false
      }
      return isJPG && isLt500k
    }
  }
}
</script>

<style lang="less">
.zy_bigthird {
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
  /* .el-select {
    // 下拉选择框
    width: 120px;
  } */
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

  .zy_second_form .el-form--inline .el-form-item {
    width: 94%;
  }
  .zy_elImage {
    width: 70px;
    height: 70px;
    margin: 0 auto;
  }
  fieldset {
    border: 1px dashed #ccc !important;
    padding: 5px;
    width: 70px;
    height: 70px;
  }

  .zy_imgChange {
    width: 100%;
    height: 100%;
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
  .golbal-btn-text {
    font-size: 15px !important;
  }
  .golbal-btn-text-danger {
    font-size: 15px !important;
  }
  .el-pagination {
    margin-top: 10px;
  }
  .el-form--inline .el-form-item__content {
    width: 50%;
  }
  .zy_tinymmm {
    .el-form-item__content {
      width: 90% !important;
    }
  }
  .commentTextarea {
    width: 100%;
    .el-form-item__content {
      width: 90% !important;
      margin-top: 1px;
    }
  }
  .zy_caozuo {
    text-align: center;
    font-size: 18px;
    color: red;
    margin-bottom: 20px;
    text-align: left;
    padding: 0 30px;
  }
}
</style>
