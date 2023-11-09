<script setup lang="ts">
import {
  AddressPurpose,
  BitcoinNetworkType,
  SendBtcTransactionOptions,
  getAddress,
  sendBtcTransaction,
} from "sats-connect";
import imageCompression from "browser-image-compression";

import { available_rarity, rarityLabels } from "../constants/rarity";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { getPriceApi } from "@/api/get-price";
import { inscribeApi } from "@/api/inscribe";
import { fileToBase64 } from "@/util/fileToBase64";
import debounce from "lodash/debounce";
import axios from "axios";
import Frame from "./Frame.vue";
import SelectRarity from "./shared/SelectRarity.vue";
import Footer from "./shared/Footer.vue";
type CompressAble = {
  original: File;
  compressed: File;
  img: string;
  duration: number;
};
const resizeImages = async (imageFiles: File[], maxSize: number) => {
  const resizedImages: File[] = [];
  for (let imageFile of imageFiles) {
    const resizedImage = await imageCompression(imageFile, {
      maxSizeMB: maxSize / 1000,
      fileType: "image/webp",
      maxWidthOrHeight: 2000,
    });
    resizedImages.push(resizedImage);
  }
  return resizedImages;
};

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
const files = ref<Array<CompressAble>>([]);
const selectedRarity = ref("random");
const quantity = ref(1);
const showGIF = ref(false);
const paymentAddress = ref("");
const ordinalAddress = ref("");
const isXV = ref(true);
const quality = ref(100);
const isRunningGif = ref(false);
const currentInDisplay = ref(0);
const paymentTxId = ref("");
// const largestFileSize = computed(() => {
//   if (files.value.length == 0) {
//     return "300KB";
//   }
//   return formatBytes(
//     Math.ceil(Math.max(...files.value.map((file) => file.compressed.size)))
//   );
// });

const updateQuality = debounce(async function updateQuality(e: Event) {
  const newlyCompressedFiles = await resizeImages(
    files.value.map((file) => file.original),
    Number((e.target as HTMLInputElement).value)
  );
  files.value.forEach((file) => {
    URL.revokeObjectURL(file.img);
  });
  files.value = newlyCompressedFiles.map((compressedFile, index) => {
    return {
      ...files.value[index],
      img: URL.createObjectURL(compressedFile),
      compressed: compressedFile,
    };
  });
}, 200) as (e: Event) => void;
async function getFiles(e: Event) {
  const allAreImages = Array.from((e.target as HTMLInputElement).files).every(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type)
  );

  if (!allAreImages) {
    alert("Please select only images");
    return;
  }
  const availableSlots = 10 - files.value.length;
  if (availableSlots <= 0) {
    return;
  }

  showGIF.value = false;
  const { files: newFilesList } = e.target as HTMLInputElement;
  const newFiles = Array.from(newFilesList).slice(0, availableSlots);
  if (!newFiles.length) {
    e.preventDefault();
    return;
  }
  let imageFiles = newFiles.map((file) => {
    return {
      img: URL.createObjectURL(file),
      original: file,
      compressed: file,
      duration: 0.5,
    };
  });
  // show original images initially
  files.value = [...files.value, ...imageFiles];
  // compress images in the meanwhile
  const resizedFiles = await resizeImages(newFiles, quality.value);
  // after compression is done, replace original images with compressed ones
  imageFiles.forEach((file) => {
    URL.revokeObjectURL(file.img);
  });
  imageFiles = resizedFiles.map((file, index) => {
    return {
      ...imageFiles[index],
      img: URL.createObjectURL(file),
      compressed: file,
    };
  });
  files.value = [...files.value.slice(0, -imageFiles.length), ...imageFiles];
}
function duplicateFile(item: CompressAble) {
  if (files.value.length >= 10) {
    return;
  }
  showGIF.value = false;
  files.value.push({ ...item });
}

function removeFile(item: CompressAble) {
  if (!item) {
    return;
  }
  showGIF.value = false;
  files.value = files.value.filter((file) => file !== item);
  URL.revokeObjectURL(item.img);
}

