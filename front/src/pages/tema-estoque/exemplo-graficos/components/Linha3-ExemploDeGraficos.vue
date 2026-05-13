<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Mapa de Área"
        prepend-icon="mdi-chart-histogram"
        >
            <MapaDeArea />
        </v-card>
    </v-col>
 
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Bolhas"
        prepend-icon="mdi-chart-scatter-plot-hexbin"
        >
            <Bolhas />
        </v-card>
    </v-col>
    
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Coluna, Linha e Área"
        prepend-icon="mdi-chart-bar"
        >
            <ColunaLinhaArea />
        </v-card>
    </v-col>
</v-row>
</template>

<script lang="ts">
import MapaDeArea from '@/components/MapaDeArea.vue';
import Bolhas from '@/components/Bolhas.vue';
import ColunaLinhaArea from '@/components/ColunaLinhaArea.vue';



</script>