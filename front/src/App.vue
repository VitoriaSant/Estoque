<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Estoque</v-toolbar-title>
      <v-btn class="text-h7 ml-auto d-flex align-center justify-end">
        <v-icon >mdi-filter-outline</v-icon>
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
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { testeService } from "./Service/teste";
const drawer = ref(false)


const service = new testeService()

onMounted(async () => {
  console.log('App component mounted');
  await service.getTesteData();

})
</script>