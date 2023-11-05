<template>
    <div class="">
      <div class="page-wrapper">
        <div
          v-if="showWalletSelection"
          style="overflow-y: scroll; z-index: 99"
          class="position-fixed top-0 left-0 bg-black bg-opacity-80 w-screen h-screen flex items-center justify-center z-50"
        >
          <div
            class="bg-white col-11 col-sm-9 col-lg-4 col-xl-3 md:rounded-md py-2 relative shadow-md"
          >
            <span
              @click="changePopup(!showWalletSelection)"
              class="absolute right-4 top-3 font-bold cursor-pointer text-gray-800"
              >X</span
            >
            <div class="px-3 border-b pb-4">
              <h2 class="text-xl font-bold">Choose your wallet</h2>
            </div>
            <ul class="flex flex-col">
              <!--          <p class="px-3 mt-2 mb-0.5 text-gray-700 font-bold text-sm">Browser Extensions</p>-->
              <li
                @click="waitXV"
                class="flex justify-between items-center cursor-pointer hover:bg-gray-100 px-4 h-14 relative"
              >
                <div class="flex items-center gap-3">
                  <img
                    src="../../assets/images/xverse.png"
                    class="h-7 w-7 rounded-full object-cover"
                    alt=""
                  />
                  <div class="flex flex-col relative">
                    <p class="inline-block font-bold leading-5 text-gray-900">
                      Xverse
                    </p>
                  </div>
                </div>
                <span class="err" v-if="!isXV">Install Xverse wallet</span>
              </li>
  
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
            <h1 class="intro-title">• Open-Source tool •</h1>
            <div class="intro-box mt-md-0 mt-5 w-100 position-relative">
              <div class="intro-line-title text-center">
                Resize <br />
                and Inscribe <br />
                Animations
              </div>
            </div>
          </div>
          <!--      <div class="pt-5"></div>-->
  
          <div class="col-sm-6 p-0 mx-width col-12 mt-5">
            This tool is created for you to enjoy the possibilities of Bitcoin
            Ordinals. To created animation, follow the steps:
            <br /><br />
            1. Upload PNG or JPEG frames (10 Max)
            <br />
            2. Set order, timing , and .webp files size
            <br />
            3. Generate GIF, set quantity and rarity
            <br />
            4. Inscribe frames + recursive GIFs
          </div>
  
          <div class="pt-4"></div>
  
          <div class="col-12 p-0 col-sm-6 d-flex justify-content-start mt-3">
            <label class="btn-txt text-center animate-big btn-connect">
              UPLOAD FRAMES
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                v-on:change="getFiles"
              />
            </label>
          </div>
  
          <div align="center">
            <div class="w-100 d-flex flex-wrap">
              <div
                v-for="(item, index) in files"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <img class="w-100" :src="item.img" />
                <div class="image-info d-flex flex-col">
                  <b>Before: </b>
                  <span>{{ formatBytes(item.original.size) }}</span>
                  <!-- <span class="separator"> | </span> -->
                  <br />
                  <b>After: </b>
                  <span>{{ formatBytes(item.compressed.size) }}</span>
                </div>
                <a :href="item.img" class="button" target="_blank">Download</a>
              </div>
              <div
                style="min-height: 200px"
                v-if="files.length == 0"
                class="col-12 frame-box col-sm-6 col-md-4 col-lg-3"
              ></div>
            </div>
  
            <div class="text-center" v-if="img">
              <img
                v-if="img"
                src=""
                alt=""
                :style="{ maxWidth: originalSize ? '100%' : null }"
                :src="img"
              />
              <a :href="img" class="button" target="_blank">Download</a>
            </div>
          </div>
          <div class="w-100 d-flex flex-wrap">
            <div class="col-12 col-sm-6 p-0 d-flex justify-content-start mt-3">
              <a
                @click="generateGIF"
                class="btn-txt text-center animate-big btn-connect"
              >
                GENERATE GIF
              </a>
            </div>
            <div class="col-12 col-sm-6">
              <div
                class="input-group d-flex flex-column justify-content-start col-12"
              >
                <label>Image Quality</label>
                <input
                  type="range"
                  v-model="quality"
                  min="1"
                  max="200"
                  v-on:change="updateQuality"
                />
              </div>
            </div>
          </div>
  
          <div>
            <div class="d-flex w-100 flex-wrap">
              <div
                class="col-12 col-sm-6 flex-fill frame-box d-flex align-items-center justify-content-center"
              >
                <div class="h-100 w-100" style="margin: 0px; isolation: isolate">
                  <div class="grid-container p-3 h-100 w-100">
                    <div
                      :style="{ backgroundImage: showGIF && `url(${item.img})` }"
                      class="grid-item"
                      v-for="(item, index) in files"
                      v-show="currentInDisplay == index"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="col-12">
                  <div class="input-title mt-3">GIF Quantity</div>
                  <input
                    type="number"
                    v-model="quantity"
                    style="color: white"
                    class="input-box text-left"
                  />
                  <div class="input-title mt-4">Rarity</div>
                </div>
  
                <div class="d-flex flex-wrap">
                  <div
                    v-for="item in AVAILABLE_RARITY"
                    :key="item"
                    class="col-6 p-3 text-center"
                  >
                    <div
                      @click="selectedRarity = item"
                      :class="item === selectedRarity ? 'selected-input-box' : ''"
                      class="input-box cursor-pointer text-uppercase"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="files.length != 0"
                  class="d-flex mt-3 justify-between col-12 detail"
                >
                  <div>Frames</div>
                  <div>{{ files.length }}</div>
                </div>
                <div
                  v-if="files.length != 0"
                  class="d-flex justify-between col-12 detail"
                >
                  <div>Total items</div>
                  <div>{{ files.length + quantity }}</div>
                </div>
                <div
                  v-if="fee && files.length != 0"
                  class="d-flex justify-between col-12 detail"
                >
                {{ fee }}
                  <div>Final BTC price</div>
                  <div>{{ (fee / 1e8).toFixed(8) }}</div>
                </div>
              </div>
            </div>
  
            <div class="w-100 d-flex flex-wrap">
              <div class="col-12 col-sm-6">
                <!--      <div class="col-12 text-left input-title mt-3">Thank you</div>-->
                <!--      <div class="col-12 text-left input-title">Link to transaction</div>-->
              </div>
  
              <div class="col-12 col-sm-6">
                <div>
                  <div class="d-flex justify-content-center pt-5">
                    <a
                      @click="changePopup(true)"
                      class="btn-txt text-center animate-big btn-connect"
                    >
                      INSCRIBE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  
      <Footer />

    </div>
  </template>
  
  <script>
  import {defineComponent, ref, computed} from "vue";
  import { getAddress, sendBtcTransaction } from "sats-connect";
  import { useMutation, useQuery } from "@tanstack/vue-query";
  
  
  import useOrders from "@/stores/orders";
  import { fileToBase64 } from "@/utils/fileToBase64";
  import { AVAILABLE_RARITY, NETWORK } from "@/constants";
  import resizeImages from "@/utils/resizeImages";
  import {Footer, Header} from "@/components";
  import formatBytes from "@/utils/formatBytes";
  import delay from "@/utils/delay";
  
  
  
  
  const Home = defineComponent({
    name: "Home",
    components: {
      Footer,
      Header
    },
    props: {},
    setup(props){
      const store = useOrders();
      const img = ref("");
      const showGIF = ref(false);
      const files = ref([]);
      const selectedRarity = ref("random");
      const quantity = ref(1);
      const currentInDisplay = ref(0);
      const paymentAddress = ref("");
      const ordinalAddress = ref("");
      const fee = ref(store.price);
      const isXV = ref(true);
      const quality = ref(200);
      const times = ref([
        1000, 0, 1000, 1000, 0, 1000, 1000, 0, 1000, 1000, 0, 0, 1000, 1000, 0,
        1000, 0, 1000, 0, 1000,
      ])
      const showWalletSelection = ref(false);


      async function updateQuality(e) {
        //compress all the files uploaded by the user
        const newlyCompressedFiles = await resizeImages(
          files.value.map((file) => file.original),
          e.target.value
        );
  
        //then we revoke all the uncompressed files held by the files object
        files.value.forEach((file) => {
          URL.revokeObjectURL(file.img);
        });

        //then we update the value with the compressed files
        files.value = newlyCompressedFiles.map((compressedFile, index) => {
          return {
            img: URL.createObjectURL(compressedFile),
            original: files.value[index].original,
            compressed: compressedFile,
          }
        });
      }


      async function getFiles(e) {
        if (!e.target.files.length) {
          e.preventDefault();
          return;
        }
        
        let imageFiles = Array.from(e.target.files).map((file, index) => {
          return {
            img: URL.createObjectURL(file),
            original: e.target.files[index],
            compressed: file,
          };
        });
  
        // show original images initially
        files.value = [...files.value, ...imageFiles];
  
        // compress images in the meanwhile
        const resizedFiles = await resizeImages(e.target.files, quality.value);
  
        // after compression is done, replace original images with compressed ones
        imageFiles.forEach((file) => {
          URL.revokeObjectURL(file.img);
        });
        imageFiles = resizedFiles.map((file, index) => {
          return {
            img: URL.createObjectURL(file),
            original: e.target.files[index],
            compressed: file,
          };
        });
        files.value = [
          ...files.value.slice(0, -imageFiles.length),
          ...imageFiles,
        ];
      }


      async function waitXV() {
        try {
          isXV.value = true;
          await getAddress({
            payload: {
              purposes: ["ordinals", "payment"],
              message:
                "We need the address you'll use to pay for the service, and the address where you want to receive the Ordinals.",
              network: {
                type: NETWORK,
              },
            },
            onFinish: (res) => {
              res.addresses.forEach((item) => {
                if (item.purpose == "ordinals") {
                  ordinalAddress.value = item.address;
                } else if (item.purpose == "payment") {
                  paymentAddress.value = item.address;
                }
              });
              if (paymentAddress.value) {
                createInscriptionOrderMut.mutate();
                // event("success of xv", {
                //   event_label: paymentAddress.value,
                //   event_category: this.ref,
                // });
                // this.addWallet([this.original.base64],paymentAddress.value)
                // console.log(paymentAddress.value)
              } else {
                isXV.value = false;
              }
            },
            onCancel: () => console.log("Request canceled"),
          });
          changePopup(false);
        } catch (err) {
          console.log("xverse err", err);
          isXV.value = false;
        }
      }


      const { data, isLoading } = useQuery({
        queryKey: ["price", files, selectedRarity, quantity],
        queryFn: async () => {
          return await store.fetchPrice({
            count: quantity.value,
            fee: 6,
            imageSizes: files.value.map((file) => file.compressed.size),
            rareSats: selectedRarity.value,
          });
        },
        enabled: () => showGIF.value && files.value.length > 0,
      });
      console.log({data, isLoading});

  
      const createInscriptionOrderMut = useMutation({
        mutationKey: ["inscribe", files, selectedRarity, quantity],
        mutationFn: async () => {
          /**
           * @type {import("../api/inscribe").FileData[]}
           */
          const fileData = [];
          for (const file of files.value) {
            fileData.push({
              dataURL: await fileToBase64(file.compressed),
              duration: 1000,
              name: file.original.name,
              size: file.compressed.size,
              type: file.compressed.type,
            });
          }
          const {
            data: {
              payment_details: { address, amount },
            },
          } = await store.createOrder({
            files: fileData,
            feeRate: 6,
            payAddress: paymentAddress.value,
            rarity: selectedRarity.value,
            receiverAddress: ordinalAddress.value,
          });
          await sendBTC(address, amount);
        },
      });
  
  
      function changePopup(status) {
        if (files.value.length === 0) {
          return;
        }
        showWalletSelection.value = status;
      }

      async function sendBTC(address, amount) {
        const sendBtcOptions = {
          payload: {
            network: {
              type: NETWORK,
            },
            recipients: [
              {
                address: address,
                amountSats: BigInt(amount),
              },
            ],
            senderAddress: paymentAddress.value,
          },
          onFinish: (response) => {
            console.log(response);
          },
          onCancel: () => console.log("Canceled"),
        };
  
        await sendBtcTransaction(sendBtcOptions);
      }
  


      return {
        times,
        sendBTC,
        waitXV,
        showWalletSelection,
        isXV,
        files,
        currentInDisplay,
        formatBytes,
        fee,
        selectedRarity,
        paymentAddress,
        ordinalAddress,
        quantity,
        updateQuality,
        img,
        quality,
        showGIF,
        changePopup,
        AVAILABLE_RARITY,
        getFiles,
        
      }
    },
    methods: {
      async runImageDisplayCycle() {
        const images = this.$el.querySelector(".grid-container").children;
        while (true) {
          const currentImage = images.item(this.currentInDisplay);
          const previousImage = images.item(
            (this.currentInDisplay || images.length) - 1
          );
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
  
      generateGIF() {
        if (this.files.length == 0) {
          return;
        }
        this.showGIF = true;
        this.runImageDisplayCycle();
      },
    }
  })
  
  export default Home;
</script>
  