<template>
    <v-btn v-bind="activatorProps" color="secondary" size="large" variant="flat"
    @click="ConsultarValores">
    <v-icon start icon="mdi-magnify" />
    Consultar Valores
</v-btn>
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
                    label="Consultar Valores" variant="solo" hide-details single-line
                    @click:append-inner="onPesquisar"></v-text-field>
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
</template>
                    