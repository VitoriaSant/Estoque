<template>
  <v-dialog v-model="dialog" scrollable width="900">
    <!-- <Filtro @fechar="dialog = false" @aplicar="onAplicarFiltro" v-model:classe-filtro="classeFiltro" /> -->
    <Filtro @fechar="dialog = false" />
  </v-dialog>

  <v-btn @click="onAplicarFiltro"> TEste </v-btn>
  <Linha1-Cards />
  <Linha2-PedidoPendente-FornecedorAtraso />
  <Linha3-PedidoPendente-ItensPendentes />

  
</template>

<script setup lang="ts">
// Vue
import { ref, } from "vue";

//Services
import PedidoCompraPendenteController from "@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController";
import CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel'
import CClasseFiltro from "@/Service/base/CClasseFiltro";

// Coponentes
import Linha1Cards from "./components/Linha1-Cards.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";
import Filtro from "@/components/Filtro.vue";

const controller = new PedidoCompraPendenteController();
const listaCompras = ref<CPedidoCompraPendenteModel[]>([]);
const filtroRef = ref();
//Reativas
const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
    new CClasseFiltro(),
);

const dialog = ref(false);

// Função chamada quando "Aplicar Filtro" é clicado
function onAplicarFiltro(novoFiltro: CClasseFiltro<CPedidoCompraPendenteModel>) {
    console.log("=== onAplicarFiltro chamada ===");
    //console.log("Entrou em onAplicarFiltro");
    classeFiltro.value = novoFiltro;
    //console.log("Novo filtro recebido do componente Filtro:", classeFiltro.value.filtros);
    dialog.value = false;
    buscarDados();
}

// Função para buscar dados com os filtros atuais
async function buscarDados() {
    const comprasPendentes = await controller.listarComprasPendentes(classeFiltro.value);
    listaCompras.value = comprasPendentes;
    console.log("buscarDados");
}

</script>