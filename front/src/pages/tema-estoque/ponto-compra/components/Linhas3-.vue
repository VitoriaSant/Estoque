<template>
<v-row>
    <v-col cols="12" md="12" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Ponto de Compra"
        prepend-icon="mdi-cash-multiple"
    >
        <Tabela 
            :th="['Codigo', 'Fornecedor', 'Qtd. Pedidos', 'Valor Total']" 
            :campos="['fornecedorId', 'fornecedorNome', 'quantidadePedidosFornecedor', 'valorTotalFornecedor']"
            :campoKey="'fornecedorId'"
            :dados="[]" 
        />
    </v-card>
    </v-col>
</v-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>    