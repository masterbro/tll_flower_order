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
      </div>
      <div class="btn" @click="$emit('toggleCart')">查看购物车({{count}})</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'FooterBar',
  props: ['currentCategory'],
  components: {},
  computed: {
      ...mapState({
          categories: state => state.products.categories,
      }),
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

  height: 60px;
  position: fixed;
  left:0;
  right:0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .categories {
    flex: 1;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-left: 20px;
    height: 60px;
    line-height: 60px;

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
</style>
