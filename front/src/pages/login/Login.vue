<template>
  <v-container class="fill-height bg-accent d-flex align-center justify-center" fluid>
    <v-card class="elevation-12 pa-8" min-height="500" max-width="500">
      <v-card-text class="text-center mb-1 text-primary">
        <h1>Bem vindo!</h1>
      </v-card-text>
      <v-card-title class="text-center mb-1 text-primary">
        <h1>Sistema de Estoque</h1>
      </v-card-title>
      <v-card-subtitle class="text-center mb-1"> Faça login para acessar o sistema </v-card-subtitle>

      <v-form>
        <v-text-field
          class="mb-4"
          label="Nome"
          prepend-inner-icon="mdi-account"
          clearable
          variant="outlined"
        ></v-text-field>

        <v-text-field
          label="Senha"
          prepend-inner-icon="mdi-lock"
          type="password"
          clearable
          variant="outlined"
        ></v-text-field>

        <v-btn
          to="/pedido-compra-pendente"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          block
          class="mt-4"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
