<template>
  <div class="table-wrapper" :class="{ fullscreen: expandido }">
    <v-table
      class="tabela-cabecalho-fixo compact-table"
      density="compact"
      fixed-header
      :height="expandido ? 'calc(100vh - 140px)' : '290px'"
    >
      <thead>
        <tr>
          <th v-for="header in th" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itensPaginados" :key="item[campoKey]" :class="alerta(item)">
          <td v-for="campo in campos" :key="campo">
            {{ formatarValorStore.formatarValor(item[campo], campo) }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="d-flex align-center justify-space-between mt-2 flex-wrap gap-2">
      <v-pagination
        v-model="paginaAtual"
        :length="totalPaginas"
        :total-visible="$vuetify.display.smAndDown ? 3 : 7"
        density="compact"
        size="small"
        class="flex-grow-1"
        @update:model-value="proximaPagina"
      />

      <div style="width: 120px" >
        <v-select
          v-model="itensPorPagina"
          :items="[10, 25, 50, 100]"
          label="Itens por pág."
          density="compact"
          variant="outlined"
          hide-details
          @update:model-value="proximaPagina(1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref, computed, watch } from 'vue';

//Store
import { useFormatarValorStore } from '@/stores/FormatarValorStore';
import { useLayoutDashboardStore } from '@/stores/LayoutDashboardStore';

const layoutStore = useLayoutDashboardStore();

const formatarValorStore = useFormatarValorStore();

interface Props {
  th: string[];
  dados: any[];
  campos: string[];
  campoKey: string;
  height?: string;
  itensPorPagina?: number;
  corDeAlerta?: string;
  expandido?: boolean;
  paginacaoPedido?: {
    pagina: number;
    limite: number;
    totalDeRegistros: number | null;
  } | null;
}

const props = withDefaults(defineProps<Props>(), {
  th: () => [],
  dados: () => [],
  campos: () => [],
  campoKey: '',
  height: '',
  itensPorPagina: 20,
  corDeAlerta: '',
  expandido: false,
  paginacaoPedido: null,
});
const emit = defineEmits<{
  proximaPagina: [
    paginacao: {
      pagina: number;
      limite: number;
      totalDeRegistros: number | null;
    },
  ];
}>();

const itensPorPagina = ref(props.itensPorPagina);
const paginaAtual = ref(1);

watch(
  () => props.paginacaoPedido,
  (paginacao) => {
    if (!paginacao) return;

    paginaAtual.value = paginacao.pagina;
    itensPorPagina.value = paginacao.limite;
  },
  { immediate: true },
);

// Computados para paginação
const totalPaginas = computed(() => {
  if (props.paginacaoPedido?.totalDeRegistros && props.paginacaoPedido.totalDeRegistros > 0) return Math.ceil(props.paginacaoPedido.totalDeRegistros / itensPorPagina.value);
  if (!props.dados || !Array.isArray(props.dados)) return 0;
  return Math.ceil(props.dados.length / itensPorPagina.value);
});

const itensPaginados = computed(() => {
  if (!props.dados || !Array.isArray(props.dados)) return [];
  if (props.paginacaoPedido?.totalDeRegistros !== null && props.paginacaoPedido?.totalDeRegistros !== undefined) return props.dados;
  const inicio = (paginaAtual.value - 1) * itensPorPagina.value;
  const fim = inicio + itensPorPagina.value;
  return props.dados.slice(inicio, fim);
});

const proximaPagina = (pagina: number) => {


  layoutStore.classeFiltro.paginacao = { pagina, limite: itensPorPagina.value, totalDeRegistros: props.paginacaoPedido?.totalDeRegistros ?? null };
  // paginaAtual.value = pagina;

  // emit('proximaPagina', {
  //   pagina,
  //   limite: itensPorPagina.value,
  //   totalDeRegistros: props.paginacaoPedido?.totalDeRegistros ?? null,
  // });
};

const alerta = (item: any) => {
  const corDeAlerta = props.corDeAlerta ? item[props.corDeAlerta] : item.corDeAlerta;
  if (corDeAlerta == 'Vermelho') {
    return 'linha-vermelha';
  } else if (corDeAlerta == 'Amarelo') {
    return 'linha-amarela';
  }
  return '';
};
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.tabela-cabecalho-fixo :deep(thead th) {
  position: sticky;
  top: 0;
  background-color: #f7f3f3 !important;
}

.linha-vermelha {
  color: #a55050 !important;
  font-weight: bold;
}

.linha-vermelha td {
  color: #a55050 !important;
}

.linha-amarela {
  color: #e28635 !important;
  font-weight: bold;
}

.compact-table :deep(th),
.compact-table :deep(td) {
  height: 30px !important;
  padding: 0 8px !important;
  font-size: 12px;
  white-space: nowrap;
}

.compact-table :deep(thead th) {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #f7f3f3 !important;
  font-weight: 600;
}

.chart-container.fullscreen {
  height: 100%;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

/* .linha-amarela td {
    background-color: #fff9c4 !important;
    color: #f57f17 !important;
} */
</style>
