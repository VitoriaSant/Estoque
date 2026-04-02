<template>
    <v-card
        variant="elevated"
        class="mx-auto"
        :title="title"
        :subtitle="subtitle"
        :prepend-icon="icon"
    >
    <template v-slot:text>
        VALOR 
    </template>
    </v-card>
</template>
<script setup>
defineProps({
    title: String,
    subtitle: String,
    icon: String
})
</script>