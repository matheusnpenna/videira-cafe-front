import { createRouter, createWebHistory } from "vue-router";
import DefaultTemplate from "@/templates/DefaultTemplate.vue";
import AuthTemplate from "@/templates/AuthTemplate.vue";
import SaleTemplate from "@/templates/SaleTemplate.vue";

const routes = [
  {
    path: "/",
    name: "sale",
    component: () => import("../views/SaleView.vue"),
    meta: {
      template: SaleTemplate,
      protected: true,
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      template: DefaultTemplate,
      protected: true,
    },
  },
  {
    path: "/estoque",
    name: "inventory",
    component: () => import("../views/InventoryView.vue"),
    meta: {
      template: DefaultTemplate,
      protected: true,
    },
  },
  {
    path: "/estoque/novo",
    name: "inventory-new",
    component: () => import("../views/NewInventoryView.vue"),
    meta: {
      template: DefaultTemplate,
      protected: true,
    },
  },
  {
    path: "/estoque/editar/:id",
    name: "inventory-edit",
    component: () => import("../views/EditInventoryView.vue"),
    meta: {
      template: DefaultTemplate,
      protected: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      template: AuthTemplate,
      protected: false,
    },
  },
  {
    path: "/cadastro",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      template: AuthTemplate,
      protected: false,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      template: DefaultTemplate,
      protected: false,
    },
  },
  {
    path: "/politica-privacidade",
    name: "privacy",
    component: () => import("../views/PrivacyView.vue"),
    meta: {
      template: SaleTemplate,
      protected: false,
    },
  },
  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
