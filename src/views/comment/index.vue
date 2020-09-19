<template>
  <div id="commemt" class="main LoadingArea">
    <div class="comment_top clearfix" ref="heightTop">
      <div class="comment_form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="fl" label="评论状态">
            <el-select v-model="form.ReplyStatusVal">
              <el-option
                v-for="item in form.ReplyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fl" label="所属标签">
            <el-select v-model="form.EvaluationVal">
              <el-option
                v-for="item in form.Evaluation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item class="fl"> -->
          <el-button
            type="primary"
            class="golbal-btn comment_list comment_top"
            icon="el-icon-search"
            @click="handleSearch()"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            class="golbal-btn m-t6"
            @click="reset"
            >重置</el-button
          >
          <el-button class="fr" @click="deleteHandle()">批量删除</el-button>
          <!-- </el-form-item> -->
        </el-form>
        <!-- <el-form ref="form" :model="form" label-width="10px">
          <el-form-item class="fl">
            <el-input
              placeholder="房间号/用户名/操作人员"
              v-model="form.serchTxt"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item class="fl">
            <el-date-picker
              v-model="form.dateVal"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="fl">
            <el-button type="primary" @click="serchHandle()">查询</el-button>
          </el-form-item>
        </el-form>-->
      </div>
      <!-- <div class="comment_delete fr">
        <el-button @click="deleteHandle()">批量删除</el-button>
      </div>-->
    </div>
    <div class="comment_list table_list">
      <el-table
        ref="table"
        :data="tableData"
        :height="tableHeight"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleCheckAllChange"
      >
        <el-table-column
          type="selection"
          min-width="55"
          align="center"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          prop="HotelName"
          label="酒店名称"
          min-width="150"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.HotelName }}</template>
        </el-table-column>
        <el-table-column
          prop="UserID"
          label="用户ID"
          min-width="130"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.UserID }}</template>
        </el-table-column>
        <el-table-column
          prop="RoomID"
          label="房间号"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.RoomNumber }}</template>
        </el-table-column>
        <el-table-column
          prop="Content"
          label="评论内容"
          min-width="305"
          show-overflow-tooltip
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.Content.length > 20
              ? scope.row.Content.slice(0, 19) + "..."
              : scope.row.Content
          }}</template>
        </el-table-column>
        <el-table-column
          prop="EvaluationText"
          label="所属标签"
          min-width="100"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.EvaluationText }}</template>
        </el-table-column>
        <el-table-column
          prop="ReplyStatusText"
          label="评论状态"
          min-width="130"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{
            scope.row.ReplyStatusText
          }}</template>
        </el-table-column>
        <el-table-column
          prop="CreateDate"
          label="发布时间"
          min-width="200"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.CreateDate }}</template>
        </el-table-column>

        <el-table-column
          prop="OperatorName"
          label="操作人员"
          min-width="130"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">{{ scope.row.OperatorName }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          fixed="right"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.CommentID)"
              type="text"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="total > 0"
        class="pagination"
        background=""
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="parseInt(curPage)"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev,pager,next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div class="dialog">
      <el-dialog
        title="查看评论"
        :visible.sync="dialogTableVisible"
        width="800"
        :show-close="false"
      >
        <div class="comment_detail">
          <el-form :model="Info"  label-position="right" :hide-required-asterisk="false" label-width="120px">
              <el-form-item label="房号:" prop="RoomID">
                <el-input v-model="detail.RoomID" disabled="" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="用户信息:" prop="HotelName">
                <el-input v-model="resData.Tel" disabled="" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="Tel">
                <el-input v-model="detail.RoomID" disabled="" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="评论内容:" prop="HotelName">
                <span >好评 、 标签1、标签2、标签3</span>
                <!-- <el-input v-model="resData.HotelName" disabled="" style="width:90%"></el-input> -->
              </el-form-item>
              <el-form-item label="评论状态:" prop="ReplyStatusText">
                <el-input v-model="resData.ReplyStatusText" disabled="" style="width:90%"></el-input>
              </el-form-item>
              
          </el-form>
          
          <!-- <div class="item">
            <span class="in_block">房号:</span>
            <span class="span_label">{{ detail.RoomID }} </span>
          </div> -->
          <!-- <div class="item">
            <span class="in_block">用户信息:</span>
            <span class="span_label">{{ resData.HotelName }}</span>
          </div> -->
          <!-- <div class="item">
            <span class="in_block">电话:</span>
            <span class="span_label">{{ resData.Tel==''?'未填写':resData.Tel}}</span>
          </div> -->
          <!-- <div class="item">
            <span class="in_block">手机</span>
            <span class="span_label">{{ detail.Tel }}18749879</span>
          </div>
          <div class="item">
            <span class="in_block">发布时间</span>
            <span class="span_label">{{ detail.CreateDate }}</span>
          </div>
          <div class="item">
            <span class="in_block">评论状态</span>
            <span class="span_label">{{ detail.EvaluationText }}</span>
          </div>
          <div class="item">
            <template v-if="detail.ReplyStatus == 0">
              <span class="in_block">回复状态</span>
              <span class="span_label">{{ detail.ReplyStatusText }}</span>
            </template>
            <template v-else>
              <span class="in_block">回复时间</span>
              <span class="span_label">{{ detail.CreateDate }}</span>
            </template>
          </div>
          <div class="item">
            <span class="in_block">操作人员</span>
            <span class="span_label">{{ detail.OperatorName }}</span>
          </div>
          <div class="item">
            <span class="in_block">标签</span>
            <span class="span_label">
              <span v-for="item in detail.Tags" :key="item.TagName">{{
                item.TagName
              }}</span>
            </span>
          </div>
        </div>
        <div class="item">
          <!-- <div class="item1" style="marginBottom:5px">
            <span class="in_block">评论内容 :</span>
            <span class="span_label1">好评 、 标签1、标签2、标签3</span>
          </div> -->
          <!-- <div class="item1" style="marginBottom:5px">
            <span class="in_block">评论状态:</span>
            <span class="span_label1">{{resData.ReplyStatusText}}</span>
          </div> -->
          <div class="imgView" v-if="!!imgsObj.list.length">
            <div class="prev" @click="toPrev"></div>
            <div class="contain">
              <div :class="['img_con1', { posLeft: firstPos }]">
                <span
                  class="img"
                  v-for="item in imgsObj.list[imgsObj.index]"
                  :key="item"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item"
                    :preview-src-list="detail.ImageUrls"
                  ></el-image>
                </span>
              </div>
            </div>
            <div class="next" @click="toNext"></div>
          </div>
          <!-- <div class="text">{{ detail.Content }}</div> -->
        </div>
         <el-form :model="Info"  label-position="right" :hide-required-asterisk="false" label-width="120px">
              <el-form-item label="商家回复信息" prop="RoomID" >
                <!-- <el-input v-model="detail.RoomID" disabled="" style="width:90%"></el-input> -->
              </el-form-item>
              <el-form-item label="回复人:" prop="OperatorName">
                <el-input v-model="detail.OperatorName" disabled="" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="回复时间:" prop="CreateDate">
                <el-input v-model="detail.CreateDate" disabled="" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="回复内容:" prop="replyText">
                  <el-input
                    v-model="replyText"
                    type="textarea"
                    show-word-limit
                    :rows="4"
                    style="width:90%"
                    maxlength="200"
                    placeholder="请输入要回复的信息【字数不超过200个字】"
                  ></el-input>
              </el-form-item>
          </el-form>
        <div class="answers item">
         

          <!-- <div style="font-size:17px;font-weight:700">商家回复信息</div> -->

          <!-- <div style="margin-top:20px">
            <span class="in_block">回复人:</span>
            <span class="span_label">{{ detail.OperatorName }}</span>
          </div> -->
          <!-- <div style="margin-top:20px;">
            <span class="in_block">回复时间:</span>
            <span class="span_label">{{ detail.CreateDate }}</span>
          </div> -->
          <!-- <div style="position: relative;width:100%;padding-right:70px">
            <span class="in_blockls">回复内容:</span>
            <el-input
              v-model="replyText"
              type="textarea"
              show-word-limit
              :rows="4"
              class="span_labells"
              maxlength="200"
              placeholder="请输入要回复的信息【字数不超过200个字】"
            ></el-input>
            <div class="btn_reply">
              <el-button type="primary" size="mini" @click="handleReply()"
                >回复</el-button
              >
            </div>
          </div> -->
        </div>

        <div class="item btn_sure">
          <el-button type="primary" size="mini" @click="handleReply()"
                >回复</el-button
              >
          <el-button type="primary" size="mini" @click="sureHandle()"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  GetCommentList,
  GetCommentDetail,
  ToCommentReply,
  ToCommentDelete
} from '@/api/commentSet'
export default {
  data() {
    return {
      Info:{},
      form: {
        ReplyStatus: [
          { value: '2', label: '全部' },
          { value: '0', label: '未回复' },
          { value: '1', label: '已回复' }
        ],
        Evaluation: [
          { value: '0', label: '全部' },
          { value: '1', label: '好评' },
          { value: '2', label: '中评' },
          { value: '3', label: '差评' }
        ],
        ReplyStatusVal: '',
        EvaluationVal: ''
      },
      tableData: [],
      detail: {},
      replyText: '',
      oldReply: '',
      commentId: '',
      tableHeight: 0,
      total: 0, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      curPage: 1,
      pageSizes: [10, 20, 50, 100],
      dialogTableVisible: false,
      firstPos: false,
      imgList: [],
      arr1: [],
      arr2: [],
      idKey: 'CommentID',
      multipleSelection: [], // 单个页面选中
      multipleSelectionAll: [], // 所有页面选中1
      imgsObj: {
        index: 0,
        list: []
      },
      resData:'',//详情数据总成
    }
  },
  created() {
    this.getTableList()
    this.form.ReplyStatusVal = this.form.ReplyStatus[0].value
    this.form.EvaluationVal = this.form.Evaluation[0].value
  },
  mounted() {
    // this.getTableList()
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.heightTop.offsetHeight - 186 + 'px'
      // 监听窗口大小变化
      let self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.heightTop.offsetHeight - 186 + 'px'
      }
    })
  },
  methods: {
    // 获取评论列表
    async getTableList() {
      let data = {
        Page: this.page,
        Limit: this.limit
      }
      if (this.form.ReplyStatusVal != 2 && this.form.ReplyStatusVal != '') {
        data.ReplyStatus = this.form.ReplyStatusVal
      }
      if (this.form.EvaluationVal != 0 && this.form.EvaluationVal != '') {
        data.Evaluation = this.form.EvaluationVal
      }
      let res = await GetCommentList(data)
      this.tableData = res.data.row
      this.total = res.data.total
      this.curPage = res.data.current_page
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    // 查询
    handleSearch() {
      this.getTableList(this.form.regionVal, this.form.tagVal)
    },
    // 批量删除
    deleteHandle() {
      this.changePageCoreRecordData()
      let selectIdArr = []
      this.multipleSelectionAll.forEach(row => {
        selectIdArr.push(row.CommentID)
      })
      if(selectIdArr.length===0){
        this.$alert('请选择要操作的内容', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else{
        this.$confirm('确认删除选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ToCommentDelete({ CommentIDArr: selectIdArr })
            .then(res => {
              this.$message.success(res.msg)
              this.getTableList()
            })
            .catch(err => {
              this.$message.error(err.msg)
            })
        })
      }
    },
    // 当前页面 选择
    handleCheckAllChange(val) {
      this.multipleSelection = val
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
    // 切换每页展示条数
    handleSizeChange(val) {
      this.limit = val
      this.getTableList()
    },
    // 切换page
    handleCurrentChange(val) {
      this.page = val
      this.changePageCoreRecordData()
      this.getTableList()
    },
    // 查看
    async handleClick(id) {
      this.dialogTableVisible = true
      this.commentId = id
      this.imgsObj = { index: 0, list: [] }
      let res = await GetCommentDetail({ CommentID: id })
      this.resData=res.data
      this.detail = res.data
      this.replyText = this.detail.ReplyContent
      this.oldReply = this.detail.ReplyContent
      /*
       * let imgsUrl = [
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
       *   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
       * ]
       */
      let imgsUrl = res.data.ImageUrls
      let newList = [],
        list = []
      if (imgsUrl.length > 0) {
        for (let i = 0; i < imgsUrl.length; i++) {
          if ((i + 1) % 5 === 0) {
            list.push(imgsUrl[i])
            newList.push(list)
            list = []
          } else {
            list.push(imgsUrl[i])
          }
          if (i + 1 === imgsUrl.length) {
            newList.push(list)
          }
        }
      }
      this.imgsObj.index = 0
      this.imgsObj.list = newList
      /*
       * this.arr1 = newList[0]
       * if (newList.length > 1) {
       *   this.arr2 = newList[1]
       * }
       */
      /*
       * this.imgList = newList
       * console.log(list, 333333, newList, this.arr1, this.arr2)
       */
    },
    toPrev() {
      // this.firstPos = false
      const { index, list } = this.imgsObj
      if (index > 0) {
        this.imgsObj.index = index - 1
      }
    },
    toNext() {
      // this.firstPos = true
      const { index, list } = this.imgsObj
      if (index < list.length - 1) {
        this.imgsObj.index = index + 1
      }
    },
    // 回复
    handleReply() {
      if (this.replyText === '') {
        this.$message({
          message: '回复内容为空，请输入！',
          center: true,
          offset: 300
        })
      } else {
        /*
         * if (this.replyText == this.oldReply) {
         *   this.$message({
         *     message: '请不要重复提交相同回复！',
         *     center: true,
         *     offset: 300
         *   })
         *   return
         * }
         */
        ToCommentReply({
          CommentID: this.commentId,
          ReplyContent: this.replyText
        })
          .then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              center: true,
              offset: 300,
              duration: 1500
            })
            GetCommentDetail({ CommentID: this.commentId }).then(newRes => {
              this.oldReply = newRes.data.ReplyContent
            })
            this.getTableList()
            this.dialogTableVisible = false
          })
          .catch(err => {
            this.$message(err.msg)
          })
      }
    },
    // 确认
    sureHandle() {
      if (this.replyText && this.replyText !== this.oldReply) {
        this.$message({
          message: '请先提交回复！',
          center: true,
          offset: 300
        })
      } else {
        this.dialogTableVisible = false
        this.firstPos = false
      }
    },
    //重置
    reset(){
      this.form.ReplyStatusVal = ''
      this.form.EvaluationVal = ''
    }
  }
}
</script>
<style lang="less">
#commemt {
  .el-dialog__title {
    font-size: 14px;
    color: #fff;
  }
  .el-dialog__header {
    padding: 10px;
    background: #1890ff;
  }
  dia .el-input--suffix .el-input__inner {
    padding-right: 15px;
  }
  .el-select {
    width: 90px;
  }
  .el-textarea {
    margin: 15px 0;
  }
  .main {
    padding: 20px 20px 20px 0;
  }
  .comment_list {
    margin-left: 15px;
  }

  .comment_top {
    margin-top: 5px;
  }
  .item {
    width: 80%;
    margin: 10px auto;
  }
  .imgView {
    height: 100px;
    margin: 15px 0 15px 80px;
    position: relative;
  }
  .contain {
    position: absolute;
    left: 35px;
    right: 35px;
  }
  .prev {
    position: absolute;
    left: 0;
    width: 15px;
    height: 100px;
    background: url(../../assets/comment/prev.png) no-repeat center;
  }
  .next {
    position: absolute;
    right: 0;
    width: 15px;
    height: 100px;
    background: url(../../assets/comment/next.png) no-repeat center;
  }
  .img_con1 {
    position: absolute;
    width: 100%;
  }
  .img_con2 {
    position: absolute;
    left: 400px;
    width: 100%;
    display: none;
  }
  .posLeft {
    left: -400px;
    display: none;
  }
  .posRight {
    left: 0;
    display: block;
  }
  .img {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  .img:not(:first-child) {
    margin-left: 15px;
  }
  .img img {
    height: 100%;
  }
  .in_block {
    display: inline-block;
    width: 70px;
    font-size: 14px;
    font-weight: 700;
    text-align: end;
  }
  .in_blockls {
    display: inline-block;
    width: 70px;
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    text-align: end;
    position: absolute;
    top: 20px;
  }
  .span_label {
    display: inline-block;
    width: calc(100% - 70px);
    text-align: left;
    padding-left: 30px;
  }
  .span_labells {
    display: inline-block;
    width: 100%;
    text-align: left;
    margin-left: 70px;
    padding-left: 30px;
  }
  .span_label1 {
    display: inline-block;
    width: calc(100% - 70px);
    height: 20px;
    text-align: left;
    padding-left: 30px;
  }
  .answers {
    margin: 15px auto;
  }
  .btn_reply {
    text-align: right;
  }
  .btn_sure {
    text-align: center;
  }
}

</style>
