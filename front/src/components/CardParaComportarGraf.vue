<template>
  <v-card style="height: 400px" width="100%" variant="elevated" class="mx-auto">
    <v-card-item>
      <div class="d-flex align-center">
        <v-row>
          <v-col cols="6" md="8" lg="8" class="d-flex align-center">
            <!-- Usamos as variáveis tipadas diretamente -->
            <v-icon :icon="icone" class="me-2"></v-icon>
            <v-card-title>{{ titulo }}</v-card-title>
          </v-col>
          <v-col cols="6" md="4" lg="4" class="d-flex justify-end">
            <!-- Botão de informação -->
            <v-btn
              v-if="exibiIconeInformativo"
              variant="tonal"
              icon="mdi-information-outline"
              density="comfortable"
              @click="abrirInformativo"
            ></v-btn>
            <!-- Botão de expandir -->
            <v-btn variant="tonal" icon="mdi-fullscreen" density="comfortable" @click="expandir = true"></v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-item>

    <v-card-text class="grafico-content">
      <slot name="grafico" :expandido="false"></slot>
    </v-card-text>
  </v-card>

  <v-dialog v-model="expandir" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="surface" elevation="1">
        <v-icon :icon="icone" class="ms-4"></v-icon>
        <v-toolbar-title>{{ titulo }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-fullscreen-exit" @click="expandir = false"></v-btn>
      </v-toolbar>

      <v-card-text class="fullscreen-content">
        <slot name="grafico" :expandido="expandir"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
//Vue
import { ref } from 'vue';
import type { Component } from 'vue';

//Store
import { useInformativosStore } from '@/stores/InformativosStore';

const informativosStore = useInformativosStore();

interface Props {
  titulo?: string;
  icone?: string;
  exibiIconeInformativo?: boolean;
  componenteInformativo?: Component;
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Gráfico',
  icone: 'mdi-chart-bar',
  exibiIconeInformativo: false,
  componenteInformativo: undefined,
});

const expandir = ref(false);

function abrirInformativo() {
  informativosStore.componenteInformativo = props.componenteInformativo || null;
  informativosStore.exibirInformativo = true;
}

defineSlots<{
  grafico?: (props: { expandido: boolean }) => any;
}>();
</script>

<style scoped>
:deep(.v-card-text) {
  display: flex;
  flex-direction: column;
}

.grafico-content {
  align-items: center;
  justify-content: center;
}

.fullscreen-content {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
