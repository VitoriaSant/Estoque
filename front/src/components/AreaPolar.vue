<template>
    <div>
        <apexchart 
            width="100%" 
            height="300"
            type="polarArea" 
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
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B', '#D0C0A5'],
    labels: ["PRODUTO A", "PRODUTO B", "PRODUTO C", "PRODUTO D", "PRODUTO E"],
    chart: {
        type: 'polarArea' as any,
        toolbar: {
            show: true,
            tools: {
                download: true,
            }
        }
    },
    fill: {
        opacity: 1
    },
    stroke: {
        width: 1,
        colors: undefined
    },
    yaxis: {
        show: false
    },
    legend: {
        position: 'bottom' as const
    },
    plotOptions: {
        polarArea: {
            rings: {
            strokeWidth: 0
            },
            spokes: {
            strokeWidth: 0
            },
        }
    },
    
});
const series = ref([42, 47, 52, 58, 65]);

</script>