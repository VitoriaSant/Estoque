<template>
<v-card variant="tonal" class="pa-4 d-flex flex-column" min-height="465" color="primary">
    <div class="d-flex align-center mb-6">
        <v-icon size="large" icon="mdi-filter-variant" class="mr-2" />
        <span class="text-h5">{{ filtroSelecionado }}</span>
    </div>

    <v-card-text class="pa-0 flex-grow-1">
        <v-select :items="operadores" label="Operador" variant="outlined" item-title="title"
            item-value="value" v-model="operadorSelecionado" class="mb-4"></v-select>

        <v-text-field v-model="valorDigitado" label="Descrição" variant="outlined"
            placeholder="Digite o valor para filtrar..." clearable></v-text-field>
    </v-card-text>

    <div class="mt-auto pt-4">
        <v-dialog v-model="dialogPesquisa" max-width="400">
            <template v-slot:activator="{ props: activatorProps }">
                <div class="d-flex flex-column ga-3">
                    <v-btn color="primary" size="large" variant="elevated" @click="buscarDados()">
                        <v-icon start icon="mdi-check" />
                        Aplicar Filtro
                    </v-btn>
                </div>
            </template>
        </v-dialog>
    </div>
</v-card>
</template>

<script setup lang="ts">
//Vue
import { ref, watch, toRefs } from "vue";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";

const props = defineProps<{
    classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>;
    dialogFiltro: boolean;
    filtroSelecionado: string;
}>();

const dialogPesquisa = ref(false);

const { filtroSelecionado } = toRefs(props);

// Define os eventos que este componente pode emitir
const emit = defineEmits([
    "fechar",
    "aplicar",
    "update:dialogFiltro",
    "update:classe-filtro",
    "update:operadorSelecionado",
    "update:valorDigitado",
    "buscarDados",
]);

const operadorSelecionado = ref("IGUAL");
const valorDigitado = ref("");

const operadores = [
    { title: "Igual", value: "IGUAL" },
    { title: "Diferente", value: "DIFERENTE" },
    { title: "Contém", value: "CONTEM" },
];

watch(operadorSelecionado, (newValue) => {
    emit('update:operadorSelecionado', newValue);
});

watch(valorDigitado, (newValue) => {
    emit('update:valorDigitado', newValue);
});

async function buscarDados() {
    emit('buscarDados');
}

</script>

<style scoped></style>
