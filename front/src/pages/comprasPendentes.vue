<template>
    <v-row no-gutters>
        <v-col class="pa-2">
            <Card title="Pedidos Pendentes" subtitle="Total de pedidos pendentes" icon="mdi-text-box-edit"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Valor Pendente" subtitle="Total de valor pendente" icon="mdi-currency-usd"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Pedidos em Atraso" subtitle="Total de pedidos pendentes em atraso" icon="mdi-clock-alert"/>
        </v-col>
        <v-col class="pa-2">
            <Card title="Valor Pendente em Atraso" subtitle="Total de valor pendente em atraso" icon="mdi-currency-usd"/>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="4" class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"
                title="Pedidos Pendentes"
                prepend-icon="mdi-text-box-edit"
            >
                <Pizza />
            </v-card>
        </v-col>
        <v-col cols="8" class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"  
                title="Fornecedor em atraso"
                prepend-icon="mdi-account-alert" 
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
                prepend-icon="mdi-archive-alert"  
            >
                <Tabela :th="['Codigo', 'Prev. Entrega', 'Valor']"/>
            </v-card>
        </v-col>
        <v-col class="pa-2">
            <v-card
                variant="elevated"
                class="mx-auto"  
                title="Itens Pendentes"
                prepend-icon="mdi-archive-alert"   
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