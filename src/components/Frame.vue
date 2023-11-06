<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const props = defineProps({
  index: Number,
  src: String,
  duration: Number,
});
defineEmits(["update:duration", "on-plus-click"]);

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
    <img :src="src" alt="" style="width: 30rem" />
  </Modal>
  <div style="margin-bottom: 2.5rem">
    <div
      style="
        width: 16rem;
        height: 16rem;
        position: relative;
        font-size: 1.125rem;
        background-color: #5f5f64;
      "
    >
      <span
        style="
          font-size: 1.5rem;
          line-height: 1.2rem;
          position: absolute;
          top: 1rem;
          left: 1rem;
        "
        >{{ index + 1 }}</span
      >
      <span
        @click="src && $emit('on-plus-click')"
        style="
          font-size: 2rem;
          line-height: 1rem;
          cursor: pointer;
          position: absolute;
          top: 1rem;
          right: 1rem;
        "
      >
        +
      </span>
      <div
        v-if="src"
        :style="{
          backgroundImage: `url(${src})`,
          backgroundSize: `cover`,
          width: `100%`,
          height: `100%`,
        }"
      ></div>
    </div>
    <div
      style="
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #1f1f1f;
      "
    >
      <span @click="openPreview" style="cursor: pointer"> [] </span>
      <div style="display: flex">
        <input
          :value="duration"
          :disabled="!src"
          @input="
            $emit('update:duration', ($event.target as HTMLInputElement).value)
          "
          type="number"
          step="0.1"
          style="
            font-size: 1.125rem;
            line-height: 1.2rem;
            font-weight: 700;
            background-color: transparent;
            color: #fff;
            border: 0;
            outline: none;
            margin-right: 0.5rem;
            text-align: right;
            width: 4rem;
          "
          min="0"
        />
        <span> sec. </span>
      </div>
    </div>
  </div>
</template>
