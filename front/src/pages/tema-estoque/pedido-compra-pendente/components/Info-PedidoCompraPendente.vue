<template>
  <v-card-text>
    <div class="bg-accent" style="padding: 10px; border-radius: 8px">
      <h4>Para facilitar a visualização, as linhas da tabela mudam de cor automaticamente:</h4>
      <p>🔴Vermelho: Pedidos com a previsão de entrega menos que o dia atual</p>
    </div>
  </v-card-text>
</template>

<script setup lang="ts"></script>
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

.v-card {
  border-radius: 24px !important;
  overflow: hidden;
}
</style>
