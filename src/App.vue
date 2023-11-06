<template>
  <Home />
</template>

<script>
import Home from "./components/Home.vue";
import "./bootstrap.css";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
html {
  background-color: black;
}
body {
  background-color: black;
}
:root {
  scroll-behavior: smooth;
}
.animate-big:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.animate-big {
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s; /* Animation */
}
@keyframes activeBig {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

.activeBig {
  /*display: inline-block;*/
  vertical-align: middle;
  /*-webkit-transform: perspective(1px) translateZ(0);*/
  /*transform: perspective(1px) translateZ(0);*/
  -webkit-animation-name: hvr-bob-float, activeBig;
  animation-name: hvr-bob-float, activeBig;
  -webkit-animation-duration: 0.3s, 1.5s;
  animation-duration: 0.3s, 1.5s;

  /* -webkit-animation-delay: 0s, 10.5s;
   animation-delay: 0s, 10.5s;*/
  -webkit-animation-timing-function: ease-out, ease-in-out;
  animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  /*animation-iteration-count: 1, infinite;*/
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-direction: normal, alternate;

  /*  box-shadow: 0 0 1px rgba(0, 0, 0, 0);*/
}
/*body {*/
/*  background: #f6f9fc;*/
/*  font-family: "Nunito", sans-serif;*/
/*}*/

/*h2 {*/
/*  margin: 40px auto;*/
/*  text-align: center;*/
/*  font-size: 32px;*/
/*  padding: 20px;*/
/*  color: #525f7f;*/
/*}*/
/*h2 span {*/
/*  font-size: 50%;*/
/*  display: block;*/
/*  margin-top: 10px;*/
/*}*/

.opacity {
  opacity: 0.5 !important;
}
.gallery-item {
  display: flex;
  justify-content: center;
  width: 10%;
  height: 10%;
  /* To keep it square*/
  background-color: white;

  transition: all 0.2s ease-out;
}

/*.gallery-item:hover {*/
/*  opacity: 1;*/
/*}*/

body {
  margin: 0;
  font-family: "Menoe Grotesque", Helvetica, Arial, sans-serif;
  color: white;
  /*font-size: 20px;*/
  /*line-height: 26px;*/
  /*min-width: 960px;*/
}
@font-face {
  font-family: "Menoe Grotesque";
  font-weight: normal;
  font-style: normal;
  src: url("assets/fonts/Menoe Grotesque-Regular-Web.woff2") format("woff2");
}
@font-face {
  font-family: "Menoe Grotesque Pro";
  font-weight: normal;
  font-style: normal;
  src: url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.woff2")
      format("woff2"),
    url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.woff")
      format("woff"),
    url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.eot")
      format("embedded-opentype");
}
/*url("assets/fonts/Menoe Grotesque-Regular-Web.woff2#iefix") format("embedded-opentype"),*/
@font-face {
  font-family: "Menoe Grotesque";
  font-weight: normal;
  font-style: italic;
  src: url("assets/fonts/Menoe Grotesque-Regular Italic-Web.eot")
      format("embedded-opentype"),
    url("assets/fonts/Menoe Grotesque-Regular Italic-Web.woff2") format("woff2"),
    url("assets/fonts/Menoe Grotesque-Regular Italic-Web.woff") format("woff");
}

@media screen and (max-width: 480px) {
  html {
    font-size: 13px !important;
  }
}
@media (min-width: 480px) and (max-width: 800px) {
  html {
    font-size: 15px !important;
  }
}

@media (min-width: 800px) and (max-width: 1920px) {
  html {
    font-size: 17px !important;
  }
  /*.container{    max-width: 1030px !important;}*/
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 20px !important;
  }
  /*.container{    max-width: 1642px !important;}*/
}
/*h1, h2, h3, h4, h5 {*/
/*   font-weight: normal;*/
/*}*/
a:hover {
  text-decoration: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
