<template>
    <div class="footer">
        <div class="intro mt-5 pt-5">
          <!--    <h1 class="intro-title">I AM NOME</h1>-->
          <div class="intro-box pt-2 mt-md-0 mt-5 w-100 position-relative">
            <div class="intro-line-title intro-line-title-f text-center">
              <div class="animate-big">
                <a
                  class="menu-link-txt-footer"
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://twitter.com/nome_nft"
                >
                  Twitter</a
                >
              </div>
  
              <div class="animate-big mt-2">
                <a
                  class="menu-link-txt-footer"
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://discord.gg/ffZKc2TfN4"
                  >Discord</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="w-100 d-flex justify-between mt-5 pt-5 pb-4">
          <div class="pr-5">• it is not about me •</div>
          <div class="menu-link pl-5">
            <a class="" target="_blank" href="https://nome.wtf/"
            rel="noreferrer noopener"
              ><div class="menu-link-txt animate-big">nome.wft</div></a
            >
          </div>
        </div>
    </div>
</template>



<script>
import {defineComponent} from "vue";


const Footer = defineComponent({
    name: "Footer",
    components: {},
    props: {},
    setup(props){
        return {}
    }
})


export default Footer;
</script>