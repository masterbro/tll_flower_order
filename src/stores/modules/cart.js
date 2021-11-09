import axios from 'axios'
export default {
    namespaced: true,
    state:{
        items: [],
    },
    getters:{
        count:  (state) => {
            let count = 0;
            state.items.forEach(item => count += item.qty);
            return count;
        },
    },
    actions:{
        checkout({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                const post = {
                    _uri: 'order/place',
                    _auth: 1,
                    _form_data: 1,
                    real_name: payload.address.real_name,
                    address: payload.address.address,
                    tel: payload.address.tel,
                    company: payload.address.company,
                    shipping_method: payload.shipping_method,
                    remark: payload.remark,
                    order: JSON.stringify(state.items),
                    order_type: 1,
                    admin: 1,
                };

                axios.post('/manage/home/postBridge', post)
                    .then((res) => {
                        if(res.error_code == 0) {
                            commit('empty');
                        }
                        return resolve(res);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        }
    },
    mutations:{
        add(state, payload) {
            let index = state.items.findIndex((item) => item.id == payload.id && item.sku == payload.sku);
            if(index !== -1) {
                state.items[index].qty += payload.qty;
            } else {
                state.items.push(payload);
            }
        },
        remove(state, payload) {
            let index = state.items.findIndex((item) => item.id == payload.id && item.sku == payload.sku);
            if(index !== -1) {
                state.items.splice(index, 1);
            }
        },
        qtyChange(state, payload) {
            let index = state.items.findIndex((item) => item.id == payload.item.id && item.sku == payload.item.sku);
            if(index !== -1) {
                state.items[index].qty = payload.qty;
            }
        },
        empty(state) {
            state.items = [];
        }
    }
}