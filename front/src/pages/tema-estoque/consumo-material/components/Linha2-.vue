<template>
<v-row>
    <v-col cols="12" md="12" class="pa-1">
        <v-card
            variant="elevated"
            class="mx-auto"
            title="Consumo mensal por Itens"
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