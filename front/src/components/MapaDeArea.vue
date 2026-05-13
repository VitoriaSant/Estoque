<template>
    <div>
        <apexchart 
            width="100%" 
            height="300"
            type="treemap" 
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
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B'],
    legend: {
        show: false
    },
    
});
const series = ref([{
            data: [
            {
                x: 'PRODUTO A',
                y: 218
            },
            {
                x: 'PRODUTO B',
                y: 149
            },
            {
                x: 'PRODUTO C',
                y: 184
            },
            {
                x: 'PRODUTO D',
                y: 55
            },
            {
                x: 'PRODUTO E',
                y: 84
            },
            {
                x: 'PRODUTO F',
                y: 31
            },
            {
                x: 'PRODUTO G',
                y: 70
            }   
            ]
        }]);

</script>