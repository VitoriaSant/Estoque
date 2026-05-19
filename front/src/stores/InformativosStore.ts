import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInformativosStore = defineStore('[InformativosStore]', () => {
  const exibirInformativo = ref<boolean>(false);

  return {
    exibirInformativo,
  };
});
