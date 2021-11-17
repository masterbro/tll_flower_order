<template>
  <div class="component-category-nav">
    <a href="#">地址管理</a>
    <div
      class="item"
      :class="{on:currentCate == item.id}"
      v-for="item in categories"
      :key="item.id"
      v-text="item.name">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FooterBar',
  props: {
    msg: String
  },
  computed: {
      ...mapState({
          categories: state => state.products.categories,
      })
  },
  data() {
    return {
        currentCate: null,
    };
  },
  watch: {
      categories(newVal, oldVal) {
//        console.log(oldVal);
//        console.log(newVal);
      },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
</style>
