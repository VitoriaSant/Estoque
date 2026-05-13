import { defineStore } from "pinia";
import { ref } from "vue";

export const useApresentarInformativosStore = defineStore(
  "[ApresentarInformativosStore]",
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
