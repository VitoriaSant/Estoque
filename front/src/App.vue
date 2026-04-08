<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup lang="ts"></script>

<style scoped>
html,
body {
  overflow: hidden !important;
  height: 100%;
  width: 100%;
}

.v-application {
  background-color: #e7e7e7 !important;
  overflow: hidden !important;
}
</style>
