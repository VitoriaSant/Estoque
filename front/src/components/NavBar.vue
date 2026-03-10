<template>
    <!-- App bar -->
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Estoque</v-toolbar-title>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
            <v-list-item title="Home" to="" router />
            <v-list-item title="Pessoa" to="" router />
            <v-list-item title="Categoria" to="" router />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>