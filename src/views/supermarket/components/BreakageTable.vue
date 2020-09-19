
<template>
  <div>
    <el-table
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="orderID"
        label="订单号"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="goods"
        label="商品"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类别"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        prop="operateTime"
        label="操作时间"
        align="center"
        :resizable="false"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="100"
        :resizable="false"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type='text'
            class="golbal-btn-text"
            @click="check(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type='text'
            class="golbal-btn-text-danger"
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <slot name="page"></slot>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeight: {
      type: [String, Number],
      default: '0'
    },
    checkHandle: {
      type: Function,
      default: () => {
        console.log('这是组件内部的查看事件')
      }
    },
    removeHandle: {
      type: Function,
      default: () => {
        console.log('这是组件内部的删除事件')
      }
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    check(val) {
      this.checkHandle(val)
    },
    remove(val) {
      this.removeHandle(val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
