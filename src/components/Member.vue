<template>
  <div class="">
  <div class=" page-wrapper">


    <div v-if="ispopUp" style="overflow-y: scroll;z-index: 99" class="position-fixed  top-0 left-0 bg-black bg-opacity-80 w-screen h-screen flex items-center justify-center z-50">
      <div class="bg-white col-11 col-sm-9 col-lg-4 col-xl-3   md:rounded-md py-2 relative shadow-md">
        <span @click="changePopup(!ispopUp)" class="absolute right-4 top-3 font-bold cursor-pointer text-gray-800">X</span>
        <div class="px-3 border-b pb-4"><h2 class="text-xl font-bold">Choose your wallet</h2></div>
        <ul class="flex flex-col">
<!--          <p class="px-3 mt-2 mb-0.5 text-gray-700 font-bold text-sm">Browser Extensions</p>-->
          <li @click="waitXV" class="flex justify-between items-center cursor-pointer  hover:bg-gray-100 px-4 h-14 relative">
            <div class="flex items-center gap-3"><img src="../../../../UI-feat-api-integration/src/assets/images/xverse.png" class="h-7 w-7 rounded-full object-cover" alt="">
              <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Xverse</p></div>
            </div><span class="err" v-if="!isXV">Install Xverse wallet</span></li>

<!--          <li @click="waitHero" class="flex justify-between items-center cursor-pointer  hover:bg-gray-100 px-4 h-14 relative">-->
<!--            <div class="flex items-center gap-3"><img src="../assets/images/hiro.png" class="h-7 w-7 rounded-full object-cover" alt="">-->
<!--              <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Hiro Wallet </p></div>-->
<!--            </div><span class="err" v-if="!isHero"> soon</span></li>-->

<!--          <li @click="waitUN" class="flex justify-between items-center cursor-pointer  hover:bg-gray-100 px-4 h-14 relative">-->
<!--            <div class="flex items-center gap-3"><img src="../assets/images/unisat.png" class="h-7 w-7 rounded-full object-cover" alt="">-->
<!--              <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Unisat</p></div></div>-->
<!--            <span class="err" v-if="!isUnis"> soon</span></li>-->



         </ul>

      </div>
    </div>





    <div class="header d-flex justify-content-between">
     <div  > <a  href="/">
<!--       <div style="" class="nome-logo headerLogo animate-big">NōME</div>-->
    <img class=" headerLogo animate-big" src="../../../../UI-feat-api-integration/src/assets/images/logo_white.png">
       </a></div>

     <div class="menu-link "> <a class="" target="_blank" href="https://nome.wtf/"><div class="menu-link-txt animate-big">nome.wft</div></a></div>


    </div>
    <main>
      <div class="intro">
        <h1 class="intro-title">• Memberships •</h1>
        <div class="intro-box mt-md-0 mt-5 w-100 position-relative">
          <div class="intro-line-title text-center">
            Private <br>
            BTC ordinals <br>
            Community
          </div>
        </div>
      </div>
<!--      <div class="pt-5"></div>-->

      <div class="col-sm-8 p-0  col-12 mt-5 pb-5">
        NōME is a decentralized space with no authority, it is a community of people who are passionate about AI art, Bitcoin, and new tech. We started back in January 2023, when software engineer Casey Rodarmor launched the Ordinals Theory, creating a Bitcoin NFT renaissance. Since then NōME became an open space for Ordinals builders and innovators to connect.
      </div>













<div  >
  <div class="d-flex w-100 flex-wrap">
  <div  class="col-12 col-sm-6 flex-fill  d-flex align-items-center justify-content-center">
    <div class="h-100 w-100" style="margin: 0px; isolation: isolate;">
      <div class="grid-container frame-box p-3 h-100 w-100">
     <img class="w-100" src="../../../../UI-feat-api-integration/src/assets/images/NOME-memb.png">
      </div>
    </div>

  </div>
  <div class="col-12 col-sm-6">
    <div class="col-12">
      <div class="input-title  mt-3">GIF Quantity</div>
      <input type="number" v-model="quantity" style="color:white" class="input-box text-left">
      <div class="input-title mt-4">Rarity</div>
    </div>

    <div class="d-flex flex-wrap">
      <div v-for="(item,index) in rarity" :key="index" class="col-6  p-3 text-center">
        <div @click="selectedRar=index" :class="index==selectedRar?'selected-input-box':''" class="input-box cursor-pointer text-uppercase">{{item}}</div>
      </div>
    </div>
