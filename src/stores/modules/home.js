import axios from 'axios'
export default {
    namespaced: true,
    state:{
        results: [],
        categories: [],
        loading: false,
    },
    getters:{

    },
    actions:{
        load({commit, state}) {
            return new Promise((resolve, reject) => {
                if(state.loading && state.results.length < 1)
                    return;

                commit('loading');

                axios.get('api/product')
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
                state.results = products;
            }

            state.loading = false;
        },
        loading(state){
            state.loading = true;
        },
    }
}