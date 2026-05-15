<template>
    <div style="height: 100vh; width: 100%;">
        <apexchart 
            type="bar" 
            :options="options" 
            :series="series" 
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const apexchart = VueApexCharts;

const options: any = ref({
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
    },
    colors: ['#5a4031', '#8b6b5a', '#a88a75'],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
});

const series = ref([
    {
            name: 'PRODUTO A',
            data: [44, 55, 41, 67, 22, 43, 21, 49]
            }, {
            name: 'PRODUTO B',
            data: [13, 23, 20, 8, 13, 27, 33, 12]
            }, {
            name: 'PRODUTO C',
            data: [11, 17, 15, 15, 21, 14, 15, 13]
            }
    ]);
</script>
