<!--
 * @Author: your name
 * @Date: 2020-05-25 09:16:19
 * @LastEditTime: 2020-05-27 17:21:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\CheckDialog.vue
-->
<template>
  <div id="common_check_dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <section class="order_box">
        <section class="other_box">
          <section class="base_header">
            <h3>基本信息</h3>
            <el-divider />
          </section>
          <table class="other_table">
            <tr>
              <td>订单状态</td>
              <td>已发货</td>
            </tr>
            <tr>
              <td>用户</td>
              <td>蔡卓涛</td>
            </tr>
            <tr>
              <td>手机</td>
              <td>13055753890</td>
            </tr>

            <tr>
              <td>服务项目</td>
              <td>土特产</td>
            </tr>
            <tr>
              <td>订单商品</td>
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
              <td>30元</td>
            </tr>
            <tr>
              <td>优惠券</td>
              <td>已减10元</td>
            </tr>
            <tr>
              <td>快递费</td>
              <td>5元配送费</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>￥25</td>
            </tr>
            <tr>
              <td>下单时间</td>
              <td>2020-04-22 15:15</td>
            </tr>
            <tr>
              <td>自提时间</td>
              <td>2020-04-22 15:15</td>
            </tr>
            <tr>
              <td>完成时间</td>
              <td>2020-04-22 16:01</td>
            </tr>
          </table>
        </section>

        <section class="base_box">
          <section class="base_header">
            <h3>物流相关</h3>
            <el-divider />
          </section>
          <table class="base_table">
            <tr>
              <td>物流单号</td>
              <td>1433223</td>
            </tr>
            <tr>
              <td>物流信息</td>
              <td>0508</td>
            </tr>
          </table>

        </section>
      </section>

      <section class='btn_box'>
        <el-button
          @click="handleClose"
          type="primary"
          class="golbal-btn"
        >确认</el-button>
      </section>
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
      return this.$store.state.dialog.specialCheckDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'specialCheckDialogState',
        value: false
      })
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
#common_check_dialog {
  .el-dialog {
    height: 80vh;
    margin: 10vh auto !important;
    .el-dialog__body {
      overflow-y: scroll;
      height: 90%;
    }
    .order_box {
      width: 100%;
      height: 93%;
      display: flex;
      .base_box {
        flex-basis: 50%;
        height: 100%;
        padding: 10px;
        .base_table {
          display: block;
          tr {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
          }
          td {
            display: inline-block;
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
      }
      .other_box {
        flex-basis: 50%;
        height: 100%;
        padding: 10px;
        .other_table {
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
      }
    }
    .btn_box {
      padding-top: 10px;
      text-align: center;
    }
    .el-divider--horizontal {
      margin: 10px 0;
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
