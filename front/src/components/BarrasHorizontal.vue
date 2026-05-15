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

const options = ref({
    chart: {
        id: "vuechart-example",
    },
    colors: ['#755640'],
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
});

const series = ref([
    {
        name: "PRODUTO A",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
]);
</script>
