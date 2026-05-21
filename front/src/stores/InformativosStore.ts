//Vue
import { ref } from 'vue';
import type { Component } from 'vue';
import { defineStore } from 'pinia';

export const useInformativosStore = defineStore('[InformativosStore]', () => {
  const exibirInformativo = ref<boolean>(false);
  const componenteInformativo = ref<Component | null>(null);

  return {
    exibirInformativo,
    componenteInformativo,
  };
});
