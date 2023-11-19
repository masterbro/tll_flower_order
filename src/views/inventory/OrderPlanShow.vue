<template>
<div v-if="model.day">
    <h4 class="page-title">{{ model.day }} 初始采购订单</h4>
    <div class="inventory-table">
        <div class="item header">
            <div class="name">名称[规格]</div>
            <div class="number">参考价格</div>
            <div class="number">数量</div>
        </div>
        <div class="item" v-for="item in model.content">
            <div class="name">
                <h3>{{ item.name }}</h3>
                <p v-if="item.sku">{{ item.sku }}</p>
            </div>
            <div class="number">{{ item.price || '---' }}</div>
            <div class="number">{{ item.qty }}</div>
        </div>
        
        <!-- <div class="item footer">
            <div class="name">合计</div>
            <div class="number">{{ model.total_qty }}</div>
            <div class="number">{{ model.total_price }}</div>
        </div> -->
</div>

</div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                id: -1,
                day: '',
                content: [],
            }
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData(id) {
            this.$http.get('/manage/home/getBridge',{params: {
                        _uri: 'inventory/planToday',
                        _auth: 1,
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