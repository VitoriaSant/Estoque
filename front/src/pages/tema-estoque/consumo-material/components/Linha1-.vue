<template>
<v-row>
    <v-col cols="12" md="6" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Linha do tempo"
        prepend-icon="mdi-chart-line"
    >
        <Linhas />
    </v-card>
    </v-col>
    <v-col cols="12" md="6" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Itens Sem consumo com Estoqueo"
        prepend-icon="mdi-archive-outline"
    >
        <Tabela 
        :th="['Codigo', 'Nome', 'Qtd. Estoque', 'Valor Total']" 
        :campos="['codigo', 'nome', 'quantidadeEstoque', 'valorTotal']"
        :campoKey="'codigo'"
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