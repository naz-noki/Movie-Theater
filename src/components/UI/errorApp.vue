<template>
        <div class="blockForHeader">
            <headerApp />
        </div>
        <div class="error__wrapper">
            <div class="error__wrapper_title">
                Not Found
            </div>
            <div class="error__wrapper_text">
                Check if you entered the movie name correctly or try again later.
            </div>
        </div>
        <footerApp />
</template>

<script>
import headerApp from './headerApp.vue';
import footerApp from './footerApp.vue';

export default {
    components:{
        headerApp,
        footerApp,
    }
}
</script>

<style>
.error__wrapper{
    width: 1420px;
    height: 77vh;
    margin: 0 auto;
}
.error__wrapper_title{
    font-size: 55px;
    color: rgb(138, 138, 138);
    font-weight: 900;
    width: max-content;
    height: max-content;
    margin: 50px 50px;
}
.error__wrapper_text{
    font-size: 35px;
    font-weight: bold;
    width: max-content;
    height: max-content;
    margin: 50px 50px;    
}
</style>