<template>
<div>
    <div class="content" style="margin-bottom: 10px;">
        <el-form ref="form" label-position="left" label-width="70px">
            <el-form-item label="客户" style="margin-bottom: 0;">
                <span @click="drawer = true">{{ currentClient.name ? currentClient.name : '点击选择客户' }}</span>
            </el-form-item>
        </el-form>
    </div>

    <el-drawer
          title="选择客户"
          :visible.sync="drawer"
          size="70%"
          direction="btt">
          <div class="inventory-table">
                <div class="item header">
                    <div class="name">名称</div>
                    <div class="link"></div>
                    <!-- <div class="number">合计</div> -->
                </div>
                <div class="item" v-for="item in clients" @click="choose(item)">
                    <div class="name">
                        <h3 v-text="item.name"></h3>
                    </div>
                    <div class="link">选择</div>
                </div>
        </div>
      </el-drawer>
</div>
</template>

<script>
import {Button,Icon,Form,FormItem,Input,InputNumber,Popconfirm,Popover,Drawer} from 'element-ui';

export default {
    components: {
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Drawer.name]: Drawer,
    },
    data() {
      return {
        clients: [],
        drawer: false,
        currentClient: {},
      }
    },
    created() {
      this.loadClients();
    },
    methods: {
        loadClients() {
            this.$http.get('/manage/home/getBridge',{params: {
                        _uri: 'inventory/client',
                        _auth: 1,
                    }})
            .then((res) => {
                this.clients = res.data;
            });
        },
        choose(item) {
            this.drawer = false;
            this.currentClient = item;
            this.$emit('selected', item);
        },
    }
}
</script>

<style lang="less" scoped>
.content {
        background-color: #fff;
        padding: 5px 10px 1px;
    }
    .inventory-table {
  .item {
    .link {
      width: 40px;
      font-size: 12px;
      color: #1989fa;
    }
  }
}
</style>