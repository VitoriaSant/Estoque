// Composables
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "LayoutDashboard",
      component: () => import("@/layout/LayoutDashboard.vue"),
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/pages/index.vue"),
        },
        {
          path: "/pedido-compra-pendente",
          name: "PedidoCompraPendente",
          component: () =>
            import("@/pages/tema-estoque/pedido-compra-pendente/PedidoCompraPendente.vue"),
        },
      ],
    },
  ],
});

export default router;
