/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#755640",
          secondary: "#b9a393",
          accent: "#dacec5",
          error: "#a55050",
          info: "#2196F3",
          success: "#316632",
          warning: "#FFC107",
          fundo: "#e7e7e7",
        },
      },
    },
  },
});
