<template>
<div>
    <div class="no-result" v-if="!loading && listData.length < 1">暂无内容</div>
    <div class="order-list" v-loading="loading">
        <div class="item" v-for="(item, index) in listData">
            <h3>{{item.client}} 客户订单</h3>
            <p>下单时间：<span>{{item.day}}</span></p>
            <p>产品数量：<span>{{item.total_qty}}</span></p>
            <p>金额合计：<span>{{item.total}}元</span></p>
            <div class="op">
                <!-- <span>打印</span> -->
                <span @click="checkout(item, index)" v-if="item.checkout != 1">确认发货</span>
                <span @click="$router.push({name: 'inventory-order-edit', params: {id:item.id}})" v-if="item.checkout != 1">编辑</span>
                <span @click="$router.push({name: 'inventory-order-show', params: {id:item.id}})">查看详情</span>
            </div>
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
                        _uri: 'inventory/sell',
                        _auth: 1,
                        page: this.page,
                        page_size: 10
                    }})
            .then((res) => {
                this.loading = false
                this.listData.push(...res.data);
                if(res.data.length < 10)
                    this.hasNext = false;
            }).catch(() => this.loading = false);
        },
        more() {
            this.page++;
            this.loadData();
        },
        checkout(item, index) {
            if(!confirm('确定要确认发货吗？确认后订单将不能修改')) {
                return;
            }

            const post = {
                            _uri: 'inventory/checkout',
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

                    this.listData[index].checkout = 1;
                    this.loading = false;
                    this.$toast.success('操作成功');
                }).catch(() => this.loading = false);
        }
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