<!--
 * @Author: your name
 * @Date: 2020-06-02 16:17:25
 * @LastEditTime: 2020-06-05 11:52:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\CreateHouseType.vue
-->
<template>
  <div id='createHouseTypeDialog'>
    <el-dialog
      title="创建房型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div
        class="msg_box"
        v-show="msgBoxState"
      ><span>请填写完整有标注红色星号的数据</span>
        <el-button
          type="text"
          @click="closeMsgBox"
        >x</el-button>
      </div>
      <el-form
        :model="form"
        :rules='formRules'
        label-width="100px"
      >
        <el-form-item label="创建人">
          <el-input
            :disabled="true"
            v-model='form.creator'
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="房型名称"
          prop="houseName"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            v-model='form.houseName'
            size="small"
            placeholder="请输入房型名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="适住人数"
          prop="numOfPeople"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            v-model.number="form.numOfPeople"
            size="small"
            placeholder="请输入房间适住人数"
          ></el-input>
        </el-form-item>
        <el-form-item label="床型大小">
          <el-col :span="11">
            <el-form-item prop="bedWidth">
              <el-input
                :disabled="onState === 0 || onState === 2?false:true"
                size="small"
                v-model="form.badWidth"
                placeholder="请输入床型长度"
              >
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="1"
            style="textAlign:center"
          >X</el-col>
          <el-col :span="12">
            <el-form-item prop="bedHeight">
              <el-input
                :disabled="onState === 0 || onState === 2?false:true"
                size="small"
                v-model="form.bedHeight"
                placeholder="请输入床型宽度"
              >
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="房间大小"
          prop="houseSize"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            placeholder="输入房间大小"
            v-model="form.houseSize"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose" class="golbal-btn">取 消</el-button>
        <el-button
          v-if="onState !==1?true:false"
          type="primary"
          @click="save"
          class="golbal-btn"
        >{{onState === 2?'更新':'保 存'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        creator: '张三',
        houseName: '',
        numOfPeople: '',
        badWidth: '',
        bedHeight: '',
        houseSize: ''
      },
      formRules: { houseName: [{ required: true, message: '请输入房型名称', trigger: 'blur' }] },
      msgBoxState: true,
      saveState: false
    }
  },
  props: {
    saveHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件保存')
      }
    },
    onState: {
      type: Number,
      default: 0
      // 使用状态  0：首次进入 1：查看 2：编辑
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.createHouseTypeDialogState
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        setInterval(() => {
          this.msgBoxState = false
        }, 3000)
      }
    }
  },
  methods: {
    handleClose() {
      console.log(this.saveState)
      // TODO 判断保存状态 以保存则 关闭对话框
      if (this.saveState) {
        this.$store.dispatch('dialog/changeState', {
          key: 'createHouseTypeDialogState',
          value: false
        })
      } else if (this.onState === 0 && !this.saveState) {
        this.$alert('请填写房型信息，创建成功即可进行下一步。', '操作提示', {
          confirmButtonText: '确定'
        })
      }
    },
    save() {
      // TODO 保存操作
      this.saveHandle()
      this.saveState = true
    },
    closeMsgBox() {
      this.msgBoxState = false
    }
  }
}
</script>

<style lang="less" >
#createHouseTypeDialog {
  .msg_box {
    border: 1px solid red;
    background-color: rgba(255, 0, 0, 0.068);
    height: 25px;
    color: rgb(131, 131, 131);
    padding: 0 10px;
    margin-bottom: 10px;
    span {
      display: inline-block;
      line-height: 23px;
      height: 23px;
    }
    .el-button {
      float: right;
      padding: 0;
      margin: 0;
      color: rgb(131, 131, 131);
    }
  }
}
</style>
