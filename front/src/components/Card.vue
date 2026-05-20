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
<script setup lang="ts">
//Store
import { useFormatarValorStore } from '@/stores/FormatarValorStore';

const formatarValorStore = useFormatarValorStore();

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  valor: number;
  cor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  icon: '',
  valor: 0,
  cor: '',
});
</script>

<style scoped>
h2 {
  margin-top: -8px;
  text-align: center;
}
</style>
