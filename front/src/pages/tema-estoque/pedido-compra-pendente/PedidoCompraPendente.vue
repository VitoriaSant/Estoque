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
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada.ts';
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

const carregarDados = async () => {
  try {
    // const resumo = await pedidoPendenteStore.filtrarResumoPedidoCompraPendete(layoutStore.classeFiltro);
    // dadosResumo.value = Array.isArray(resumo.dados) ? resumo.dados[0] : resumo.dados;

    // const fornecedor = await pedidoPendenteStore.filtrarFornecedorPedidoCompraPendente(layoutStore.classeFiltro);
    // dadosFornecedor.value = fornecedor.dados;

    const pedidos = await pedidoPendenteStore.filtrarPedidoCompraPendente(layoutStore.classeFiltro);
    responsePedidos.value = pedidos;

    // const itens = await pedidoPendenteStore.filtrarItensCompraPendente(layoutStore.classeFiltro);
    // dadosItens.value = itens.dados;
  } catch (error) {
    mensagemErro.value = error as string;
    erro.value = true;
  }
};
const carregarDadosPaginados = async () => {
  layoutStore.classeFiltro.paginacao.pagina = responsePedidos.value.paginacao.pagina;
  layoutStore.classeFiltro.paginacao.limite = responsePedidos.value.paginacao.limite;

  await carregarDados();
};

watch(
  () => layoutStore.classeFiltro,
  () => {
    carregarDados();
  },
  { deep: true },
);

watch([() => responsePedidos.value.paginacao.pagina, () => responsePedidos.value.paginacao.limite], () => {
  carregarDadosPaginados();
});

onMounted(() => {
  carregarDados();
});
</script>
