<template>
  <v-dialog v-model="informativosStore.exibirInformativo" width="680" persistent>
    <v-card class="informativo-card">
      <v-card-title class="px-6 py-4 bg-primary">
        <div class="d-flex align-center">
          <v-avatar color="white" size="42">
            <v-icon color="primary" size="26">mdi-lightbulb-on-outline</v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h5 ms-2">Informativo</h3>
          </div>
        </div>
      </v-card-title>
      <v-btn
        icon="mdi-close"
        variant="text"
        class="position-absolute right-0 top-0 text-white mt-2 mr-2"
        @click="fechar"
      />
      <component :is="componenteInformativo" />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useInformativosStore } from '../stores/InformativosStore';
import { useRoute } from 'vue-router';
import { computed, type Component } from 'vue';
import InfoPedidoCompraPendente from '@/pages/tema-estoque/pedido-compra-pendente/components/Info-PedidoCompraPendente.vue';
import InfoPontoCompra from '@/pages/tema-estoque/ponto-compra/components/Info-PontoDeCompra.vue';
import InfoExemploGraficos from '@/pages/tema-estoque/exemplo-graficos/components/Info-ExemploGraficos.vue';

const informativosStore = useInformativosStore();
const route = useRoute();

function fechar() {
  informativosStore.exibirInformativo = false;
}

const informativosPorPagina: Record<string, Component> = {
  'Ponto de compra': InfoPontoCompra,
  'Pedido de compra pendente': InfoPedidoCompraPendente,
  'Exemplo de Graficos': InfoExemploGraficos,
};

const componenteInformativo = computed(() => {
  return informativosPorPagina[String(route.name)] || null;
});
</script>
<style scoped>
.informativo-card {
  border-radius: 24px !important;
  overflow: hidden;
}

.informativo-header {
  color: white;
  padding: 22px 26px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4f7cff);
}

.informativo-subtitulo {
  color: rgba(255, 255, 255, 0.82);
}
</style>
