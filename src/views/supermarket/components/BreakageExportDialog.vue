<!--
 * @Author: your name
 * @Date: 2020-05-27 16:31:50
 * @LastEditTime: 2020-05-27 16:40:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\BreakageExportTable.vue
-->
<template>
  <div>
    <el-dialog
      title="导出"
      width="70%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-table
      id="table_out"
      :data="exportTableData"
      border
      max-height="500"
      style="width: 100%"
    >
      <el-table-column
        prop="OrderSerialNo"
        label="订单号"
        width="300"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="RoomNumber"
        label="房间号"
        width="300"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        label="类别"
        width="200"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.BelongModule==1?"便利店":scope.row.BelongModule==3?'情趣用品':'土特产'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="OrderStatus"
        label="状态"
        width="220"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="PayDate"
        label="操作时间"
        align="center"
        :resizable="false"
      >
      </el-table-column>
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
import XLSX from 'xlsx'
import { thirteenBitTimestamp } from '@/utils/index'
import FileSaver from 'file-saver'
export default {
  props: {
    exportTableData: {
      type: Array,
      default: () => [
        {
          orderID: '000007',
          roomID: '0107',
          user: '濤濤',
          phoneNum: '13055753890',
          servise: '土特产',
          cost: '30',
          state: '已取消',
          orderTime: '2020-04-06'
        }
      ]
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.breakExportDialogState
    }
  },
  created(){
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'breakExportDialogState',
        value: false
      })
    },
    exportHandle() {
      // TODO 导出事件
      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = ''
      wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      let tittle = thirteenBitTimestamp(new Date().getTime()) + '商超便利店.xlsx'
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          tittle
        ) // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      history.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
