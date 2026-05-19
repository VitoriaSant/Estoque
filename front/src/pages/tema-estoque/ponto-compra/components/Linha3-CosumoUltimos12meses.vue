<template>
<v-row>
    <v-col cols="12" md="12" class="pa-1">
        <CardParaComportarGraf 
                :titulo="'Consumo últimos 12 meses'"
                :icone="'mdi-text-box-search-outline'"
                >
                <template #grafico="{ expandido }">
                    <BarrasVertical :expandido="expandido"/>
                </template>
        </CardParaComportarGraf>
    </v-col>
</v-row>
</template>

<script setup lang="ts">
import BarrasVertical from '@/components/BarrasVertical.vue';


const props = defineProps<{
    dados: any;
}>();

</script>
