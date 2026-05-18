<template> 
    <v-dialog v-model="informativosStore.exibirInformativo" width="600" persistent>
        <v-card>
            <v-card-title class="text-h5 bg-primary">
                <h3> 💡 Informativo </h3>   
            </v-card-title>
            <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0 text-white" @click="fechar" />
            <component :is="componenteInformativo" />
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useInformativosStore } from "../stores/InformativosStore";
import { useRoute } from "vue-router";
import { computed, type Component } from "vue";
import InfoPedidoCompraPendente from "@/pages/tema-estoque/pedido-compra-pendente/components/Info-PedidoCompraPendente.vue";
import InfoPontoCompra from "@/pages/tema-estoque/ponto-compra/components/Info-PontoDeCompra.vue";
 

const informativosStore = useInformativosStore();
const route = useRoute();

function fechar() {
    informativosStore.exibirInformativo = false;
}

const informativosPorPagina: Record<string, Component> = {
    "InfoPontoCompra": InfoPontoCompra,
    "InfoPedidoCompraPendente": InfoPedidoCompraPendente,
};

const componenteInformativo = computed(() => {
    console.log(informativosPorPagina[String(route.name)]);
    return informativosPorPagina[String(route.name)] || null;
});
</script>
<style scoped>
.v-card-text {
    padding: 20px;
}
h4 {
    margin-top: 10px;
}
p {
    margin-top: 10px;
}

.v-card{
  border-radius: 24px !important;
  overflow: hidden;
}
</style>
