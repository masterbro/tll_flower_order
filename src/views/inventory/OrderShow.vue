<template>
<div v-if="model.id > 0">
    <h4 class="page-title">{{ model.client }} 客户订单</h4>
    <div class="inventory-table">
        <div class="item header">
            <div class="name">名称[规格]</div>
            <div class="number">数量</div>
            <div class="number">单价</div>
            <div class="number">采购价</div>
            <!-- <div class="number">合计</div> -->
        </div>
        <div class="item" v-for="item in model.content">
            <div class="name">
                <h3>{{ item.name }}</h3>
                <p v-if="item.sku">{{ item.sku }}</p>
            </div>
            <div class="number">{{ item.qty }}</div>
            <div class="number">{{ item.price }}</div>
            <div class="number">{{ item.cost_price }}</div>
        </div>
        <div class="item" v-for="item in model.fee">
            <div class="name">
                <h3>{{ item.name }}</h3>
            </div>
            <div class="number">1</div>
            <div class="number">{{ item.price }}</div>
            <div class="number">---</div>
        </div>
        <div class="item footer">
            <div class="name">合计</div>
            <div class="number">{{ model.total_qty }}</div>
            <div class="number">{{ model.total }}</div>
            <div class="number">---</div>
        </div>
</div>

</div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                id: -1,
                content: [],
            }
        }
    },
    props: {
        id: {
        required: false,
        default: null,
        }
    },
    created() {
      if(this.id) {
        this.loadData(this.id);
      }
    },
    methods: {
        loadData(id) {
            this.$http.get('/manage/home/getBridge',{params: {
                        _uri: 'inventory/sellDetail',
                        _auth: 1,
                        id: id,
                    }})
            .then((res) => {
                this.model = res.data;
            });
        },
    }
}
</script>

<style lang="less" scoped>
.btn {
    padding: 20px;
    .el-button {
        width: 100%;
    }
}
</style>