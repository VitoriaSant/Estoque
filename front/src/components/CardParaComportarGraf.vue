<template>
  <v-container>
    <v-card 
      style="height: 400px"
      variant="elevated"
      class="mx-auto"
    >
      <!-- Usamos v-card-item para customizar o cabeçalho -->
      <v-card-item>
        <div class="d-flex align-center">
          <v-icon icon="mdi-chart-bar" class="me-2"></v-icon>
          <v-card-title>Gráfico de Barras Horizontal</v-card-title>
          
          <v-spacer></v-spacer>

          <v-btn 
            variant="tonal" 
            color="primary" 
            icon="mdi-fullscreen" 
            density="comfortable"
            @click="expandir = true"
          >
          </v-btn>
        </div>
      </v-card-item>

      <v-card-text>
        <BarrasHorizontal />
      </v-card-text>
    </v-card>

    <!-- Dialog de expansão -->
    <v-dialog v-model="expandir" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <!--<v-toolbar color="primary">
          <v-btn icon @click="expandir = false">
            <v-icon>mdi-fullscreen-exit</v-icon>
          </v-btn>
          <v-toolbar-title>Gráfico Expandido</v-toolbar-title>
        </v-toolbar>-->

      <v-card-text style="height: 100%;">
        <v-card
          style="height: 400px"
          variant="elevated"
          class="mx-auto"
        >
          <!-- Container Flexbox para alinhar horizontalmente -->
          <div class="d-flex align-center"> 
            <v-icon icon="mdi-chart-bar" class="me-2"></v-icon>
            <v-card-title>Gráfico de Barras Horizontal</v-card-title>
            
            <v-spacer></v-spacer> <!-- Empurra o botão para o final da linha -->

            <v-btn 
              variant="tonal" 
              color="primary" 
              icon="mdi-fullscreen-exit" 
              density="comfortable"
              @click="expandir = false"
            >
            </v-btn>
          </div>

          <v-card-text>
            <BarrasHorizontal />
          </v-card-text>
        </v-card>
      </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BarrasHorizontal from './BarrasHorizontal.vue'

const expandir = ref(false)

// Simulação dos dados que você já calculou no seu JSON
const dadosDoItem = ref({
  descricao: 'MATÉRIA PRIMA 104',
  prazo: 12,
  consumo: 45.8,
  duracao: 15
})
</script>