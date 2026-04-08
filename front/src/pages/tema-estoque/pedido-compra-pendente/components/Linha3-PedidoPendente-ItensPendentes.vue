<template>
<v-row no-gutters>
    <v-col class="pa-2">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Pedidos Pendentes"
        prepend-icon="mdi-archive-alert"
    >
        <Tabela :th="['Codigo', 'Prev. Entrega', 'Valor']" />
    </v-card>
    </v-col>
    <v-col class="pa-2">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Itens Pendentes"
        prepend-icon="mdi-archive-alert"
    >
        <Tabela
        :th="[
            'Codigo',
            'Item',
            'Quantidade',
            'Valor unitário',
            'Valor Total',
        ]"
        />
    </v-card>
    </v-col>
</v-row>
</template>
