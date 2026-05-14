<template> 
    <v-dialog v-model="dialogInfo" width="600">
        <v-card>
            <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0 text-white" @click="fechar" />
            <v-card-title class="text-h5 bg-primary">
                <h3> {{ titulo }} </h3>   
            </v-card-title>
            <v-card-text>
                <h4>{{ subtitulo }}</h4>
                <p>{{ descricao }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script setup lang="ts">
import { toRef } from "vue";

const props = defineProps<{
    dialogInfo: boolean;
    titulo: string;
    subtitulo: string;
    descricao: string;
}>();

const dialogInfo = toRef(props, 'dialogInfo');

const emit = defineEmits([
    "fechar"
]);

function fechar() {
    emit("fechar");
 }
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
