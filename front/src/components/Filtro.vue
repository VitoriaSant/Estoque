<template>
    <v-card id="CardPrincipal" class="pa-6" elevation="0"> <v-card-title
            class="text-h4 mb-6 text-center text-primary position-relative">
            Filtros
            <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0" @click="fechar" />
        </v-card-title>

        <v-row class="mb-2" no-gutters >
            <v-col cols="12" md="6" class="pa-1">
                <v-text-field v-model="dataInicio" label="Data início" type="date" variant="outlined" />
            </v-col>

            <v-col cols="12" md="6" class="pa-1">
                <v-text-field v-model="dataFim" label="Data fim" type="date" variant="outlined" />
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4" border="sm">
                    <div class="d-flex flex-column ga-2">
                        <v-btn
                            v-for="item in valoresParaFiltro"
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

                        <v-text-field
                            v-model="valorDigitado"
                            label="Descrição" 
                            variant="outlined" 
                            placeholder="Digite o valor para filtrar..."
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

                                    <v-btn 
                                        color="primary" 
                                        size="large" 
                                        variant="elevated"
                                        @click="buscarDados()">
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
//Vue
import { ref } from 'vue'
import CClasseFiltro from '@/Service/base/CClasseFiltro'
import CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel'

//Services
import PedidoCompraPendenteController from "@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController";

const filtroSelecionado = ref('Item')
const ConstValores = ref(false)
const dialog = ref(false)
const loaded = ref(false)
const loading = ref(false)
// Define os eventos que este componente pode emitir
const emit = defineEmits(['fechar', 'aplicar'])

const props = defineProps(['classeFiltro'])

// Constantes
const operadorSelecionado = ref('igual')
const valorDigitado = ref('')
const controller = new PedidoCompraPendenteController();
const listaCompras = ref<CPedidoCompraPendenteModel[]>([]);

//Reativas
const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
    new CClasseFiltro(),
);

const valoresParaFiltro = ['Código do Fornecedor', 'Fornecedor', 'Código do Item', 'Item', 'Código da Cor', 'Cor', 'Código da Variação', 'Variação', 'Código do Acabamento', 'Acabamento']

const ConsultarValores = () => {
    ConstValores.value = !ConstValores.value
}

const operadores = [
    { title: 'Igual', value: 'igual' },
    { title: 'Diferente', value: 'diferente' },
    { title: 'Contém', value: 'contem' },
]

// Forçando data atual e data de 30 dias atrás para os campos de data
const formatarDataParaInput = (data: Date) => {return data.toISOString().split('T')[0]}
const dataAtual = new Date()
const dataPassada = new Date() 
dataPassada.setDate(dataAtual.getDate() - 30)
const dataInicio = ref(formatarDataParaInput(dataPassada))
const dataFim = ref(formatarDataParaInput(dataAtual))

function fechar() {
    emit('fechar')
}

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

// Função para buscar dados com os filtros atuais
async function buscarDados() {
    // Validação: verifica se digitou um valor
    if (!valorDigitado.value || valorDigitado.value.trim() === '') {
        alert('Digite um valor para filtrar');
        return;
    }

    // Obtém o nome técnico do campo usando o mapeamento do modelo
    const mapaCampos = CPedidoCompraPendenteModel.getMapaCampos();
    const campoTecnico = (mapaCampos[filtroSelecionado.value] || filtroSelecionado.value) as keyof CPedidoCompraPendenteModel;

    // Converte valor para número se for um ID
    let valorConvertido: any = valorDigitado.value;
    if (campoTecnico.toString().endsWith('Id')) {
        valorConvertido = Number(valorDigitado.value);
    }

    // Preenche o objeto de filtro
    classeFiltro.value.filtros = [
        {
            campo: campoTecnico,
            operador: operadorSelecionado.value.toUpperCase() as any,
            valor: valorConvertido
        }
    ];

    console.log("Filtros:", classeFiltro.value);
    
    const comprasPendentes = await controller.listarComprasPendentes(classeFiltro.value);
    listaCompras.value = comprasPendentes;
    console.log("Resultado:", comprasPendentes);
}

// Função chamada quando "Aplicar Filtro" é clicado
// function onAplicarFiltro(novoFiltro: CClasseFiltro<CPedidoCompraPendenteModel>) {
//     classeFiltro.value = novoFiltro;
//     dialog.value = false;
// }
</script>

<style scoped>

</style>