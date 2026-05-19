<template>
  <v-card
    height="100"
    variant="elevated"
    class="mx-auto"
    :title="title"
    :subtitle="subtitle"
    :prepend-icon="icon"
    :color="cor"
  >
    <template v-slot:text>
      <h2>
        {{ formatarValorStore.formatarValor(valor, 'valor') }}
      </h2>
    </template>
  </v-card>
</template>
<script setup>
import { useFormatarValorStore } from '@/stores/FormatarValorStore';

const formatarValorStore = useFormatarValorStore();

defineProps({
  title: String,
  subtitle: String,
  icon: String,
  valor: Number,
  cor: String,
});
</script>

<style scoped>
h2 {
  margin-top: -8px;
  text-align: center;
}
</style>
