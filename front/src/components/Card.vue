<template>
    <v-card
        variant="elevated"
        class="mx-auto"
        :title="title"
        :subtitle="subtitle"
        :prepend-icon="icon"
        :color="cor"
    >
    <template v-slot:text>
        <h2>
            {{ valor }} 
        </h2>
    </template>
    </v-card>
</template>
<script setup>
defineProps({
    title: String,
    subtitle: String,
    icon: String,
    valor: Number,
    cor: String
})


</script>

<style scoped>
h2 {
    text-align: center;
}
</style>
