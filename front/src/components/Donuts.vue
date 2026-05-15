<template>
    <div 
        class="chart-container"
        :class="{ fullscreen: expandido }"
    >
        <apexchart
        width="100%"
        height="100%"
            type="donut" 
            :options="options" 
            :series="series" 
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

defineProps<{
  expandido?: boolean
}>()

const apexchart = VueApexCharts;

const options = ref({
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B'],
    labels: ["PRODUTO A", "PRODUTO B", "PRODUTO C", "PRODUTO D"],
    chart: {
        toolbar: {
            show: true,
            tools: {
                download: true,
            }
        }
    }
});
const series = ref([44, 55, 13, 43]);

</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}

.chart-container.fullscreen {
  height: 100%;
}
</style>