<div class="d-flex mt-3 justify-between col-12 detail">
  <div>Total items</div> <div>{{quantity}}</div>
</div>
    <div class="d-flex justify-between col-12 detail">
      <div>Iscription fees</div> <div>0.01</div>
    </div>
    <div  class="d-flex justify-between col-12 detail">
      <div>Final BTC price</div> <div>{{0.1 * quantity}}</div>
    </div>

  </div>
  </div>

  <div class="w-100 d-flex flex-wrap">
    <div class="col-12 col-sm-6 p-0">

      <div class="col-12 p-0 text-left input-title mt-3">
        NōME Memberships collection is created with the most innovative Ordinals Recursion technology, that allows through html code to call another inscription on chain.
      </div>
<!--      <div class="col-12 text-left input-title">Link to transaction</div>-->
    </div>

    <div class="col-12 col-sm-6">

      <div>
      <div class="d-flex justify-content-center pt-5">
        <a @click="changePopup(true)"   class="btn-txt text-center animate-big btn-connect">
          INSCRIBE
        </a>
      </div>

    </div></div>
  </div>
</div>




    </main>



 </div>


<div class="footer">
  <div class="intro  mt-5 pt-5">
<!--    <h1 class="intro-title">I AM NOME</h1>-->
    <div class="intro-box pt-2 mt-md-0 mt-5 w-100 position-relative">
      <div class="intro-line-title intro-line-title-f text-center">
        <div class="animate-big"><a class="menu-link-txt-footer " target="_blank" href="https://twitter.com/nome_nft" > Twitter</a></div>

        <div class="animate-big mt-2"> <a class="menu-link-txt-footer " target="_blank" href="https://discord.gg/ffZKc2TfN4">Discord</a></div>

      </div>
    </div>
  </div>
  <div class="w-100 d-flex  justify-between mt-5 pt-5 pb-4">
    <div class="pr-5">• it is not about me •</div>
    <div class="menu-link pl-5"> <a class="" target="_blank" href="https://nome.wtf/"><div class="menu-link-txt animate-big">nome.wft</div></a></div>
  </div>
</div>
  </div>
</template>

<script>
import { getAddress, sendBtcTransaction } from 'sats-connect';

