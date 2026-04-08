<template>
  <v-dialog v-model="dialog" scrollable width="900">
    <Filtro @fechar="dialog = false" v-model:classe-filtro="classeFiltro" />
  </v-dialog>

  <Linha1-Cards />
  <Linha2-PedidoPendente-FornecedorAtraso />
  <Linha3-PedidoPendente-ItensPendentes />

  
</template>

<script setup lang="ts">
// Vue
import { ref, onMounted, watch } from "vue";

// Services
import PedidoCompraPendenteController from "@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import type CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";

// Coponentes
import Linha1Cards from "./components/Linha1-Cards.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";
import Filtro from "@/components/Filtro.vue";

//Reativas
const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
  new CClasseFiltro(),
);

// Constantes
const controller = new PedidoCompraPendenteController();
const dialog = ref(false);
const listaCompras = ref<CPedidoCompraPendenteModel[]>([]);

async function buscarDados() {
  console.log("Iniciando busca com filtros:", classeFiltro.value);
  const comprasPendentes = await controller.listarComprasPendentes(classeFiltro.value);
  listaCompras.value = comprasPendentes;
  console.log("Resultado da busca:", comprasPendentes);
  
  // Aqui você provavelmente deve passar esses dados para os seus componentes de "Linha"
  // Ex: listaCompras.value = comprasPendentes;
}
  watch(
    classeFiltro, 
    () => {
      buscarDados();
    }, 
    { deep: true }
);

onMounted(async () => {
  console.log("App component mounted");
  buscarDados();

  // const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteModel>();

  // classeFiltro.filtros = [
  //   {
  //     campo: "fornecedorId",
  //     operador: "IGUAL",
  //     valor: 1623,
  //   },
  // ];

});
</script>

<style></style>
