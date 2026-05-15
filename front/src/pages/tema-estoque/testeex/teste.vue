<template>
    <CardParaComportarGraf 
    :titulo="'Gráfico de Barras Horizontal'"
    :grafico="BarrasHorizontal"
    :icone="'mdi-chart-bar'"
    />
</template>

<script setup>
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';
import BarrasHorizontal from '@/components/BarrasHorizontal.vue';
</script>