// import axios from "axios";
// import sha256 from 'crypto-js/sha256';
import { event } from 'vue-gtag'
import imageCompressor from 'vue-image-compressor'
import {available_rarity} from "../../../../UI-feat-api-integration/src/constants/rarity"
export default {
  name: 'Home',
  data() {
    return {
      quantity:1,
      selectedRar:0,
      rarity: available_rarity,
      img: "",
      scale: 100,
      quality: 100,
      originalSize: true,
       files:[],
      original: {},
      compressed: {},
      showGIF:false,
      ispopUp:false,interval:"", address:"",selectedItetem:[],selectedItemIsShow:false,
      ordinalAddress: "",
      BASE_URL:"https://iam.nome.wtf/api.php?api=",
     //BASE_URL:"http://localhost/nomeServer/api.php?api=",
      BASE_URL1:"https://api.ordinalsbot.com/order",
      result:"",search:[],isHero:false,isUnis:false,isXV:true,indexes:[],climingMSG:"",level:0,ref:0,index:-1,
      times: [
        1000,
        0,
        1000,
        1000,
        0,
        1000,
        1000,
        0,
        1000,
        1000,
        0,
        0,
        1000,
        1000,
        0,
        1000,
        0,
        1000,
        0,
        1000,
      ],
      currentInDisplay: 0,
    }},
  props: {

  },
  components: { imageCompressor },
  mounted() {
    },
  methods:{
    async runImageDisplayCycle() {
      const images = this.$el.querySelector(".grid-container").children;
       while (true) {
        const currentImage = images.item(this.currentInDisplay);
        const previousImage = images.item((this.currentInDisplay || images.length) - 1);
        await this.delay(this.times[this.currentInDisplay] || 1000);
        previousImage.style.setProperty("display", "none");
        currentImage.style.setProperty("display", "block");
        if (this.currentInDisplay === images.length - 1) {
          this.currentInDisplay = 0;
        } else {
          this.currentInDisplay += 1;
        }
       }
    },
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    generateGIF(){
      if(this.files.length==0 ){
        return
      }
      this.showGIF=true
     this.runImageDisplayCycle()
    },
    async sentBtc(){
      const sendBtcOptions = {
        payload: {
          network: {
            type: "Testnet",
          },
          recipients: [
            {
              address: '2NBC9AJ9ttmn1anzL2HvvVML8NWzCfeXFq4',
              amountSats: BigInt(1500),
            },
            {
              address: '2NFhRJfbBW8dhswyupAJWSehMz6hN5LjHzR',
              amountSats: BigInt(1500),
            },
          ],
          senderAddress: this.address,
        },
        onFinish: (response) => {
          alert(response);
        },
        onCancel: () => alert("Canceled"),
      };

      await sendBtcTransaction(sendBtcOptions);
    },
    // async sentBtc1(){
    //   const NETWORK = {
    //     bech32: "bc",
    //     pubKeyHash: 0x00,
    //     scriptHash: 0x05,
    //     wif: 0x80,
    //   };

    //   try {
    //     if (this.address && this.publicKey) {

    //       const utxos = await getUnspent(address);

    //       let inputs = [];
    //       let inputCount = 1;
    //       let outputCount = 1;

    //       const output = utxos[0];

    //       const xversePublicKey = hex.decode(publicKey);
    //       const tx = new btc.Transaction();

    //       const p2wpkh2 = btc.p2wpkh(xversePublicKey, NETWORK);
    //       const p2sh = btc.p2sh(p2wpkh2, NETWORK);

    //       const transactionSize =
    //           inputCount * 146 + outputCount * 34 + 10 - inputCount;

    //       let feeRate = 6;
    //       const responseFees = await axios.get(
    //           "https://mempool.space/api/v1/fees/recommended"
    //       );
    //       if (responseFees?.data) {
    //         feeRate = responseFees.data.halfHourFee;
    //       }

    //       const fee = transactionSize * feeRate;

    //       if (BigInt(output.value) - BigInt(fee) - BigInt(mintPrice) < 0) {
    //         setErrorTx("Balance is too low for this transaction");
    //         throw new Error("Balance is too low for this transaction");
    //       }

    //       tx.addInput({
    //         txid: output.txid,
    //         index: output.vout,
    //         witnessUtxo: {
    //           script: p2sh.script ? p2sh.script : Buffer.alloc(0),
    //           amount: BigInt(output.value),
    //         },
    //         redeemScript: p2sh.redeemScript ? p2sh.redeemScript : Buffer.alloc(0),
    //         witnessScript: p2sh.witnessScript,
    //         sighashType:
    //             btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY,
    //       });

    //       const walletFund =
    //           process.env.NEXT_PUBLIC_WALLET_FUND ?? "fallback-value";

    //       tx.addOutputAddress(walletFund, BigInt(mintPrice), NETWORK);
    //       tx.addOutputAddress(
    //           address,
    //           BigInt(output.value - fee - mintPrice),
    //           NETWORK
    //       );

    //       const psbt = tx.toPSBT(0);
    //       const psbtB64 = base64.encode(psbt);

    //       const signPsbtOptions = {
    //         payload: {
    //           network: {
    //             type: "Mainnet" ,
    //           },
    //           message: "Sign Transaction",
    //           psbtBase64: psbtB64,
    //           broadcast: true,
    //           inputsToSign: [
    //             {
    //               address: address,
    //               signingIndexes: [0],
    //               sigHash:
    //                   btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY,
    //             },
    //           ],
    //         },
    //         onFinish: async (response) => {
    //           console.log(response);

    //           if (address && addressOrdinal) {
    //             const order = await createOrdinalOrder({
    //               txPaymentId: response.txId,
    //               wallet: address,
    //               walletOrdinal: addressOrdinal,
    //             });
    //             setOrder(order);
    //           }
    //         },
    //         onCancel: () => alert("Canceled"),
    //       };
    //       await signTransaction(signPsbtOptions);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    upload () {

      if(this.index<=9){
        this.index++
      }

      let compressor = this.$refs.compressor.$el
      compressor.click()


    },

    getFiles(obj){
      console.log(obj)
      this.files[this.index]={}
      if(obj.compressed.base64=="data:,"){
        this.files[this.index].img = obj.original.base64
        this.files[this.index].original = obj.original
        this.files[this.index].compressed = obj.compressed
      }else{
        this.files[this.index].img = obj.compressed.base64
        this.files[this.index].original = obj.original
        this.files[this.index].compressed = obj.compressed
      }
      this.level=1
     // this.changePopup(true)
    },


    changePopup(status){

      if(status){
        event('enter'+status,{'event_category': this.ref})
        this.climingMSG=""
      }
      this.ispopUp=status
    },
    connect(){
       this.wait()
    },





    async waitXV(){
      event('start of xv', {
        'event_category': this.ref
      })
      this.address=""
     // console.log("start xverse")
      const getAddressOptions = {
        payload: {
          purposes: ['ordinals', 'payment'],
          message: 'Address for receiving Ordinals and payments',
          network: {
            type:'Testnet'
          },
        },
        onFinish: (response) => {
          this.address=""
          response.addresses.forEach((item)=>{
            if(item.purpose=="ordinals"){
              this.ordinalAddress=item.address
            } else if (item.purpose=="payment"){
              this.address=item.address
            }
          })
          if(this.address){
            event('success of xv', {
              'event_label': this.address,
              'event_category': this.ref
            })
            this.sentBtc()
           // this.addWallet([this.original.base64],this.address)
           // console.log(this.address)
          }else{
            this.isXV=false
          }

        },
        onCancel: () => console.log('Request canceled'),
      }
      try {
        this.isXV=true
        await getAddress(getAddressOptions);
        this.changePopup(false)
      } catch (err) {
        console.log("xverse err",err)
        this.isXV=false
      }

    }
  }
}
</script>
<style lang="scss" scoped>
@function changeScreen($size) {
  $result: 1;

  $result: ($size * 1400)/(1920*15);

  @return $result;
}
.mx-width{
  max-width: 470px;
}
.frame-box{
  border: solid rgba(255, 255, 255, 0.2) 1px;
}
.input-title{
  min-height: changeScreen(45)*1rem;
}
.detail{
  color: gray;
}
.input-box{
  border: solid white 1px;
  border-radius: 10px;
  background: transparent;
}
.selected-input-box{
  background: gray !important;
}

