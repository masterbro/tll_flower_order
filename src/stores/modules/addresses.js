import axios from 'axios'
export default {
    namespaced: true,
    state:{
        results: [],
        loading: false,
    },
    getters:{
    },
    actions:{
        load({commit, state}, force = false) {
            return new Promise((resolve, reject) => {
                if(!force && state.loading && state.results.length < 1)
                    return;

                commit('loading');
                axios.get('/manage/home/getBridge',{params: {
                    _uri: 'address',
                    _auth: 1,
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
        },
        save({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/manage/home/postBridge',{
                    _uri: payload.id ? 'address/update' : 'address/create',
                    _auth: 1,
                    _form_data: 1,
                    ...payload
                })
                    .then((res) => {
                        return resolve(res);
                    })
                    .catch(() => {
                        commit('loaded', null);
                        return reject()
                    })
            });
        },
        remove({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/manage/home/getBridge',{params: {
                    _uri: 'address/delete',
                    _auth: 1,
                    id: payload.id
                }})
                .then((res) => {
                    if(res.error_code == 0) {
                        commit('remove', payload);
                    }
                    return resolve(res);
                })
                .catch(() => {
                    commit('loaded', null);
                    reject()
                })
            });
        },
    },
    mutations:{
        loaded(state, data){
            if(data !== null) {
                state.results = data;
            }

            state.loading = false;
        },
        loading(state){
            state.loading = true;
        },
        remove(state, payload){
            const index = state.results.findIndex((item) => item.id == payload.id);
            if(index !== -1) {
                state.results.splice(index, 1);
            }
        },
    }
}