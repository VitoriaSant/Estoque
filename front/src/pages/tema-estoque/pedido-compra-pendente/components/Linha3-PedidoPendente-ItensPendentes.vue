<template>
  <v-row no-gutters>
    <v-col cols="12" md="7" class="pa-1">
      <CardParaComportarGraf :titulo="'Itens Pendentes'" :icone="'mdi-archive-alert'">
        <template #grafico="{ expandido }">
          <!-- <Tabela
            :th="['CÃ³digo', 'DescriÃ§Ã£o', 'Quantidade', 'Valor UnitÃ¡rio', 'Valor Total']"
            :campos="['itemPdc', 'descricaoItem', 'quantidadeItensPendentes', 'valorTotalPendente', 'mediaValorUn']"
            :campoKey="'IdItem'"
            :dados="props.dadosItens || []"
            :height="'350px'"
            :corDeAlerta="'corDeAlerta'"
            :expandido="expandido"
          /> -->
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
            :expandido="expandido"
            :dados="responsePedidos.registros || []"
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
//Components
import InfoPedidoCompraPendente from './Info-PedidoCompraPendente.vue';

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
</script>
