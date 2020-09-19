<!--
 * @Author: your name
 * @Date: 2020-06-03 15:12:46
 * @LastEditTime: 2020-06-05 16:35:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\GenerateCard.vue
-->
<template>
  <div id="GenerateCard">
    <el-dialog
      title="选择台卡模板"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="box">
        <section class="tag_box">
          <el-button
            @click="left"
            icon="el-icon-d-arrow-left"
            circle
            size="mini"
          ></el-button>
          <div>
            <section
              v-for="(item,index) in tagList"
              :class="item.class"
              :key='index'
              @click="selectTemplete(index)"
            >{{item.label}}
            </section>
          </div>
          <el-button
            @click="right"
            icon="el-icon-d-arrow-right"
            circle
            size="mini"
          ></el-button>
        </section>
        <section class="img_box">
          <section
            v-for='(item,index) in tagList'
            :key='index'
            v-show="templateImgState===index"
          >
            <img
              :src="item.imgUrl[0]"
              alt=""
            >
            <img
              :src="item.imgUrl[1]"
              alt=""
            >
          </section>
        </section>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          class="golbal-btn"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="generate"
          class="golbal-btn"
        >物料制作</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    generateHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的生成台卡')
      }
    }
  },
  data() {
    return {
      resList: [
        {
          class: '',
          label: '模板一',
          imgUrl: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182136634&di=f57b770792a08326fe9b69fc9880773c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170122%2FYBpa-fxzusxt8027108.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182150558&di=3dd2a06701459acfd1781abd89db9831&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0823dd54564e92583325045e9782d158ccbf4e69.jpg'
          ]
        },
        {
          class: '',
          label: '模板二',
          imgUrl: [
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3387575933,2289989292&fm=26&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2674362133,1324177113&fm=26&gp=0.jpg'
          ]
        },
        {
          class: '',
          label: '模板三',
          imgUrl: [
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1613853783,609198712&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2930711637,2209418418&fm=26&gp=0.jpg'
          ]
        },
        {
          class: '',
          label: '模板四',
          imgUrl: [
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3254220905,8276637&fm=26&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1631985263,1502053433&fm=26&gp=0.jpg'
          ]
        },
        {
          class: '',
          label: '模板五',
          imgUrl: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182136634&di=f57b770792a08326fe9b69fc9880773c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170122%2FYBpa-fxzusxt8027108.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182150558&di=3dd2a06701459acfd1781abd89db9831&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0823dd54564e92583325045e9782d158ccbf4e69.jpg'
          ]
        },
        {
          class: '',
          label: '模板六',
          imgUrl: [
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3387575933,2289989292&fm=26&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2674362133,1324177113&fm=26&gp=0.jpg'
          ]
        },
        {
          class: '',
          label: '模板七',
          imgUrl: [
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1613853783,609198712&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2930711637,2209418418&fm=26&gp=0.jpg'
          ]
        },
        {
          class: '',
          label: '模板八',
          imgUrl: [
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3254220905,8276637&fm=26&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1631985263,1502053433&fm=26&gp=0.jpg'
          ]
        }
      ],
      tagList: [],
      templateImgState: 0,
      startIndex: 0,
      endIndex: 3
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.GenerateCardDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'GenerateCardDialogState',
        value: false
      })
    },
    left() {
      if (--this.templateImgState < 0) {
        this.templateImgState = 0

        if (this.startIndex-- <= 0) {
          this.startIndex = 0
        } else {
          this.tagList.pop()
          this.tagList.unshift(this.resList[this.startIndex])
        }
        if (this.endIndex-- <= 3) this.endIndex = 3

        this.selectTemplete(this.templateImgState)
      } else {
        this.selectTemplete(this.templateImgState)
      }
    },
    right() {
      if (++this.templateImgState >= 3) {
        this.templateImgState = 3

        if (this.startIndex++ >= this.resList.length - 4)
          this.startIndex = this.resList.length - 4
        if (this.endIndex++ >= this.resList.length - 1) {
          this.endIndex = this.resList.length
        } else {
          this.tagList.shift()
          this.tagList.push(this.resList[this.endIndex])
        }
        this.selectTemplete(this.templateImgState)
      } else {
        this.selectTemplete(this.templateImgState)
      }
    },
    generate() {
      this.handleClose()
      this.generateHandle()
    },
    selectTemplete(val) {
      this.templateImgState = val
      this.tagList.forEach((item, index) => {
        if (index === val) {
          item.class = 'active'
        } else {
          item.class = ''
        }
      })
    }
  },
  mounted() {
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      this.tagList.push(this.resList[i])
    }
    this.tagList[0].class = 'active'
  }
}
</script>

<style lang="less">
#GenerateCard {
  * {
    box-sizing: border-box;
  }
  .el-dialog {
    height: 55vh;
  }
  .el-dialog__body {
    padding: 10px;
    height: calc(55vh - 54px - 70px);
  }
  .box {
    width: 100%;
    height: 100%;
    .img_box {
      height: calc(100% - 30px - 10px);
      section {
        height: 100%;
        img {
          width: 50%;
          height: 100%;
        }
      }
    }
  }
  .tag_box {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
        text-align: center;
    & > div {
      width: 80%;
      height: 100%;
      display: inline-block;
      section {
        display: inline-block;
        width: 25%;
        border: 1px solid rgb(201, 201, 201);
        height: 100%;
        line-height: 30px;
        text-align: center;
      }
    }
    .el-button:nth-of-type(1){
      float: left;
    }
    .el-button:nth-of-type(2){
      float: right;
    }
  }
  .active {
    background-color: #1890ff;
    color: white;
  }
}
</style>
