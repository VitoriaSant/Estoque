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
      :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"
      v-model:responsePedidos="responsePedidos"
      v-model:responseItens="responseItens"
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

//Classes
import CClasseFiltro from '@/service/base/CClasseFiltro.ts';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada.ts';
import type CPedidoCompraPendenteGeralModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel.ts';
import type CPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel.ts';
import type CItensCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/CItensCompraPendenteModel.ts';

const layoutStore = useLayoutDashboardStore();
const pedidoPendenteStore = usePedidoPendenteStore();
const erro = ref<boolean>(false);
const mensagemErro = ref('');
const dadosResumo = ref<any>(null);
const dadosFornecedor = ref<any>(null);

const responsePedidos = ref(new CResponseConsultaPaginada<CPedidoCompraPendente>());
const responseItens = ref(new CResponseConsultaPaginada<CItensCompraPendente>());
const atualizandoFiltrosGerais = ref(false);

const montarFiltroComPaginacao = (paginacao: { pagina: number; limite: number; totalDeRegistros: number | null }) =>
  new CClasseFiltro<CPedidoCompraPendenteGeralModel>({
    dataInicio: layoutStore.classeFiltro.dataInicio,
    dataFim: layoutStore.classeFiltro.dataFim,
    filtros: layoutStore.classeFiltro.filtros,
    paginacao: {
      pagina: paginacao.pagina,
      limite: paginacao.limite,
      totalDeRegistros: paginacao.totalDeRegistros,
    },
  });

const carregarPedidos = async () => {
  const filtroPedidos = montarFiltroComPaginacao(responsePedidos.value.paginacao);
  const pedidos = await pedidoPendenteStore.filtrarPedidoCompraPendente(filtroPedidos);
  responsePedidos.value = pedidos;
};

const carregarItens = async () => {
  const filtroItens = montarFiltroComPaginacao(responseItens.value.paginacao);
  const itens = await pedidoPendenteStore.filtrarItensCompraPendente(filtroItens);
  responseItens.value = itens;
};

const resetarPaginas = () => {
  responsePedidos.value.paginacao.pagina = 1;
  responseItens.value.paginacao.pagina = 1;
};

const carregarDados = async () => {
  try {
    // const resumo = await pedidoPendenteStore.filtrarResumoPedidoCompraPendete(layoutStore.classeFiltro);
    // dadosResumo.value = Array.isArray(resumo.dados) ? resumo.dados[0] : resumo.dados;

    // const fornecedor = await pedidoPendenteStore.filtrarFornecedorPedidoCompraPendente(layoutStore.classeFiltro);
    // dadosFornecedor.value = fornecedor.dados;

    await Promise.all([carregarPedidos(), carregarItens()]);
  } catch (error) {
    mensagemErro.value = error as string;
    erro.value = true;
  }
};

watch(
  () => [layoutStore.classeFiltro.dataInicio, layoutStore.classeFiltro.dataFim, layoutStore.classeFiltro.filtros],
  async () => {
    atualizandoFiltrosGerais.value = true;

    try {
      resetarPaginas();
      await carregarDados();
    } finally {
      atualizandoFiltrosGerais.value = false;
    }
  },
  { deep: true },
);

watch(
  [() => responsePedidos.value.paginacao.pagina, () => responsePedidos.value.paginacao.limite],
  () => {
    if (atualizandoFiltrosGerais.value) return;

    carregarPedidos();
  },
);

watch(
  [() => responseItens.value.paginacao.pagina, () => responseItens.value.paginacao.limite],
  () => {
    if (atualizandoFiltrosGerais.value) return;

    carregarItens();
  },
);

onMounted(() => {
  carregarDados();
});
</script>
