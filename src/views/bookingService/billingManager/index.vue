<template>
  <div class="zy_bigfive LoadingArea">
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="zy_tabss"
      @tab-click="handleClick"
    >
      <el-tab-pane name="0" label="待接单">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="输入房间号/订单号"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="选择下单开始时间"
                  end-placeholder="选择下单结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button
                class="golbal-btn"
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
                >查询</el-button
              >
              <el-button
                class="gmv-3 golbal-btn-reset m-l10"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
                >重置条件</el-button
              >
            </div>
          </el-col>
          <div class="zy_pil">
            <el-button
              type="primary"
              class="golbal-btn"
              icon="el-icon-download"
              @click="derive()"
              >批量导出</el-button
            >
            <!-- <el-button class="delete-btn" @click="derive()">批量导出</el-button> -->
            <el-button
              class="golbal-btn"
              icon="el-icon-finished"
              @click="batchToComplete()"
              type="primary"
              >批量完成</el-button
            >
          </div>
        </el-row>
        <!-- 列表数据 -->
        <el-table
          v-if="InvoiceStatus === 0"
          ref="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :height="maxHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            :resizable="false"
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="InvoiceOrderNumber"
            align="center"
            label="订单号"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="RoomNumber"
            align="center"
            label="房号"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="UserName"
            align="center"
            label="用户"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="InvoiceStatus"
            align="center"
            label="状态"
            width="180"
          >
            <template>待接单</template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            prop="CreateDate"
            align="center"
            label="下单时间"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="UpdateDate"
            align="center"
            label="完成时间"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="ElectronicPaperType"
            align="center"
            label="类型"
            width="180"
          >
            <template slot-scope="scope">{{
              scope.row.ElectronicPaperType == 0
                ? "电子发票"
                : scope.row.ElectronicPaperType == 1
                ? "纸质发票"
                : ""
            }}</template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            prop="Title"
            align="center"
            label="抬头"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="OperatorName"
            align="center"
            label="操作人员"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            align="center"
            width="150px"
          >
            <template width="150px" slot-scope="scope">
              <!-- 查看按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="viewInvoice(scope.row.InvoiceOrderID)"
                >查看</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="acceptOrder(scope.row.InvoiceOrderID)"
                >接受</el-button
              >
              <!-- 取消按钮 -->
              <el-button
                @click="cancelButton(scope.row.InvoiceOrderID)"
                class="golbal-btn-text"
                type="text"
                size="mini"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.Page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane name="3" label="待服务">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="输入房间号/订单号"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="选择下单开始时间"
                  end-placeholder="选择下单结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button
                class="golbal-btn"
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
                >查询</el-button
              >
              <el-button
                class="gmv-3 golbal-btn-reset m-l10"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
                >重置条件</el-button
              >
            </div>
          </el-col>
          <div class="zy_pil">
            <el-button
              type="primary"
              class="golbal-btn"
              icon="el-icon-download"
              @click="derive()"
              >批量导出</el-button
            >
            <!-- <el-button class="delete-btn" @click="derive()">批量导出</el-button> -->
            <el-button
              class="golbal-btn"
              icon="el-icon-finished"
              @click="batchToComplete()"
              type="primary"
              >批量完成</el-button
            >
          </div>
        </el-row>
        <!-- 列表数据 -->
        <el-table
          v-if="InvoiceStatus === 3"
          ref="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :height="maxHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            :resizable="false"
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="InvoiceOrderNumber"
            align="center"
            label="订单号"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="RoomNumber"
            align="center"
            label="房号"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="UserName"
            align="center"
            label="用户"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="InvoiceStatus"
            align="center"
            label="状态"
            width="180"
          >
            <template>待服务</template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            prop="CreateDate"
            align="center"
            label="下单时间"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="UpdateDate"
            align="center"
            label="完成时间"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="ElectronicPaperType"
            align="center"
            label="类型"
            width="180"
          >
            <template slot-scope="scope">{{
              scope.row.ElectronicPaperType == 0
                ? "电子发票"
                : scope.row.ElectronicPaperType == 1
                ? "纸质发票"
                : ""
            }}</template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            prop="Title"
            align="center"
            label="抬头"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            prop="OperatorName"
            align="center"
            label="操作人员"
            width="180"
          ></el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            align="center"
            width="150px"
          >
            <template width="150px" slot-scope="scope">
              <!-- 查看按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="viewInvoice(scope.row.InvoiceOrderID)"
                >查看</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="finishButton(scope.row.InvoiceOrderID)"
                >完成</el-button
              >
              <!-- 取消按钮 -->
              <el-button
                @click="cancelButton(scope.row.InvoiceOrderID)"
                class="golbal-btn-text"
                type="text"
                size="mini"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.Page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane name="2" label="已完成">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="输入房间号/订单号"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="选择下单开始时间"
                  end-placeholder="选择下单结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button class="golbal-btn" type="primary" @click="handleSearch"
                >查询</el-button
              >
              <el-button
                class="gmv-3 golbal-btn-reset m-l10"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
                >重置条件</el-button
              >
            </div>
          </el-col>
          <div class="zy_pil">
            <el-button class="delete-btn" @click="derive()">批量导出</el-button>
            <el-button
              class="golbal-btn"
              @click="batchToComplete()"
              type="primary"
              >批量完成</el-button
            >
          </div>
        </el-row>
        <!-- 列表数据 -->
        <el-table
          v-if="InvoiceStatus === 2"
          ref="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :height="maxHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="InvoiceOrderNumber"
            align="center"
            label="订单号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="RoomNumber"
            align="center"
            label="房号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UserName"
            align="center"
            label="用户"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="InvoiceStatus"
            align="center"
            label="状态"
            width="180"
          >
            <template>已完成</template>
          </el-table-column>
          <el-table-column
            prop="CreateDate"
            align="center"
            label="下单时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UpdateDate"
            align="center"
            label="完成时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="ElectronicPaperType"
            align="center"
            label="类型"
            width="180"
          >
            <template slot-scope="scope">{{
              scope.row.ElectronicPaperType == 0
                ? "电子发票"
                : scope.row.ElectronicPaperType == 1
                ? "纸质发票"
                : ""
            }}</template>
          </el-table-column>
          <el-table-column
            prop="Title"
            align="center"
            label="抬头"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="OperatorName"
            align="center"
            label="操作人员"
            width="180"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150px"
          >
            <template width="150px" slot-scope="scope">
              <!-- 查看按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="viewInvoice(scope.row.InvoiceOrderID)"
                >查看</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                v-if="scope.row.InvoiceStatus !== 1"
                style="color:#aaaaaa"
                :disabled="true"
                class="golbal-btn-text"
                type="text"
                size="mini"
                >完成</el-button
              >
              <!-- 取消按钮 -->
              <el-button
                v-if="scope.row.InvoiceStatus !== 1"
                style="color:#aaaaaa"
                :disabled="true"
                class="golbal-btn-text"
                type="text"
                size="mini"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.Page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane name="-1" label="已取消">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="输入房间号/订单号"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="选择下单开始时间"
                  end-placeholder="选择下单结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button class="golbal-btn" type="primary" @click="handleSearch"
                >查询</el-button
              >
              <el-button
                class="gmv-3 golbal-btn-reset m-l10"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
                >重置条件</el-button
              >
            </div>
          </el-col>
          <div class="zy_pil">
            <el-button class="delete-btn" @click="derive()">批量导出</el-button>
            <el-button
              class="golbal-btn"
              @click="batchToComplete()"
              type="primary"
              >批量完成</el-button
            >
          </div>
        </el-row>
        <!-- 列表数据 -->
        <el-table
          v-if="InvoiceStatus === -1"
          ref="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :height="maxHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="InvoiceOrderNumber"
            align="center"
            label="订单号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="RoomNumber"
            align="center"
            label="房号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UserName"
            align="center"
            label="用户"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="InvoiceStatus"
            align="center"
            label="状态"
            width="180"
          >
            <template>已取消</template>
          </el-table-column>
          <el-table-column
            prop="CreateDate"
            align="center"
            label="下单时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UpdateDate"
            align="center"
            label="完成时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="ElectronicPaperType"
            align="center"
            label="类型"
            width="180"
          >
            <template slot-scope="scope">{{
              scope.row.ElectronicPaperType == 0
                ? "电子发票"
                : scope.row.ElectronicPaperType == 1
                ? "纸质发票"
                : ""
            }}</template>
          </el-table-column>
          <el-table-column
            prop="Title"
            align="center"
            label="抬头"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="OperatorName"
            align="center"
            label="操作人员"
            width="180"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150px"
          >
            <template width="150px" slot-scope="scope">
              <!-- 查看按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="viewInvoice(scope.row.InvoiceOrderID)"
                >查看</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                v-if="scope.row.InvoiceStatus !== 1"
                style="color:#aaaaaa"
                :disabled="true"
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="finishButton(scope.row.InvoiceOrderID)"
                >完成</el-button
              >
              <!-- 取消按钮 -->
              <el-button
                v-if="scope.row.InvoiceStatus !== 1"
                style="color:#aaaaaa"
                :disabled="true"
                class="golbal-btn-text"
                type="text"
                size="mini"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.Page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane name="all" label="全部">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="输入房间号/订单号"
              v-model="input"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="选择下单开始时间"
                  end-placeholder="选择下单结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button class="golbal-btn" type="primary" @click="handleSearch"
                >查询</el-button
              >
              <el-button
                class="gmv-3 golbal-btn-reset m-l10"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
                >重置条件</el-button
              >
            </div>
          </el-col>
          <div class="zy_pil">
            <el-button class="delete-btn" @click="derive()">批量导出</el-button>
            <el-button
              class="golbal-btn"
              @click="batchToComplete()"
              type="primary"
              >批量完成</el-button
            >
          </div>
        </el-row>
        <!-- 列表数据 -->
        <el-table
          v-if="InvoiceStatus === ''"
          ref="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :height="maxHeight"
          border
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="InvoiceOrderNumber"
            label="订单号"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="RoomNumber"
            label="房号"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UserName"
            label="用户"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="InvoiceStatus"
            label="状态"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              {{
                scope.row.InvoiceStatus == -1
                  ? "已取消"
                  : scope.row.InvoiceStatus == 1
                  ? "开票中"
                  : scope.row.InvoiceStatus == 0
                  ? "待接单"
                  : scope.row.InvoiceStatus == 2
                  ? "已完成"
                  : scope.row.InvoiceStatus == 3
                  ? "待服务"
                  : ""
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="CreateDate"
            label="下单时间"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="UpdateDate"
            label="完成时间"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="ElectronicPaperType"
            label="类型"
            align="center"
            width="180"
          >
            <template slot-scope="scope">{{
              scope.row.ElectronicPaperType == 0
                ? "电子发票"
                : scope.row.ElectronicPaperType == 1
                ? "纸质发票"
                : ""
            }}</template>
          </el-table-column>
          <el-table-column
            prop="Title"
            label="抬头"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="OperatorName"
            label="操作人员"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150px"
          >
            <template width="150px" slot-scope="scope">
              <!-- 查看按钮 -->
              <el-button
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="viewInvoice(scope.row.InvoiceOrderID)"
                >查看</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                v-if="scope.row.InvoiceStatus === 0"
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="acceptOrder(scope.row.InvoiceOrderID)"
                >接受</el-button
              >
              <!-- 完成按钮 -->
              <el-button
                v-else-if="scope.row.InvoiceStatus === 3"
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="finishButton(scope.row.InvoiceOrderID)"
                >完成</el-button
              >
              <el-button
                v-else
                disabled
                class="golbal-btn-text"
                type="text"
                size="mini"
                >完成</el-button
              >
              <!-- 取消按钮 -->
              <el-button
                :disabled="
                  scope.row.InvoiceStatus === -1 ||
                    scope.row.InvoiceStatus === 2
                "
                class="golbal-btn-text"
                type="text"
                size="mini"
                @click="cancelButton(scope.row.InvoiceOrderID)"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.Page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          background
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 导出对话框 -->
    <el-dialog
      title="导出"
      :visible.sync="wakeDialogVisible"
      width="80%"
      lock-scroll
    >
      <el-table
        id="table_out"
        :data="tableDataSelect"
        border
        ref="multipleTable"
        header-cell-class-name="table-header"
        style="width: 100%;margin:30px auto 0 auto;"
      >
        <el-table-column
          label="序号"
          type="selection"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="InvoiceOrderNumber"
          label="订单号"
          align="center"
        >
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.orderNumber }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="RoomNumber" label="房号" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.roomnumber }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="UserName" label="用户" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.user }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="InvoiceStatus" label="状态" align="center">
          <template slot-scope="scope">{{
            scope.row.InvoiceStatus == 1
              ? "开票中"
              : scope.row.InvoiceStatus == 2
              ? "已开票"
              : scope.row.InvoiceStatus == -1
              ? "已取消"
              : scope.row.InvoiceStatus == 0
              ? "未开票"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column prop="CreateDate" label="下单时间" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.cellphone }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="UpdateDate" label="完成时间" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.wakeup }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="ElectronicPaperType" label="类型" align="center">
          <template slot-scope="scope">{{
            scope.row.ElectronicPaperType == 1
              ? "纸质发票"
              : scope.row.ElectronicPaperType == 0
              ? "电子发票"
              : ""
          }}</template>
        </el-table-column>
        <el-table-column prop="Title" label="抬头" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.completion }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="OperatorName" label="操作人员" align="center">
          <!-- <template slot-scope="{rows}">
            <span>{{ rows.operation }}</span>
          </template>-->
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wakeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人查看对话框 -->
    <el-dialog
      title="查看个人发票信息"
      :visible.sync="personDialogVisible"
      width="50%"
    >
      <el-form
        :model="personRuleForm"
        :rules="personRules"
        ref="personRuleForm"
        label-width="100px"
        class="zy_elForm"
      >
        <el-form-item label="发票类型" prop="InvoiceType">
          <el-input
            :placeholder="
              personRuleForm.InvoiceType === 1
                ? '增值税普通发票'
                : personRuleForm.InvoiceType === 2
                ? '增值税专用发票'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="开具类型" prop="MainBodyType">
          <el-input
            :placeholder="
              personRuleForm.MainBodyType === 1
                ? '个人'
                : personRuleForm.MainBodyType === 2
                ? '单位'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="Title">
          <el-input v-model="personRuleForm.Title" disabled></el-input>
        </el-form-item>
        <el-form-item label="发票介质" prop="ElectronicPaperType">
          <el-input
            :placeholder="
              personRuleForm.ElectronicPaperType === 0
                ? '电子发票'
                : personRuleForm.ElectronicPaperType === 1
                ? '纸质发票'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="Tel">
          <el-input v-model="personRuleForm.Tel" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="Remark">
          <el-input
            disabled
            v-model="personRuleForm.Remark"
            :rows="3"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="取消订单"
          prop="CancelRemark"
          v-show="personRuleForm.InvoiceStatus === -1"
        >
          <el-input
            disabled
            v-model="personRuleForm.CancelRemark"
            :rows="3"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="personDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 单位查看对话框 -->
    <el-dialog
      title="查看单位发票信息"
      :visible.sync="unitDialogVisible"
      width="50%"
    >
      <el-form
        :model="unitRuleForm"
        :rules="personRules"
        ref="unitRuleForm"
        label-width="100px"
      >
        <el-form-item label="单位名称" prop="InvoiceType">
          <el-input
            :placeholder="
              unitRuleForm.InvoiceType === 1
                ? '增值税普通发票'
                : unitRuleForm.InvoiceType === 2
                ? '增值税专用发票'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="开具类型" prop="MainBodyType">
          <el-input
            :placeholder="
              unitRuleForm.MainBodyType === 1
                ? '个人'
                : unitRuleForm.MainBodyType === 2
                ? '单位'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="Identifier">
          <el-input v-model="unitRuleForm.Identifier" disabled></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="Bank">
          <el-input v-model="unitRuleForm.Bank" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="Tel">
          <el-input v-model="unitRuleForm.Tel" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="CompanyAddress">
          <el-input v-model="unitRuleForm.CompanyAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="发票介质" prop="ElectronicPaperType">
          <el-input
            :placeholder="
              unitRuleForm.ElectronicPaperType === 0
                ? '电子发票'
                : unitRuleForm.ElectronicPaperType === 1
                ? '纸质发票'
                : ''
            "
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="Remark">
          <el-input
            disabled
            v-model="unitRuleForm.Remark"
            :rows="3"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="取消订单"
          prop="CancelRemark"
          v-show="unitRuleForm.InvoiceStatus === -1"
        >
          <el-input
            disabled
            v-model="unitRuleForm.CancelRemark"
            :rows="3"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="unitDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 完成对话框 -->
    <el-dialog
      title="完成订单"
      :visible.sync="OperateDialogVisible"
      width="30%"
    >
      <span>请确定完成该订单吗？</span>
      <div class="zy_dialogFooter">
        <el-button @click="OperateDialogVisible = false">确 定</el-button>
        <el-button type="primary" @click="OperateDialogVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 取消订单备注 -->
    <el-dialog
      title="取消订单"
      center
      :visible.sync="showCancelDialog"
      width="600px"
      :before-close="
        () => {
          cancelRemark = '';
          showCancelDialog = false;
        }
      "
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="cancelRemark"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              cancelRemark = '';
              showCancelDialog = false;
            }
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="cancelButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {
  invoiceOrdersIndex,
  invoiceOrdersShow,
  invoiceOrdersOperate,
  cancelButton,
  receiveOrder
} from '@/api/invoiceOrders'
export default {
  data() {
    return {
      pageSize: 10,
      showCancelDialog: false, // 取消订单
      cancelRemark: '', // 取消订单 备注
      activeName: '0',
      input: '',
      value1: '',
      startTime: '',
      endTime: '',
      tabIndex: '0',
      InvoiceStatus: '',
      // eslint-disable-next-line camelcase
      is_search: false,
      activeId: [], // 选中的id数组
      multipleSelection: [],
      multipleSelectionAll: [],
      idKey: 'InvoiceOrderID',
      // 控制导出对话框的显示与隐藏
      wakeDialogVisible: false,
      // 控制个人对话框的显示与隐藏
      personDialogVisible: false,
      // 控制单位对话框的显示与隐藏
      unitDialogVisible: false,
      // 控制完成对话框的显示与隐藏
      OperateDialogVisible: false,
      // 导出对话框表格数据
      tableDataSelect: [],
      queryInfo: {
        Page: 1,
        Limit: 20
      },
      // 查询到的个人信息
      personRuleForm: {
        InvoiceType: '',
        MainBodyType: '',
        Title: '',
        ElectronicPaperType: '',
        Tel: '',
        Remark: ''
      },
      // 查询到的单位信息
      unitRuleForm: {
        InvoiceType: '',
        MainBodyType: '',
        Identifier: '',
        Bank: '',
        Tel: '',
        CompanyAddress: '',
        ElectronicPaperType: '',
        Remark: ''
      },
      total: 0,
      tableData: [],
      personRules: {},
      maxHeight: 300
    }
  },
  watch: {
    value1(newVal, oldVal) {
      if (newVal == '' || newVal == null) {
        this.getServiceList(this.tabIndex)
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    startTime(newVal, oldVal) {
      if (newVal == '' && this.startTime == '') {
        /*
         * this.isSearch = false
         * console.log('开始时间')
         */
        this.getServiceList(this.tabIndex)
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    endTime(newVal, oldVal) {
      if (newVal == '' && this.endTime == '') {
        /*
         * this.isSearch = false
         * console.log('结束时间')
         */
        this.getServiceList(this.tabIndex)
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    },
    input(newVal, oldVal) {
      if (newVal == '') {
        this.getServiceList(this.tabIndex)
        // eslint-disable-next-line camelcase
        this.is_search = false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs.table.$el)
      this.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 230
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 230
      }
    })
    this.getServiceList('0')
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    async getServiceList(tab) {
      let data = {
        Limit: this.queryInfo.Limit,
        Page: this.queryInfo.Page
      }
      if (this.is_search) {
        data.StartTime = this.startTime
        data.EndTime = this.endTime
        data.Search = this.input
        // console.log(data)
      }
      let res
      // eslint-disable-next-line default-case
      switch (this.activeName) {
      case '0':
        this.InvoiceStatus = 0
        data.InvoiceStatus = 0
        res = await invoiceOrdersIndex(data)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        break
      case '2':
        this.InvoiceStatus = 2

        data.InvoiceStatus = 2
        res = await invoiceOrdersIndex(data)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        break
      case '3':
        this.InvoiceStatus = 3

        data.InvoiceStatus = 3
        res = await invoiceOrdersIndex(data)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        break
      case '-1':
        this.InvoiceStatus = -1
        data.InvoiceStatus = -1
        res = await invoiceOrdersIndex(data)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        break
      case 'all':
        this.InvoiceStatus = ''
        res = await invoiceOrdersIndex(data)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
        break
      }
      /*
       * await invoiceOrdersIndex(data)
       * console.log(res)
       */
      // if (res.code !== 0) return this.$message.error('获取列表失败' )
      /*
       * 如果返回状态正常，将请求的数据保存到data 中
       * this.tableData = res.data.rows
       * this.total = res.data.total
       * this.randomKey = Math.random()
       */
      this.Res = res
      if (this.tableData.length > 0) {
        this.$nextTick(() => {
          this.setSelectRow()
        })
      }
    },
    handleClick(tab, event) {
      this.tabIndex = tab.index
      this.getServiceList(tab.index)
    },
    // eslint-disable-next-line no-empty-function
    async handleSizeChange(newSize) {
      // console.log(newSize)
      // eslint-disable-next-line camelcase
      this.is_search = false
      this.input = ''
      this.value1 = ''
      this.value = ''
      this.queryInfo.Limit = newSize
      // 重新按照pagesize发送请求，请求最新的数据
      let res = await invoiceOrdersIndex({
        InvoiceStatus: this.InvoiceStatus,
        Page: 1,
        Limit: this.queryInfo.Limit
      })
      this.tableData = res.data.rows
    },
    // eslint-disable-next-line no-empty-function
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.Page = newPage
      this.changePageCoreRecordData()
      // 重新按照pagenum发送请求，请求最新的数据
      this.getServiceList(this.tabIndex)
    },
    // 设置选中的方法
    setSelectRow() {
      // console.log(this.multipleSelectionAll)
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 触发搜索按钮
    // eslint-disable-next-line require-await
    handleSearch() {
      let that = this
      let [startTime, endTime] = this.value1
      this.startTime = startTime
      this.endTime = endTime
      // console.log(this.value1)
      if ((this.value1 == '' || this.value1 == null) && this.input == '') {
        that.$message.error('请选择或输入搜索条件')
        return
      }
      // eslint-disable-next-line camelcase
      this.is_search = true
      this.multipleSelectionAll = []
      this.$refs.table.clearSelection()
      this.getServiceList(this.tabIndex)
    },
    handleReset() {
      this.value1 = ''
      this.input = ''
      // eslint-disable-next-line camelcase
      this.is_search = false
      this.getServiceList(this.tabIndex)
    },
    // 点击弹出导出对话框
    derive() {
      this.changePageCoreRecordData()
      // console.log(this.multipleSelectionAll)
      if (
        this.multipleSelectionAll == '' ||
        this.multipleSelectionAll.length == 0
      ) {
        let data = {}

        this.$message('请选择要操作的内容')
        return
      } else {
        this.tableDataSelect = this.multipleSelectionAll
      }
      this.wakeDialogVisible = true
      /*
       * console.log(this)
       * setTimeout(() => {
       *   if (this.$store.state.mumustore.multipleSelectionAll.length == 0) {
       *     this.$message('请选择要操作的内容')
       *     return
       *   }
       *   this.tableDataSelect = this.$store.state.mumustore.multipleSelectionAll
       *   console.log(this.$store.state.mumustore.multipleSelectionAll)
       *   this.deriveDialogVisible = true
       * }, 0)
       */
    },
    // 导出
    exportExcel() {
      // TODO 导出事件
      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      this.deriveDialogVisible = false
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          '开票管理.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      this.multipleSelectionAll = []
      this.$refs.multipleTable.clearSelection()
      this.wakeDialogVisible = false
      return wbout
    },
    // activeId.push被选中的ID
    handleSelectionChange(val) {
      this.multipleSelection = val
      val.forEach((m, i) => {
        this.activeId.push(m.InvoiceOrderID)
      })
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      /*
       * console.log('记忆选择核心')
       * 标识当前行的唯一键的名称
       */
      const idKey = this.idKey
      const that = this
      // console.log(this.multipleSelectionAll.length)

      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      // console.log(this.multipleSelectionAll)

      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      /*
       * 得到当前页没有选中的id
       * console.log(this.tableData)
       */
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    // 查看
    async viewInvoice(ID) {
      const res = await invoiceOrdersShow({
        InvoiceOrderID: ID
      })
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }
      if (res.data.MainBodyType === 1) {
        this.personRuleForm = res.data
        this.personDialogVisible = true
      }
      if (res.data.MainBodyType === 2) {
        this.unitRuleForm = res.data
        this.unitDialogVisible = true
      }
    },
    // 完成
    finishButton(ID) {
      this.$confirm('请确定完成该订单吗？', '完成订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          invoiceOrdersOperate({
            InvoiceOrderIDs: [ID],
            OperateInvoiceStatus: 2
          }).then(() => {
            this.$message.success('完成订单成功！')
            this.getServiceList(this.tabIndex)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '完成订单失败！'
          })
          this.getServiceList()
        })
    },
    /**
     * 接单
     * @param {Number} orderId
     */
    acceptOrder(orderId) {
      this.$confirm('确定要接受该订单吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        let res = await receiveOrder(orderId)
        if (res.code === 0) {
          this.$message.success('订单已接受')
          this.getServiceList()
        }
      })
    },
    /**
     * 取消订单
     * @param {Number} id
     */
    cancelButton(id) {
      if (!this.showCancelDialog) {
        this.cancelOrderId = id
        this.showCancelDialog = true
      } else {
        this.$confirm('请确定取消该订单吗？', '取消订单', {
          type: 'warning'
        }).then(() => {
          cancelButton({
            InvoiceOrderID: this.cancelOrderId,
            CancleInvoiceStatus: -1,
            CancelRemark: this.cancelRemark
          })
            .then(() => {
              this.$message.success('取消订单成功！')
              this.showCancelDialog = false
              this.getServiceList(this.tabIndex)
            })
            .catch(err => {
              console.log(err)
              this.showCancelDialog = false
            })
        })
      }
    },
    // 批量完成
    batchToComplete() {
      this.changePageCoreRecordData()
      // .log(this.multipleSelectionAll)
      if (
        this.multipleSelectionAll == '' ||
        this.multipleSelectionAll.length == 0
      ) {
        let data = {}
        this.$message('请选择要操作的内容')
      } else {
        this.tableDataSelect = []

        this.multipleSelectionAll.forEach((m, i) => {
          this.tableDataSelect[i] = m.InvoiceOrderID
        })
        this.$confirm('请确定完成该订单吗？', '完成订单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            invoiceOrdersOperate({
              InvoiceOrderIDs: this.tableDataSelect,
              OperateInvoiceStatus: 2
            }).then(() => {
              this.$message.success('完成订单成功！')
              this.multipleSelectionAll = []
              // console.log(this.tabIndex)
              this.getServiceList(this.tabIndex)
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '完成订单失败！'
            })
            this.getServiceList()
          })
      }
    }
  }
}
</script>

