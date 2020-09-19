<!--
 * @Author: your name
 * @Date: 2020-05-26 16:55:11
 * @LastEditTime: 2020-06-05 17:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\RepairCheckDialog.vue
-->
<template>
  <div id='repair-check-dialog'>
    <el-dialog
      title="查看报损"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <section class="repair_box">
        <section>
          <h3>基本信息</h3>
          <el-divider />
          <table class="other_table">
            <tr>
              <td>订单号</td>
              <td>01234567</td>
            </tr>
            <tr>
              <td>付款状态</td>
              <td>已付款【微信】</td>
            </tr>
            <tr>
              <td>类别</td>
              <td>便利店</td>
            </tr>
          </table>
        </section>
        <section>
          <h3>操作信息</h3>
          <el-divider />
          <table class="other_table">
            <tr>
              <td>操作时间</td>
              <td>2020-04-22 11:30</td>
            </tr>
            <tr>
              <td>操作人</td>
              <td>蔡卓涛</td>
            </tr>
          </table>
        </section>
        <section>
          <h3>商品信息</h3>
          <el-divider />
          <table class="other_table">
            <tr>
              <td>补单商品</td>
              <td>
                <el-carousel
                  trigger="click"
                  height="150px"
                  :autoplay='false'
                  indicator-position="none"
                  arrow="always"
                >
                  <el-carousel-item
                    v-for="(item, index) in testList"
                    :key="index"
                  >
                    <section class="carousel_box">
                      <p
                        v-for="(i, index) in item"
                        :key="index"
                      >{{i}}</p>
                    </section>
                  </el-carousel-item>
                </el-carousel>
              </td>
            </tr>
            <tr>
              <td>商品总价</td>
              <td>￥30</td>
            </tr>
          </table>
        </section>
        <section>
          <h3>备注信息</h3>
          <el-divider />
          <el-input
            type="textarea"
            v-model="dialogData"
            :disabled="true"
          />
        </section>
      </section>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleClose"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogData: {
      type: [String, Array, Object]
    }
  },
  data() {
    return {
      testList: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      page: 4
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.repairCheckDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'repairCheckDialogState',
        value: false
      })
    },
    edit() {
      // TODO 编辑操作
    },
    formatList() {
      this.page = Math.ceil(this.testList.length / 4)
      console.log(this.testList)
      let newList = []
      let list = []
      for (let index = 0; index < this.testList.length; index++) {
        if ((index + 1) % 4 === 0) {
          list.push(this.testList[index])
          newList.push(list)
          list = []
        } else {
          list.push(this.testList[index])
        }
        if (index + 1 === this.testList.length) {
          newList.push(list)
        }
      }
      this.testList = newList
      console.log(newList)
    }
  },
  mounted() {
    this.formatList()
  }
}
</script>

<style lang="less">
#repair-check-dialog {
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .el-dialog {
    margin: 10vh auto !important;
    height: 80vh;
    .el-dialog__body {
      height: calc(80vh - 54px - 70px);
    }
  }
  .repair_box {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    section {
      padding: 10px;
      flex-basis: 50%;
      height: 50%;
    }
  }
  .other_table {
    width: 100%;
    tr {
      display: inline-block;
      width: 100%;
      min-height: 30px;
      line-height: 30px;
    }
    td {
      display: inline-block;
      width: 85%;
    }
    tr td:nth-of-type(1) {
      width: 15%;
      text-align: right;
    }
    tr td:nth-of-type(2) {
      padding-left: 20px;
      font-weight: 600;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item .carousel_box {
    margin: 0 auto;
    width: 70%;
    height: 100%;
  }
}
</style>
