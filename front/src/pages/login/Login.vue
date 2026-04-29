<template>
    <v-container class="fill-height bg-secondary" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="6" lg="5">
                <v-card class="elevation-12 pa-8" min-height="500" max-width="800">
                    <v-card-text class="text-center mb-1 text-primary">
                        <h1>Bem vindo!</h1>
                    </v-card-text>
                    <v-card-title class="text-center mb-1 text-primary">
                        <h1>Sistema de Estoque</h1>
                    </v-card-title>
                    <v-card-subtitle class="text-center mb-1">
                            Faça login para acessar o sistema
                    </v-card-subtitle>

                    <v-form v-model="form">
                        <v-text-field 
                            v-model="nome" 
                            class="mb-4" 
                            label="Nome" 
                            prepend-inner-icon="mdi-account"
                            clearable
                            variant="outlined"
                        ></v-text-field>

                        <v-text-field 
                            v-model="senha" 
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from "vue";

const form = ref(false);
const nome = ref(null);
const senha = ref(null);

// function onSubmit() {
//     if (!form.value) return;
//     loading.value = true;
//     setTimeout(() => (loading.value = false), 2000);
// }
// function required(v) {
//     return !!v || "Field is required";
// }
</script>
