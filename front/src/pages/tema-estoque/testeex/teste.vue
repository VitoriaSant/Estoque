<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico de Barras Horizontal'"
        :icone="'mdi-chart-bar'"
        >
            <template #grafico="{ expandido }">
                <BarrasHorizontal :expandido="expandido" />
            </template>
        </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico de Barras Vertical'"
        :icone="'mdi-chart-bar'"
        >
            <template #grafico>
                <BarrasVertical />
            </template>
        </CardParaComportarGraf>
    </v-col>
    
    <v-col cols="12" md="4" class="pa-1">
        <CardParaComportarGraf 
        :titulo="'Gráfico de Linhas'"
        :icone="'mdi-chart-line'"
        >
            <template #grafico>
                <Linhas />
            </template>
        </CardParaComportarGraf>
    </v-col>
</v-row>
</template>

<script setup>
import BarrasHorizontal from '@/components/BarrasHorizontal.vue';
import BarrasVertical from '@/components/BarrasVertical.vue';
import Linhas from '@/components/Linhas.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';
</script>