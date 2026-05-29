<template>
  <Error v-model:error="erro" :mensagem="mensagemErro" />
  <div>
    <Linha1-Cards-PedidoPendente v-model:responseResumo="responseResumo" />
    <Linha2-PedidoPendente-FornecedorAtraso
      v-model:responseResumo="responseResumo"
      v-model:responseFornecedor="responseFornecedor"
    />
    <Linha3-PedidoPendente-ItensPendentes
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
import CResponseConsulta from '@/service/base/CResponseConsulta.ts';
import type CPedidoCompraPendenteGeralModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel.ts';
import type CPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel.ts';
import type CItensCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/CItensCompraPendenteModel.ts';
import type CFornecedoresPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/CFornecedoresPedidoCompraPendenteModel.ts';
import type CResumoPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel.ts';

const layoutStore = useLayoutDashboardStore();
const pedidoPendenteStore = usePedidoPendenteStore();
const erro = ref<boolean>(false);
const mensagemErro = ref('');

const responsePedidos = ref(new CResponseConsultaPaginada<CPedidoCompraPendente>());
const responseItens = ref(new CResponseConsultaPaginada<CItensCompraPendente>());
const responseFornecedor = ref(new CResponseConsultaPaginada<CFornecedoresPedidoCompraPendente>());
const responseResumo = ref(new CResponseConsulta<CResumoPedidoCompraPendente>());
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

const carregarFornecedor = async () => {
  const filtroFornecedor = montarFiltroComPaginacao(responseFornecedor.value.paginacao);
  const fornecedor = await pedidoPendenteStore.filtrarFornecedorPedidoCompraPendente(filtroFornecedor);
  responseFornecedor.value = fornecedor;
};

const carregarDados = async () => {
  try {
    const resumo = await pedidoPendenteStore.filtrarResumoPedidoCompraPendete(layoutStore.classeFiltro);
    responseResumo.value = resumo;

    await Promise.all([carregarPedidos(), carregarItens(), carregarFornecedor()]);
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
      await carregarDados();
    } finally {
      atualizandoFiltrosGerais.value = false;
    }
  },
  { deep: true },
);

watch([() => responsePedidos.value.paginacao.pagina, () => responsePedidos.value.paginacao.limite], () => {
  if (atualizandoFiltrosGerais.value) return;

  carregarPedidos();
});

watch([() => responseItens.value.paginacao.pagina, () => responseItens.value.paginacao.limite], () => {
  if (atualizandoFiltrosGerais.value) return;

  carregarItens();
});

watch([() => responseFornecedor.value.paginacao.pagina, () => responseFornecedor.value.paginacao.limite], () => {
  if (atualizandoFiltrosGerais.value) return;

  carregarFornecedor();
});

onMounted(() => {
  carregarDados();
});
</script>
