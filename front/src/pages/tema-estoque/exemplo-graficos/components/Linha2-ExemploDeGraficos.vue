<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Donuts"
        prepend-icon="mdi-chart-arc"
        >
            <Donuts />
        </v-card>
    </v-col>
 
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico Polar"
        prepend-icon="mdi-chart-pie-outline"
        >
            <AreaPolar />
        </v-card>
    </v-col>
    
    <v-col cols="12" md="4" class="pa-1">
        <v-card
        style="height: 400px"
        variant="elevated"
        class="mx-auto"
        title="Gráfico de Barras Vertical Empilhada"
        prepend-icon="mdi-chart-waterfall"
        >
            <BarrasVerticalEmpilhada />
        </v-card>
    </v-col>
</v-row>
</template>

<script lang="ts">
import Donuts from '@/components/Donuts.vue';
import AreaPolar from '@/components/AreaPolar.vue';
import BarrasVerticalEmpilhada from '@/components/BarrasVerticalEmpilhada.vue';


</script>