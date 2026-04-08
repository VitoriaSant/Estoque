<template>
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
        <Tabela :th="['Codigo', 'Fornecedor', 'Qtd. Pedido', 'Valor']" />
    </v-card>
    </v-col>
</v-row>
</template>