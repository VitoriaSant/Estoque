<template>
    <v-card id="CardPrincipal" class="pa-6" elevation="0"> <v-card-title
            class="text-h4 mb-6 text-center text-primary position-relative">
            Filtros
            <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0" @click="fechar" />
        </v-card-title>

        <v-row class="mb-2">
            <v-col cols="12" md="6">
                <v-text-field v-model="dataInicio" label="Data início" type="date" variant="outlined" />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field v-model="dataFim" label="Data fim" type="date" variant="outlined" />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4" border="sm">
                    <div class="d-flex flex-column ga-2">
                        <v-btn
                            v-for="item in ['Código do Fornecedor', 'Fornecedor', 'Código do Item', 'Item', 'Código da Cor', 'Cor', 'Código da Variação', 'Variação', 'Código do Acabamento', 'Acabamento']"
                            :key="item" block color="primary"
                            :variant="filtroSelecionado === item ? 'elevated' : 'tonal'" class="justify-start text-none"
                            @click="filtrar(item)">
                            <v-icon start :icon="item.includes('Código') ? 'mdi-numeric' : 'mdi-text-box-outline'" />
                            {{ item }}
                        </v-btn>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card variant="tonal" class="pa-4 d-flex flex-column " min-height="465" color="primary">

                    <div class="d-flex align-center mb-6">
                        <v-icon size="large" icon="mdi-filter-variant" class="mr-2" />
                        <span class="text-h5">{{ filtroSelecionado }}</span>
                    </div>

                    <v-card-text class="pa-0 flex-grow-1">
                        <v-select 
                            :items="operadores" 
                            label="Operador" 
                            variant="outlined" 
                            item-title="title"
                            item-value="value"
                            v-model="operadorSelecionado" 
                            class="mb-4"
                        ></v-select>

                        <v-text-field label="Descrição" variant="outlined" placeholder="Digite o valor para filtrar..."
                            clearable></v-text-field>
                    </v-card-text>

                    <div class="mt-auto pt-4">
                        <v-dialog v-model="dialog" max-width="400">
                            <template v-slot:activator="{ props: activatorProps }">
                                <div class="d-flex flex-column ga-3">
                                    <v-btn v-bind="activatorProps" color="secondary" size="large" variant="flat"
                                        @click="ConsultarValores">
                                        <v-icon start icon="mdi-magnify" />
                                        Consultar Valores
                                    </v-btn>

                                    <v-btn color="primary" size="large" variant="elevated">
                                        <v-icon start icon="mdi-check" />
                                        Aplicar Filtro
                                    </v-btn>
                                </div>
                            </template>

                            <!--CONSULTAR VALORES-->
                            <div class="pa-4 text-center">
                                <v-dialog v-model="dialog" max-width="600">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <!-- BOTÃO CONSULTAR VALORES-->
                                        <div id="consultar-valores-btn" class="d-flex flex-column ga-2">
                                            <v-btn v-bind="activatorProps" color="secondary"
                                                @click="ConsultarValores">
                                                Consultar Valores
                                            </v-btn>

                                            <!-- FILTRAR -->
                                            <div class="d-flex flex-column ga-2">
                                                <v-btn color="primary"> Filtrar </v-btn>
                                            </div>
                                        </div>
                                    </template>

                                    <!--CARD/PESQUISA CONSULTAR VALORES-->
                                    <v-card>
                                        <v-card-text>
                                            <v-text-field :loading="loading" color="primary"
                                                append-inner-icon="mdi-magnify" density="compact"
                                                label="Consultar Valores" variant="solo" hide-details
                                                single-line @click:append-inner="onClick"></v-text-field>
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn color="secondary" text="Fechar" variant="plain"
                                                @click="dialog = false"></v-btn>

                                            <v-btn color="primary" text="Confirmar" variant="tonal"
                                                @click="dialog = false"></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </v-dialog>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const dataInicio = ref('')
const dataFim = ref('')
const filtroSelecionado = ref('Item')
const ConstValores = ref(false)
const dialog = ref(false)
const loaded = ref(false)
const loading = ref(false)
const emit = defineEmits(['fechar'])
const operadorSelecionado = ref('igual')

function fechar() {
    emit('fechar')
}

const ConsultarValores = () => {
    ConstValores.value = !ConstValores.value
}

const operadores = [
    { title: 'Igual', value: 'igual' },
    { title: 'Diferente', value: 'diferente' },
    { title: 'Contém', value: 'contem' },
]

function onClick() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        loaded.value = true
    }, 2000)
}

function filtrar(valor: string) {
    filtroSelecionado.value = valor
}


</script>

<style scoped>
#consultar-valores-btn {
    margin-bottom: 20px;
}
</style>