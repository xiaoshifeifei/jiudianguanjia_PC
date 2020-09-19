<template>
  <div class="pad6 bc_f2f2f2 fu-index LoadingArea">
    <el-row :gutter="6" class="fu-index-eight">
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-order-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(1)">
          <div class="h32P">
            <div class="h40P fcl t-a_l p-l12">退房订单</div>
            <img src="../../assets/indexImg/index-icon1.png" class="w60 ha" />
          </div>
          <div class="fcc c_434343 bx h68P">
            <div class="w46P bx h100P fcocc">
              <div>
                <div>待处理</div>
                <div
                  class="c_217dff fs23 mar8_0"
                  v-cloak
                  v-if="statisticsData.CheckOutOrder"
                >
                  {{ statisticsData.CheckOutOrder.HandleOrderCount }}
                </div>
              </div>
              <div class="m-t20">
                <div>今日订单数</div>
                <div
                  class="fs29 c_5e5e5e mar8_0"
                  v-cloak
                  v-if="statisticsData.CheckOutOrder"
                >
                  {{ statisticsData.CheckOutOrder.TodayOrderCount }}
                </div>
              </div>
            </div>
            <div class="w1 bc_f7f7f7 h28P"></div>
            <div class="w46P bx h100P fcocc">
              <div>
                <div>已完成</div>
                <div
                  class="c_217dff fs23 mar8_0"
                  v-cloak
                  v-if="statisticsData.CheckOutOrder"
                >
                  {{ statisticsData.CheckOutOrder.CompleteOrderCount }}
                </div>
              </div>
              <div class="m-t20">
                <div>本周订单数</div>
                <div
                  class="fs29 c_5e5e5e mar8_0"
                  v-cloak
                  v-if="statisticsData.CheckOutOrder"
                >
                  {{ statisticsData.CheckOutOrder.ThisWeekOrderCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-order-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(2)">
          <div class="h32P p_r">
            <div class="h40P fcl t-a_l p-l12">商超订单</div>
            <img src="../../assets/indexImg/index-icon2.png" class="w60 ha" />
            <div
              class="bc_247fff c_fff fs11 p_a r0 t-a_r p-r7 b-l-t25r b-l-b25r t6 l-h22 w45"
            >
              补单
            </div>
            <div
              class="bc_ff8e8e c_fff fs11 p_a r0 t-a_r p-r7 b-l-b25r b-l-t25r t32 l-h22 w45"
            >
              报损
            </div>
          </div>
          <div class="fcc c_434343 bx h68P">
            <div class="w46P bx h100P fcocc">
              <div>
                <div>待处理</div>
                <div class="c_217dff fs23 mar8_0">6</div>
              </div>
              <div class="m-t20">
                <div>今日订单数</div>
                <div class="fs29 c_5e5e5e mar8_0">15</div>
              </div>
            </div>
            <div class="w1 bc_f7f7f7 h28P"></div>
            <div class="w46P bx h100P fcocc">
              <div>
                <div>已完成</div>
                <div class="c_217dff fs23 mar8_0">6</div>
              </div>
              <div class="m-t20">
                <div>今日成交额</div>
                <div class="fs29 c_5e5e5e mar8_0">15</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-order-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(3)">
          <div class="h32P">
            <div class="h40P fcl t-a_l p-l12">预定服务</div>
            <img src="../../assets/indexImg/index-icon3.png" class="w60 ha" />
          </div>
          <div class="fcc c_434343 bx h68P">
            <div class="w46P bx h100P fcocc">
              <div>
                <div>待处理</div>
                <div class="c_217dff fs23 mar8_0">
                  {{ statisticsData.FacilityOrder.HandleOrderCount || 0 }}
                </div>
              </div>
              <div class="m-t20">
                <div>今日订单数</div>
                <div class="fs29 c_5e5e5e mar8_0">
                  {{ statisticsData.FacilityOrder.TodayOrderCount || 0 }}
                </div>
              </div>
            </div>
            <div class="w1 bc_f7f7f7 h28P"></div>
            <div class="w46P bx h100P fcocc">
              <div>
                <div>已完成</div>
                <div class="c_217dff fs23 mar8_0">
                  {{ statisticsData.FacilityOrder.CompleteOrderCount || 0 }}
                </div>
              </div>
              <div class="m-t20">
                <div>本周订单数</div>
                <div class="fs29 c_5e5e5e mar8_0">
                  {{ statisticsData.FacilityOrder.ThisWeekOrderCount || 0 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-order-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(4)">
          <div class="h32P">
            <div class="h40P fcl t-a_l p-l12">客房服务</div>
            <img src="../../assets/indexImg/index-icon4.png" class="w60 ha" />
          </div>
          <div class="fcc c_434343 bx h68P">
            <div class="w46P bx h100P fcocc">
              <div>
                <div>待处理</div>
                <div
                  class="c_217dff fs23 mar8_0"
                  v-cloak
                  v-if="statisticsData.ServiceOrder"
                >
                  {{ statisticsData.ServiceOrder.HandleOrderCount }}
                </div>
              </div>
              <div class="m-t20">
                <div>今日订单数</div>
                <div
                  class="fs29 c_5e5e5e mar8_0"
                  v-cloak
                  v-if="statisticsData.ServiceOrder"
                >
                  {{ statisticsData.ServiceOrder.TodayOrderCount }}
                </div>
              </div>
            </div>
            <div class="w1 bc_f7f7f7 h28P"></div>
            <div class="w46P bx h100P fcocc">
              <div>
                <div>已完成</div>
                <div
                  class="c_217dff fs23 mar8_0"
                  v-cloak
                  v-if="statisticsData.ServiceOrder"
                >
                  {{ statisticsData.ServiceOrder.CompleteOrderCount }}
                </div>
              </div>
              <div class="m-t20">
                <div>本周订单数</div>
                <div
                  class="fs29 c_5e5e5e mar8_0"
                  v-cloak
                  v-if="statisticsData.ServiceOrder"
                >
                  {{ statisticsData.ServiceOrder.ThisWeekOrderCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-serve-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(5)">
          <div class="h20P fcl t-a_l p-l12">开票服务</div>
          <div class="fcc c_434343 bx h80P fcc">
            <div class="t-a_c w50P fcocc">
              <div
                class="c_217dff fs2r mar8_0"
                v-cloak
                v-if="statisticsData.InvoiceOrder"
              >
                {{ statisticsData.InvoiceOrder.HandleOrderCount }}
              </div>
              <div>待开票</div>
            </div>
            <div class="t-a_c w50P fcocc">
              <div
                class="c_434343 fs2r mar8_0"
                v-cloak
                v-if="statisticsData.InvoiceOrder"
              >
                {{ statisticsData.InvoiceOrder.ThisWeekOrderCount }}
              </div>
              <div>本周开票</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-serve-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(6)">
          <div class="h20P fcl t-a_l p-l12">清扫服务</div>
          <div class="fcc c_434343 bx h80P fcc">
            <div class="t-a_c w50P fcocc">
              <div
                class="c_217dff fs2r mar8_0"
                v-cloak
                v-if="statisticsData.CleanOrder"
              >
                {{ statisticsData.CleanOrder.HandleOrderCount }}
              </div>
              <div>待处理</div>
            </div>
            <div class="t-a_c w50P fcocc">
              <div
                class="c_434343 fs2r mar8_0"
                v-cloak
                v-if="statisticsData.CleanOrder"
              >
                {{ statisticsData.CleanOrder.ThisWeekOrderCount }}
              </div>
              <div>本周清扫</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-serve-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(7)">
          <div class="h20P fcl t-a_l p-l12">维修服务</div>
          <div class="fcc c_434343 bx h80P fcc">
            <div class="t-a_c w50P fcocc">
              <div
                class="c_217dff fs2r mar8_0"
                v-cloak
                v-if="statisticsData.RepairOrder"
              >
                {{ statisticsData.RepairOrder.HandleOrderCount }}
              </div>
              <div>待处理</div>
            </div>
            <div class="t-a_c w50P fcocc">
              <div
                class="c_434343 fs2r mar8_0"
                v-cloak
                v-if="statisticsData.RepairOrder"
              >
                {{ statisticsData.RepairOrder.ThisWeekOrderCount }}
              </div>
              <div>本周维修</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        style="margin-bottom:6px;"
        class="index-serve-list"
      >
        <div class="bc_fff t-a_c h100P" @click="handleTo(8)">
          <div class="h20P fcl t-a_l p-l12">评论</div>
          <div class="fcc c_434343 bx h80P fcc">
            <div class="t-a_c w50P fcocc">
              <div class="c_217dff fs2r mar8_0">
                {{
                  (statisticsData.Comment &&
                    statisticsData.Comment.TodayOrderCount) ||
                    0
                }}
              </div>
              <div>今日新增</div>
            </div>
            <div class="t-a_c w50P fcocc">
              <div class="c_434343 fs2r mar8_0">
                {{
                  (statisticsData.Comment &&
                    statisticsData.Comment.ThisWeekOrderCount) ||
                    0
                }}
              </div>
              <div>本周评论</div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="12" style="margin-bottom:12px;">
        <div class="bc_fff">
          <el-tabs class="pad16_23 fu-tabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>-->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="type-fuc">
        <div class="bc_fff pad0_25 bx h100P p_r">
          <div style="height:calc(9% - 26px)"></div>
          <div class="fcl fu-tabs c_p">
            <div
              class="fcocc m-l50"
              @click="changeTabs(index)"
              v-for="(item, index) in tabsArr"
              :key="index"
            >
              <div
                class="l-h24 fs13"
                :class="[isTabsAct == index ? 'fw700 c_515151' : 'c_6e6e6e']"
              >
                {{ item }}
              </div>
              <div
                class="h2 w96P"
                :class="[isTabsAct == index ? 'bc_ffc800' : '']"
              ></div>
            </div>
          </div>
          <div class="c_a4a4a4" style="height:calc(85% - 26px)">
            <div class="fcc">
              <div class="w60P">
                <div class="l-h38">房间号</div>
                <div class="fcl h40">
                  <el-select
                    class="w70 fu-h30 m-r5"
                    v-model="floor"
                    placeholder
                    @change="selectFloors"
                  >
                    <el-option
                      v-for="(value, key, index) in HotelRoomFloor"
                      :key="index"
                      :label="value"
                      :value="value"
                    ></el-option> </el-select
                  >楼
                  <el-select
                    class="w84 fu-h30 m-l5 m-r5"
                    v-model="room"
                    placeholder
                    @change="selectRoom"
                  >
                    <el-option
                      v-for="(item, index) in rooms"
                      :key="index"
                      :label="item.RoomNumber"
                      :value="item.RoomNumber"
                    ></el-option> </el-select
                  >号房间
                </div>
              </div>
              <div class="w40P bx">
                <div class="l-h38">用户名称</div>
                <div class="fcl h40">
                  <el-input
                    class="fu-h30 w300"
                    placeholder="请输入用户名称"
                    v-model="userName"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="fcc">
              <div class="w60P bx">
                <div class="l-h32">用户手机号码</div>
                <div class="fcl h40">
                  <el-input
                    class="fu-h30 w300"
                    placeholder="请输入用户手机号码"
                    v-model="userPhone"
                  ></el-input>
                </div>
              </div>
              <div class="w40P"></div>
            </div>
            <div class="w100P bx">
              <div class="l-h32">预定时间</div>
              <div class="fcl h40">
                <el-date-picker
                  v-model="datatime"
                  type="datetime"
                  class="fu-h32"
                  placeholder="选择预定时间"
                  style="width:calc(60% + 300px);"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                ></el-date-picker>
              </div>
              <div class="fs12">时间只能选择当前时间至少72小时的范围内</div>
            </div>
          </div>
          <div
            class="bc_007cff c_fff fcc t-a_c w100P p_a b0 l0"
            style="height:calc(16% - 26px);"
            @click="saveOrder"
          >
            创建订单
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" style="height:50%;">
        <div class="bc_fff h100P">
          <div class="l-h50 p-l25 c_434343">服务入口</div>
          <div class="fsbw">
            <div
              class="w25P fcocc"
              v-for="(item, index) in serveList"
              :key="index"
              @click="handleTo(index + 10)"
            >
              <el-image
                :src="require('../../assets/indexImg/' + item.img + '.png')"
                class="w50P ha"
              />
              <div class="c_434343 m-t6">{{ item.title }}</div>
            </div>
          </div>
          <div class="h14"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getHotelStatistics,
  getHotelItem,
  addCleanOrders,
  addRepairOrders
} from "@/api/index";
import {
  createSocket,
  sendWSPush,
  oncloseWS,
  onmessageWS,
  onerrorWS
} from "@/api/webSocket.js";
import { getAccountList } from "@/api/jurisdiction";
let _self;
export default {
  data() {
    return {
      tabsArr: ["快速清扫", "快速维修"],
      isTabsAct: 0,
      HotelRoomFloor: null,
      floor: "",
      HotelRoom: null,
      rooms: [],
      room: "",
      roomId: "",
      datatime: "",
      userName: "",
      userPhone: "",
      serveList: [
        {
          img: "index-icon4",
          title: "客房服务"
        },
        {
          img: "index-icon5",
          title: "清扫服务"
        },
        {
          img: "index-icon1",
          title: "退房服务"
        },
        {
          img: "index-icon6",
          title: "维修服务"
        },
        {
          img: "index-icon7",
          title: "租车订单"
        },
        {
          img: "index-icon8",
          title: "叫醒服务"
        },
        {
          img: "index-icon9",
          title: "开票处理"
        },
        {
          img: "index-icon3",
          title: "预定服务"
        }
      ]
    };
  },
  computed: {
    statisticsData() {
      return this.$store.state.wsdata.homePageData;
    }
  },
  created() {
    _self = this;
    _self.getStatistics();
    _self.getHotelItem();
  },
  methods: {
    handleTo(type) {
      switch (type) {
        case 1:
          this.$router.push({ path: "/bookingService/checkOutOrder" });
          break;
        case 2:
          this.$alert("模块开发中...", {
            confirmButtonText: "好的",
            callback: action => {}
          });
          return;
          this.$router.push({ path: "/supermarket/allorders" });
          break;
        case 3:
          this.$router.push({ path: "/bookingService/facilityOrder" });
          break;
        case 4:
          this.$router.push({ path: "/bookingService/roomServiceOrder" });
          break;
        case 5:
          this.$router.push({ path: "/bookingService/billingManager" });
          break;
        case 6:
          this.$router.push({ path: "/bookingService/cleanOrder" });
          break;
        case 7:
          this.$alert("模块开发中...", {
            confirmButtonText: "好的",
            callback: action => {}
          });
          return;
          this.$router.push({ path: "/bookingService/repairOrder" });
          break;
        case 8:
          this.$router.push({ path: "/comment" });
          break;
        case 10:
          this.$router.push({ path: "/bookingService/roomServiceOrder" });
          break;
        case 11:
          this.$router.push({ path: "/bookingService/cleanOrder" });
          break;
        case 12:
          this.$alert("模块开发中...", {
            confirmButtonText: "好的",
            callback: action => {}
          });
          return;
          this.$router.push({ path: "/bookingService/checkOutOrder" });
          break;
        case 13:
          this.$alert("模块开发中...", {
            confirmButtonText: "好的",
            callback: action => {}
          });
          return;
          this.$router.push({ path: "/bookingService/repairOrder" });
          break;
        case 14:
          this.$router.push({ path: "/bookingService/rentCarOrder" });
          break;
        case 15:
          this.$router.push({ path: "/bookingService/wakeUpServe" });
          break;
        case 16:
          this.$router.push({ path: "/bookingService/billingManager" });
          break;
        case 17:
          this.$router.push({ path: "/bookingService/facilityOrder" });
          break;
        default:
          break;
      }
    },
    changeTabs(idx) {
      _self.isTabsAct = idx;
    },
    privateDispatch(value) {
      this.$store.dispatch("wsdata/changeState", {
        key: "homePageData",
        value
      });
    },
    getStatistics() {
      return new Promise((resolve, reject) => {
        getHotelStatistics()
          .then(res => {
            this.privateDispatch(res.data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getHotelItem() {
      return new Promise((resolve, reject) => {
        getHotelItem()
          .then(res => {
            _self.HotelRoomFloor = res.data.HotelRoomFloor;
            _self.HotelRoom = res.data.HotelRoom;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    selectFloors(e) {
      _self.rooms = [];
      _self.rooms = _self.HotelRoom[e];
    },
    selectRoom(e) {
      for (let i = 0; i < _self.rooms.length; i++) {
        if (e == _self.rooms[i].RoomNumber) {
          _self.roomId = _self.rooms[i].RoomID;
        }
      }
    },
    saveOrder() {
      if (_self.userName == "") {
        _self.$message.error("用户名称不能为空");
        return;
      } else if (_self.floor == "") {
        _self.$message.error("请先选择楼层");
        return;
      } else if (_self.room == "") {
        _self.$message.error("请选择房间号");
        return;
      } else if (_self.datatime == "") {
        _self.$message.error("请选择时间");
        return;
      }
      let data = {
        UserName: _self.userName,
        RoomID: _self.roomId,
        RoomNumber: _self.room,
        FloorNumber: _self.floor,
        BookDate: _self.datatime,
        Tel: _self.userPhone
      };
      if (_self.isTabsAct == 0) {
        return new Promise((resolve, reject) => {
          addCleanOrders(data)
            .then(res => {
              this.$confirm("订单创建成功，是否查看该订单？", "创建成功", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
                .then(() => {
                  _self.resetOrder();
                  this.$router.push({
                    path: "/bookingService/cleanOrder",
                    query: { OrderID: res.data.OrderID }
                  });
                })
                .catch(() => {
                  // _self.resetOrder();
                });
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });   
      } else {
        return new Promise((resolve, reject) => {
          addRepairOrders(data)
            .then(res => {
              this.$confirm("订单创建成功，是否查看该订单？", "创建成功", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
                .then(() => {
                  _self.resetOrder();
                  this.$router.push({
                    path: "/bookingService/repairOrder",
                    query: { OrderID: res.data.OrderID }
                  });
                })
                .catch(() => {
                  _self.resetOrder();
                });
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    },
    resetOrder() {
      _self.userName = "";
      _self.room = "";
      _self.roomId = "";
      _self.floor = "";
      _self.datatime = "";
      _self.userPhone = "";
      _self.rooms = [];
    },
    /**
     * dispatch 消息提醒
     */
    dispatchRemind(value) {
      this.$store.dispatch("wsdata/changeState", {
        key: "navBarData",
        value
      });
    },
    getDataFunc(e) {
      let data = JSON.parse(e.detail.data.data);
      let channel = data.channel;
      let oldStatisticsData = this.statisticsData;
      let reminds = this.$store.state.wsdata.navBarData;
      let msg = "";
      switch (channel) {
        // 续住订单
        case "TOPIC_CONTINUE_LIVE_ORDER":
          reminds.remindCountOfContinueLive++;
          oldStatisticsData.ContinueLiveOrder.HandleOrderCount++;
          oldStatisticsData.ContinueLiveOrder.TodayOrderCount++;
          oldStatisticsData.ContinueLiveOrder.ThisWeekOrderCount++;
          msg = "续住";
          break;
        // 退房订单
        case "TOPIC_CKECKOUT_ORDER":
          oldStatisticsData.CheckOutOrder.HandleOrderCount++;
          oldStatisticsData.CheckOutOrder.TodayOrderCount++;
          oldStatisticsData.CheckOutOrder.ThisWeekOrderCount++;
          reminds.remindCountOfCheckOut++;
          msg = "退房";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 客房服务订单
        case "TOPIC_SERVICE_ORDER":
          oldStatisticsData.ServiceOrder.HandleOrderCount++;
          oldStatisticsData.ServiceOrder.TodayOrderCount++;
          oldStatisticsData.ServiceOrder.ThisWeekOrderCount++;
          reminds.remindCountOfService++;
          msg = "客房服务";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 开票订单
        case "TOPIC_INVOICE_ORDER":
          oldStatisticsData.InvoiceOrder.HandleOrderCount++;
          oldStatisticsData.InvoiceOrder.TodayOrderCount++;
          oldStatisticsData.InvoiceOrder.ThisWeekOrderCount++;
          reminds.remindCountOfInvoice++;
          msg = "开票";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 清扫订单
        case "TOPIC_CLEAN_ORDER":
          oldStatisticsData.CleanOrder.HandleOrderCount++;
          oldStatisticsData.CleanOrder.TodayOrderCount++;
          oldStatisticsData.CleanOrder.ThisWeekOrderCount++;
          reminds.remindCountOfClear++;
          msg = "清扫";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 维修订单
        case "TOPIC_REPAIR_ORDER":
          oldStatisticsData.RepairOrder.HandleOrderCount++;
          oldStatisticsData.RepairOrder.TodayOrderCount++;
          oldStatisticsData.RepairOrder.ThisWeekOrderCount++;
          reminds.remindCountOfRepair++;
          msg = "维修";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 租车订单
        case "TOPIC_RENT_CAR_ORDER":
          msg = "租车";
          reminds.remindCountOfRentCar++;
          oldStatisticsData.RentCarOrder.HandleOrderCount++;
          oldStatisticsData.RentCarOrder.TodayOrderCount++;
          oldStatisticsData.RentCarOrder.ThisWeekOrderCount++;
          break;
        // 叫醒订单
        case "TOPIC_WAKE_ORDER":
          msg = "叫醒";
          reminds.remindCountOfWake++;
          oldStatisticsData.WakeOrder.HandleOrderCount++;
          oldStatisticsData.WakeOrder.TodayOrderCount++;
          oldStatisticsData.WakeOrder.ThisWeekOrderCount++;
          break;
        // 酒店设施订单
        case "TOPIC_HOTEL_FACILITY":
          msg = "酒店设施";
          reminds.remindCountOfFacility++;
          oldStatisticsData.FacilityOrder.HandleOrderCount++;
          oldStatisticsData.FacilityOrder.TodayOrderCount++;
          oldStatisticsData.FacilityOrder.ThisWeekOrderCount++;
          break;
        default:
          break;
      }
      this.dispatchRemind(reminds);
      this.privateDispatch(oldStatisticsData);
      if (msg) {
        this.$notify({
          title: "提示",
          message: `您有一个新的${msg}订单需要处理`,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    // window.addEventListener('onmessageWS', this.getDataFunc)
  }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
// .fu-tabs.el-tabs .el-tabs__nav-wrap::after {
//   background-color: #fff !important;
// }
// .fu-tabs.el-tabs .el-tabs__active-bar{
//   background-color: #ffc800 !important;
// }
// .fu-tabs.el-tabs .el-tabs__item.is-active{
//   color:#525252;
//   font-weight: 700;
//   font-size: 15px;
// }
// .fu-tabs.el-tabs .el-tabs__item{
//   color:#626262;
// }
.fu-tabs > div:first-child {
  margin-left: 0 !important ;
}
@media screen and (min-width: 992px) {
  .fu-index-eight {
    height: calc(100vh - 96px);
    min-height: 600px;
    overflow: auto;
  }
  .index-order-list {
    height: 32%;
  }
  .index-serve-list {
    height: 16%;
  }
  .type-fuc {
    margin-bottom: 0;
    height: 50%;
  }
}
@media screen and (max-width: 991px) {
  .fu-index {
    overflow: auto;
  }
  .fu-index-eight {
    height: auto;
    min-width: 450px;
  }
  .type-fuc {
    margin-bottom: 6px;
    height: 380px;
  }
  .index-order-list {
    height: 240px;
  }
  .index-serve-list {
    height: 150px;
  }
}
</style>
