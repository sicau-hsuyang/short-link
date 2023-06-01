import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "MemberCenter",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/ErrorPage/NotFound.vue"),
    meta: { noAuth: true },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
