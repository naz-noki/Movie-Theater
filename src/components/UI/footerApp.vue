<template>
    <div class="footer">
        <a class="footer__text" href="https://github.com/naz-noki" target="_blank">
            © 2023 MovieTheater by Popov Nazar
        </a>
    </div>
</template>

<style>
.footer{
    width: max-content;
    height: max-content;
    margin: 30px auto;
    left: 0;
    right: 0;
    bottom: 0;    
}
.footer__text{
    color: rgb(141, 141, 141);
}
.footer__text::before{
    width: 0px;
    height: 2px;
    position: absolute;
    content: "";
    background-color: rgb(141, 141, 141);
    margin-top: 20px;
    transition: 200ms;
}
.footer__text:hover::before{
    transition: 300ms;
    width: 251px;
    background-color: #000000;
}
.footer__text:hover{
    color: #000000;
}
</style>