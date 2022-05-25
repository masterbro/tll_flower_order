<template>
  <div class="page-home" v-loading="loading">
    <FooterBar
            :categories="categories"
            :currentCategory="currentCategory"
            :showCartBtn="true"
            @categoryChange="loadProducts"
            @toggleCart="showCart = !showCart"
    />
    <div class="search">
      <el-input
              prefix-icon="el-icon-search"
              v-model="keywords"
              @input="input($event)" placeholder="请输入关键字搜索" clearable></el-input>
    </div>
    <!--<div style="height: 60px;"></div>-->

    <div class="">
      <GoodsList :products="products" :loading="loading" />
    </div>

    <ShoppingCart v-show="showCart" />
  </div>
</template>

<script>
// @ is an alias to /src
import FooterBar from '../components/FooterBar.vue'
import GoodsList from '../components/GoodsList.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import { mapState } from 'vuex'

import {Input} from 'element-ui';
let inputTimeout = null;
export default {
  name: 'home',
  components: {
      FooterBar, GoodsList, ShoppingCart,
      [Input.name]: Input,
  },
  created() {
    this.$store.dispatch('products/load').then(() => {
        this.loadProducts(this.categories.length > 0 ? this.categories[0].id : 0);
    });
    this.$store.dispatch('addresses/load');
  },
  computed: {
      ...mapState({
          //products: state => state.products.results,
          categories: state => state.products.categories,
          loading: state => state.products.loading,
      })
  },
  data() {
      return {
          showCart: false,
          currentCategory: null,
          products: [],
          keywords: '',
      }
  },
  methods: {
      loadProducts(cid) {
          this.currentCategory = cid;
          this.products = this.$store.getters['products/query'](cid, this.keywords);
      },
      input(value) {
          if(inputTimeout)
              clearTimeout(inputTimeout);

          inputTimeout = setTimeout(() => {
              this.products = this.$store.getters['products/query'](this.currentCategory, this.keywords);
          }, 300);
      }
//      categoryChange(cid) {
//          this.currentCategory = cid;
//          this.loadProducts(cid);
//      }
  },
}
</script>

<style scoped lang="less">
.search {
  width: 400px;
  box-sizing: border-box;
  max-width: 100%;
  padding: 15px 15px 0 15px;
  /*position: fixed;*/
  /*left: 15px;*/
  /*top: 70px;*/
}
</style>
