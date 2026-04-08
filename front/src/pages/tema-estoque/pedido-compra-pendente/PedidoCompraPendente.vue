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
import { ref, onMounted } from "vue";

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

onMounted(async () => {
  console.log("App component mounted");

  // const classeFiltro = new CClasseFiltro<CPedidoCompraPendenteModel>();

  // classeFiltro.filtros = [
  //   {
  //     campo: "fornecedorId",
  //     operador: "IGUAL",
  //     valor: 1623,
  //   },
  // ];

  const comprasPendentes =
    await controller.listarComprasPendentes(classeFiltro.value);
    console.log("Classe Filtro:", classeFiltro.value);
    console.log("Compras Pendentes:", comprasPendentes);
});
</script>

<style></style>
