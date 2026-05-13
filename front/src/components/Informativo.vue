<template> 
    <v-dialog v-model="dialogInfo" width="600">
        <v-card>
            <v-btn icon="mdi-close" variant="text" class="position-absolute right-0 top-0" @click="fechar" />
            <v-card-text>
                <h2> {{ titulo }} </h2>   
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
h2 {
    margin-top: 10px;
}
h4 {
    margin-top: 10px;
}
p {
    margin-top: 10px;
}
</style>
