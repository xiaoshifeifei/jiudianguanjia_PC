<!--
 * @Author: your name
 * @Date: 2020-06-05 09:23:05
 * @LastEditTime: 2020-06-05 10:22:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\GenerateCheckInfoDialog.vue
-->
<template>
  <div id='GenerateCheckInfoDialog'>

    <el-dialog
      title="确认基本信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-width="70px">
        <div class="left">
          <el-form-item label="物料方案">
            <img
              src="data:image/png;base64,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"
              alt=""
              class="materialImg"
            ><img
              src="data:image/png;base64,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"
              alt=""
              class="materialImg"
            >
          </el-form-item>
          <el-form-item label="制作价格">
            <p class="total"></p>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="收获地址">
            <el-input size="small"></el-input>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="方案说明">
            <div class="info_box">

            </div>
          </el-form-item>
        </div>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          class="golbal-btn"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="confirmPay"
          class="golbal-btn"
        >确认付款</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    generateInfoData: {
      type: [Array, Object],
      default: () => {
        return []
      }
    },
    confirmPayHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的确认付款')
      }
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.generateCheckInfoDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'generateCheckInfoDialogState',
        value: false
      })
      this.$store.dispatch('dialog/changeState', {
        key: 'generateMaterialDialogState',
        value: true
      })
    },
    confirmPay() {
      this.confirmPayHandle()
    }
  }
}
</script>

<style lang="less">
#GenerateCheckInfoDialog {
  .el-dialog:nth-of-type(1) {
    height: 55vh;
    .el-dialog__body {
      padding: 10px;
      height: calc(55vh - 54px - 70px);
      overflow-y: scroll;
      .el-form {
        width: 100%;
        height: 100%;
        .left,
        .right {
          padding: 10px;
          vertical-align: top;
          display: inline-block;
          width: 50%;
          height: 100%;
        }
        .info_box {
          height: 33vh;
        }
      }
      .materialImg {
        width: 40%;
        margin-right: 20px;
      }
    }
  }
}
</style>
