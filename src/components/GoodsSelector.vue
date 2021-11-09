<template>
  <div class="component-goods-selector">
    <el-dialog
            :title="product.name"
            width="500px"
            :visible.sync="dialogVisible"
            @closed="closed">
      <div class="goods-selector">
        <div v-if="sku.color.length > 0">
          <h4 v-text="sku.colorName"></h4>
          <div class="sku">
            <el-tag
                    v-for="item in sku.color"
                    :key="item"
                    size="small"
                    @click="selectedSku.color = item"
                    :type="selectedSku.color == item ? '' : 'info'"
                    :effect="selectedSku.color == item ? 'light' : 'plain'">
              {{item}}
            </el-tag>
          </div>
        </div>

        <div v-if="sku.size.length > 0">
          <h4 v-text="sku.sizeName"></h4>
          <div class="sku">
            <el-tag
                    v-for="item in sku.size"
                    :key="item"
                    size="small"
                    @click="selectedSku.size = item"
                    :type="selectedSku.size == item ? '' : 'info'"
                    :effect="selectedSku.size == item ? 'light' : 'plain'">
              {{item}}
            </el-tag>
          </div>
        </div>
        <!--<h4>数量</h4>-->
        <!--<div class="clear">-->
          <!---->
        <!--</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-input-number v-model="qty" :min="1" size="mini"></el-input-number>
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="addToCart">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {Button,Tag,InputNumber,Dialog} from 'element-ui';

export default {
  name: 'GoodsSelector',
  props: {
    product: Object
  },
  components: {
      [Dialog.name]: Dialog,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [InputNumber.name]: InputNumber,
  },
  data() {
    return {
        qty: 1,
        dialogVisible: true,
        sku: {color:[],size:[],colorName:'',sizeName:''},
        selectedSku: {color:'',size:''},
    }
  },
  created() {
    console.log(this.product);
    this.initSku();
  },
  methods: {
      initSku() {
        const {product} = this;
        if(!product.sku)
            return;

        console.log(product.sku);
        let sku = {color:[],size:[],colorName:'',sizeName:''};
        sku.colorName = product.sku.sku_config.color_name;
        sku.color = product.sku.sku_config.color.split(',');
        this.selectedSku.color = sku.color[0] ? sku.color[0] : '';
        if (product.sku.sku_config.size) {
            sku.sizeName = product.sku.sku_config.size_name;
            sku.size = product.sku.sku_config.size.split(',');
            this.selectedSku.size = sku.size[0];
        }
        console.log(sku);
        this.sku = sku;
      },
      addToCart() {
          let sku = '';
          if(this.product.sku) {
              sku = this.selectedSku.color;
              if(this.selectedSku.size)
                  sku += ','+this.selectedSku.size;
          }
          const cartItem = {
              id: this.product.id,
              qty: this.qty,
              sku: sku,
              _thumb: this.product.thumb,
              _name: this.product.name,
          };

          this.$store.commit('cart/add', cartItem);
          this.dialogVisible = true;
          this.closed();
      },
      closed() {
          this.$emit('closed');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .el-dialog__body {
    padding: 10px;
  }
  .el-input-number--mini {
    width: 100px;
    margin-right: 10px;
  }
.goods-selector {
  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
  h4 {
    margin: 0;
    padding: 5px 0;
    font-weight: normal;
    font-size: 14px;
  }

  .opt {
    margin-top: 10px;
    border-top: 1px solid rgba(0,0,0,0.1);
    height: 30px;
    padding: 5px 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
