<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const props = defineProps({
  index: Number,
  src: String,
  duration: Number,
});
defineEmits(["update:duration"]);

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
</script>

<template>
  <Modal :is-open="isPreviewOpen" @on-visibility-change="changePreviewStatus">
    <img :src="src" alt="" class="w-48" />
  </Modal>
  <div class="mb-10">
    <div class="w-200 h-200 relative text-lg bg-light-gray">
      <span v-if="!src" class="absolute top-2 left-2">{{ index + 1 }}</span>
      <span v-if="!src" class="absolute top-2 right-2">+</span>
      <img v-if="src" :src="src" alt="" class="w-full h-full" />
    </div>
    <div
      class="px-3 py-1 flex space-between border-b-rounded bg-dark-gray w-200 align-items-center"
    >
      <span @click="openPreview" class="pointer"> [] </span>
      <div class="flex">
        <input
          :value="duration"
          @input="
            $emit('update:duration', ($event.target as HTMLInputElement).value)
          "
          type="number"
          step="0.1"
          class="w-8 bg-transparent text-white text-right border-0 no-outline underline mr-2"
          min="0"
        />
        <span> sec. </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.w-200 {
  width: 200px;
}
.h-200 {
  height: 200px;
}
.border-b-rounded {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.space-between {
  justify-content: space-between;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.top-2 {
  top: 1rem;
}
.left-2 {
  left: 1rem;
}
.right-2 {
  right: 1rem;
}
.px-2 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.mr-2 {
  margin-left: 1rem;
}
.py-1 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.flex {
  display: flex;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.bg-dark-gray {
  background-color: #1f1f1f;
}
.bg-transparent {
  background-color: transparent;
}
.no-outline:focus {
  outline: none;
}
.w-8 {
  width: 4rem;
}
.underline {
  border-bottom: 1px solid #fff;
}

.text-lg {
  font-size: 1.125rem;
}

.bg-light-gray {
  background-color: #5f5f64;
}
.mb-10 {
  margin-bottom: 2.5rem;
}

.w-48 {
  width: 30rem;
}
.pointer {
  cursor: pointer;
}
</style>
