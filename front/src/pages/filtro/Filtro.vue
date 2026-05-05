<template>
    <v-dialog v-model="dialogFiltro" max-width="800">
        <v-card id="CardPrincipal" class="pa-6" elevation="0">
            <v-card-title class="text-h4 mb-6 text-center text-primary position-relative">
                Filtros
                <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0" @click="fechar" />
            </v-card-title>

            <DatasFiltro 
                :classeFiltro="classeFiltro" 
                :dialogFiltro="dialogFiltro"
                @update:dataInicio="dataInicio = $event"
                @update:dataFim="dataFim = $event"
            />

            <v-row no-gutters>
                <v-col cols="12" md="6" class="pr-1">
                    <OpcoesFiltro 
                        :classeFiltro="classeFiltro" 
                        :dialogFiltro="dialogFiltro"
                        @update:filtroSelecionado="filtroSelecionado = $event"
                    />
                </v-col>

                <v-col cols="12" md="6">
                    <PesquisaFiltro 
                        :filtroSelecionado="filtroSelecionado"  
                        :classeFiltro="classeFiltro"
                        :dialogFiltro="dialogFiltro"
                        @update:operadorSelecionado="operadorSelecionado = $event"
                        @update:valorDigitado="valorDigitado = $event"
                        @buscarDados="buscarDados"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
//Vue
import { ref, toRef } from "vue";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";

import DatasFiltro from "./Components/DatasFiltro.vue"; 
import OpcoesFiltro from "./Components/OpcoesFiltro.vue";
import PesquisaFiltro from "./Components/PesquisaFiltro.vue";

//Services
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";

const filtroSelecionado = ref("Item");
const loaded = ref(false);
const loading = ref(false);

// Define os eventos que este componente pode emitir
const emit = defineEmits([
    "fechar",
    "aplicar",
    "update:dialogFiltro",
    "update:classe-filtro",
]);

const props = defineProps<{
    classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>;
    dialogFiltro: boolean;
}>();
const dialogFiltro = toRef(props, 'dialogFiltro');

const operadorSelecionado = ref("IGUAL");
const valorDigitado = ref("");

//Reativas
const classeFiltro = toRef(props, 'classeFiltro');

//Necessario para que o filtro de datas funcione corretamente
const formatarDataParaInput = (data: Date) => {
    return data.toISOString().split("T")[0];
};
const dataInicio = ref(
    props.classeFiltro.dataInicio 
        ? formatarDataParaInput(props.classeFiltro.dataInicio) : ''
);
const dataFim = ref(
    props.classeFiltro.dataFim 
        ? formatarDataParaInput(props.classeFiltro.dataFim) : ''
);

function fechar() {
    emit("fechar");
}

//Consultar Valores
function onPesquisar() {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        loaded.value = true;
    }, 2000);
}

function filtrar(valor: string) {
    filtroSelecionado.value = valor;
}

// Função para buscar dados com os filtros atuais
async function buscarDados() {
    // Obtém o nome técnico do campo usando o mapeamento do modelo
    const mapaCampos = CPedidoCompraPendenteModel.getMapaCampos();
    const campoTecnico = (mapaCampos[filtroSelecionado.value] ||
        filtroSelecionado.value) as keyof CPedidoCompraPendenteModel;

    // Converte valor para número se for um ID
    let valorConvertido: any = valorDigitado.value;
    if (campoTecnico.toString().endsWith("Id")) {
        valorConvertido = Number(valorDigitado.value);
    }

    // Criar uma cópia do objeto de filtro para modificar
    const filtroAtualizado = new CClasseFiltro();
    filtroAtualizado.dataInicio = dataInicio.value ? new Date(dataInicio.value) : undefined;
    filtroAtualizado.dataFim = dataFim.value ? new Date(dataFim.value) : undefined;
    filtroAtualizado.filtros = [
        {
            campo: campoTecnico,
            operador: operadorSelecionado.value as any,
            valor: valorConvertido,
        },
    ];
    
    useLayoutDashboardStore().classeFiltro = filtroAtualizado;
    //const resultado = await useLayoutDashboardStore().filtrarComprasPendentes();
    
    emit("fechar");
}

</script>

<style scoped></style>
