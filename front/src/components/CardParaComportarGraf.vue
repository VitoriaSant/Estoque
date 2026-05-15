<template>
  <v-card 
    style="height: 400px"
    width="100%"
    variant="elevated"
    class="mx-auto"
  >
    <v-card-item>
      <div class="d-flex align-center">
        <!-- Usamos as variáveis tipadas diretamente -->
        <v-icon :icon="icone" class="me-2"></v-icon>
        <v-card-title>{{ titulo }}</v-card-title>
        
        <v-spacer></v-spacer>

        <!-- Botão de expandir -->
        <v-btn 
          variant="tonal" 
          color="primary" 
          icon="mdi-fullscreen" 
          density="comfortable"
          @click="expandir = true"
        >
        </v-btn>
        <!-- Botão de informações -->
        <v-btn 
          v-if="props.temInformacao"
          variant="text" 
          icon="mdi-information-outline" 
          @click="infoStore.mostrarInformacoes()">
        </v-btn>
      </div>
    </v-card-item>

    <v-card-text>
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

      <v-card-text class="fullscreen-content" >
        <slot name="grafico" :expandido="expandir"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInformativosStore } from '@/stores/InformativosStore'

interface Props {
  titulo?: string;
  icone?: string;
  temInformacao?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Gráfico',
  icone: 'mdi-chart-bar',
  temInformacao: true
})

const expandir = ref(false);

const infoStore = useInformativosStore();

defineSlots<{
   grafico?: (props: { expandido: boolean }) => any
}>()

</script>

<style scoped>
:deep(.v-card-text) {
  display: flex;
  flex-direction: column;
}

.fullscreen-content {
  height: calc(100vh - 64px);
  display: flex;
  overflow: hidden;
}
</style>