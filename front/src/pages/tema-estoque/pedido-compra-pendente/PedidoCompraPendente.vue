<template>
  <Error v-model:error="erro" :mensagem="mensagemErro" />
  <div>
    <Linha1-Cards-PedidoPendente :dados="dados" />
    <Linha2-PedidoPendente-FornecedorAtraso
      :dados="dados"
      :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"
    />
    <Linha3-PedidoPendente-ItensPendentes
      :dados="dados"
      :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"
    />
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref, onMounted, watch } from 'vue';

//Stores
import { useLayoutDashboardStore } from '@/stores/LayoutDashboardStore';

// Coponentes
import Linha1CardsPedidoPendente from './components/Linha1-Cards-PedidoPendente.vue';
import Linha2PedidoPendenteFornecedorAtraso from './components/Linha2-PedidoPendente-FornecedorAtraso.vue';
import Linha3PedidoPendenteItensPendentes from './components/Linha3-PedidoPendente-ItensPendentes.vue';

const layoutStore = useLayoutDashboardStore();
const erro = ref<boolean>(false);
const mensagemErro = ref('');
const dados = ref<any>(null);

const carregarDados = async () => {
  try {
    const resultado = await layoutStore.filtrarComprasPendentes();
    dados.value = resultado;
  } catch (error) {
    mensagemErro.value = error as string;
    erro.value = true;
  }
};

watch(
  () => layoutStore.classeFiltro,
  () => {
    carregarDados();
  },
  { deep: true },
);

onMounted(() => {
  carregarDados();
});
</script>
