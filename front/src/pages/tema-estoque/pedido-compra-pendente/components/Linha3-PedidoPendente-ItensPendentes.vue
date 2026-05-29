<template>
  <v-row no-gutters>
    <v-col cols="12" md="7" class="pa-1">
      <CardParaComportarGraf :titulo="'Itens Pendentes'" :icone="'mdi-archive-alert'">
        <template #grafico="{ expandido }">
          <Tabela
            :th="['Coigo', 'Descrição', 'Quantidade', 'Valor Unitário', 'Valor Total']"
            :campos="['itemPdc', 'descricaoItem', 'quantidadeItensPendentes', 'valorTotalPendente', 'mediaValorUn']"
            :campoKey="'IdItem'"
            :height="'350px'"
            :expandido="expandido"
            :dados="itensFormatado || []"
            :totalDeRegistros="responseItens.paginacao.totalDeRegistros || 0"
            v-model:pagina="responseItens.paginacao.pagina"
            v-model:limite="responseItens.paginacao.limite"
          >
          </Tabela>
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
            :height="'350px'"
            :corDeAlerta="'corDeAlerta'"
            :expandido="expandido"
            :dados="pedidosFormatado || []"
            :totalDeRegistros="responsePedidos.paginacao.totalDeRegistros || 0"
            v-model:pagina="responsePedidos.paginacao.pagina"
            v-model:limite="responsePedidos.paginacao.limite"
          />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//Components
import InfoPedidoCompraPendente from './Info-PedidoCompraPendente.vue';

//Utils
import formatterUtils from '@/utils/FormatterUtils';
import corDeAlerta from '@/utils/CorDeAlerta.ts';

//Classes
import CPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel.ts';
import CItensCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/CItensCompraPendenteModel.ts';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada.ts';

const responsePedidos = defineModel<CResponseConsultaPaginada<CPedidoCompraPendente>>('responsePedidos', {
  required: true,
});

const responseItens = defineModel<CResponseConsultaPaginada<CItensCompraPendente>>('responseItens', {
  required: true,
});

const itensFormatado = computed(() => {
  const dadosAtuais = responseItens.value;
  if (!dadosAtuais || !dadosAtuais.registros) return [];

  return dadosAtuais.registros.map((item: any) => ({
    ...item,
    valorTotalPendente: formatterUtils.formatarValor(item.valorTotalPendente, 'moeda'),
    mediaValorUn: formatterUtils.formatarValor(item.mediaValorUn, 'moeda'),
  }));
});

const pedidosFormatado = computed(() => {
  const dadosAtuais = responsePedidos.value;
  if (!dadosAtuais || !dadosAtuais.registros) return [];

  return dadosAtuais.registros.map((item: any) => ({
    ...item,
    dtPrevisaoEntregaPdc: formatterUtils.formatarValor(item.dtPrevisaoEntregaPdc, 'data'),
    valorTotalPendente: formatterUtils.formatarValor(item.valorTotalPendente, 'moeda'),
    corDeAlerta: corDeAlerta.alerta(item.dtPrevisaoEntregaPdc),
  }));
});
</script>
