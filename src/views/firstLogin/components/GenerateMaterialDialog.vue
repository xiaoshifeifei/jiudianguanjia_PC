<!--
 * @Author: your name
 * @Date: 2020-06-04 16:15:43
 * @LastEditTime: 2020-06-05 09:21:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\firstLogin\components\GenerateMaterial.vue
-->
<template>
  <div id='generate_material_dialog'>
    <el-dialog
      title="选择方案"
      :visible.sync="dialogVisible"
      width="40%"
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
            <div>
              <figure>
                <img
                  :src="item.imgUrl"
                  alt=""
                >
                <figcaption>成品样图</figcaption>
              </figure>
              <article>
                <table>
                  <tr>
                    <td>
                      <h2>方案说明：</h2>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>材料名称：</td>
                    <td>{{item.name}}</td>
                  </tr>
                  <tr>
                    <td>单价：</td>
                    <td>{{item.price}}</td>
                  </tr>
                  <tr>
                    <td>说明：</td>
                    <td class="description">{{item.description}}</td>
                  </tr>
                </table>
                <p class="total">总计制作价格￥{{item.price}}</p>
              </article>
            </div>
          </section>
        </section>
        <el-button
          type="text"
          class="golbal-btn-text"
        >下载</el-button>
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
          @click="toGenerate"
          class="golbal-btn"
        >平台制作</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toGenerateHandle: {
      type: Function,
      default: () => {
        console.log('这是子组件的平台制作')
      }
    }
  },
  data() {
    return {
      resList: [
        {
          imgUrl:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182136634&di=f57b770792a08326fe9b69fc9880773c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170122%2FYBpa-fxzusxt8027108.jpg',
          name: '名称',
          price: '12',
          description: '说明说明说明',
          class: '',
          label: '方案一'
        },
        {
          imgUrl:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591182150558&di=3dd2a06701459acfd1781abd89db9831&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0823dd54564e92583325045e9782d158ccbf4e69.jpg',
          name: '名称',
          price: '12',
          description: '说明说明说明',
          class: '',
          label: '方案二'
        },
        {
          imgUrl:
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3387575933,2289989292&fm=26&gp=0.jpg',
          name: '名称',
          price: '12',
          description: '说明说明说明',
          class: '',
          label: '方案三'
        },
        {
          imgUrl:
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2674362133,1324177113&fm=26&gp=0.jpg',
          name: '名称',
          price: '12',
          description: '说明说明说明',
          class: '',
          label: '方案四'
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
      return this.$store.state.dialog.generateMaterialDialogState
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'generateMaterialDialogState',
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
    toGenerate() {
      this.handleClose()
      this.toGenerateHandle()
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
    console.log(this.tagList)
    this.tagList[0].class = 'active'
  }
}
</script>

<style lang="less">
#generate_material_dialog {
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
        & > div {
          display: flex;
          width: 100%;
          height: 100%;
          figure {
            flex-basis: 50%;
            figcaption {
              text-align: center;
              font-weight: bold;
              margin-top: 10px;
            }
            img {
              width: 100%;
              height: 90%;
            }
          }
          article {
            position: relative;
            padding: 10px;
            flex-basis: 50%;
            h2 {
              font-weight: bold;
              font-size: 1rem;
            }
            table {
              tr {
                td:nth-of-type(1) {
                  padding-bottom: 5px;
                  text-align: right;
                  vertical-align: top;
                }
                td.description{
                  display: inline-block;
                }
              }
            }
            .total {
              width: 100%;
              font-weight: bold;
              color: orangered;
              text-align: center;
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  .tag_box {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    & > div {
      width: 89%;
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
  }
  .active {
    background-color: #1890ff;
    color: white;
  }
}
</style>
