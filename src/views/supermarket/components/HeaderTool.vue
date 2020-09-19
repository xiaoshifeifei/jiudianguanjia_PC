<!--
 * @Author: your name
 * @Date: 2020-05-21 14:38:18
 * @LastEditTime: 2020-06-05 15:45:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\HeaderTool.vue
-->
<template>
  <div id='supheader_tool'>
    <el-row :gutter="10">
      <el-col
        v-if="tools.searchInput"
        :xl='4'
        :lg='5'
        :md='7'
        :sm='12'
        :xs='24'
      >
        <el-input
          v-model="searchText"
          placeholder="输入房间号/用户名/操作人员"
        />
      </el-col>
      <el-col
        v-if="tools.breakageSearchInput"
        :xl='4'
        :lg='5'
        :md='7'
        :sm='12'
        :xs='24'
      >
        <el-input
          class="golbal-tools"
          v-model="orderText"
          placeholder="输入订单号/状态/商品名"
        />
      </el-col>
      <el-col
        v-if="tools.orderTime"
        :xl='5'
        :lg='6'
        :md='7'
        :sm='12'
        :xs='24'
        class="time_picker"
      >
        <el-date-picker
          class="golbal-tools"
          v-model="orderTime"
          type="daterange"
          range-separator="至"
          start-placeholder="下单开始日期"
          end-placeholder="下单结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
      <el-col
        v-if="tools.operateTime"
        :xl='5'
        :lg='6'
        :md='7'
        :sm='12'
        :xs='24'
        class="time_picker"
      >
        <el-date-picker
          class="golbal-tools"
          v-model="operateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="操作开始日期"
          end-placeholder="操作结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
      <el-col
        :xl='4'
        :lg='5'
        :md='6'
        :sm='12'
        :xs='12'
      >
        <el-button
          v-if="tools.searchBtn"
          @click="search"
          class="golbal-btn"
          type="primary"
        >查询</el-button>
        <el-button
          v-if="tools.resetBtn"
          @click="reset"
          class="golbal-btn-reset"
          type="primary"
        >重置条件</el-button>
      </el-col>
      <el-col
        :xl='10'
        :lg='6'
        :md='1'
        :sm='12'
        :xs='12'
        style="textAlign:right"
      >
        <el-button
          v-if="tools.exportBtn"
          @click="exporting"
          class="golbal-btn"
          type="primary"
        >批量导出</el-button>
        <!-- <el-button
          v-if="tools.breakageBtn"
          @click="createBreakage"
          class="golbal-btn"
          type="primary"
        >新建报损</el-button> -->
        <el-button
          v-if="checkStatus2!=9"
          @click="createRepair"
          class="golbal-btn"
          type="primary"
        >新建补单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Object,
      default: () => ({
        searchInput: true,
        breakageSearchInput: false,
        orderTime: true,
        searchBtn: true,
        resetBtn: true,
        exportBtn: true,
        breakageBtn: false,
        operateTime: false,
      })
    },
    checkStatus2: {
      default:0
    }
  },
  data() {
    return {
      searchText: '', // 商品订单 搜索字符串
      orderTime: '', // 下单时间
      operateTime: '', // 操作时间
      orderText: '' // 报损订单号
    }
  },
  methods: {
    search() {//查询
      this.$emit('searchbtn',this.searchText,this.orderTime)
    },
    reset() {//重置
      this.$emit('reset')
    },
    exporting() {//导出
      this.$emit('exporting')
    },
    // createBreakage() {
    //   this.createBreakageHandle()
    // },
    createRepair() {//新建补单
      this.$emit('createRepair')
    }
  }
}
</script>

<style lang="less" >
#supheader_tool {
  .el-col {
    .el-input {
      margin-bottom: 15px;
    }
  }
  .el-date-editor {
    height: 40px !important;
  }
  .el-button {
    height: 40px !important;
  }
  .time_picker {
    .golbal-tools {
      width: 100%;
    }
    min-width: 360px !important;
  }
}
</style>
