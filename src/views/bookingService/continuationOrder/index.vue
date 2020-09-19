<template>
  <div
    id="box"
    class="LoadingArea"
  >
      <el-tabs
      v-model='tagName'
        type="border-card"
        @tab-click="handleClick"
        :before-leave="beforeLeaveTab"
         ref="tabs"
      >
        <el-tab-pane label="待处理">
          <continuat-table v-if="cleanstatus1===0" ref="table" :tableData.sync='tableData' :cleanstatus='0'></continuat-table>
        </el-tab-pane>
        <el-tab-pane label="处理完成">
          <continuat-table v-if="cleanstatus1===1" ref="table" :tableData.sync='tableData' :cleanstatus='1'></continuat-table>
        </el-tab-pane>
        <el-tab-pane label="已取消">
          <continuat-table v-if="cleanstatus1===2" ref="table" :tableData.sync='tableData' :cleanstatus='-1'></continuat-table>
        </el-tab-pane>
        <el-tab-pane label="全部">
          <continuat-table v-if="cleanstatus1===3" ref="table" :tableData.sync='tableData' :cleanstatus='5'></continuat-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import ContinuatTable from '@/views/bookingService/continuationOrder/components/continuatTable.vue'
import { continueList } from '@/api/room-relevant'
export default {
  components: {
    ContinuatTable
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      tabIndex: 0,
      cleanstatus1: '',
      tagName: '0'
    }
  },
  created() {
    this.GetRoutineList('0')
  },
  // eslint-disable-next-line no-empty-function
  methods: {
    async GetRoutineList(tab) {
      console.log('table')
      let result
      // eslint-disable-next-line default-case
      switch (tab) {
      case '0':
        this.cleanstatus1 = 0
        result = await continueList({
          OrderStatus: 0,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '1':
        this.cleanstatus1 = 1
        result = await continueList({
          OrderStatus: 1,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '2':
        this.cleanstatus1 = 2
        result = await continueList({
          OrderStatus: -1,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '3':
        this.cleanstatus1 = 3
        result = await continueList({
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      }
    },
    handleClick(tab, event) {
      this.tabIndex = tab.index
      this.GetRoutineList(tab.index)

    },
    beforeLeaveTab(activeIndex, oldActiveIndex) {
      console.log(activeIndex)
      console.log(oldActiveIndex)
      this.$store.dispatch('mumustore/changeState', {
        key: 'isSeach',
        value: false
      })
      this.$refs.table.cleanSelect()
    }
  }
}
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  padding: 10px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}
</style>
