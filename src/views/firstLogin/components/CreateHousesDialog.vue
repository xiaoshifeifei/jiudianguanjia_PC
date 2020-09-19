<!--
 * @Author: your name
 * @Date: 2020-06-04 10:25:53
 * @LastEditTime: 2020-06-04 10:58:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\HousesAddDialog.vue
-->
<template>
  <div>
    <el-dialog
      title="批量新增房间"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="gdf-c">
        <el-button
          type="primary"
          style="margin-right: 30px;"
        >
          <input
            ref="upload"
            type="file"
            @change="importf(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </el-button>
        <div>
          <div>下载导入模板：</div>
          <div
            @click="batchExport"
            style="color: darkcyan
          ;cursor: pointer;"
          >房间导入模板下载</div>
        </div>
      </div>
      <el-table
        id="table_out"
        :data="tableData"
        border
        class="table"
        height="300"
        ref="excelData"
        header-cell-class-name="table-header"
        style="width: 100%;margin:30px auto 0 auto;"
      >
        <el-table-column
          :resizable="false"
          prop
          label="数据说明"
        >
          <template slot-scope="scope">
            <div style="color: #ff0000;">{{scope.row.err_msg}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="ID"
          label="序列号"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="RoomNumber"
          label="房号"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="RoomFloor"
          label="楼层数"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="Model"
          label="房型名称"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="WiFiName"
          label="WIFI名称"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="WiFiPwd"
          label="WIFI密码"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="SerialNumber"
          label="二维码编码"
        ></el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
          class="golbal-btn"
        >确定上传</el-button>
        <el-button
          @click="handleClose"
          class="golbal-btn"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    addHousesHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的批量新增')
      }
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.createHousesDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'createHousesDialogState',
        value: false
      })
    },
    addHouses() {
      this.addHousesHandle()
    },
    importf(obj) {
      // TODO 导入
    },
    batchExport() {
      // TODO 确认导入
    }
  }
}
</script>

<style lang="less" scoped>
</style>
