<template>
  <div class="component-address-list">
    <el-button
            size="mini"
            type="success"
            icon="el-icon-plus"
            @click="handleEdit({})">添加地址</el-button>
    <br><br>
    <el-table
            v-loading="loading"
            :data="addresses"
            border
            stripe
            size="mini"
            style="width: 100%">
      <el-table-column
              prop="real_name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="tel"
              label="电话"
              width="180">
      </el-table-column>
      <el-table-column
              prop="company"
              label="花店"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"></el-button>
          &nbsp;
          <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.row)">
            <el-button
                    style="color:red"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                  type="text"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="currentItem.id ? '编辑地址' : '添加地址'"
               :visible.sync="showForm" append-to-body>
      <address-form :address="currentItem" v-if="showForm" @complete="afterEdit()"></address-form>
    </el-dialog>
  </div>
</template>

<script>
import {Button, Table,Popover,Popconfirm,TableColumn,Dialog} from 'element-ui';
import { mapState } from 'vuex'
import AddressForm from './AddressForm'
export default {
  name: 'AddressList',
  components: {
      AddressForm,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Button.name]: Button,
      [Popover.name]: Popover,
      [Popconfirm.name]: Popconfirm,
      [Dialog.name]: Dialog,
  },
  data() {
      return {
          loading: false,
          currentItem: {},
          showForm: false,
      }
  },
  computed: {
      ...mapState({
          addresses: state => state.addresses.results,
      })
  },
  methods: {
      afterEdit() {
          this.showForm = false;
      },
      handleEdit(item) {
        this.currentItem = item;
        this.showForm = true;
      },
      handleDelete(item) {
        this.loading = true;
        this.$store.dispatch('addresses/remove', item)
            .then((res) => {
                this.loading = false;
                if(res.error_code) {
                    this.$toast.error(res.tip);
                } else {
                    this.$toast.success('删除成功');
                }
            }).catch(() => this.loading = false);
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.component-address-list {
  padding: 10px;
}
</style>
