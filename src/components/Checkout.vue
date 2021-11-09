<template>
  <div class="component-checkout">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="配送方式">
        <el-radio-group v-model="form.shipping_method">
          <el-radio label="delivery">送货上门</el-radio>
          <el-radio label="pickup">门店自提</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址">
        <el-select v-model="form.address" placeholder="请选择配送地址" style="width: 400px">
          <el-option
                  v-for="item in addresses"
                  :label="`${item.real_name}/${item.tel}/${item.company}`"
                 :value="item.id"></el-option>
        </el-select>
        &nbsp;&nbsp;
        <el-button size="mini" type="text" @click="drawVisible = true">管理地址</el-button>
      </el-form-item>

      <el-form-item label="订单备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">立即下单</el-button>
      </el-form-item>
    </el-form>

    <el-drawer
            title="地址管理"
            :visible.sync="drawVisible"
            direction="rtl"
            append-to-body
            size="80%">
      <address-list></address-list>
    </el-drawer>
  </div>
</template>

<script>
import {Button,Icon,Form,FormItem,Input,Select,Option,Radio, RadioGroup,Drawer} from 'element-ui';
import { mapState } from 'vuex'
import AddressList from "./AddressList.vue";
export default {
  name: 'Checkout',
  components: {
      AddressList,
      [Button.name]: Button,
      [Icon.name]: Icon,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input,
      [Select.name]: Select,
      [Option.name]: Option,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Drawer.name]: Drawer,
  },
  computed: {
      ...mapState({
          addresses: state => state.addresses.results,
      })
  },
  data() {
      return {
          drawVisible: false,
          form: {
              address: '',
              remark: '',
              shipping_method: 'delivery',
          }
      }
  },
  created() {

  },
  methods: {
      async onSubmit() {
          let address = {};
          if(this.form.shipping_method == 'delivery') {
              if (!this.form.address) {
                  this.$toast.error('请选择收货地址');
                  return;
              }
              address = this.addresses.find((item) => item.id == this.form.address);
              if (!address) {
                  this.$toast.error('请选择收货地址');
                  return;
              }
          }


          const loading = this.$loading({
              lock: true,
          });
          const payload = {
              address,
              shipping_method: this.form.shipping_method,
              remark: this.form.remark,
          };

          let res = {};
          try {
              res = await this.$store.dispatch('cart/checkout', payload);
          } catch (e) {
              loading.close();
              console.log(e);
              return;
          }

          loading.close();
          if(res.error_code != 0) {
              this.$toast.error(res.tip);
          } else {
              this.$toast.success('下单成功');
              this.$emit('complete');
          }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
