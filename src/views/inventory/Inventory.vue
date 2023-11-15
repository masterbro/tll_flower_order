<template>
<div class="">
    <h4 class="page-title">库存列表</h4>
    <div class="inventory-table">
            <div class="item header">
                <div class="name">名称[规格]</div>
                <div class="number">数量</div>
                <div class="number">单价</div>
                <!-- <div class="number">合计</div> -->
            </div>
            <div class="item">
                <div class="name">
                    <h3>基地小白兔</h3>
                    <p>红色/A级</p>
                </div>
                <div class="number">10000</div>
                <div class="number">10</div>
            </div>
            <div class="item">
                <div class="name">
                    <h3>桃红雪山</h3>
                </div>
                <div class="number">10000</div>
                <div class="number">10</div>
            </div>
            <div class="item">
                <div class="name">
                    <h3>桃红雪山</h3>
                </div>
                <div class="number">10000</div>
                <div class="number">10</div>
            </div>
            <div class="item">
                <div class="name">
                    <h3>桃红雪山</h3>
                </div>
                <div class="number">10000</div>
                <div class="number">10</div>
            </div>
            <div class="item footer">
                <div class="name">合计</div>
                <div class="number">10000</div>
                <div class="number">10</div>
            </div>
    </div>
</div>
</template>

<script>
export default {
    created() {
        console.log('aa');
    }
}
</script>

<style lang="less" scoped>

</style>