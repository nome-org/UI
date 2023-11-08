<script setup lang="ts">
import { available_rarity, rarityLabels } from "@/constants/rarity";

const { selectedRarity } = defineProps({
  selectedRarity: {
    type: String,
    required: true,
  },
});

defineEmits(["update:selectedRarity"]);
</script>
<template>
  <div class="flex flex-wrap sm:flex-row gap-8">
    <div
      v-for="rarity in available_rarity"
      :key="rarity"
      class="text-center basis-[45%]"
    >
      <button
        @click="$emit('update:selectedRarity', rarity)"
        :class="rarity == selectedRarity ? 'bg-gray-500' : 'bg-transparent'"
        class="border-solid border border-white cursor-pointer uppercase h-10 w-full transition-all text-white rounded-xl"
      >
        {{ rarityLabels[rarity] }}
      </button>
    </div>
  </div>
</template>
