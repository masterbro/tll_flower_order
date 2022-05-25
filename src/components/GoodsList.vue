<template>
  <div class="component-goods-list">
    <div class="p15" v-if="products.length < 1 && !loading">
      <el-alert title="当前分类暂无产品" type="warning"></el-alert>
    </div>
    <div class="goods-list">
        <div
            v-for="item in products" :key="item.id"
            @click="showProduct(item)"
            class="item">
            <img :src="item.thumb" alt="">
            <p v-text="item.name"></p>
            <p class="price" v-text="'￥'+ item.display_price_v2"></p>
        </div>
    </div>

    <GoodsSelector
            :product="currentProduct"
            v-if="showGoodsSelector"
            @closed="goodsSelectorClosed"
    ></GoodsSelector>
  </div>
</template>

<script>
import { Alert } from 'element-ui'
import GoodsSelector from "./GoodsSelector.vue";

export default {
  name: 'GoodsList',
  props:['products', 'loading'],
  components: {
      GoodsSelector,
      [Alert.name]: Alert,
//      [Col.name]: Col,
  },
  data() {
    return {
        showGoodsSelector: false,
        currentProduct: null,
    }
  },
  created() {
      //console.log(this.products);
  },
  methods: {
      showProduct(product) {
          this.currentProduct = product;
          this.showGoodsSelector = true;
      },
      goodsSelectorClosed() {
          this.currentProduct = null;
          this.showGoodsSelector = false;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .goods-list {
    /*display: flex;*/

    .item {
      display: inline-block;
      cursor: pointer;
      width: 100px;
      height: 130px;
      background: #fff;
      margin: 15px 0 0 15px;
      border-radius: 2px;
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
        vertical-align: bottom;
      }
      p {
        margin: 0;
        height: 30px;
        line-height:30px;
        width: 100px;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        font-size: 13px;
      }
    }
  }

// @media (max-width: 768px) {
.goods-list {
  .item {
    height: 140px;
    p {
      line-height: 20px;
      height: 20px;
      &.price {
        color: red;
      }
    }
  }
}
// }

</style>
