<template>
  <Error v-model:error="erro" :mensagem="mensagemErro" />
  <div>
    <Linha1-Cards-PedidoPendente :dadosResumo="dadosResumo" />
    <Linha2-PedidoPendente-FornecedorAtraso
      :dadosFornecedor="dadosFornecedor"
      :dadosResumo="dadosResumo"
      :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"
    />
    <Linha3-PedidoPendente-ItensPendentes
      :dadosPedido="dadosPedido"
      :dadosItens="dadosItens"
      :paginacaoPedido="paginacaoPedido"
      :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"
      @proximaPagina="proximaPagina"
    />
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref, onMounted, watch } from 'vue';

//Stores
import { useLayoutDashboardStore } from '@/stores/LayoutDashboardStore';
import { usePedidoPendenteStore } from '@/stores/PedidoPendenteStore';

// Coponentes
import Linha1CardsPedidoPendente from './components/Linha1-Cards-PedidoPendente.vue';
import Linha2PedidoPendenteFornecedorAtraso from './components/Linha2-PedidoPendente-FornecedorAtraso.vue';
import Linha3PedidoPendenteItensPendentes from './components/Linha3-PedidoPendente-ItensPendentes.vue';

const layoutStore = useLayoutDashboardStore();
const pedidoPendenteStore = usePedidoPendenteStore();
const erro = ref<boolean>(false);
const mensagemErro = ref('');
const dadosResumo = ref<any>(null);
const dadosFornecedor = ref<any>(null);
const dadosItens = ref<any>(null);
const dadosPedido = ref<any>(null);
const paginacaoPedido = ref<any>(null);

const carregarDados = async () => {
  try {
    // const resumo = await pedidoPendenteStore.filtrarResumoPedidoCompraPendete(layoutStore.classeFiltro);
    // dadosResumo.value = Array.isArray(resumo.dados) ? resumo.dados[0] : resumo.dados;

    // const fornecedor = await pedidoPendenteStore.filtrarFornecedorPedidoCompraPendente(layoutStore.classeFiltro);
    // dadosFornecedor.value = fornecedor.dados;

    const pedidos = await pedidoPendenteStore.filtrarPedidoCompraPendente(layoutStore.classeFiltro);
    dadosPedido.value = pedidos.registros;
    paginacaoPedido.value = pedidos.paginacao;

    // const itens = await pedidoPendenteStore.filtrarItensCompraPendente(layoutStore.classeFiltro);
    // dadosItens.value = itens.dados;
  } catch (error) {
    mensagemErro.value = error as string;
    erro.value = true;
  }
};

const proximaPagina = (paginacao: { pagina: number; limite: number; totalDeRegistros: number | null }) => {
  layoutStore.classeFiltro.paginacao = paginacao;
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
