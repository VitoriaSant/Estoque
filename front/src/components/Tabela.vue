<template>
    <div>
        <v-table :style="{ height: height }" class="tabela-cabecalho-fixo">
            <thead>
                <tr>
                    <th v-for="header in th" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itensPaginados" :key="item[campoKey]">
                    <td v-for="campo in campos" :key="campo">
                        {{ formatarValor(item[campo], campo) }}
                    </td>
                </tr>
            </tbody>
        </v-table>
        
        <v-pagination
            v-model="paginaAtual"
            :length="totalPaginas"
            :total-visible="7"
            class="mt-4"
        ></v-pagination>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    th: Array,
    dados: Array,
    campos: Array, 
    campoKey: String,
    height: String,
    itensPorPagina: Number
});

const itensPorPagina = props.itensPorPagina || 10;
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

const formatarValor = (valor, campo) => {
    if (!valor) return '';
    
    // Formatar moeda para campos de valor
    if (campo.includes('VLR') || campo.toLowerCase().includes('valor')) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
    
    // Formatar data para campos de data
    if (campo.includes('DATA') || campo.toLowerCase().includes('dtemissao') || campo.toLowerCase().includes('dtpreventrega')) {
        return new Date(valor).toLocaleDateString('pt-BR');
    }
    
    return valor;
};
</script>

<style scoped>
.tabela-cabecalho-fixo :deep(thead th) {
    position: sticky;
    top: 0;
    background-color: #f7f3f3 !important;
}

</style>