<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Estoque em valor"
        subtitle="Valor total do estoque"
        icon="mdi-text-box-edit"
        :valor="0"
        />
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Pedido pendente em valor"
        subtitle="Valor total dos pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor="0"
        />
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Saldo em futuros"
        subtitle="Soma do estoque e saldo em futuros"
        icon="mdi-text-box-edit"
        :valor="0"
        />
    </v-col>
</v-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>