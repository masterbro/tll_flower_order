<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  min-height: 100vh;
  background: #f2f2f2;
  padding: 0;
  margin: 0;
}
.p15{padding: 15px;}

.page-title {
    font-weight: normal;
    text-align: center;
    margin: 0;
    background: #fff;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
}
.no-result {
    padding: 60px 0;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.inventory-table {
    background: #fff;

    .item {
        min-height: 40px;
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        &:last-child{
            border-bottom: 0 none;
        }

        .name {
            flex: 1;
            font-size: 14px;
            padding: 5px 10px;
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
        &.header .name,
        &.footer .name {
            padding: 0 10px;
            font-weight: bold;
        }

        .number {
            width: 60px;
            text-align: center;
            font-size: 12px;
        }
    }
}
.order-list {
    .item {
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        position: relative;

        h3 {
            font-size: 16px;
            font-weight: normal;
            margin: 0 0 10px;
        }

        p {
            font-size: 12px;
            color: #cdcdcd;
            margin: 0 0 5px;
            span {
                color: #2c3e50;
            }
        }

        .op {
            position: absolute;
            right: 10px;
            bottom: 10px;
            text-align: right;
            font-size: 13px;
            span {
                color: #1989fa;
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
}
</style>
