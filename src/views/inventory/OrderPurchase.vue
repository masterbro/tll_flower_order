<template>
<div>
    <div class="no-result" v-if="!loading && listData.length < 1">暂无内容</div>
    <div class="order-list" v-loading="loading">
        <div class="item" v-for="(item, index) in listData">
            <template v-if="item.type == 'plan'">
                <h3>{{item.day}} 初始订单</h3>
                <p>下单时间：<span>{{item.day}}</span></p>
                <p>产品数量：<span>{{item.total_qty}}</span></p>
                <div class="op">
                    <!-- <span>打印</span> -->
                    <span v-if="item.status == 0" @click="$router.push({name: 'inventory-order-purchase-edit', params: {id:item.id}})">编辑</span>
                    <span v-if="item.status == 0" @click="checkout(item, index)">生成正式采购单</span>
                    <span @click="$router.push({name: 'inventory-order-purchase-show', params: {id:1}})">查看详情</span>
                </div>
            </template>
            <template v-else>
                <h3>{{item.day}} 采购订单</h3>
                <p>下单时间：<span>{{item.day}}</span></p>
                <p>产品数量：<span>{{item.total_qty}}</span></p>
                <p>金额合计：<span>{{item.total_price}}元</span></p>
                <div class="op">
                    <!-- <span>打印</span> -->
                    <span @click="$router.push({name: 'inventory-order-purchase-edit', params: {id:item.id}})">编辑</span>
                    <span @click="$router.push({name: 'inventory-order-purchase-show', params: {id:item.id}})">查看详情</span>
                </div>
            </template>
        </div>
    </div>

    <div class="btn">
        <el-button type="success" @click="more" v-if="hasNext" :loading="loading">加载更多</el-button>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            listData: [],
            loading: false,
            showMore: false,
            hasNext: true,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            this.$http.get('/manage/home/getBridge',{params: {
                        _uri: 'inventory/purchase',
                        _auth: 1,
                        page: this.page,
                        page_size: 10
                    }})
            .then((res) => {
                this.loading = false
                if(this.page == 1) {
                    this.listData = res.data;
                } else {
                    this.listData.push(...res.data);
                }
                
                if(res.data.length < 10)
                    this.hasNext = false;
            }).catch(() => this.loading = false);
        },
        more() {
            this.page++;
            this.loadData();
        },
        checkout(item, index) {
            if(!confirm('确定要生成采购单吗')) {
                return;
            }

            const post = {
                            _uri: 'inventory/purchaseCreate',
                            _auth: 1,
                            id: item.id,
                            _form_data: 1,
                        };
            this.loading = true;
            this.$http.post('/manage/home/postBridge', post)
                .then((res) => {
                    if(res.error_code != 0) {
                        this.$toast.error(res.tip);
                        return;
                    }
                    
                    this.page = 1;
                    this.loadData();
                    this.$toast.success('操作成功');
                }).catch(() => this.loading = false);
        },
        createOrder(item) {

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