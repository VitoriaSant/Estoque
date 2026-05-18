<template> 
        <v-card-text>
            <h4>Para facilitar o seu controle de estoque, as linhas da tabela mudam de cor automaticamente conforme o saldo:</h4>
            <p>🔴 Vermelho: Atenção crítica! O saldo atual está abaixo do saldo mínimo. É hora de repor.</p>
            <p>🟡 Amarelo: Alerta de estoque baixo. O saldo atual está abaixo da metade do saldo máximo.</p>
            <h4>Ponto de compra:</h4>
            <p>📅 Prazo de Entrega: Indica o tempo restante para o recebimento do próximo pedido. O sistema calcula a diferença entre a data atual e a previsão de entrega, informando com precisão quantos dias faltam para o material chegar ao estoque.</p>
            <p>📊 Consumo Diário: Representa a força de saída do item. É obtido através da média aritmética de todas as requisições atendidas nos últimos 90 dias, oferecendo uma visão realista da demanda atual.</p>
            <p>⏳ Dias de Duração: Projeta a autonomia do seu estoque. Este indicador revela para quantos dias o saldo atual é suficiente, cruzando a quantidade disponível com o ritmo de consumo dos últimos três meses.</p>
        </v-card-text>
</template>


<script setup lang="ts">

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
