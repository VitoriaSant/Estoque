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

    <v-pagination
      v-model="paginaAtual"
      :length="totalPaginas"
      :total-visible="$vuetify.display.smAndDown ? 3 : 7"
      density="compact"
      size="small"
      class="mt-2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFormatarValorStore } from '@/stores/FormatarValorStore';

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
});

const itensPorPagina = props.itensPorPagina;
const paginaAtual = ref(1);

// Computados para paginação
const totalPaginas = computed(() => {
  if (!props.dados || !Array.isArray(props.dados)) return 0;
  return Math.ceil(props.dados.length / itensPorPagina);
});

const itensPaginados = computed(() => {
  if (!props.dados || !Array.isArray(props.dados)) return [];
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return props.dados.slice(inicio, fim);
});

const alerta = (item: any) => {
  const corDeAlerta = item.corDeAlerta;
  if (corDeAlerta == 'Vermelho') {
    return 'linha-vermelha';
  } else if (corDeAlerta == 'Amarelo') {
    return 'linha-amarela';
  }
  return '';
};
</script>

<style scoped>
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
