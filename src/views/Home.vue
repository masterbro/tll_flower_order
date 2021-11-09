<template>
  <div class="page-home" v-loading="loading">
    <div class="">
      <GoodsList :products="products" :loading="loading" />
    </div>
    <FooterBar
            :currentCategory="currentCategory"
            @categoryChange="loadProducts"
            @toggleCart="showCart = !showCart"
    />

    <ShoppingCart v-show="showCart" />
  </div>
</template>

<script>
// @ is an alias to /src
import FooterBar from '../components/FooterBar.vue'
import GoodsList from '../components/GoodsList.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import { mapState } from 'vuex'


export default {
  name: 'home',
  components: {
      FooterBar, GoodsList, ShoppingCart,
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
      }
  },
  methods: {
      loadProducts(cid) {
          this.currentCategory = cid;
          this.products = this.$store.getters['products/getProductsByCid'](cid);
      },
//      categoryChange(cid) {
//          this.currentCategory = cid;
//          this.loadProducts(cid);
//      }
  },
}
</script>
