<template>
    <!-- App bar -->
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Estoque</v-toolbar-title>
        <v-btn icon="mdi-filter-check-outline" @click=""></v-btn>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
            <v-list-item title="Home" to="" router />
            <v-list-item title="Compras Pendentes" to="/comprasPendentes" router />
        </v-list>
    </v-navigation-drawer>

    
</template>

<script setup>
import { ref } from 'vue'
import Filtro from './Filtro.vue'

const drawer = ref(false)
</script>