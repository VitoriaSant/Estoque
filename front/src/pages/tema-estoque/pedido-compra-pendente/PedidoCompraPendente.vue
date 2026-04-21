<template>
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

import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
const layoutStore = useLayoutDashboardStore();

// Coponentes
import Linha1Cards from "./components/Linha1-Cards.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";

const controller = new PedidoCompraPendenteController();
const listaCompras = ref<CPedidoCompraPendenteModel[]>([]);

//Reativas
const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
    new CClasseFiltro(),
);

const dialog = ref(true);

</script>