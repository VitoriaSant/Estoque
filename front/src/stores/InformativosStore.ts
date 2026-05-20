//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useInformativosStore = defineStore('[InformativosStore]', () => {
  const exibirInformativo = ref<boolean>(false);

  return {
    exibirInformativo,
  };
});
