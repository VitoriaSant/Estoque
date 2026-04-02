<template>
    <v-table  class="mt-4">
        <thead>
            <tr>
                <th v-for="header in th" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>

defineProps({
    th: []
})
</script>