<style lang="less">
.zy_bigfive {
  .el-tabs--border-card {
    box-shadow: none !important;
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 50px);
    max-width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
    padding-top: 15px;
    padding-left: 15px;
  }
  // .el-tabs__nav .el-tabs__item:hover {
  //   color: #ccc !important;
  // }
  // .el-tabs--border-card > .el-tabs__header .el-tabs__item  {
  //   margin-top: 0 !important;
  // }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    margin-top: 0 !important;
  }
  .zy_lian {
    font-size: 14pt;
    color: #169bd5;
  }
  .zy_big {
    width: 100%;
    height: 100%;
    // border: 1px solid #ccc;
    margin: 5px;
  }
  .zy_but {
    width: 84px;
    height: 32px;
    line-height: 8px;
    margin-top: 5px;
    font-size: 14pt;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-table {
    margin-top: 10px;
  }
  .zy_pil {
    float: right;
    margin-right: 60px;
  }
  .zy_tabss {
    margin: 15px;
  }
  // .el-tabs--border-card > .el-tabs__header {
  //   border-bottom: 1px solid #fff !important;
  // }
  .el-tabs__nav {
    height: 40px;
  }
  .zy_textarea {
    width: 100%;
    height: 201px;
    border: 1px solid #ccc;
  }
  .zy_dialogFooter {
    display: flex;
    justify-content: space-around;
  }
  .el-row {
    line-height: 40px;
  }
  .delete-btn {
    width: 84px;
    height: 32px;
    padding: 5px 10px !important;
  }
  .golbal-btn-text {
    font-size: 15px !important;
  }
  .el-pagination {
    margin: 20px 0;
  }
  .el-dialog__body {
    overflow-y: scroll;
  }
}
</style>
