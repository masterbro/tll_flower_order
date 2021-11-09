<template>
  <div class="component-shopping-cart">
    <div class="list">
      <div class="item"
        v-for="item in cart"
        :key="item.id + item.sku"
      >
        <img :src="item._thumb" alt="">
        <div class="text">
          <h3 v-text="item._name"></h3>
          <p v-text="item.sku"></p>
        </div>
        <el-input-number size="mini" :value="item.qty" @input="qtyChange($event, item)"></el-input-number>
        <el-button type="text" icon="el-icon-close" @click="removeItem(item)" circle></el-button>
      </div>
    </div>
    <div class="opt">
      <el-popconfirm title="确定要清空购物车吗?" @confirm="empty()">
        <el-button type="danger" size="mini" slot="reference">清空</el-button>
      </el-popconfirm>

      <el-button type="primary" size="mini" @click="checkout()">结算</el-button>
    </div>
    <el-dialog title="结算"
               :visible.sync="dialogFormVisible"
               destroy-on-close append-to-body>
      <checkout @complete="afterCheckout()"></checkout>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {Button,InputNumber,Icon,Popconfirm,Popover,Dialog} from 'element-ui';
import Checkout from "./Checkout.vue";
export default {
  name: 'ShoppingCart',
  components: {
      Checkout,
      [Button.name]: Button,
    [InputNumber.name]: InputNumber,
    [Icon.name]: Icon,
    [Popover.name]: Popover,
    [Popconfirm.name]: Popconfirm,
    [Dialog.name]: Dialog,
  },
  computed: {
      ...mapState({
          cart: state => state.cart.items,
      })
  },
  data() {
    return {
        dialogFormVisible: false,
    }
  },
  methods: {
      removeItem(item) {
          this.$store.commit('cart/remove', item);
      },
      qtyChange(qty, item) {
          this.$store.commit('cart/qtyChange', {qty:qty, item:item});
      },
      empty() {
          this.$store.commit('cart/empty');
      },
      afterCheckout() {
          this.dialogFormVisible = false;
      },
      async checkout() {
          if (this.cart.length < 1) {
              this.$toast.error('请至少添加一件商品');
              return;
          }
          this.dialogFormVisible = true;
//          if (this.cart.length < 1) {
//              this.$toast.error('请至少添加一件商品');
//              return;
//          }
//          const loading = this.$loading({
//              lock: true,
//              text: '加载中...',
//              spinner: 'el-icon-loading',
//              background: 'rgba(0, 0, 0, 0.3)'
//          });
//          const res = await this.$store.dispatch('cart/checkout');
//
//          loading.close();
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.component-shopping-cart {
  width: 400px;
  height: 300px;
  background: #fff;
  position: fixed;
  right: 0;
  bottom: 60px;
  border: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  .list {
    box-sizing: border-box;
    padding: 10px;
    height: 260px;
    overflow-y: scroll;

    .item {
      height: 50px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      &:last-child{
        border-bottom: 0 none;
      }
      img {
        width: 40px;
        height: 40px;
      }
      .text {
        flex: 1;
        padding-left: 10px;
        h3,p {
          padding: 0;
          margin: 0;
          line-height:20px;
          font-weight: normal;
          font-size: 14px;
        }
        p {
          font-size: 12px;
          color: #cdcdcd;
        }
      }
      .el-input-number--mini {
        width: 100px;
      }
    }
  }
  .opt {
    border-top: 1px solid rgba(0,0,0,0.1);
    height: 30px;
    padding: 5px 10px;
    /*text-align: right;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
