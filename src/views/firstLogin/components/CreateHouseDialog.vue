<!--
 * @Author: your name
 * @Date: 2020-06-03 11:43:52
 * @LastEditTime: 2020-06-04 11:27:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\CreateHouseDialog.vue
-->
<template>
  <div id='createHouseDialog'>
    <el-dialog
      title="创建房间"
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
        <el-form-item label="操作人员">
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
          <el-select
            v-model="form.houseName"
            placeholder="请选择房型名称"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="楼层数"
          prop="numOfFloor"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            v-model='form.numOfFloor'
            size="small"
            placeholder="请选择楼层数"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="房号"
          prop="houseID"
        >
          <el-input
            size="small"
            v-model="form.houseID"
            :disabled="onState === 0 || onState === 2?false:true"
            placeholder="输入房间大小"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="WIFI名称"
          prop="WIFIName"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            placeholder="输入WIFI名称"
            v-model="form.WIFIName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="WIFI密码"
          prop="WIFIPWD"
        >
          <el-input
            :disabled="onState === 0 || onState === 2?false:true"
            placeholder="输入WIFI密码"
            v-model="form.WIFIPWD"
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
        numOfFloor: '',
        houseID: '',
        WIFIName: '',
        WIFIPWD: ''
      },
      formRules: {
        houseName: [{ required: true, message: '请输入房型名称', trigger: 'blur' }],
        numOfFloor: [{ required: true, message: '请输入楼层数', trigger: 'blur' }],
        houseID: [{ required: true, message: '请输入房号', trigger: 'blur' }],
        WIFIName: [{ required: true, message: '请输入WIFI名称', trigger: 'blur' }],
        WIFIPWD: [{ required: true, message: '请输入WIFI密码', trigger: 'blur' }]
      },
      msgBoxState: true,
      saveState: false,
      options: [
        {
          value: 0,
          label: '尊享大床房'
        }
      ]
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
      return this.$store.state.dialog.createHouseDialogState
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
          key: 'createHouseDialogState',
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
#createHouseDialog {
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
