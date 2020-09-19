<!--
 * @Author: your name
 * @Date: 2020-06-03 09:11:04
 * @LastEditTime: 2020-06-05 11:58:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\HouseTypeTable.vue
-->
<template>
  <div>
    <el-table
      :data="houseTypeTableData"
      border
      style="width: 100%"
      :height="houseTypeTableHeight"
    >
      <el-table-column
        prop="houseName"
        label="房型名称"
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        prop="houseSize"
        label="房间大小"
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        prop="badSize"
        label="床型大小"
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        prop="numOfPeople"
        label="适住人数                                                          "
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        prop="editTime"
        label="编辑时间"
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        prop="editor"
        label="操作人员"
        width="180"
        align="center"
        :resizable='false'
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="175"
        :resizable='false'
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            @click="check(scope.row)"
            type="text"
            class="golbal-btn-text"
          >查看</el-button>
          <el-button
            @click="update(scope.row)"
            type="text"
            class="golbal-btn-text"
          >编辑</el-button>
          <el-button
            @click="remove(scope.row)"
            type="text"
            class="golbal-btn-text-danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    houseTypeTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    checkHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的查看')
      }
    },
    updateHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的编辑')
      }
    },
    removeHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的删除')
      }
    },
    houseTypeTableHeight: {
      type: [String, Number],
      default: '0'
    }
  },
  data() {
    return {}
  },
  methods: {
    check(val) {
      this.checkHandle(val)
    },
    remove(val) {
      this.removeHandle(val)
    },
    update(val) {
      this.updateHandle(val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
