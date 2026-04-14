<template>
  <v-dialog v-model="dialog" scrollable width="900">
    <!-- <Filtro @fechar="dialog = false" @aplicar="onAplicarFiltro" v-model:classe-filtro="classeFiltro" /> -->
    <Filtro @fechar="dialog = false" />
  </v-dialog>

  <Linha1-Cards />
  <Linha2-PedidoPendente-FornecedorAtraso />
  <Linha3-PedidoPendente-ItensPendentes />

  
</template>

<script setup lang="ts">
// Vue
import { ref, } from "vue";


// Coponentes
import Linha1Cards from "./components/Linha1-Cards.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";
import Filtro from "@/components/Filtro.vue";

const dialog = ref(false);

</script>