.footer{
  padding: changeScreen(0)*1rem changeScreen(25)*1rem changeScreen(0)*1rem changeScreen(25)*1rem;    font-size: 1.177rem;
  //padding-top: 8rem;
}

.page-wrapper{
  padding: changeScreen(25)*1rem changeScreen(80)*1rem changeScreen(25)*1rem changeScreen(25)*1rem;
}
.headerLogo{
  width: 21vw;
  min-width: changeScreen(150)*1rem;
//; font-size: 6.5rem;margin-top: -1.75rem
margin-top:changeScreen(5)*1rem ;
}
.header{
  min-height: changeScreen(240)*1rem;

}
.menu-link{
  //margin-right: changeScreen()*1rem;
}
.menu-link-txt-footer{
  color: white;
  text-decoration: underline;
font-style: normal;
  text-underline-offset: .4rem;
  //line-height: 1.882rem;
  //line-height:1.883rem ;
  font-size: 1.412rem;
}
.menu-link-txt{
  color: white;
  text-decoration: underline;
  font-size: 1.177rem;
  text-underline-offset: .4rem;
  //line-height: 1.882rem;
}
.intro{
  margin-top: changeScreen(6)*1rem;
}
.intro-title{
  line-height:1.883rem ;
  font-size: 1.412rem;
  //font-size: changeScreen(24)*1rem;
  //line-height: changeScreen(32)*1rem;
    padding-bottom: changeScreen(10)*1rem;
}
.intro-box{
  border-bottom: solid  rgb(255 255 255 / 20%) 1px;
}
.intro-line-title{
  position: absolute;
  top: -1 * changeScreen(58.5)*1rem;
  right:changeScreen(275)*1rem ;
  font-style: italic;
  line-height:1.883rem ;
  font-size: 1.412rem;
}
.intro-line-title-f{
  position: absolute;
  top: -1 * changeScreen(58.5)*1rem;
  right:changeScreen(275+55)*1rem ;
  font-style: italic;
  line-height:1.883rem ;
  font-size: 1.412rem;
}
.square-gallery {
  width: 50vw;
  height: 50vw;
  margin-top: changeScreen(90)*1rem;
  /*box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);*/
  /*margin-bottom: 75px;*/
}
.third-explain{
  margin-top: changeScreen(110)*1rem;
  width: 50vw;
}
.forth-explain{
  margin-top: changeScreen(55)*1rem;
  width: 50vw;
}
.vw-50{
  width: 50vw;
}
.square{
  width:changeScreen(30)*1rem;
}
.square-line{
  line-height:changeScreen(30)*1rem;
}
.first-explain{
margin-top: changeScreen(85)*1rem;
  width: 50vw;
}
.second-explain{
  margin-top: changeScreen(55)*1rem;
  width: 50vw;
}
.calim-title{
  margin-top: changeScreen(115)*1rem;
  font-size:changeScreen(25)*1rem ;
  font-weight: bold;
}
.btn-txt{
min-width: changeScreen(273)*1rem;
  padding:changeScreen(10)*1rem changeScreen(0)*1rem !important;
  font-size: changeScreen(25)*1rem;
}
.wallet-connection{
  margin-top: changeScreen(30)*1rem ;
padding:changeScreen(10)*1rem changeScreen(0)*1rem !important;
  font-size: changeScreen(25)*1rem;
}
@media screen and (max-width: 960px) {
  //.headerLogo{
  //
  //; font-size: 5.5rem;margin-top: -1.25rem
  //  //margin-top:changeScreen(5)*1rem ;
  //}
  .intro-line-title{

    right:changeScreen(20)*1rem ;

  }
  .intro-line-title-f{
    right:changeScreen(20)*1rem ;
  }
}

