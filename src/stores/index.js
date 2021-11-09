import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products';
import cart from "./modules/cart";
import addresses from "./modules/addresses";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        products:products,
        addresses:addresses,
        cart:cart,
    },
    strict: debug
});