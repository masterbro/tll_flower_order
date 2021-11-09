<template>
  <div class="component-address-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="real_name">
        <el-input v-model="ruleForm.real_name"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>

      <el-form-item label="花店名称" prop="company">
        <el-input v-model="ruleForm.company"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Button,Icon,Form,FormItem,Input,Select,Option,Radio, RadioGroup,Drawer} from 'element-ui';
export default {
  name: 'AddressForm',
  props: {
    address: Object
  },
  components: {
      [Button.name]: Button,
      [Icon.name]: Icon,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input,
  },
  data() {
      return {
          loading: false,
          ruleForm: {
              real_name: '',
              tel: '',
              address: '',
              company: '',
          },
          rules: {
              real_name: [
                  { required: true, message: '此项为必填项', trigger: 'blur' },
              ],
              tel: [
                  { required: true, message: '此项为必填项', trigger: 'blur' },
              ],
              address: [
                  { required: true, message: '此项为必填项', trigger: 'blur' },
              ],
          }
      }
  },
  created() {
    if(this.address.id) {
        this.ruleForm = {...this.address};
        console.log(this.ruleForm);
    }
  },
  methods: {
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.loading = true;
                  this.$store.dispatch('addresses/save', {...this.ruleForm})
                      .then((res) => {
                          console.log(res);
                          this.loading = false;
                          if(res.error_code != 0) {
                              this.$toast.error(res.tip);
                          } else {
                              this.$toast.success('操作成功');
                              this.$store.dispatch('addresses/load', true);
                              this.$emit('complete');
                          }
                      }).catch(() => {
                        this.loading = false;
                        this.$toast.error('操作失败，请重试');
                      })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
