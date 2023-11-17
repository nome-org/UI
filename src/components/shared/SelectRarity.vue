<script setup lang="ts">
import { available_rarity, rarityLabels } from "@/constants/rarity.js";

const { selectedRarity } = defineProps({
  selectedRarity: {
    type: String,
    required: true,
  },
});

defineEmits(["update:selectedRarity"]);
</script>
<template>
  <div class="grid grid-cols-1 md:grid-flow-row sm:grid-cols-2 gap-8 w-full">
    <button
      v-for="rarity in available_rarity"
      :key="rarity"
      @click="$emit('update:selectedRarity', rarity)"
      :class="rarity == selectedRarity ? 'bg-gray-500' : 'bg-transparent'"
      class="border-solid border border-white cursor-pointer uppercase md:h-8 h-12 w-full transition-all text-white rounded-xl md:w-[10rem]"
    >
      {{ rarityLabels[rarity] }}
    </button>
  </div>
</template>