@media screen and (max-width: 550px) {
  //.headerLogo{
  //
  //font-size: 4rem;margin-top: -1rem
  //  //margin-top:changeScreen(5)*1rem ;
  //}
  .mt-small{
margin-top:changeScreen(340)*1rem !important; ;
  }
  .vw-50{
    width: 80vw;
  }
  .square-gallery {
    width: 80vw;
    height: 80vw;
    /*box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);*/
    /*margin-bottom: 75px;*/
  }
  .third-explain{
    width: 80vw;
  }
  .forth-explain{
    width: 80vw;
  }
  .first-explain{
    width: 80vw;
  }
  .second-explain{
    width: 80vw;
  }

}
.main-err{
  top: changeScreen(40)*1rem;
}
.footer .intro{
  padding-bottom: 2.6rem;
}
</style>
<style>
.video-container {
  position: relative;
  width: 80%;
  padding-bottom: 41.8%; /* 16:9 */
  height: 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.nome:hover {
  color:white;


}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




.selected-box{
  opacity: 1 ;
  background-color: #ff82a9;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.btn-connect{
  background-color: white;
  color: black;
  padding: 5px;
  cursor: pointer !important;
  z-index: 9;
  border-radius: 10px;
}
.err{
  height: 30px;
color:red
}
.br-c{
border-right: solid dodgerblue 0.5px;
}
.bb-c{
  border-bottom: solid dodgerblue 0.5px;
}
.text-numb{
  color: white;
}






*,:after,:before{box-sizing:border-box;border:0 solid #eee;}
:after,:before{--tw-content:"";}
h2{font-size:inherit;font-weight:inherit;}
a{color:inherit;text-decoration:inherit;}
h2,p{margin:0;}
ul{list-style:none;margin:0;padding:0;}
:disabled{cursor:default;}
img{display:block;vertical-align:middle;}
/*img{max-width:100%;height:auto;}*/
*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scroll-snap-strictness:proximity;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(33,150,243,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;}
.absolute{position:absolute;}
.relative{position:relative;}
.left-0{left:0;}
.right-4{right:1rem;}
.top-0{top:0;}
.top-3{top:.75rem;}
.z-50{z-index:50;}
.mb-0\.5{margin-bottom:.125rem;}
.ml-0\.5{margin-left:.125rem;}
.mt-1{margin-top:.25rem;}
.mt-2{margin-top:.5rem;}
.inline-block{display:inline-block;}
.flex{display:flex;}
.h-14{height:3.5rem;}
.h-3\.5{height:.875rem;}
.h-7{height:1.75rem;}
.h-full{height:100%;}
.h-screen{height:100vh;}
.w-3\.5{width:.875rem;}
.w-7{width:1.75rem;}
.w-full{width:100%;}
.w-screen{width:100vw;}
.cursor-pointer{cursor:pointer;}
.flex-col{flex-direction:column;}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
.justify-between{justify-content:space-between;}
.gap-0\.5{gap:.125rem;}
.gap-3{gap:.75rem;}
.rounded-full{border-radius:9999px;}
.rounded-md{border-radius:.375rem;}
.border-b{border-bottom-width:1px;}
.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity));}
.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));}
.bg-yellow-500{--tw-bg-opacity:1;background-color:rgb(247 147 26/var(--tw-bg-opacity));}
.bg-opacity-80{--tw-bg-opacity:0.8;}
.object-cover{-o-object-fit:cover;object-fit:cover;}
.px-2{padding-left:.5rem;padding-right:.5rem;}
.px-3{padding-left:.75rem;padding-right:.75rem;}
.px-4{padding-left:1rem;padding-right:1rem;}
.py-1{padding-top:.25rem;padding-bottom:.25rem;}
.py-2{padding-top:.5rem;padding-bottom:.5rem;}
.pb-4{padding-bottom:1rem;}
.text-sm{font-size:.875rem;line-height:1.25rem;}
.text-xl{font-size:1.25rem;line-height:1.75rem;}
.text-xs{font-size:.75rem;line-height:1rem;}
.font-bold{font-weight:700;}
.font-medium{font-weight:500;}
.leading-5{line-height:1.25rem;}
.leading-none{line-height:1;}
.text-gray-600{--tw-text-opacity:1;color:rgb(117 117 117/var(--tw-text-opacity));}
.text-gray-700{--tw-text-opacity:1;color:rgb(97 97 97/var(--tw-text-opacity));}
.text-gray-800{--tw-text-opacity:1;color:rgb(66 66 66/var(--tw-text-opacity));}
.text-gray-900{--tw-text-opacity:1;color:rgb(49 49 49/var(--tw-text-opacity));}
.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity));}
.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);}
.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);}
*{box-sizing:border-box;}
.hover\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(245 245 245/var(--tw-bg-opacity));}
.hover\:text-gray-900:hover{--tw-text-opacity:1;color:rgb(49 49 49/var(--tw-text-opacity));}
@media (min-width:768px){
  .md\:h-fit{height:-moz-fit-content;height:fit-content;}
  .md\:w-96{width:24rem;}
  .md\:w-fit{width:-moz-fit-content;width:fit-content;}
  .md\:rounded-md{border-radius:.375rem;}
}


















