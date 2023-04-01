<template>
    <div class="filmInfo__wrapper">
        <div class="blockForHeader">
            <headerApp />
        </div>
        
        <div class="filmInfo__block">
            <div class="filmInfo__block_Poster">
                <div class="filmInfo__block_addFavouriteFilm">
                    <button 
                        @click="addFavoriteFilm"
                        class="_addFavouriteFilm_btn"
                        :class="{_addFavouriteFilm_btn_active: favorite}">
                            &#10084;
                    </button>
                </div>
                <img :src="info.Poster" alt="" class="filmInfo__block_Poster-img">
            </div>
            <div class="filmInfo__block_info">
                <div class="__block_info_title">{{ info.Title }}</div>
                <div class="__block_info">
                    <span>Released:</span> {{ info.Released }}
                </div>
                <div class="__block_info">
                    <span>Genre:</span> {{ info.Genre }}
                </div>
                <div class="__block_info">
                    <span>Country:</span> {{ info.Country }}
                </div>
                <div class="__block_info">
                   <span>Runtime:</span> {{ info.Runtime }}
                </div>
                <div class="__block_info_imdbRating">
                    <img src="../components/img/_filmInfo__rating-img.png" alt="" class="__block_info_imdbRating_img">
                    {{ info.imdbRating }}
                </div>
            </div>
        </div>
        <div class="filmInfo__block_Plot">
                {{ info.Plot }}
        </div>
        <div class="filmInfo__block_trailer">
            <iframe width="560" height="315" :src="link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div class="filmInfo__block_trailer_text">Trailer {{ info.Title }}</div>
        </div>

        <footerApp />
    </div>
</template>

<script lang="ts">
import headerApp from './UI/headerApp.vue';
import footerApp from './UI/footerApp.vue';

import { ref, computed, onMounted, watch, } from 'vue';
import { useStore, } from 'vuex';
import router from '@/router';

export default{
    components:{
        headerApp,
        footerApp,
    },
    setup(){
        
        const store = useStore();
        
        const path:any = computed(():string=>{return store.getters.getData});
        const key:any = computed(():string=>{return store.getters.getKey});
        const title:any = computed(():string=>{return store.getters.getName});
        const favoriteFilms:any = computed(():Array<Ifilm<string>>=>{return store.getters.getFavoriteFilms});

        const link:any = ref('');
        const info:any = ref({});
        const favorite:any = ref(false)

        type dataInfo = Awaited<Promise<any>>;

        interface Iinfo<T> {
            Title: T,
            Poster: T,
            imdbRating: T,
            Plot: T,
        }

        //get link for video
        const getVideoIdByTitle = async (name:string) => {
            const apiKey:string = "AIzaSyCW7hyOl5Bci9idTZQdHgV53ZuqZTdWUfA";
            const data: dataInfo = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=${name}++Official+Trailer&key=${apiKey}`);
            const infoVideo = await data.json();
            const { items:{0:{id:{videoId}}} } = infoVideo;
            link.value = `https://www.youtube.com/embed/${videoId}`;
        }

        //get film info
        const getFilmInfo = async ():Promise<Iinfo<string>> => {
            const data:dataInfo = await fetch (`${path.value}${title.value}${key.value}`);
            info.value = await data.json();
            if(info.value.Title){
                favorite.value = false;
                getVideoIdByTitle(info.value.Title);
            } else {
                router.push('error')
            } 
            return info.value      
        }

        interface Ifilm<T> {
            name: T,
            date: T,
            rating: T,
            genre: T,   
            poster: T,             
        }

        //add favorite film 
        const addFavoriteFilm = () => {
            let id: number = -1;
            for(let i = 0; i<favoriteFilms.value.length; i++){
                let cur = favoriteFilms.value[i].name;
                cur == info.value.Title ? id = i : '';
            }
            if(id == -1){
                favorite.value = true;
                const film: Ifilm<string> = {
                    name: info.value.Title,
                    date: info.value.Released,
                    rating: info.value.imdbRating,
                    genre: info.value.Genre,  
                    poster: info.value.Poster,  
                }
                favoriteFilms.value.push(film);
                
            } else {
                favorite.value = false;
                favoriteFilms.value.splice(id, 1)
            }
            store.dispatch('actAddFavoriteFilm', favoriteFilms);
        }

        watch(title, getFilmInfo);
        onMounted(getFilmInfo);
        
        return { link, info, favorite, addFavoriteFilm, }
    }
}
</script>