import { createRouter, createWebHashHistory } from "vue-router";

import homePage from './components/homePage.vue';
import filmInfo from './components/filmInfo.vue';
import errorApp from './components/UI/errorApp.vue';
import favoriteFilms from './components/favoriteFilms.vue';

export default createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
          path: '/',
          component: homePage
        },
        {
          path: '/film',
          component: filmInfo
        },
        {
          path: '/error',
          component: errorApp
        },
        {
          path: '/favoriteMovie',
          component: favoriteFilms
        }
    ]
})