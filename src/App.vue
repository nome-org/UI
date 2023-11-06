<template>
  <Home />
</template>

<script>
import Home from "./components/Home.vue";
// import "./bootstrap.css";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: "Menoe Grotesque";
  font-weight: normal;
  font-style: normal;
  src: url("assets/fonts/Menoe Grotesque-Regular-Web.woff2") format("woff2");
}
/* @font-face {
  font-family: "Menoe Grotesque Pro";
  font-weight: normal;
  font-style: normal;
  src: url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.woff2")
      format("woff2"),
    url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.woff")
      format("woff"),
    url("assets/fonts/Menoe_Grotesque_Pro-Regular_TypeToday.eot")
      format("embedded-opentype");
} */
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

/* @media screen and (max-width: 480px) {
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
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 20px !important;
  }
} */
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
