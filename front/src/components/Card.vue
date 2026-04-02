<template>
    <v-card
        variant="outlined"
        class="mx-auto"
        color="primary"
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