<!--
 * @Author: your name
 * @Date: 2020-05-27 15:43:07
 * @LastEditTime: 2020-05-27 16:22:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\ExportDialog.vue
-->
<template>
  <div>
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-table
      :data="exportTableData"
      border
      max-height="500"
      style="width: 100%"
    >
      <el-table-column
        prop="orderID"
        label="订单号"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="roomID"
        label="房间号"
        width="180"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="user"
        label="用户"
        width="100"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="140"
        align="center"
        :resizable="false"
      />
      <el-table-column
        prop="servise"
        label="服务项目"
        align="center"
        :resizable="false"
      />
      <el-table-column
        label="费用"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          ￥ {{scope.row.cost}}
        </template>
      </el-table-column>

      <el-table-column
        prop="state"
        label="状态"
        align="center"
        :resizable="false"
      />

      <el-table-column
        prop="orderTime"
        label="下单时间"
        align="center"
        :resizable="false"
      />

      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="exportHandle"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    exportTableData: {
      type: Array,
      default: () => [{
        orderID: '000007',
        roomID: '0107',
        user: '濤濤',
        phoneNum: '13055753890',
        servise: '土特产',
        cost: '30',
        state: '已取消',
        orderTime: '2020-04-06'
      }]
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.commonExportDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'commonExportDialogState',
        value: false
      })
    },
    exportHandle() {
      // TODO 导出事件
    }
  }
}
</script>

<style lang="less" scoped>
</style>
