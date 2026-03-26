<template>
<v-card class="mx-auto" max-width="70%">
    <v-card-title class="" >Filtro</v-card-title>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field
                v-model="dataInicio"
                label="Data início"
                type="date"
                density="compact"
            />
        </v-col>
        <v-col  cols="12" md="6">
            <v-text-field
                v-model="dataFim"
                label="Data fim"
                type="date"
                density="compact"
            />
        </v-col>
    </v-row>
    
    <v-row> 
        <v-col>
            <v-card>
                <v-list>
                    <v-list-item>
                    <v-btn block>Item</v-btn>
                    </v-list-item>

                    <v-list-item>
                    <v-btn block>Cor</v-btn>
                    </v-list-item>

                    <v-list-item>
                    <v-btn block>Variação</v-btn>
                    </v-list-item>

                    <v-list-item>
                    <v-btn block>Acabamento</v-btn>
                    </v-list-item>

                    <v-list-item>
                    <v-btn block>Fornecedor</v-btn>
                    </v-list-item>

                </v-list>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                Teste
                <v-btn block color="primary">Filtrar</v-btn>
            </v-card>
        </v-col>
    </v-row>



    

</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref('')
const dataInicio = ref('')
const dataFim = ref('')

</script>