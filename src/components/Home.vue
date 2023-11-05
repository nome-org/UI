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
                  src="../assets/images/xverse.png"
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
          <a class="" target="_blank" href="https://nome.wtf/"
            ><div class="menu-link-txt animate-big">nome.wft</div></a
          >
        </div>
      </div>
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
          <!--        <button class="upload-button button" type="button" @click="upload">Add Picture</button>-->
          <!-- <image-compressor :scale="scale" class="compressor" :done="getFiles"  :quality="quality" ref="compressor"></image-compressor> -->

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
                  v-for="item in rarity"
                  :key="item"
                  class="col-6 p-3 text-center"
                >
                  <div
                    @click="selectedRarity = item"
                    :class="item == selectedRarity ? 'selected-input-box' : ''"
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
                v-if="totalFee && files.length != 0"
                class="d-flex justify-between col-12 detail"
              >
                <div>Final BTC price</div>
                <div>{{ totalFee.toFixed(8) }}</div>
              </div>
              <div v-if="usdPrice && files.length != 0">
                <div class="d-flex justify-between col-12 detail">
                  <div>Final USD price</div>
                  <div>${{ usdPrice }}</div>
                </div>
                <div class="text-sm-left">
                  Data from
                  <a href="https://www.coingecko.com" target="_blank">
                    CoinGecko
                  </a>
                </div>
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

    <div class="footer">
      <div class="intro mt-5 pt-5">
        <!--    <h1 class="intro-title">I AM NOME</h1>-->
        <div class="intro-box pt-2 mt-md-0 mt-5 w-100 position-relative">
          <div class="intro-line-title intro-line-title-f text-center">
            <div class="animate-big">
              <a
                class="menu-link-txt-footer"
                target="_blank"
                href="https://twitter.com/nome_nft"
              >
                Twitter</a
              >
            </div>

            <div class="animate-big mt-2">
              <a
                class="menu-link-txt-footer"
                target="_blank"
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
            ><div class="menu-link-txt animate-big">nome.wft</div></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddress, sendBtcTransaction } from "sats-connect";

// import axios from "axios";
// import sha256 from 'crypto-js/sha256';
import { event } from "vue-gtag";
// import imageCompressor from 'vue-image-compressor'
import imageCompression from "browser-image-compression";
import memoize from "lodash/memoize";

import { available_rarity } from "../constants/rarity";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { getPriceApi } from "@/api/get-price";
import { inscribeApi } from "@/api/inscribe";
import { fileToBase64 } from "@/util/fileToBase64";
import axios from "axios";

const formatBytes = memoize((bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
});

/**
 * @name resizeImages
 * @param {FileList} imageFiles
 * @param {number} maxSize max size in KBs
 * @returns {Promise<File[]>}
 */
