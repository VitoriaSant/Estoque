<template>
    <div class="pa-4 text-center">
        <v-dialog
        v-model="dialog"
        max-width="600"
        >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                class="text-none font-weight-regular"
                text="Edit Profile"
                variant="tonal"
                v-bind="activatorProps"
                color="secondary" 
                @click="ConsultarValores"> 
                Consultar Valores </v-btn>
        </template>

        <v-card>
            <v-card-text>
                <v-text-field
                    :loading="loading"
                    color="primary"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Consultar Valores"
                    variant="solo"
                    hide-details
                    single-line
                    @click:append-inner="onClick"
                ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="secondary"
                text="Fechar"
                variant="plain"
                @click="dialog = false"
            ></v-btn>

            <v-btn
                color="primary"
                text="Confirmar"
                variant="tonal"
                @click="dialog = false"
            ></v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
    </template>
<script setup>  
import { ref } from 'vue';
const dialog = ref(false);
const loaded = ref(false)
const loading = ref(false)

function onClick () {
    loading.value = true
    setTimeout(() => {
    loading.value = false
    loaded.value = true
    }, 2000)
}
</script>