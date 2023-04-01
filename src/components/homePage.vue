<template>
    <div class="homePage__wrapper">
            <headerApp />
        <img src="./img/Poster0.jpg" alt="" class="_filmInfo-bg" v-if="idRecomendedFilm == 0">
        <img src="./img/Poster1.jpg" alt="" class="_filmInfo-bg" v-if="idRecomendedFilm == 1">
        <img src="./img/Poster2.jpg" alt="" class="_filmInfo-bg" v-if="idRecomendedFilm == 2">
        <img src="./img/Poster3.jpg" alt="" class="_filmInfo-bg" v-if="idRecomendedFilm == 3">
        <img src="./img/Poster4.jpg" alt="" class="_filmInfo-bg" v-if="idRecomendedFilm == 4">
        <div class="homePage__slider__controls">
            <button 
                @click="idRecomendedFilm = 0"
                class="homePage__slider__control"
                :class="{active__control: idRecomendedFilm == 0}"
                >1</button>
            <button 
                @click="idRecomendedFilm = 1"
                class="homePage__slider__control"
                :class="{active__control: idRecomendedFilm == 1}"
                >2</button>
            <button 
                @click="idRecomendedFilm = 2"
                :class="{active__control: idRecomendedFilm == 2}"
                class="homePage__slider__control"
                >3</button>
            <button 
                @click="idRecomendedFilm = 3"
                :class="{active__control: idRecomendedFilm == 3}"
                class="homePage__slider__control"
                >4</button>
            <button 
                @click="idRecomendedFilm = 4"
                :class="{active__control: idRecomendedFilm == 4}"
                class="homePage__slider__control"
                >5</button>
        </div>
        <div class="homePage__wrapper_filmInfo">
            <div class="_filmInfo__title">
                {{ info.Title }}
            </div>
            <div class="_filmInfo__rating">
                <img src="../components/img/_filmInfo__rating-img.png" alt="" class="_filmInfo__rating-img">
                {{ info.imdbRating }}/10
            </div>
            <div class="_filmInfo__Plot">
                {{ info.Plot }}
            </div>
            <router-link to='film'>
                <button class="_filmInfo__btn" @click="setNameFilm">
                <img src="../components/img/_filmInfo__btn-img.png" alt="" class="_filmInfo__btn-img">
                <div class="_filmInfo__btn-text">
                    MORE INFO
                </div>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import headerApp from './UI/headerApp.vue';

import { computed, onMounted, ref, watch, onUnmounted, } from 'vue';
import { useStore } from 'vuex';

export default{
    components:{
        headerApp,
    },
    setup(){
        const store = useStore();

        const path:any = computed(():string=>{return store.getters.getData});
        const key:any = computed(():string=>{return store.getters.getKey});

        let idRecomendedFilm = ref(0);
        const arryRecomendedFilm = [
            'John Wick',
            'Dark',
            'Breaking Bad',
            'Brassic',
            'The Walking Dead',
        ];

        type dataInfo = Awaited<Promise<any>>;
        type nameFilm = string | any;

        interface Iinfo<T> {
            Title: T,
            Poster: T,
            imdbRating: T,
            Plot: T,
        }

        const info:any = ref({});

        const getFilmInfo = async (name:nameFilm):Promise<Iinfo<string>> => {
            const data:dataInfo = await fetch (`${path.value}${name}${key.value}`);
            info.value = await data.json();
            return info.value
        }

        const recomendedFilm = ():void => {
            getFilmInfo(arryRecomendedFilm[idRecomendedFilm.value]);
        }
        const setNameFilm = ():void => {
            store.dispatch('actNameFilm', arryRecomendedFilm[idRecomendedFilm.value]);
        }

        const slider = setInterval(():void=>{
            if(idRecomendedFilm.value < 4) idRecomendedFilm.value++;
            else idRecomendedFilm.value = 0;
        },5333);

        const clearSlider:any = ():void=>{
            clearInterval(slider);
        };

        watch(idRecomendedFilm, recomendedFilm);
        onMounted(recomendedFilm);
        onUnmounted(clearSlider);
            
        return { getFilmInfo, info, setNameFilm, idRecomendedFilm, }
    }
}
</script>