const resizeImages = async (imageFiles, maxSize) => {
  const resizedImages = [];
  for (let imageFile of imageFiles) {
    const resizedImage = await imageCompression(imageFile, {
      maxSizeMB: maxSize / 1000,
      fileType: "image/webp",
      maxWidthOrHeight: 200,
    });
    resizedImages.push(resizedImage);
  }
  return resizedImages;
};

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
export default {
  name: "Home",
  data() {
    return {
      rarity: available_rarity,
      img: "",

      originalSize: true,
      result: "",
      isHero: false,
      isUnis: false,

      level: 0,
      ref: 0,
      index: -1,
      times: [
        1000, 0, 1000, 1000, 0, 1000, 1000, 0, 1000, 1000, 0, 0, 1000, 1000, 0,
        1000, 0, 1000, 0, 1000,
      ],
      currentInDisplay: 0,
    };
  },
  props: {},
  // components: { imageCompressor },
  setup() {
    /**
     * @type {import("vue").Ref<{original: File, compressed: File, img: string}[]>}
     */
    const files = ref([]);
    const selectedRarity = ref("random");
    const quantity = ref(1);
    const showGIF = ref(false);
    const paymentAddress = ref("");
    const ordinalAddress = ref("");
    const isXV = ref(true);
    const showWalletSelection = ref(false);
    const quality = ref(200);
    async function updateQuality(e) {
      const newlyCompressedFiles = await resizeImages(
        files.value.map((file) => file.original),
        e.target.value
      );

      files.value.forEach((file) => {
        URL.revokeObjectURL(file.img);
      });
      files.value = newlyCompressedFiles.map((compressedFile, index) => {
        return {
          img: URL.createObjectURL(compressedFile),
          original: files.value[index].original,
          compressed: compressedFile,
        };
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

    const { data: totalFee } = useQuery({
      queryKey: ["price", files, selectedRarity, quantity],
      queryFn: async () => {
        const data = await getPriceApi({
          count: quantity.value,
          fee: 6,
          imageSizes: files.value.map((file) => file.compressed.size),
          rareSats: selectedRarity.value,
        });

        return data.data.totalFee / 1e8;
      },
      enabled: () => showGIF.value && files.value.length > 0,
    });

    const { data: usdPrice } = useQuery({
      queryKey: ["coingecko", totalFee],
      enabled: () => Boolean(totalFee.value),
      queryFn: async () => {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return (response.data.bitcoin.usd * totalFee.value).toFixed(2);
      },
    });

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
        } = await inscribeApi({
          files: fileData,
          feeRate: 6,
          payAddress: paymentAddress.value,
          rarity: selectedRarity.value,
          receiverAddress: ordinalAddress.value,
        });
        await sendBTC(address, amount);
      },
    });

    async function waitXV() {
      // event("start of xv", {
      //   event_category: this.ref,
      // });
      // console.log("start xverse");
      try {
        isXV.value = true;
        await getAddress({
          payload: {
            purposes: ["ordinals", "payment"],
            message:
              "We need the address you'll use to pay for the service, and the address where you want to receive the Ordinals.",
            network: {
              type: "Testnet",
            },
          },
          onFinish: (response) => {
            response.addresses.forEach((item) => {
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

    function changePopup(status) {
      if (files.value.length == 0) {
        return;
      }
      showWalletSelection.value = status;
    }

    async function sendBTC(address, amount) {
      const sendBtcOptions = {
        payload: {
          network: {
            type: "Testnet",
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
      formatBytes,
      files,
      updateQuality,
      getFiles,
      totalFee: totalFee,
      selectedRarity,
      quantity,
      showGIF,
      ordinalAddress,
      paymentAddress,
      waitXV,
      isXV,
      changePopup,
      showWalletSelection,
      quality,
      createInscriptionOrderMut,
      usdPrice,
    };
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
  },
};
</script>
<style lang="scss" scoped>
@function changeScreen($size) {
  $result: 1;

  $result: calc(($size * 1400) / (1920 * 15));

  @return $result;
}
.mx-width {
  max-width: 470px;
}
.frame-box {
  border: solid rgba(255, 255, 255, 0.2) 1px;
}
.input-title {
  min-height: changeScreen(45) * 1rem;
}
.detail {
  color: gray;
}
.input-box {
  border: solid white 1px;
  border-radius: 10px;
  background: transparent;
}
.selected-input-box {
  background: gray !important;
}

.footer {
  padding: changeScreen(0) * 1rem changeScreen(25) * 1rem changeScreen(0) * 1rem
    changeScreen(25) * 1rem;
  font-size: 1.177rem;
  //padding-top: 8rem;
}

.page-wrapper {
  padding: changeScreen(25) * 1rem changeScreen(80) * 1rem changeScreen(25) *
    1rem changeScreen(25) * 1rem;
}
.headerLogo {
  width: 21vw;
  min-width: changeScreen(150) * 1rem;
  //; font-size: 6.5rem;margin-top: -1.75rem
  margin-top: changeScreen(5) * 1rem;
}
.header {
  min-height: changeScreen(240) * 1rem;
}
.menu-link {
  //margin-right: changeScreen()*1rem;
}
.menu-link-txt-footer {
  color: white;
  text-decoration: underline;
  font-style: normal;
  text-underline-offset: 0.4rem;
  //line-height: 1.882rem;
  //line-height:1.883rem ;
  font-size: 1.412rem;
}
.menu-link-txt {
  color: white;
  text-decoration: underline;
  font-size: 1.177rem;
  text-underline-offset: 0.4rem;
  //line-height: 1.882rem;
}
.intro {
  margin-top: changeScreen(6) * 1rem;
}
.intro-title {
  line-height: 1.883rem;
  font-size: 1.412rem;
  //font-size: changeScreen(24)*1rem;
  //line-height: changeScreen(32)*1rem;
  padding-bottom: changeScreen(10) * 1rem;
}
.intro-box {
  border-bottom: solid rgb(255 255 255 / 20%) 1px;
}
.intro-line-title {
  position: absolute;
  top: -1 * changeScreen(58.5) * 1rem;
  right: changeScreen(275) * 1rem;
  font-style: italic;
  line-height: 1.883rem;
  font-size: 1.412rem;
}
.intro-line-title-f {
  position: absolute;
  top: -1 * changeScreen(58.5) * 1rem;
  right: changeScreen(275+55) * 1rem;
  font-style: italic;
  line-height: 1.883rem;
  font-size: 1.412rem;
}
.square-gallery {
  width: 50vw;
  height: 50vw;
  margin-top: changeScreen(90) * 1rem;
  /*box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);*/
  /*margin-bottom: 75px;*/
}
.third-explain {
  margin-top: changeScreen(110) * 1rem;
  width: 50vw;
}
.forth-explain {
  margin-top: changeScreen(55) * 1rem;
  width: 50vw;
}
.vw-50 {
  width: 50vw;
}
.square {
  width: changeScreen(30) * 1rem;
}
.square-line {
  line-height: changeScreen(30) * 1rem;
}
.first-explain {
  margin-top: changeScreen(85) * 1rem;
  width: 50vw;
}
.second-explain {
  margin-top: changeScreen(55) * 1rem;
  width: 50vw;
}
.calim-title {
  margin-top: changeScreen(115) * 1rem;
  font-size: changeScreen(25) * 1rem;
  font-weight: bold;
}
.btn-txt {
  min-width: changeScreen(273) * 1rem;
  padding: changeScreen(10) * 1rem changeScreen(0) * 1rem !important;
  font-size: changeScreen(25) * 1rem;
}
.wallet-connection {
  margin-top: changeScreen(30) * 1rem;
  padding: changeScreen(10) * 1rem changeScreen(0) * 1rem !important;
  font-size: changeScreen(25) * 1rem;
}
@media screen and (max-width: 960px) {
  //.headerLogo{
  //
  //; font-size: 5.5rem;margin-top: -1.25rem
  //  //margin-top:changeScreen(5)*1rem ;
  //}
  .intro-line-title {
    right: changeScreen(20) * 1rem;
  }
  .intro-line-title-f {
    right: changeScreen(20) * 1rem;
  }
}

@media screen and (max-width: 550px) {
  //.headerLogo{
  //
  //font-size: 4rem;margin-top: -1rem
  //  //margin-top:changeScreen(5)*1rem ;
  //}
  .mt-small {
    margin-top: changeScreen(340) * 1rem !important;
  }
  .vw-50 {
    width: 80vw;
  }
  .square-gallery {
    width: 80vw;
    height: 80vw;
    /*box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09), 0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);*/
    /*margin-bottom: 75px;*/
  }
  .third-explain {
    width: 80vw;
  }
  .forth-explain {
    width: 80vw;
  }
  .first-explain {
    width: 80vw;
  }
  .second-explain {
    width: 80vw;
  }
}
.main-err {
  top: changeScreen(40) * 1rem;
}
.footer .intro {
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
  color: white;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected-box {
  opacity: 1;
  background-color: #ff82a9;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.btn-connect {
  background-color: white;
  color: black;
  padding: 5px;
  cursor: pointer !important;
  z-index: 9;
  border-radius: 10px;
}
.err {
  height: 30px;
  color: red;
}
.br-c {
  border-right: solid dodgerblue 0.5px;
}
.bb-c {
  border-bottom: solid dodgerblue 0.5px;
}
.text-numb {
  color: white;
}

*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #eee;
}
:after,
:before {
  --tw-content: "";
}
h2 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
h2,
p {
  margin: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
:disabled {
  cursor: default;
}
img {
  display: block;
  vertical-align: middle;
}
/*img{max-width:100%;height:auto;}*/
*,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-scroll-snap-strictness: proximity;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(33, 150, 243, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.left-0 {
  left: 0;
}
.right-4 {
  right: 1rem;
}
.top-0 {
  top: 0;
}
.top-3 {
  top: 0.75rem;
}
.z-50 {
  z-index: 50;
}
.mb-0\.5 {
  margin-bottom: 0.125rem;
}
.ml-0\.5 {
  margin-left: 0.125rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.h-14 {
  height: 3.5rem;
}
.h-3\.5 {
  height: 0.875rem;
}
.h-7 {
  height: 1.75rem;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.w-3\.5 {
  width: 0.875rem;
}
.w-7 {
  width: 1.75rem;
}
.w-full {
  width: 100%;
}
.w-screen {
  width: 100vw;
}
.cursor-pointer {
  cursor: pointer;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-0\.5 {
  gap: 0.125rem;
}
.gap-3 {
  gap: 0.75rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-md {
  border-radius: 0.375rem;
}
.border-b {
  border-bottom-width: 1px;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(247 147 26 / var(--tw-bg-opacity));
}
.bg-opacity-80 {
  --tw-bg-opacity: 0.8;
}
.object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.leading-5 {
  line-height: 1.25rem;
}
.leading-none {
  line-height: 1;
}
.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(117 117 117 / var(--tw-text-opacity));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(97 97 97 / var(--tw-text-opacity));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(66 66 66 / var(--tw-text-opacity));
}
.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(49 49 49 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.shadow-md {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
}
* {
  box-sizing: border-box;
}
.hover\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(245 245 245 / var(--tw-bg-opacity));
}
.hover\:text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(49 49 49 / var(--tw-text-opacity));
}
@media (min-width: 768px) {
  .md\:h-fit {
    height: -moz-fit-content;
    height: fit-content;
  }
  .md\:w-96 {
    width: 24rem;
  }
  .md\:w-fit {
    width: -moz-fit-content;
    width: fit-content;
  }
  .md\:rounded-md {
    border-radius: 0.375rem;
  }
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
  border: 2px solid #ddd;
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
  background: #1a237e;
  color: white;
  padding: 7px 15px;
  border: 0;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
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
  background: #eee;
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
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;

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
  top: 0;
}

.styles-module_blinking__9VXRT {
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-name: styles-module_blink__rqfaf;
}

@keyframes styles-module_blink__rqfaf {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
