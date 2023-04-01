<template>
    <div class="blockForHeader">
        <headerApp />
    </div>
    
    <div class="favoriteFilms__wrapper">
        <div class="favoriteFilms_block">
            <div class="favoriteFilms_title">
                Favorite Films
            </div>
            <div class="favoriteFilms_btnS">
                <button
                    v-if="prevPageBtn"
                    @click="prevPage"
                    class="favoriteFilms_btn">
                        &lt;
                </button>
                <button
                    v-if="nextPageBtn"
                    @click="nextPage"
                    class="favoriteFilms_btn">
                        &gt;
                </button>
            </div>
        </div>
        <ul class="favoriteFilms__ul">
            <li 
                v-for="(film, idx) of films"
                :key="idx"
                class="favoriteFilms__li">
                    <button class="favoriteFilms__li_del" @click="delFilm(idx)">
                        &#128465;
                    </button>
                    <img :src="film.poster" alt="" class="favoriteFilms__li_poster">
                    <div @click="setNameFilm(idx)">
                        <div class="favoriteFilms__li_date">
                            {{ film.date }}
                        </div>
                        <div class="favoriteFilms__li_name">
                            {{ film.name }}
                        </div>
                        <div class="favoriteFilms__li_rating">
                            <img src="./img/_filmInfo__rating-img.png" alt="" class="favoriteFilms__li_rating_img">
                            {{ film.rating }}/10
                        </div>
                        <div class="favoriteFilms__li_genre">
                            {{ film.genre }}
                        </div>
                    </div>
            </li>
        </ul>
    </div>

    <footerApp />
</template>

<script lang="ts">
import headerApp from './UI/headerApp.vue';
import footerApp from './UI/footerApp.vue';

import { computed, onMounted, ref, watch, } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default{
    components:{
        headerApp,
        footerApp,
    },
    setup(){

        const store = useStore();

        const favoriteFilms:any = computed(():Array<Ifilm<string>>=>{return store.getters.getFavoriteFilms});
        const films:any = ref([]);

        const nextPageBtn = ref(false);
        const prevPageBtn = ref(false);
        let arryMin = ref(0);
        let arryMax = ref(0);
        
        interface Ifilm<T> {
            name: T,
            date: T,
            rating: T,
            genre: T,     
            poster: T,         
        }

        const checkFavoriteFilmsLength = ():void => {
            if(favoriteFilms.value.length < 1){
                router.push('/error');
            }
            if(favoriteFilms.value.length <= 8){
                arryMin.value = 0;
                arryMax.value = favoriteFilms.value.length;
                films.value = favoriteFilms.value.slice(arryMin.value, arryMax.value);
            }
            if(favoriteFilms.value.length > 8){
                arryMin.value = 0;
                arryMax.value = 8;
                nextPageBtn.value = true;
                films.value = favoriteFilms.value.slice(arryMin.value, arryMax.value);
            }
        }

        const nextPage = ():void => {
            arryMin.value = arryMax.value;
            if(favoriteFilms.value.length-1 < arryMax.value*2)  arryMax.value = favoriteFilms.value.length;
            else arryMax.value = arryMin.value*2;
            films.value = favoriteFilms.value.slice(arryMin.value, arryMax.value);   
            prevPageBtn.value = true;     
            if(favoriteFilms.value.length == arryMax.value) nextPageBtn.value = false;
        }

        const prevPage = ():void => {
            nextPageBtn.value = true;
            arryMax.value = arryMin.value;
            arryMin.value = arryMin.value-8;
            if(arryMax.value <= 8) prevPageBtn.value = false;  
            films.value = favoriteFilms.value.slice(arryMin.value, arryMax.value);   
        }

        const setNameFilm = (idx:number):void => {
            router.push('film');
            store.dispatch('actNameFilm', films.value[idx].name);
        }

        const delFilm = (idx:number):void => {
            let id:number = -1;
            for(let i = 0; i<favoriteFilms.value.length; i++){
                if(favoriteFilms.value[i].name == films.value[idx].name) id= i;
            }
            favoriteFilms.value.splice(id, 1);
            store.dispatch('actAddFavoriteFilm', favoriteFilms);
        }

        watch(favoriteFilms.value, checkFavoriteFilmsLength);
        onMounted(checkFavoriteFilmsLength);

        return { films, setNameFilm, delFilm, nextPageBtn, prevPageBtn, nextPage, prevPage, }
    }
}
</script>