<template>
    <div class="page-purchase">
      <template v-if="id > 0">
        <h4 class="page-title">{{ form.client }} 客户订单</h4>
      </template>
      <template v-else>
        <h4 class="page-title">客户订单</h4>
    
        <div class="content" style="margin-bottom: 10px;">
            <el-form ref="form" :model="form" label-position="left" label-width="70px">
                <el-form-item label="客户" style="margin-bottom: 0;">
                  <span @click="drawer = true">{{ form.client ? form.client : '点击选择客户' }}</span>
                </el-form-item>
            </el-form>
        </div>
      </template>

        <div class="sell-list">
          <div class="item header">
            <div class="text">商品列表</div>
            <div style="width: 60px;">规格</div>
            <div style="width: 60px;margin-left: 10px;">采购单价</div>
            <div style="width: 40px;margin-left: 10px;">数量</div>
            <div style="width: 30px;"></div>
          </div>
          <div class="item"
            v-for="(item, index) in cart"
            :key="item.id + item.sku"
          >

            <div class="main">
              <div class="top">
                <el-input size="mini" style="flex:1" placeholder="商品名称" v-model="item.name"></el-input>
                <el-input size="mini" style="width: 60px;margin-left: 10px;" placeholder="规格" v-model="item.sku"></el-input>
                <el-input size="mini" style="width: 60px;margin-left: 10px;" placeholder="价格(元)" v-model="item.price"></el-input>
                <el-input size="mini" style="width: 40px;margin-left: 10px;" placeholder="数量" v-model="item.qty"></el-input>
                <!-- <h3 v-text="item.name"></h3>
                <p v-text="item.sku"></p> -->
              </div>
              <!-- <div class="bottom"></div> -->
            </div>
            <el-button type="text" icon="el-icon-close" @click="removeItem(index)" circle></el-button>
          </div>

          <div class="item"
            v-for="(item, index) in fee"
            :key="index"
          >

            <div class="main">
              <div class="top">
                <el-input size="mini" style="flex:1" placeholder="费用名称" v-model="item.name"></el-input>
                <el-input size="mini" style="width: 60px;margin-left: 10px;" placeholder="价格(元)" v-model="item.price"></el-input>
                <!-- <h3 v-text="item.name"></h3>
                <p v-text="item.sku"></p> -->
              </div>
              <!-- <div class="bottom"></div> -->
            </div>
            <el-button type="text" icon="el-icon-close" @click="removeFee(index)" circle></el-button>
          </div>

          <div class="item" v-if="cart.length < 1">
            <div class="text" style="font-size: 14px">暂无商品，请添加商品</div>
          </div>

          <div class="item header">
            <div class="text">合计</div>
            <div class="price">{{ total }} 元</div>
            <div class="qty">{{ totalQty }} 件</div>
            <div class="icon"></div>
          </div>
        </div>

        <div class="btn2">
          <el-button type="text" icon="el-icon-coin" @click="fee.push({name:'', price: ''})">添加费用</el-button>
            <el-button type="text" icon="el-icon-circle-plus" @click="drawerGoods = true">添加商品</el-button>
            
        </div>
    
        <div class="btn" style="padding-top: 0;">
            <el-button type="primary" @click="save()" :loading="loading">保存订单</el-button>
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


      <el-drawer
          title="选择商品"
          :visible.sync="drawerGoods"
          size="70%"
          direction="btt">
          <div class="inventory-table">
                <div class="item header">
                    <div class="name">名称</div>
                    <div class="number">采购价</div>
                    <div class="link"></div>
                </div>
                <div class="item" v-for="item in goods" @click="addGoods(item)">
                    <div class="name">
                        <h3 v-text="item.name"></h3>
                        <p v-if="item.sku" v-text="item.sku"></p>
                    </div>
                    <div class="number" v-text="item.price || '---'"></div>
                    <div class="link">选择</div>
                </div>
        </div>
      </el-drawer>
    </div>

    
</template>
    
