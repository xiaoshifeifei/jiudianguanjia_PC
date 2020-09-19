<!--
 * @Author: your name
 * @Date: 2020-05-26 09:20:51
 * @LastEditTime: 2020-06-02 10:10:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\views\supermarket\components\CreateBreakageDialog.vue
-->
<template>
  <div id="create_breakage_dialog">
    <el-dialog
      title="新建报损"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <section class="tag_box">
        <el-tag
          v-for="(item,index) in tagItems"
          :key="index"
          :type="item.type"
          :effect="item.effect"
          @click="tagClick(index)"
        >
          {{ item.label }}
        </el-tag>
      </section>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="选择原因"
          prop="cause"
        >
          <el-select v-model="form.cause">
            <el-option
              label="破损"
              value="break"
            ></el-option>
            <el-option
              label="丢失"
              value="lost"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择商品"
          required
        >
          <el-form-item
            v-for="(goods,index) in form.goodsItem"
            :key="index"
            class="goods_item"
          >
            <el-form-item
              :prop="'goodsItem.'+index+'.goodsName'"
              :rules="{ required: true, message: '商品不能为空', trigger: 'change'}"
            >
              <el-select
                v-model="goods.goodsName"
                placeholder="请选择商品"
              >
                <el-option
                  v-for="item in goodsItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            X
            <el-form-item
              :prop="'goodsItem.'+index+'.goodsNum'"
              :rules="[{ required: true, trigger: 'change',validator:checkInteger}]"
            >
              <el-input
                style="width:70%"
                placeholder="请输入内容"
                v-model.number="goods.goodsNum"
              >
              </el-input>
              (数量)
            </el-form-item>
            <el-button
              @click.prevent="removeGoods(goods)"
              type="danger"
              icon="el-icon-delete"
              circle
              :disabled="removeGoodsState"
              size='mini'
            ></el-button>
          </el-form-item>
          <div class="addBtn">
            <el-button @click="addGoodsItem">添加</el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="备注【字数不得多于300字】"
            v-model="form.remark"
            maxlength="300"
            show-word-limit
          >
          </el-input>

        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          type="primary"
          class="golbal-btn cancel-btn"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submit('form')"
          class="golbal-btn submit-btn"
        >立即提交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagItems: [
        { type: '', label: '便利店', effect: 'dark' },
        { type: '', label: '送餐服务', effect: 'plain' },
        { type: '', label: '土特产', effect: 'plain' },
        { type: '', label: '情趣用品', effect: 'plain' }
      ],
      goodsItem: [
        { label: '海苔-喜之郎（￥4.00）', value: 1 },
        { label: '雨伞-天堂伞（￥15.00）', value: 2 }
      ],
      form: {
        cause: '破损',
        goodsItem: [{ goodsName: '', goodsNum: 1 }],
        remark: ''
      },
      rules: {
        cause: [{ required: true }],
        goodsName: [{ required: true }],
        goodsNum: [{ required: true }]
      },
      removeGoodsState: true,
      type: 0
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.dialog.createBreakageDialogState
    }
  },
  methods: {
    checkInteger(rule, value, callback) {
      if (!value) {
        return callback(new Error('不能为空'))
      } else if (value < 1) {
        return callback(new Error('商品数量应大于0 '))
      } else if (isNaN(value)) {
        return callback(new Error('只能为数字'))
      } else {
        this.form.limitNum = Number(value).toFixed()
        callback()
      }
    },
    handleClose() {
      this.$store.dispatch('dialog/changeState', {
        key: 'createBreakageDialogState',
        value: false
      })
    },
    tagClick(val) {
      this.type = val
      this.tagItems.forEach((item, index) => {
        if (index === val) {
          item.effect = 'dark'
        } else {
          item.effect = 'plain'
        }
      })
    },
    submit(formName) {
      // TODO 提交事件
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(this.form)
      console.log(this.type)
    },
    addGoodsItem() {
      // TODO 添加条目数
      this.form.goodsItem.push({ goodsName: '', goodsNum: 1 })
      if (this.form.goodsItem.length !== 1) this.removeGoodsState = false
    },
    removeGoods(item) {
      if (this.form.goodsItem.length !== 1) {
        let index = this.form.goodsItem.indexOf(item)
        if (index !== -1) {
          this.form.goodsItem.splice(index, 1)
        }
        if (this.form.goodsItem.length === 1) this.removeGoodsState = true
      }
    }
  }
}
</script>

<style lang="less">
#create_breakage_dialog {
  .el-dialog {
    max-height: 70vh;
    height: 70vh;
    .el-dialog__body {
      max-height: calc(70vh - 54px - 62px);
      height: calc(70vh - 54px - 62px);
      overflow-y: scroll;
    }
    .dialog-footer {
      .cancel-btn {
        float: left;
      }
      .submit-btn {
        float: right;
      }
      .el-button::after {
        contain: "";
        clear: both;
        display: block;
        height: 0;
      }
    }
  }
  .goods_item {
    .el-form-item {
      display: inline-block;
      margin: 10px 0;
    }
  }
  .multiply {
    text-align: center;
  }
  .tag_box {
    margin-bottom: 10px;
    .el-tag {
      margin-right: 10px;
    }
  }
  .addBtn {
      margin-top: 10px;
    }
}
</style>
