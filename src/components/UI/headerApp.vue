<template>
    <div class="headerApp__wrapper">
        <div class="headerApp__block_logo">
            <router-link to="/">
                <button class="headerApp__block_logo-blkIMG">
                    <img src="../img/headerApp__block_logo-img.png" alt="" class="headerApp__block_logo-img">
                </button>
            </router-link>
            <div class="headerApp__block_logo-title">
                MovieTheater
            </div>
        </div>
        <form class="headerApp__block_search" @submit="setNameFilm">
            <input 
                v-model="title"
                placeholder="What do you want to watch?"
                type="text" 
                class="headerApp__block_search_inp">
            <button class="headerApp__block_search_btn">
                <img src="../img/headerApp__block_search_btn-img.png" alt="" class="headerApp__block_search_btn-img">
            </button>
        </form>
        <router-link to="/favoriteMovie">
            <button class="headerApp__block_lovely">
                <img src="../img/headerApp__block_lovely_img.png" alt="" class="headerApp__block_lovely_img">
            </button>
        </router-link>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { ref, } from 'vue';
import { useStore, } from 'vuex';

export default{
    setup(){

        const store = useStore();

        const title:any = ref('');

        const setNameFilm = ():void => {
            router.push('film');
            store.dispatch('actNameFilm', title.value);
        }

        return { title, setNameFilm, }
    }
}
</script>