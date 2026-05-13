import { defineStore } from "pinia";
import { ref } from "vue";

export const useInformativosStore = defineStore(
  "[InformativosStore]",
  () => {
    const exibirInformativo = ref<boolean>(false);

    const mostrarInformacoes = () => {
      console.log("Mostrando informações");
      exibirInformativo.value = true;
    };

    return {
      exibirInformativo,
      mostrarInformacoes,
    };
  }
);
