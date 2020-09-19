<template>
  <div
    id="box"
    class="LoadingArea"
  >
      <el-tabs
        v-model='tagName'
        type="border-card"
        @tab-click="GetRoutineList"
        :before-leave="beforeLeaveTab"
         ref="tabs"
      >
        <el-tab-pane label="待接单" name="0">
          <Facility-table v-if="cleanstatus1===0" ref="table" :tableData.sync='tableData' :Status='0'></Facility-table>
        </el-tab-pane>
        <el-tab-pane label="待支付" name="2">
          <Facility-table v-if="cleanstatus1===2" ref="table" :tableData.sync='tableData' :Status='2'></Facility-table>
        </el-tab-pane>
        <el-tab-pane label="已付款" name="3">
          <Facility-table v-if="cleanstatus1===3" ref="table" :tableData.sync='tableData' :Status='3'></Facility-table>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="-1">
          <Facility-table v-if="cleanstatus1===-1" ref="table" :tableData.sync='tableData' :Status='-1'></Facility-table>
        </el-tab-pane>
        <el-tab-pane label="已使用" name="1">
          <Facility-table v-if="cleanstatus1===1" ref="table" :tableData.sync='tableData' :Status='1'></Facility-table>
        </el-tab-pane>
        <el-tab-pane label="全部" name="5">
          <Facility-table v-if="cleanstatus1===5" ref="table" :tableData.sync='tableData' :Status='5'></Facility-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import FacilityTable from '@/views/bookingService/facilityOrder/components/facilityTable.vue'
import { GetFacilityList } from '@/api/room-relevant'
export default {
  components: {
    FacilityTable
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
      switch (this.tagName) {
      case '0':
        this.cleanstatus1 = 0
        result = await GetFacilityList({
          Status: 0,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '3':
        this.cleanstatus1 = 3
        result = await GetFacilityList({
          Status: 3,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '-1':
        this.cleanstatus1 = -1
        result = await GetFacilityList({
          Status: -1,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '1':
        this.cleanstatus1 = 1
        result = await GetFacilityList({
          Status: 1,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '2':
        this.cleanstatus1 = 2
        result = await GetFacilityList({
          Status: 2,
          Limit: this.pageSize
        })
        console.log(result)
        this.tableData = result.data
        break
      case '5':
        this.cleanstatus1 = 5
        result = await GetFacilityList({
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
