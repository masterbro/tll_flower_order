<template>
  <div class="component-footer-bar">
    <div class="placeholder"></div>
    <div class="footer">
      <div class="categories">
        <div class="categories-list">
          <div
                  class="item"
                  :class="{on:currentCategory == item.id}"
                  v-for="item in categories"
                  :key="item.id"
                  @click="categoryChange(item.id)"
                  v-text="item.name">
          </div>
        </div>
        <router-link v-if="showCartBtn" to="/address" class="link">地址管理</router-link>
      </div>
      <div v-if="showCartBtn" class="btn" @click="$emit('toggleCart')">查看购物车({{count}})</div>
      <div class="icons">
        <router-link v-if="showCartBtn" to="/address" class="address">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        </router-link>
        <div v-if="showCartBtn" class="cart" @click="$emit('toggleCart')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'FooterBar',
  props: ['currentCategory', 'categories', 'showCartBtn'],
  components: {},
  computed: {
      ...mapGetters({
          count: 'cart/count',
      }),
  },
  methods: {
      categoryChange(cid) {
          if(cid == this.currentCategory)
              return;

          this.$emit('categoryChange', cid);
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.placeholder {
  height: 60px;
}
.footer {
  z-index: 1;
  height: 60px;
  position: fixed;
  left:0;
  right:0;
  top: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .categories {
    flex: 1;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding: 0 20px;
    height: 60px;
    /*line-height: 60px;*/
    display: flex;
    align-items: center;
    justify-content: space-between;

    .link {
      color: #999;
      font-size: 12px;
      text-decoration: none;
    }

    .categories-list {
      .item {
        margin-right: 10px;
        display: inline-block;
        font-size: 12px;
        cursor: pointer;

        &.on {
          color: #1989fa;
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .btn {
    width: 150px;
    background: red;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .placeholder {
    height: 90px;
  }
  .footer {
    height: auto;

    .categories {
      height: auto;
      padding: 10px 20px;
      .categories-list {
        .item {
          font-size: 14px !important;
          line-height: 20px;
        }

        &.on {
          font-size: 16px !important;
        }
      }
    }

    .link {
      display: none;
    }
    .btn {
      display: none;
    }
    .icons {
      padding-right: 10px;
      display: flex;
      flex-direction: column;
      svg {
        width: 20px;
        height: 20px;
        color: #2c3e50;
      }
    }
  }
  
}
</style>
