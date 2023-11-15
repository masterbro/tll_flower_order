<template>
    <div class="page-purchase">
      <template v-if="id > 0">
        <h4 class="page-title">{{ day }} {{ type == 'plan' ? '初始采购单' : '采购单' }}</h4>
      </template>
      <template v-else>
        <h4 class="page-title">创建初始采购单</h4>

      </template>
        <div class="sell-list">
          <div class="item header">
            <div class="text">商品列表</div>
            <!-- <div class="price">单价</div> -->
            <!-- <div class="qty">数量</div> -->
            <!-- <div class="icon"></div> -->
          </div>
          <div class="item"
            v-for="(item, index) in cart"
            :key="item.id + item.sku"
          >

            <div class="main">
              <div class="top">
                <el-input size="mini" style="flex:1" placeholder="商品名称" v-model="item.name"></el-input>
                <el-input size="mini" style="width: 60px;margin-left: 10px;" placeholder="规格" v-model="item.sku"></el-input>
                <el-input size="mini" v-if="type == 'order'" style="width: 60px;margin-left: 10px;" placeholder="价格(元)" v-model="item.price"></el-input>
                <el-input size="mini" type="number" style="width: 40px;margin-left: 10px;text-align: center;" placeholder="数量" v-model="item.qty"></el-input>
                <!-- <el-input-number size="mini" style="margin-left: 10px;" v-model="item.qty"></el-input-number> -->
                <!-- <h3 v-text="item.name"></h3>
                <p v-text="item.sku"></p> -->
              </div>
              <div class="bottom" v-if="item.demand_qty">需求数量：{{ item.demand_qty }}</div>
            </div>
            <el-button type="text" size="mini" icon="el-icon-close" @click="removeItem(index)" circle></el-button>
          </div>
          <div class="item" v-if="cart.length < 1">
            <div class="text" style="font-size: 14px">暂无商品，请添加商品</div>
          </div>

          <!-- <div class="item header">
            <div class="text">合计</div>
            <div class="price">{{ total }} 元</div>
            <div class="qty">{{ totalQty }} 件</div>
            <div class="icon"></div>
          </div> -->
        </div>
        <div class="btn">
          <el-button type="text" link icon="el-icon-circle-plus" @click="addGoods">添加商品</el-button>
        </div>
        <div class="btn" style="padding-top: 0;">
            
            <el-button type="primary" block @click="save()" :loading="loading">保存订单</el-button>
        </div>


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
        day: '',
        type: 'plan',
        clients: [],
        drawer: false,
        loading: false,
        cart: []
      }
    },
    created() {
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
      choose(item) {
        this.drawer = false;
        
        this.form.client = item.name;
      },
      addGoods() {
        this.cart.push({id: ++i, name:'', sku:'', price: '', qty: 1})
      },
      loadData(id) {
        this.$http.get('/manage/home/getBridge',{params: {
                    _uri: 'inventory/purchaseDetail',
                    _auth: 1,
                    id: id,
                }})
        .then((res) => {
            console.log(res.data);
            this.day = res.data.day;
            this.type = res.data.type;
            this.cart = [...res.data.content];
            i = res.data.content.pop().id;
        });
      },


      save() {
        console.log(this.cart);
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
          if(this.type == 'order') {
            if(!c.price || isNaN(c.price) || c.price < 0) {
              error = c.name + '价格错误';
              return true;
            }
          }
          
          if(!c.qty || isNaN(c.qty) || c.qty < 0) {
            error = c.name + '数量错误';
            return true;
          }
          const tmp = `${c.name}-${c.sku}-${c.price}`;
          if(keys.includes(tmp)) {
            error =  c.name + '已经存在，请不要重复添加';
            return true;
          }

          keys.push(tmp);
        });

        if(error) {
          this.$toast.error(error);
          return;
        }
        this.httpSave();
      },

      httpSave() {
        const cart = JSON.parse(JSON.stringify(this.cart));
        cart.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Ignore case
            const nameB = b.name.toUpperCase(); // Ignore case

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0; // Names are equal
        });

        const post = {
                    _uri: 'inventory/purchase',
                    _auth: 1,
                    content: JSON.stringify(cart),
                    type: 'plan',
                    _form_data: 1,
                };
        if(this.id)
                post.id = this.id;
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
            result += Number(c.price) * Number(c.qty);
          }
        });
        return result.toFixed(2);
      },
      totalQty() {
        let result = 0;
        this.cart.forEach(c => {
          if(!isNaN(c.price)) {
            result += Number(c.qty);
          }
        });
        return result;
      },
    }
}
</script>
    
    <style lang="less" scoped>
    .content {
        background-color: #fff;
        padding: 20px 10px 1px;
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
</style>