<template>
  <div class="page-goods" v-loading="loading">
    <div class="p15">
      <el-button type="primary" size="mini" @click="save()">批量保存</el-button>


      <div class="goods-list">
        <el-alert title="当前分类暂无产品" type="warning" v-if="showingProducts.length < 1 && !loading"></el-alert>

        <div class="item"
             :class="{'dirty':dirtyProducts.includes(item.key)}"
             v-for="item in showingProducts"
             :key="item.key">
          <img :src="item.thumb"/>
          <span class="name" v-text="item.name"></span>
          <div class="inputs">
            <el-input type="text" size="mini" v-model="item.price" @input="inputChange(item.key)">
                <template slot="prepend">价格</template>
            </el-input>
            <el-input type="text" size="mini" v-model="item.stock" @input="inputChange(item.key)">
                <template slot="prepend">库存</template>
            </el-input>
            <el-input type="text" size="mini" v-model="item.min_pack" @input="inputChange(item.key)">
                <template slot="prepend">最低</template>
            </el-input>
          </div>
          <div><el-button type="primary" icon="el-icon-check" circle size="mini" @click="saveSingle(item.key)"></el-button></div>
        </div>
      </div>

      <div class="clear"></div>
      <br>
      <el-button type="primary" size="mini" @click="save()">批量保存</el-button>
    </div>


    <footer-bar
        :categories="categories"
        :currentCategory="currentCategory"
        :showCartBtn="false"
        @categoryChange="switchCategory"
      ></footer-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import FooterBar from '../components/FooterBar.vue'
import {Button,Icon,Form,FormItem,Input,Select,Option,Radio, Alert} from 'element-ui';
export default {
    name: 'goods',
    components: {
        FooterBar,
        [Button.name]: Button,
        [Input.name]: Input,
        [Alert.name]: Alert,
    },
    data() {
        return {
            loading: true,
            categories: [],
            currentCategory: null,
            showingProducts: [],
            products: [],
            dirtyProducts: [],
        }
    },
    created() {
      this.loadData();
    },
    methods: {
        loadData(cid = false) {
            this.loading = true;
            this.$http.get('/manage/home/getBridge',{params: {
                _uri: 'product',
            }})
            .then((res) => {
                this.loading = false;
                if(res.error_code != 0) {
                    this.$toast.error(res.tip);
                } else {
                    this.products = res.data.products;
                    this.categories = res.data.categories;
                    if(cid) {
                        this.switchCategory(cid);
                    } else {
                        this.switchCategory(this.categories.length > 0 ? this.categories[0].id : 0);
                    }

                }
            })
            .catch(() => {
                this.loading = false;
            })
        },
        switchCategory(cid) {
            this.currentCategory = cid;
            const products = this.products.filter((item) => item.cid == cid);
            const showingProducts = [];
            products.forEach(product => {
                if(product.sku) {
                    Object.keys(product.sku.sku_map).forEach(key => {
                        showingProducts.push({
                            id: product.id,
                            sku: key,
                            key: `${product.id},${key}`,
                            thumb: product.thumb,
                            name: `${product.name}[${key}]`,
                            min_pack: product.min_pack,
                            price: product.sku.sku_map[key].price,
                            stock: product.sku.sku_map[key].stock,
                        })
                    });
                } else {
                    showingProducts.push({
                        id: product.id,
                        sku: '',
                        key: `${product.id},`,
                        thumb: product.thumb,
                        name: product.name,
                        price: product.price,
                        min_pack: product.min_pack,
                        stock: product.stock,
                    })
                }
            });
            this.dirtyProducts = [];
            this.showingProducts = showingProducts;
        },
        inputChange(key) {
            if(!this.dirtyProducts.includes(key))
                this.dirtyProducts.push(key);
        },
        saveSingle(key) {
            const {showingProducts} = this;
            const product = showingProducts.find(p => p.key == key);
            if(!product) {
                return false;
            }
            let error = false;
            if(isNaN(product.price) || isNaN(product.stock) || isNaN(product.min_pack)) {
                error = product.name + ' 输入有误，请修改';
            }
            if(error !== false) {
                this.$toast.error(error);
                return false;
            }

            const loading = this.$loading({lock: true});
            this.$http.post('/manage/product/batchUpdate', [product])
                .then((res) => {
                    loading.close();
                    if(res.error_code != 0) {
                        this.$toast.error(res.tip);
                    } else {
                        this.$toast.success('保存成功');
                        this.loadData(this.currentCategory);
                    }
                }).catch(() => {
                    loading.close();
                    this.$toast.error('操作失败，请重试');
                });
        },
        save() {
            const update = this.validate();
            if(update === false)
                return;

            const loading = this.$loading({lock: true});
            this.$http.post('/manage/product/batchUpdate', update)
                .then((res) => {
                    loading.close();
                    if(res.error_code != 0) {
                        this.$toast.error(res.tip);
                    } else {
                        this.$toast.success('保存成功');
                        this.dirtyProducts = [];
                        this.loadData(this.currentCategory);
                    }
                }).catch(() => {
                    loading.close();
                    this.$toast.error('操作失败，请重试');
                });
        },
        validate() {
            const {dirtyProducts, showingProducts} = this;
            if(dirtyProducts.length < 1) {
                this.$toast.error('请至少修改一个产品');
                return false;
            }

            let error = false;
            const update = [];
            dirtyProducts.forEach(item => {
                const product = showingProducts.find(p => p.key == item);
                if(product) {
                    if(isNaN(product.price) || isNaN(product.stock) || isNaN(product.min_pack)) {
                        error = product.name + ' 输入有误，请修改';
                    }

                    update.push(product);
                }
            });
            if(error !== false) {
                this.$toast.error(error);
                return false;
            }

            if(update.length < 1) {
                this.$toast.error('请至少修改一个产品');
                return false;
            }

            return update;
        }
    },

}
</script>
<style>
  .el-input-group__prepend,.el-input__inner {
    padding: 0 5px;
    text-align: center;
  }
</style>
<style scoped lang="less">
  .el-input {
    width: 80px;
    text-align: center;
    margin-left: 5px;
  }

  .goods-list {
    margin-top: 20px;
    font-size: 14px;
    .item {
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      width: 380px;
      display: flex;
      align-items: center;
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      &.dirty {
        background: #d9ecff;
      }

      img {
        margin-right: 10px;
        width: 40px;
        height: 40px;
      }
      span.name {
        flex: 1;
        font-size: 14px;
      }
    }

  }

  .clear {clear: both;}
@media (max-width: 768px) {
  .page-goods {
      padding-top: 100px;
  }

  .goods-list {
      .item {
          clear: both;
          width: 100%;
          box-sizing: border-box;

          span.name {
              font-size: 12px;
          }
          .inputs {
            width: 90px;

            .el-input {
                margin-bottom: 5px;
            }
            .el-button {
                margin-left: 5px;
            }
          }
      }
  }
  
}
</style>