import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Address from './views/Address.vue'
import Navigate from './views/Navigate.vue'
import Base from './views/inventory/Base.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/address',
        name: 'address',
        component: Address
    },
    {
      path: '/goods',
      name: 'goods',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Goods.vue')
    },
    {
      path: '/navigate',
      name: 'navigate',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "inventory" */ './views/Navigate.vue')
    }
    ,
    {
      path: '/inventory',
      component: Base,
      children: [
        {
          path: 'inventory',
          name: 'inventory',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Inventory.vue')
        },
        {
          path: 'order',
          name: 'inventory-order',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Order.vue')
        },
        {
          path: 'order/:id',
          name: 'inventory-order-show',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/OrderShow.vue'),
          props: true,
        },
        {
          path: 'order/:id/edit',
          name: 'inventory-order-edit',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Sell.vue'),
          props: true,
        },
        {
          path: 'purchase',
          name: 'inventory-purchase',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Purchase.vue')
        },
        {
          path: 'purchase-plan',
          name: 'inventory-purchase-plan',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/PurchasePlan.vue')
        },
        {
          path: 'sell',
          name: 'inventory-sell',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Sell.vue')
        },
        {
          path: 'order-purchase',
          name: 'inventory-order-purchase',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/OrderPurchase.vue')
        },
        
        {
          path: 'order-purchase/:id',
          name: 'inventory-order-purchase-show',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/OrderPurchaseShow.vue'),
          props: true,
        },
        {
          path: 'order-purchase/:id/edit',
          name: 'inventory-order-purchase-edit',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/Purchase.vue'),
          props: true,
        },
        {
          path: 'order-plan/:id/edit',
          name: 'inventory-order-plan-edit',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/PurchasePlan.vue'),
          props: true,
        },
        {
          path: 'order-plan-today',
          name: 'inventory-plan-today',
          component: () => import(/* webpackChunkName: "inventory" */ './views/inventory/OrderPlanShow.vue'),
          props: true,
        },
      ],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      
    }
  ]
})
