<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico de Donuts'"
        :icone="'mdi-chart-arc'"
        >
            <template #grafico>
                <Donuts />
            </template>
        </CardParaComportarGraf>
    </v-col>
 
    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico Polar'"
        :icone="'mdi-chart-pie-outline'"
        >
            <template #grafico>
                <AreaPolar />
            </template>
        </CardParaComportarGraf>
    </v-col>
    
    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico de Barras Vertical Empilhada'"
        :icone="'mdi-chart-waterfall'"
        >
            <template #grafico>
                <BarrasVerticalEmpilhada />
            </template>
        </CardParaComportarGraf>
    </v-col>
</v-row>
</template>

<script setup>
import Donuts from '@/components/Donuts.vue';
import AreaPolar from '@/components/AreaPolar.vue';
import BarrasVerticalEmpilhada from '@/components/BarrasVerticalEmpilhada.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';



</script>