<script>
import {Button,Icon,Form,FormItem,Input,InputNumber,Popconfirm,Popover,Drawer} from 'element-ui';
let i = 4;
export default {
  components: {
      [Button.name]: Button,
      [Icon.name]: Icon,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input,
      [InputNumber.name]: InputNumber,
      [Icon.name]: Icon,
      [Popover.name]: Popover,
      [Popconfirm.name]: Popconfirm,
      [Drawer.name]: Drawer,
  },
  props: {
    id: {
      required: false,
      default: null,
    }
  },
    data() {
      return {
        form: {
          client: '',
        },
        clients: [],
        drawer: false,
        drawerGoods: false,
        loading: false,
        cart: [],
        goods: [],
        fee: [],
        currentClient: {},
      }
    },
    created() {
      this.loadClients();
      this.loadGoods();
      if(this.id) {
        this.loadData(this.id);
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      removeItem(index) {
          this.cart.splice(index, 1);
      },
      removeFee(index) {
          this.fee.splice(index, 1);
      },
      choose(item) {
        this.drawer = false;
        if(this.currentClient.id != item.id) {
          this.loadPlan(item.id);
        }
        this.form.client = item.name;
        this.currentClient = item;
      },
      addGoods(goods) {
        const tmp = `${goods.name}-${goods.sku}`;
        if(this.cart.find(c => tmp == `${c.name}-${c.sku}`)) {
          this.$toast('当前商品已经存在');
          return;
        }

        this.drawerGoods = false;
        this.cart.push({id: ++i, ...goods, qty: 1, cost_price: goods.price})
      },
      loadData(id) {
        this.$http.get('/manage/home/getBridge',{params: {
                    _uri: 'inventory/sellDetail',
                    _auth: 1,
                    id: id,
                }})
        .then((res) => {
            console.log(res.data);
            this.form.client = res.data.client;
            this.cart = [...res.data.content];
            this.fee = [...res.data.fee];
            i = res.data.content.pop().id;
        });
      },
      loadGoods() {
        this.$http.get('/manage/home/getBridge',{params: {
                    _uri: 'inventory/today',
                    _auth: 1,
                }})
        .then((res) => {
            this.goods = res.data;
        });
      },
      loadClients() {
        this.$http.get('/manage/home/getBridge',{params: {
                    _uri: 'inventory/client',
                    _auth: 1,
                }})
        .then((res) => {
            this.clients = res.data;
        });
      },
      loadPlan(id) {
        this.$http.get('/manage/home/getBridge',{params: {
                    _uri: 'inventory/planClient',
                    _auth: 1,
                    client_id: id
                }})
        .then((res) => {
            this.cart = [...res.data];
            i = i + res.data.count + 1;
        });
      },

      save() {
        if(!this.form.client) {
          this.$toast.error('请选择客户');
          return;
        }

        if(this.cart.length <= 0) {
          this.$toast.error('商品不能为空');
          return;
        }

        let error = '';
        let keys = [];
        this.cart.forEach(c => {
          if(!c.name) {
            error = '商品名称不能为空';
            return true;
          }
          if(!c.price || isNaN(c.price) || c.price < 0) {
            error = c.name + '价格错误';
            return true;
          }
          const tmp = `${c.name}-${c.sku}-${c.price}`;
          if(keys.includes(tmp)) {
            error =  c.name + '已经存在，请不要重复添加';
            return true;
          }

          keys.push(tmp);
        });

        this.fee.forEach(c => {
          if(!c.name) {
            error = '费用名称不能为空';
            return true;
          }
          if(!c.price || isNaN(c.price) || c.price < 0) {
            error = c.name + '价格错误';
            return true;
          }
        });

        if(error) {
          this.$toast.error(error);
          return;
        }
        this.httpSave();
      },

      httpSave() {
        const post = {
                    _uri: 'inventory/sell',
                    _auth: 1,
                    content: JSON.stringify(this.cart),
                    fee: JSON.stringify(this.fee),
                    _form_data: 1,
                };
        if(this.id) {
          post.id = this.id;
        } else {
          //
          post.client = this.currentClient.name;
          post.contact_name = this.currentClient.contact_name;
          post.contact_tel = this.currentClient.tel;
          // post.contact_address = this.currentClient.address;
        }
                
        this.loading = true;
        this.$http.post('/manage/home/postBridge', post)
          .then((res) => {
            if(res.error_code != 0) {
                this.$toast.error(res.tip);
                return;
            }

              this.loading = false;
              this.$toast.success('保存成功');
              this.$router.go(-1);
          }).catch(() => this.loading = false);
      }
    },
    computed: {
      total() {
        let result = 0;
        this.cart.forEach(c => {
          if(!isNaN(c.price)) {
            result += c.price * c.qty;
          }
        });
        this.fee.forEach(c => {
          if(!isNaN(c.price)) {
            result += Number(c.price);
          }
        });
        console.log(result);
        return result.toFixed(2);
      },
      totalQty() {
        let result = 0;
        this.cart.forEach(c => {
          if(!isNaN(c.price)) {
            result += c.qty;
          }
        });
        return result;
      }
    }
}
</script>
    
<style lang="less" scoped>
    .content {
        background-color: #fff;
        padding: 5px 10px 1px;
    }
    
    .btn {
        padding: 20px;
        .el-button {
            width: 100%;
        }
    }

    .sell-list {
      background: #fff;
    box-sizing: border-box;


    .item {
      // height: 80px;
      padding: 10px 0;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      &:last-child{
        border-bottom: 0 none;
      }

      
      .main {
        flex: 1;
        padding-left: 10px;

        > div {
          display: flex;
        }
        .bottom {
          // justify-content: end;
          padding-top: 6px;
          color: #606266;
          font-size: 12px;
        }

        /deep/ .el-input__inner {
          padding: 0 5px;
        }
      }
      img {
        width: 40px;
        height: 40px;
      }
      .text {
        flex: 1;
        padding-left: 10px;
        h3,p {
          padding: 0;
          margin: 0;
          line-height:20px;
          font-weight: normal;
          font-size: 14px;
        }
        p {
          font-size: 12px;
          color: #cdcdcd;
        }
      }
      .price.el-input--mini {
        width: 60px;
        margin-right: 10px;
        text-align: center;
        
      }
      .el-input-number--mini {
        width: 100px;
      }
      

      &.header {
        font-size: 14px;
        .price {
          width: 60px;
          text-align: center;
        }
        .qty {
          width: 110px;
          text-align: center;
        }
        .icon {
          width: 40px;
        }
      }
    }
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

.btn2 {
  text-align: right;
  padding: 10px 18px;
}
</style>