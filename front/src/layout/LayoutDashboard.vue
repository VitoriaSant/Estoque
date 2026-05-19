<template>
  <v-app-bar app color="primary" height="55">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-btn 
      @click="informativosStore.exibirInformativo = true"
      class="ml-2">
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
    <v-btn
      class="text-h7 ml-auto d-flex align-center justify-end"
      @click="filtrar"
    >
      <v-icon>mdi-filter-outline</v-icon>
      Filtros
    </v-btn>
    <v-btn to="/login" class="ml-2">
      <v-icon>mdi-logout</v-icon>
      Sair
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item title="Compras Pendentes" to="/pedido-compra-pendente" />
      <v-list-item title="Ponto de Compra" to="/ponto-compra" />
      <v-list-item title="Exemplo de Gráficos" to="/exemplo-graficos" />
    </v-list>
  </v-navigation-drawer>

  <v-main class="bg-accent">
      <Filtro
        v-model="layoutStore.exibirFiltro"
        @fechar="layoutStore.exibirFiltro = false"
        v-model:classeFiltro="layoutStore.classeFiltro"
        @aplicar="layoutStore.filtrar"
      />

    <Informativo />
    
    <RouterView />
  </v-main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Filtro from "../pages/filtro/Filtro.vue";
import Informativo from "../components/Informativo.vue";

const drawer = ref(false);
const emit = defineEmits(["fechar"]);

import { useLayoutDashboardStore } from "../stores/LayoutDashboardStore";
const layoutStore = useLayoutDashboardStore();

import { useInformativosStore } from "../stores/InformativosStore";
const informativosStore = useInformativosStore();


function filtrar() {
  useLayoutDashboardStore().exibirFiltro = true;
}

</script>
