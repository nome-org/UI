<template>
    <div class="header d-flex justify-content-between">
        <div>
        <a href="/">
            <!--       <div style="" class="nome-logo headerLogo animate-big">NōME</div>-->
            <img
            class="headerLogo animate-big"
            src="../assets/images/logo_white.png"
            />
        </a>
        </div>

        <div class="menu-link">
        <a class="" target="_blank" rel="noreferrer noopener" href="https://nome.wtf/"
            ><div class="menu-link-txt animate-big">nome.wft</div></a
        >
        </div>
    </div>
</template>


<script>
import {defineComponent} from "vue";


const Header = defineComponent({
    name: "Header",
    components: {},
    props: {},
    setup(props){
        return {}
    }
})


export default Header;
</script>