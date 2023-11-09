<script setup lang="ts">
defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["onVisibilityChange"]);

const close = (e: MouseEvent) => {
  if (e.target !== e.currentTarget) return;
  emit("onVisibilityChange", false);
};
</script>
<template>
  <div
    v-if="isOpen"
    @click="close"
    style="overflow-y: scroll; z-index: 99"
    class="fixed top-0 left-0 bg-black bg-opacity-80 w-screen h-screen flex items-center justify-center z-50 overflow-auto"
  >
    <slot></slot>
  </div>
</template>
<style scoped>
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-opacity-80 {
  --tw-bg-opacity: 0.8;
}
.w-screen {
  width: 100vw;
}
.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.z-50 {
  z-index: 50;
}
</style>
