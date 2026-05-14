<template>
    <div class="pizza-container">
        <apexchart 
            width="100%" 
            height="300"
            type="donut" 
            :options="chartOptions" 
            :series="dados" 
        />
    </div>  
</template>

<script lang="ts" setup>
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
const apexchart = VueApexCharts;

const props = defineProps<{
    options: string[];
    dados: number[];
}>();

const chartOptions = computed((): ApexOptions => ({
    labels: props.options,
    colors: ['#a55050','#755640'],
    plotOptions: {
        pie: {
            donut: {
                size: '0%'
            }
        }
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '12px',
        offsetY: 10
    },
    chart: {
        width: 300,
        height: 280
    }
}));

</script>