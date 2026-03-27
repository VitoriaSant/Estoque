<template>
<v-card id="CardPrincipal" class="mx-auto pa-4" max-width="900" elevation="5" outlined>
    
    <!-- Título -->
    <v-card-title class="text-h4 mb-2 text-center text-primary">
        Filtros       
        <v-btn
            icon="mdi-close"
            variant="text"
            class="position-absolute right-0 top-0"
        />
    </v-card-title>

    <!-- Datas -->
    <v-row class="mb-4" dense>
    <v-col cols="12" md="6">
        <v-text-field
        v-model="dataInicio"
        label="Data início"
        type="date"
        density="compact"
        variant="outlined"
        />
    </v-col>
 
    <v-col cols="12" md="6">
        <v-text-field
        v-model="dataFim"
        label="Data fim"
        type="date"
        density="compact"
        variant="outlined"
        />
    </v-col>
    </v-row>
    <v-row dense>

    <!-- Filtros -->
    <v-col cols="12" md="6">
        <v-card id="CardSecundario" variant="flat" class="pa-3">
        <div class="d-flex flex-column ga-1" color="primary">
            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Código do Fornecedor')"
                >
                <v-icon start icon="mdi-numeric" />
                Código do Fornecedor
            </v-btn>

            <v-btn 
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Fornecedor')">
                <v-icon start icon="mdi-account-multiple" />
                Fornecedor
            </v-btn>

            <v-btn 
                block    
                color="primary" 
                class="justify-start"
                @click="filtrar('Código do Item')">
                <v-icon start icon="mdi-numeric" />
                Código do Item
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Item')">
                <v-icon start icon="mdi-package-variant-closed" />
                Item
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Código da Cor')">
                <v-icon start icon="mdi-numeric" />
                Código da Cor
            </v-btn>
            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Cor')">
                <v-icon start icon="mdi-package-variant-plus" />
                Cor
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Código da Variação')">
                <v-icon start icon="mdi-numeric" />
                Código da Variação
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Variação')">
                <v-icon start icon="mdi-package-variant-plus" />
                Variação
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Código do Acabamento')">
                <v-icon start icon="mdi-numeric" />
                Código do Acabamento
            </v-btn>

            <v-btn
                block
                color="primary"
                class="justify-start"
                @click="filtrar('Acabamento')">
                <v-icon start icon="mdi-package-variant-plus" />
                Acabamento
            </v-btn>

        </div>
        </v-card>
    </v-col>

    <!-- Ação -->
    <v-col cols="12" md="6">
        <v-card variant="tonal" class="pa-3 d-flex flex-column justify-space-between" height="100%">
        
        <v-row>
            <v-col cols="12" md="1">
                <div class="text-h5 text-secondary d-flex align-center justify-start">
                    <v-icon start icon="mdi-filter-variant" />
                </div>
            </v-col>
            <v-col cols="12" md="11">
                <div class="text-subtitle-1 mb-2 text-center" v-if="filtroSelecionado">
                    <div class="text-h5 text-primary d-flex align-center justify-start">
                        {{ filtroSelecionado }}
                </div>
                </div>
            </v-col>
        </v-row>
            
        
        <v-card-text>
        <v-select
            :items="operadores"
            density="comfortable"
            label="Operador"
            variant="underlined"
            item-title="title"
            v-model="select" 
        ></v-select>

        <v-text-field
            label="Descrição"
            variant="underlined"
        ></v-text-field>

        </v-card-text>
        <div id="consultar-valores-btn" class="d-flex flex-column" >
            <v-btn color="secondary"> Consultar Valores </v-btn>
        </div>
        <div class="d-flex flex-column">
            <v-btn color="primary"> Filtrar </v-btn>
        </div>

        </v-card>
    </v-col>

    </v-row>

</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { shallowRef } from 'vue'

const dataInicio = ref('')
const dataFim = ref('')
const filtroSelecionado = ref('Item')

const select = shallowRef({ state: 'Igual'})

const operadores = [
    { title: 'Igual', value: 'igual', icon: 'mdi-equal' },
    { title: 'Diferente', value: 'diferente', icon: 'mdi-not-equal' },
    { title: 'Contém', value: 'contem', icon: 'mdi-magnify' },
]

function filtrar(valor: string) {
    filtroSelecionado.value = valor
}

</script>

<style scoped> 
#CardPrincipal {
    margin-top: 50px;
}
#consultar-valores-btn {
    margin-bottom: 20px;
}

</style>