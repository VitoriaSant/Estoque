<template>
  <v-row>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Mapa de Área'" :icone="'mdi-chart-histogram'">
        <template #grafico="{ expandido }">
          <MapaDeArea :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Bolhas'" :icone="'mdi-chart-scatter-plot-hexbin'">
        <template #grafico="{ expandido }">
          <Bolhas :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Coluna, Linha e Área'" :icone="'mdi-chart-bar'">
        <template #grafico="{ expandido }">
          <ColunaLinhaArea :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import MapaDeArea from '@/components/MapaDeArea.vue';
import Bolhas from '@/components/Bolhas.vue';
import ColunaLinhaArea from '@/components/ColunaLinhaArea.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';
</script>
