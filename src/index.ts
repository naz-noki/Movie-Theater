import { createStore } from "vuex"

export const store = createStore({
    state: {
        FullInfo: 'http://www.omdbapi.com/',
        key: 'ce0c1d8d',
        name: '',
        favoriteFilms: [],
    },

    mutations:{
        mutNameFilm(state, title){
            state.name = title;
        },
        mutAddFavoriteFilm(state, newFavoriteFilms){
            state.favoriteFilms = newFavoriteFilms;
        },
    },

    actions:{
        actNameFilm({ commit }, title){
            commit('mutNameFilm', title);
        },
        actAddFavoriteFilm({ commit }, newFavoriteFilms){
            commit('mutAddFavoriteFilm', newFavoriteFilms);
        },
    },

    getters:{
        getName(state){
            return state.name 
        },
        getData(state){
            return `${state.FullInfo}?t=`
        },
        getKey(state){
            return `&apikey=${state.key}`
        },
        getFavoriteFilms(state){
            return state.favoriteFilms
        },
    }
})