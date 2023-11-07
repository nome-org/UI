<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import { formatBytes } from "../util/formatBytes";

const props = defineProps({
  index: Number,
  src: String,
  duration: Number,
  original: File,
  compressed: File,
});
defineEmits(["update:duration", "on-plus-click", "on-x-click"]);

const isPreviewOpen = ref(false);
const changePreviewStatus = (status: boolean) => {
  isPreviewOpen.value = status;
};
const openPreview = () => {
  if (!props.src) {
    return;
  }
  changePreviewStatus(true);
};
// const zoom = ref(100);

// const cycleZoom = () => {
//   zoom.value = zoom.value === 100 ? 200 : 100;
// };
</script>

<template>
  <Modal :is-open="isPreviewOpen" @on-visibility-change="changePreviewStatus">
    <img :src="src" class="w-96" />
  </Modal>
  <div class="mb-10 p-8 relative">
    <span
      class="absolute top-1 right-2 font-thin text-xl cursor-pointer"
      @click="$emit('on-x-click')"
    >
      x
    </span>
    <div class="w-72">
      <div
        class="h-72 relative text-lg bg-black border border-solid border-white border-opacity-20"
      >
        <span class="text-2xl absolute top-4 left-4">{{ index + 1 }}</span>
        <span
          @click="src && $emit('on-plus-click')"
          class="text-2xl absolute top-4 right-4 cursor-pointer"
        >
          +
        </span>
        <img
          v-if="src"
          class="w-full h-full bg-cover object-contain"
          :src="src"
        />
      </div>
      <div
        class="rounded-b-lg flex py-2 px-4 justify-between items-center bg-[#1f1f1f] w-full"
      >
        <span @click="openPreview" class="cursor-pointer"> [] </span>
        <div class="flex items-center">
          <input
            :value="duration"
            :disabled="!src"
            @input="
              $emit(
                'update:duration',
                ($event.target as HTMLInputElement).value
              )
            "
            type="number"
            step="0.1"
            class="text-lg font-bold bg-transparent text-white border-0 outline-none mr-2 text-right w-16"
            min="0"
          />
          <span> sec. </span>
        </div>
      </div>
    </div>
    <div
      v-if="original && compressed"
      class="text-white text-opacity-40 text-base py-4 text-center"
    >
      Before -- {{ original && formatBytes(original.size, 0) }} | After --
      {{ compressed && formatBytes(compressed.size, 0) }}
    </div>
  </div>
</template>
