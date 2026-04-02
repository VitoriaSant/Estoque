<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Estoque</v-toolbar-title>
      <v-btn 
        class="text-h7 ml-auto d-flex align-center justify-end"
        @click="filtrar">
        <v-icon>mdi-filter-outline</v-icon>
        Filtros
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item title="Home" to="/" />
        <v-list-item title="Compras Pendentes" to="/comprasPendentes" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />

      <v-dialog v-model="dialog" scrollable width="900">
        <Filtro @fechar="dialog = false"/>
      </v-dialog>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { testeService } from "./Service/teste";
import { CompraPendenteService } from './Service/compraPendente';


const drawer = ref(false)
const dialog = ref(false)
const emit = defineEmits(['fechar'])

function filtrar() {
  dialog.value = !dialog.value
}

function fechar() {
  emit('fechar')
}

//Teste de conexão com o backend
const service = new testeService()
const compraPendenteService = new CompraPendenteService();

onMounted(async () => {
  console.log('App component mounted');
  await service.getTesteData();

  const comprasPendentes = await compraPendenteService.listarComprasPendentes(273);
    console.log('Compras Pendentes:', comprasPendentes);
  })
</script>

<style scoped> 
html, body {
  overflow: hidden !important;
  height: 100%;
  width: 100%;
}

.v-application {
    background-color: #e7e7e7 !important;
    overflow: hidden !important;
}


</style>