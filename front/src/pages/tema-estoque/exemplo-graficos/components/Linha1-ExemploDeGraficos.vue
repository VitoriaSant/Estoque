<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Barras Horizontal"
        prepend-icon="mdi-chart-bar"
        >
            <BarrasHorizontal />
        </v-card>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Barras Vertical"
        prepend-icon="mdi-chart-bar">
            <BarrasVertical/>
        </v-card>
    </v-col>
    
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Linhas"
        prepend-icon="mdi-chart-line"
        >
            <Linhas />
        </v-card>
    </v-col>
</v-row>
</template>

<script lang="ts">
import BarrasHorizontal from '@/components/BarrasHorizontal.vue';

</script>