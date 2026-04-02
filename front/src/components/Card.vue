<template>
    <v-card
        variant="elevated"
        class="mx-auto"
        :title="title"
        :subtitle="subtitle"
    >
    <template v-slot:text>
        VALOR 
    </template>
    </v-card>
</template>
<script setup>
defineProps({
    title: String,
    subtitle: String
})
</script>