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
              <div class="flex items-center gap-3"><img src="../../assets/images/xverse.png" class="h-7 w-7 rounded-full object-cover" alt="">
                <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Xverse</p></div>
              </div><span class="err" v-if="!isXV">Install Xverse wallet</span></li>
  
  <!--          <li @click="waitHero" class="flex justify-between items-center cursor-pointer  hover:bg-gray-100 px-4 h-14 relative">-->
  <!--            <div class="flex items-center gap-3"><img src="../../assets/images/hiro.png" class="h-7 w-7 rounded-full object-cover" alt="">-->
  <!--              <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Hiro Wallet </p></div>-->
  <!--            </div><span class="err" v-if="!isHero"> soon</span></li>-->
  
  <!--          <li @click="waitUN" class="flex justify-between items-center cursor-pointer  hover:bg-gray-100 px-4 h-14 relative">-->
  <!--            <div class="flex items-center gap-3"><img src="../../assets/images/unisat.png" class="h-7 w-7 rounded-full object-cover" alt="">-->
  <!--              <div class="flex flex-col relative"><p class="inline-block font-bold leading-5 text-gray-900">Unisat</p></div></div>-->
  <!--            <span class="err" v-if="!isUnis"> soon</span></li>-->
  
  
  
           </ul>
  
        </div>
      </div>
  
  
  
  
  
      <Header />
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
       <img class="w-100" src="../../assets/images/NOME-memb.png">
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
          <a @click="changePopup(true)" class="btn-txt text-center animate-big btn-connect">
            INSCRIBE
          </a>
        </div>
  
      </div></div>
    </div>
  </div>
  
  
  
  
      </main>
  
  
  
   </div>
  
  
   <Footer />
    </div>
  </template>
  
  <script>
  import {defineComponent, ref} from "vue";
  import { getAddress, sendBtcTransaction } from 'sats-connect';
  
  // import axios from "axios";
  // import sha256 from 'crypto-js/sha256';
  import { event } from 'vue-gtag'
  import { AVAILABLE_RARITY } from '@/constants';
  import { Footer, Header } from "@/components";
  import delay from "@/utils/delay";




  const Member = defineComponent({
    name: "Member",
    components: {
      Footer,
      Header
    },
    props:{},
    setup(props){
      const quantity = ref(1);
      const selectedRar = ref(0);
      const quality = ref(100);
      const files = ref([]);
      const showGIF=ref(false);
      const ispopUp = ref(false);
      const address = ref("");
      const ordinalAddress = ref("");
      const isXV=ref(true);
      const currentInDisplay = ref(0);
      const times = ref([
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
      ]);


      return {
        quantity,
        selectedRar,
        quality,
        files,
        showGIF,
        ispopUp,
        address,
        ordinalAddress,
        isXV,
        currentInDisplay,
        times,
        AVAILABLE_RARITY
      }
    },
    methods:{
      async runImageDisplayCycle() {
        const images = this.$el.querySelector(".grid-container").children;
         while (true) {
          const currentImage = images.item(this.currentInDisplay);
          const previousImage = images.item((this.currentInDisplay || images.length) - 1);
          await delay(this.times[this.currentInDisplay] || 1000);
          previousImage.style.setProperty("display", "none");
          currentImage.style.setProperty("display", "block");
          if (this.currentInDisplay === images.length - 1) {
            this.currentInDisplay = 0;
          } else {
            this.currentInDisplay += 1;
          }
         }
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
  })


  export default Member;
</script>