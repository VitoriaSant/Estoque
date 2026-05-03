<template>
<v-card variant="outlined" class="pa-4" border="sm">
    <div class="d-flex flex-column ga-2">
        <v-btn v-for="item in valoresParaFiltro" :key="item" block color="primary"
            :variant="filtroSelecionado === item ? 'elevated' : 'tonal'"
            class="justify-start text-none" @click="filtrar(item)">
            <v-icon start :icon="item.includes('Código')
                    ? 'mdi-numeric'
                    : 'mdi-text-box-outline'
                " />
            {{ item }}
        </v-btn>
    </div>
</v-card>
</template>

<script setup lang="ts">
//Vue
import { ref, watch } from "vue";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";

const filtroSelecionado = ref("Item");

// Define os eventos que este componente pode emitir
const emit = defineEmits([
    "fechar",
    "aplicar",
    "update:dialogFiltro",
    "update:classe-filtro",
    "update:filtroSelecionado",
]);

const props = defineProps<{
    classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>;
    dialogFiltro: boolean;
}>();

const valoresParaFiltro = [
    "Código do Fornecedor",
    "Fornecedor",
    "Código do Item",
    "Item",
    "Código da Cor",
    "Cor",
    "Código da Variação",
    "Variação",
    "Código do Acabamento",
    "Acabamento",
];

function filtrar(valor: string) {
    filtroSelecionado.value = valor;
}

watch(filtroSelecionado, () => {
    emit("update:filtroSelecionado", filtroSelecionado.value);
});

</script>

<style scoped></style>
