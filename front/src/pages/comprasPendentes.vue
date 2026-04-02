<template>
    <v-row no-gutters>
        <v-col class="pa-2">
            <Card title="Pedidos Pendentes" subtitle="Total de pedidos pendentes"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Valor Pendente" subtitle="Total de valor pendente"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Pedidos em Atraso" subtitle="Total de pedidos pendentes em atraso"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Valor Pendente em Atraso" subtitle="Total de valor pendente em atraso"/>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="4" class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"
                title="Pedidos Pendentes"
            >
                <Pizza />
            </v-card>
        </v-col>
        <v-col cols="8" class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"  
                title="Fornecedor em atraso" 
            >
                <Tabela :th="['Codigo', 'Fornecedor', 'Qtd. Pedido', 'Valor']"/>
            </v-card>
        </v-col>
    </v-row>

    <v-row no-gutters>
        <v-col class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"  
                title="Pedidos Pendentes" 
            >
                <Tabela :th="['Codigo', 'Prev. Entrega', 'Valor']"/>
            </v-card>
        </v-col>
        <v-col class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"  
                title="Itens Pendentes"   
            >
                <Tabela :th="['Codigo', 'Item', 'Quantidade', 'Valor unitário', 'Valor Total']"/>
            </v-card>
        </v-col>
        
    </v-row>

    
</template>
<script setup> 
</script>

<style>
</style>