import axios from 'axios'
export default {
    namespaced: true,
    state:{
        results: [],
        categories: [],
        loading: false,
    },
    getters:{
        getProductsByCid:  (state) => (id) => {
            return state.results.filter(product => product.cid == id)
        },
        query: (state) => (id, keywords) => {
            return state.results.filter(product => {
                if(keywords.length) {
                    return product.cid == id && product.name.indexOf(keywords) !== -1;
                } else {
                    return product.cid == id;
                }
            })
        },
    },
    actions:{
        load({commit, state}) {
            return new Promise((resolve, reject) => {
                if(state.loading && state.results.length < 1)
                    return;

                commit('loading');

                axios.get('/manage/home/getBridge',{params: {
                        _uri: 'product',
                    }})
                    .then(({data}) => {
                        commit('loaded', data);
                        return resolve();
                    })
                    .catch(() => {
                        commit('loaded', null);
                        reject()
                    })
            });
        }
    },
    mutations:{
        loaded(state, data){
            if(data !== null) {
                state.categories = data.categories;
                state.results = data.products;
            }

            state.loading = false;
        },
        loading(state){
            state.loading = true;
        },
    }
}