const { data: totalFee, dataUpdatedAt } = useQuery({
  queryKey: ["price", files, selectedRarity, quantity],
  queryFn: async () => {
    const data = await getPriceApi({
      count: quantity.value,
      fee: 6,
      imageSizes: files.value.map((file) => file.compressed.size),
      rareSats: selectedRarity.value,
    });
    return data.data.totalFee / 100_000_000;
  },
  enabled: () => showGIF.value && files.value.length > 0,
});
const { data: usdPrice } = useQuery({
  queryKey: ["coinCap"],
  enabled: () => Boolean(totalFee.value && dataUpdatedAt.value),
  refetchInterval: () => {
    const now = new Date().getTime();
    const shouldRefresh = Boolean(
      totalFee.value &&
        dataUpdatedAt.value &&
        now - dataUpdatedAt.value < 20_000
    );

    return shouldRefresh ? 20_000 : false;
  },
  queryFn: async () => {
    const response = await axios.get(
      "https://api.coincap.io/v2/rates/bitcoin",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.rateUsd;
  },
});
const createInscriptionOrderMut = useMutation({
  mutationKey: ["inscribe", files, selectedRarity, quantity],
  mutationFn: async () => {
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
      rarity: selectedRarity.value as any,
      receiverAddress: ordinalAddress.value,
    });
    await sendBTC(address, amount);
  },
});
async function waitXV() {
  try {
    isXV.value = true;
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
        message:
          "We need the address you'll use to pay for the service, and the address where you want to receive the Ordinals.",
        network: {
          type: BitcoinNetworkType.Testnet,
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
        } else {
          isXV.value = false;
        }
      },
      onCancel: () => console.log("Request canceled"),
    });
  } catch (err) {
    console.log("xverse err", err);
    isXV.value = false;
  }
}
async function sendBTC(address: string, amount: number) {
  const sendBtcOptions: SendBtcTransactionOptions = {
    payload: {
      network: {
        type: BitcoinNetworkType.Testnet,
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
      paymentTxId.value = response;
    },
    onCancel: () => console.log("Canceled"),
  };
  await sendBtcTransaction(sendBtcOptions);
}

async function runImageDisplayCycle() {
  if (isRunningGif.value) {
    return;
  }
  isRunningGif.value = true;
  while (true) {
    if (showGIF.value == false) {
      isRunningGif.value = false;
      return;
    }
    const currentFile = files.value[currentInDisplay.value];
    await delay((currentFile.duration || 1) * 1000);
    if (currentInDisplay.value === files.value.length - 1) {
      currentInDisplay.value = 0;
    } else {
      currentInDisplay.value += 1;
    }
  }
}
function generateGIF() {
  if (files.value.length == 0) {
    return;
  }
  currentInDisplay.value = 0;
  showGIF.value = true;
  runImageDisplayCycle();
}
</script>
<template>
  <div class="">
    <div class="py-5 pt-8 px-10">
      <div class="min-h-[11.7rem] flex justify-between">
        <div>
          <a class="mx-0 mt-6 mb-20" href="/">
            <!--       <div style="" class="nome-logo headerLogo transition-transform duration-200 hover:scale-110">NōME</div>-->
            <img
              class="w-48 sm:w-[21vw] min-w-[7.3rem] mt-1 transition-transform duration-200 hover:scale-110"
              src="../assets/images/logo_white.png"
            />
          </a>
        </div>

        <div>
          <a class="mx-0 mt-6 mb-20" target="_blank" href="https://nome.wtf/"
            ><div
              class="text-white underline text-lg transition-all duration-75 hover:italic underline-offset-8 hover:underline"
            >
              nome.wtf
            </div></a
          >
        </div>
      </div>
      <main>
        <div class="mt-1">
          <h1 class="text-2xl pb-2">• Stop motion tool •</h1>
          <div
            class="border-b border-solid border-opacity-20 border-white md:mt-0 mb-44 sm:mb-16 xl:mb-12 w-full relative"
          >
            <div
              class="absolute left-0 top-8 sm:-top-12 sm:left-auto sm:right-4 lg:right-52 italic text-2xl sm:text-center"
            >
              Resize <br />
              and Inscribe <br />
              Animations
            </div>
          </div>
        </div>
        <!--      <div class="pt-5"></div>-->

        <div class="p-0 w-full lg:w-[90%] xl:w-[80%] 2xl:w-[57%] text-base">
          <span class="lg:block">
            This is a platform for the community to explore the potential of
            Bitcoin Ordinals,
          </span>
          <span class="lg:block">
            enabling the creation of recursive animations, resizing images, and
            inscriptions
          </span>
          on rare sats all in one place. To create animation, please follow the
          steps: <br /><br />
          1. Upload PNG or JPEG frames (10 Max);
          <br />
          2. Set order, timing, and .webp file size;
          <br />
          3. Generate GIF, set quantity and rarity;
          <br />
          4. Inscribe frames + recursive GIFs.
        </div>

        <div class="flex justify-start mt-12 w-full sm:w-1/2">
          <label
            class="min-w-[13.3rem] py-2 px-0 text-lg text-center transition-transform duration-200 hover:scale-110 bg-white text-black p-1 cursor-pointer z-10 rounded-xl mb-3"
          >
            UPLOAD FRAMES
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              multiple
              hidden
              v-on:change="getFiles"
            />
          </label>
        </div>

        <div align="center">
          <!--        <button class="upload-button button" type="button" @click="upload">Add Picture</button>-->
          <!-- <image-compressor :scale="scale" class="compressor" :done="getFiles"  :quality="quality" ref="compressor"></image-compressor> -->

          <div class="w-full flex flex-wrap gap-8 mt-12">
            <!-- <div class="w-full sm:w-1/2 pr-4 pl-4 md:w-1/3 pr-4 pl-4 lg:w-1/4 pr-4 pl-4 "> -->
            <Frame
              v-for="(item, index) in files"
              :src="item.img"
              :index="index"
              :original="item.original"
              :compressed="item.compressed"
              v-model:duration="item.duration"
              @on-plus-click="duplicateFile(item)"
              @on-x-click="removeFile(item)"
            />
            <!-- </div> -->
            <Frame v-if="files.length == 0" :index="0" :duration="0.5" />
          </div>
        </div>
        <div
          class="w-full flex sm:flex-row flex-col-reverse sm:flex-wrap gap-16 sm:gap-0"
        >
          <div class="w-full p-0 basis-full sm:basis-1/2">
            <button
              type="button"
              @click="generateGIF"
              class="mx-0 mt-6 mb-16 sm:mb-20 min-w-[13.3rem] py-2 px-0 text-lg text-center transition-transform duration-200 hover:scale-110 bg-white text-black p-1 cursor-pointer z-10 rounded-xl"
            >
              GENERATE GIF
            </button>
          </div>
          <div class="flex-1 px-0 basis-full sm:basis-1/2">
            <div
              class="my-6 flex px-0 sm:pl-4 flex-col justify-center sm:justify-start sm:w-[45%] sm:min-w-[16rem]"
            >
              <input
                type="range"
                v-model="quality"
                min="0"
                max="100"
                v-on:change="updateQuality"
                class=""
              />
              <label class="mt-7 text-center w-full text-xl sm:text-base"
                >.webp file quality – {{ quality }}%</label
              >
            </div>
          </div>
        </div>

        <div>
          <div class="flex flex-col md:flex-row w-full gap-x-8">
            <div class="basis-full md:basis-1/2 flex justify-center">
              <div
                class="p-6 border border-opacity-20 border-white max-h-[30rem] w-full"
              >
                <img
                  v-if="showGIF && files.length > 0"
                  :src="showGIF && files[currentInDisplay].img"
                  alt=""
                  class="w-full h-full object-contain"
                />
                <!-- <div
                    :style="{
                      backgroundImage:
                        showGIF && `url(${files[currentInDisplay].img})`,
                    }"
                    v-show="showGIF && files.length > 0"
                    class="bg-contain bg-no-repeat w-full h-full"
                  ></div> -->
              </div>
            </div>
            <!-- col-12 col-sm-6 flex-fill frame-box d-flex align-items-center justify-content-center -->
            <div class="basis-full md:basis-1/2">
              <div class="w-full">
                <div class="h-9 mt-8 text-lg sm:text-base mb-1">
                  GIF Quantity
                </div>
                <input
                  type="number"
                  v-model="quantity"
                  class="border border-solid border-white bg-transparent h-10 rounded-xl text-right pr-3 text-white w-full sm:w-[45%]"
                />
                <div class="h-9 mt-8 text-lg sm:text-base mb-1">Rarity</div>
              </div>
              <SelectRarity
                :selected-rarity="selectedRarity"
                @update:selected-rarity="selectedRarity = $event"
              />
              <div
                :class="showGIF && files.length > 0 ? 'visible' : 'invisible'"
              >
                <div class="flex mt-3 justify-between text-gray-500">
                  <div>Frames</div>
                  <div>{{ files.length }}</div>
                </div>
                <div class="flex justify-between text-gray-500">
                  <div>Total items</div>
                  <div>{{ files.length + quantity }}</div>
                </div>
                <div class="flex justify-between text-gray-500">
                  <div>Final USD price</div>
                  <div v-show="usdPrice && totalFee">
                    ${{ (usdPrice * totalFee).toFixed(2) }}
                  </div>
                </div>
                <div class="flex justify-between text-gray-500">
                  <div>Final BTC price</div>
                  <div>{{ totalFee && totalFee.toFixed(8) }}</div>
                </div>
              </div>
              <div class="w-full pr-4 pl-4">
                <div>
                  <div class="flex justify-center pt-12 w-full">
                    <button
                      @click="waitXV"
                      class="mx-0 mt-6 mb-20 min-w-[13.3rem] py-2 px-0 text-lg text-center transition-transform duration-200 hover:scale-110 bg-white text-black p-1 cursor-pointer z-10 rounded-xl"
                    >
                      INSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex flex-wrap">
            <div class="w-full sm:w-1/2 pr-4 pl-4">
              <!--      <div class="w-full text-left input-title mt-3">Thank you</div>-->
              <!--      <div class="w-full text-left input-title">Link to transaction</div>-->
            </div>
          </div>
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
input[type="range"] {
  @apply appearance-none flex items-center h-px w-full m-0 p-0 border-0;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none bg-white h-8 w-4 sm:h-6 sm:w-3 rounded-lg;
}
</style>
