<!--
 * @Author: your name
 * @Date: 2020-05-26 15:24:32
 * @LastEditTime: 2020-05-29 09:32:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\CheckBreakDialog.vue
-->
<template>
  <div id="break-check-dialog">
    <el-dialog
      title="查看报损"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <section class="info-box">
        <table class="other_table">
          <h3>基本信息</h3>
          <el-divider />
          <tr>
            <td>订单号</td>
            <td>01234567</td>
          </tr>
          <tr>
            <td>物品状态</td>
            <td>报损【破损】</td>
          </tr>
          <tr>
            <td>类别</td>
            <td>便利店</td>
          </tr>
          <h3>商品信息</h3>
          <el-divider />
          <tr>
            <td>报损商品</td>
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
          <h3>操作信息</h3>
          <el-divider />
          <tr>
            <td>操作时间</td>
            <td>2020-04-22 11:30</td>
          </tr>
          <tr>
            <td>操作人</td>
            <td>张三</td>
          </tr>
        </table>

      </section>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
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
      return this.$store.state.dialog.breakCheckDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'breakCheckDialogState',
        value: false
      })
    },
    edit() {
      // TODO 编辑操作
    },
    submit() {
      this.$store.dispatch('dialog/changeState', {
        key: 'breakCheckDialogState',
        value: false
      })
    },
    formatList() {
      this.page = Math.ceil(this.testList.length / 4)
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
    }
  },
  mounted() {
    this.formatList()
  }
}
</script>

<style lang="less" scoped>
#break-check-dialog {
  .info-box{
    width: 80%;
    margin: 0 auto;
    h3{
      margin-top: 10px;
      font-weight: 600;
    }
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .other_table {
    margin: 0;
    display: block;
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
