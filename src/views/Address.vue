<template>
  <div class="page-address">
    <h3 class="title">地址管理</h3>
    <address-list></address-list>
  </div>
</template>

<script>
// @ is an alias to /src
import AddressList from '../components/AddressList.vue'

export default {
  name: 'address',
  components: {
      AddressList
  },
  created() {

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

  },
}
</script>

<style scoped lang="less">
.title {
  font-weight:normal;
  padding-left: 15px;
}
</style>
