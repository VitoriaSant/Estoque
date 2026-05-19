<template> 
    <v-dialog v-model="error" max-width="500">
        <v-card class="informativo-card">
            <v-card-title class="px-6 py-4 bg-error">
                <div class="d-flex align-center ">
                    <v-icon size="26">mdi-cancel</v-icon>
                    <div>
                        <h3 class="text-h5 ms-2">Erro</h3>
                    </div>
                </div>
            </v-card-title>
            <v-card-text>
                <h2>Erro ao carregar dados</h2>
                <h4>{{ props.mensagem }}</h4>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

const props = defineProps<{
    mensagem: string;
}>();

const error = defineModel<boolean>('error', {
    default: true
})

</script>
<style scoped>
.informativo-card {
    border-radius: 24px !important;
    overflow: hidden;
}

.informativo-header {
    color: white;
    padding: 22px 26px;
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4f7cff);
}

.informativo-subtitulo {
    color: rgba(255, 255, 255, 0.82);
}
</style>
