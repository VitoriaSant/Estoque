<template> 
    <!-- <Filtro @fechar="dialog = false" @aplicar="onAplicarFiltro" v-model:classe-filtro="classeFiltro" /> -->
    <Filtro v-model:dialogFiltro="dialog" @fechar="dialog = false" @aplicar="onAplicarFiltro" v-model:classe-filtro="classeFiltro" />

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

//Reativas
const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
    new CClasseFiltro(),
);

const dialog = ref(true);

// Função chamada quando "Aplicar Filtro" é clicado
function onAplicarFiltro(novoFiltro: CClasseFiltro<CPedidoCompraPendenteModel>) {
    console.log("On Aplicar Filtro", novoFiltro);
    classeFiltro.value = novoFiltro;
    dialog.value = false;
}

//Função para buscar dados com os filtros atuais
// Ela nao está sendo chamada ainda
async function buscarDados() {
    const comprasPendentes = await controller.listarComprasPendentes(classeFiltro.value);
    listaCompras.value = comprasPendentes;
    console.log("Buscou dados com filtro:", classeFiltro.value);
}

</script>