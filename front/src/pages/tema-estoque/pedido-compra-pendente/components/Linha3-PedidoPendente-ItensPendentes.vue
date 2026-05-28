<template>
  <v-row no-gutters>
    <v-col cols="12" md="7" class="pa-1">
      <CardParaComportarGraf :titulo="'Itens Pendentes'" :icone="'mdi-archive-alert'">
        <template #grafico="{ expandido }">
          <Tabela
            :th="['Código', 'Descrição', 'Quantidade', 'Valor Unitário', 'Valor Total']"
            :campos="['itemPdc', 'descricaoItem', 'quantidadeItensPendentes', 'valorTotalPendente', 'mediaValorUn']"
            :campoKey="'IdItem'"
            :dados="props.dadosItens || []"
            :height="'350px'"
            :corDeAlerta="'corDeAlerta'"
            :expandido="expandido"
          />
        </template>
      </CardParaComportarGraf>
    </v-col>
    <v-col cols="12" md="5" class="pa-1">
      <CardParaComportarGraf
        :titulo="'Pedidos Pendentes'"
        :icone="'mdi-archive-alert'"
        :exibiIconeInformativo="true"
        :componenteInformativo="InfoPedidoCompraPendente"
      >
        <template #grafico="{ expandido }">
          <Tabela
            :th="['Codigo', 'Prev. Entrega', 'Valor']"
            :campos="['codicoPdc', 'dtPrevisaoEntregaPdc', 'valorTotalPendente']"
            :campoKey="'codicoPdc'"
            :dados="props.dadosPedido || []"
            :height="'350px'"
            :expandido="expandido"
            :paginacaoPedido="props.paginacaoPedido"
            @proximaPagina="proximaPagina"
          />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import InfoPedidoCompraPendente from './Info-PedidoCompraPendente.vue';

//Classes
import CPedidoCompraPendente from '@/Service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel.ts';
import CItensCompraPendente from '@/Service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/CItensCompraPendenteModel.ts';

const props = defineProps<{
  dadosPedido: CPedidoCompraPendente[];
  paginacaoPedido: {
    pagina: number;
    limite: number;
    totalDeRegistros: number | null;
  } | null;
  dadosItens: CItensCompraPendente[];
}>();

const emit = defineEmits<{
  proximaPagina: [
    paginacao: {
      pagina: number;
      limite: number;
      totalDeRegistros: number | null;
    },
  ];
}>();

const proximaPagina = (paginacao: { pagina: number; limite: number; totalDeRegistros: number | null }) => {
  emit('proximaPagina', paginacao);
};
</script>
