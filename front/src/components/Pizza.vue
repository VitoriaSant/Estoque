<template>
    <div>
        <apexchart 
            width="380" 
            type="donut" 
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
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
    plotOptions: {
        pie: {
            donut: {
                size: '0%'
            }
        }
    },
});
const series = ref([44, 55, 13, 43]);

</script>