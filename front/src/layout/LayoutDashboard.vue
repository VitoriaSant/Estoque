<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>Estoque</v-toolbar-title>
    <v-btn
      class="text-h7 ml-auto d-flex align-center justify-end"
      @click="filtrar"
    >
      <v-icon>mdi-filter-outline</v-icon>
      Filtros
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item title="Home" to="/home" />
      <v-list-item title="Compras Pendentes" to="/pedido-compra-pendente" />
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-dialog v-model="dialog" scrollable width="900">
      <Filtro @fechar="dialog = false" v-model:classe-filtro="classe"/>
    </v-dialog>

    <RouterView />
  </v-main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);
const dialog = ref(false);
const emit = defineEmits(["fechar"]);

function filtrar() {
  dialog.value = !dialog.value;
}

function fechar() {
  emit("fechar");
}
</script>
