// Composables
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/login/Login.vue"),
    },
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/",
      name: "LayoutDashboard",
      component: () => import("@/layout/LayoutDashboard.vue"),
      children: [
        {
          path: "/pedido-compra-pendente",
          name: "Pedido de compra pendente",
          component: () =>
            import("@/pages/tema-estoque/pedido-compra-pendente/PedidoCompraPendente.vue"),
        },
        {
          path: "/ponto-compra",
          name: "Ponto de compra",
          component: () =>
            import("@/pages/tema-estoque/ponto-compra/PontoCompra.vue"),
        },
        {
          path: "/exemplo-graficos",
          name: "Exemplo de Gráficos",
          component: () =>
            import("@/pages/tema-estoque/exemplo-graficos/ExemploGraficos.vue"),
        },
      ],
    },
  ],
});

export default router;
