<template>
<div class="nav">
    <!-- <div class="item">
        <router-link :to="{name:'inventory'}" class="link">
            <i class="el-icon-folder-checked"></i>
            <p>查看库存</p>
        </router-link>
    </div> -->
    
    
    <div class="item">
        <router-link :to="{name:'inventory-purchase-plan'}" class="link">
            <i class="el-icon-document-add"></i>
            <p>初始订单</p>
        </router-link>
    </div>
    <div class="item">
        <router-link :to="{name:'inventory-plan-today'}" class="link">
            <i class="el-icon-document"></i>
            <p>初始采购订单</p>
        </router-link>
    </div>

    <div class="item">
        <router-link :to="{name:'inventory-purchase'}" class="link">
            <i class="el-icon-document-checked"></i>
            <p>正式采购单</p>
        </router-link>
    </div>
    <div class="item">
        <router-link :to="{name:'inventory-order-purchase'}" class="link">
            <i class="el-icon-date"></i>
            <p>采购单列表</p>
        </router-link>
    </div>
    <div class="item">
        <router-link :to="{name:'inventory-order'}" class="link">
            <i class="el-icon-document-copy"></i>
            <p>销售单列表</p>
        </router-link>
    </div>
    
    <div class="item">
        <router-link :to="{name:'inventory-sell'}" class="link">
            <i class="el-icon-sell"></i>
            <p>销售</p>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.nav {
    display: flex;
    // height: 100vh;
    // justify-content: center;
    // align-items: center;
    flex-wrap: wrap;
    padding-top: 230px;

    .item {
        width: 50%;
        height: 100px;
        padding-top: 30px;
        text-align: center;

        .link {
            color: #2c3e50;
            text-decoration: none;
        }

        i {
            font-size: 30px;
        }
    }
}
</style>