/*p {*/
/*  margin-bottom: 25px;*/
/*}*/

.image-info {
  margin: 15px 0;
}

.separator {
  margin: 0 5px;
}

input {
  width: 75%;
  display: block;
  padding: 5px;
  text-align: center;
  margin-bottom: 10px;
  max-width: 250px;
  border: 2px solid #DDD;
}
*:focus {
  outline: none;
}
/*input:focus {*/
/*  border: 2px solid blue;*/
/*}*/

.compressor {
  display: none;
}

.button {
  display: inline-block;
  border-radius: 3px;
  background: #1A237E;
  color: white;
  padding: 7px 15px;
  border: 0;
  box-shadow: 0px 2px 4px 1px rgba(0,0,0,.4);
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
}

label {
  margin-bottom: 10px;
  display: block;
}

.input-group {
  margin: 25px 0;
}

.checkbox {
  margin: 15px 0 20px;
  background: #EEE;
  padding: 10px 0;
}

.checkbox input {
  width: auto;
  display: inline-block;
}

img {
  margin: 0 auto;
  display: block;
}

a {
  margin: 25px 0 75px;
}







.grid-container {
  /* display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0px 0px;
  grid-template-areas:
    ". . . . ."
    ". . . . ."
    ". . . . ."
    ". . . . .";
  width: 100%; */
}

.grid-item {
  background-position: 50% 50%!important;
  background-repeat: no-repeat!important;
  background-size: contain!important;

width: 100%;
  height: 100%;

}
.styles-module_blinkingCursor__yugAC {
  color: inherit;
  font: inherit;
  left: 3px;
  line-height: inherit;
  opacity: 1;
  position: relative;
  top: 0
}

.styles-module_blinking__9VXRT {
  animation-duration: .8s;
  animation-iteration-count: infinite;
  animation-name: styles-module_blink__rqfaf
}

@keyframes styles-module_blink__rqfaf {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

</style>
