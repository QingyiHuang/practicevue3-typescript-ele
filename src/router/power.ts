export const homeRouteChildren = [
  {
    path: "/home/analysis/overview",
    component: () => import("../views/home/analysis/overview/index.vue"),
    meta: {
      menuCode: "00101",
    },
  },
  {
    path: "/home/analysis/statistic",
    component: () => import("../views/home/analysis/statistic/index.vue"),
    meta: {
      menuCode: "00102",
    },
  },
  {
    path: "/home/system/role",
    component: () => import("../views/home/system/role/index.vue"),
    meta: {
      menuCode: "00201",
    },
  },
  {
    path: "/home/system/userConfig",
    component: () => import("../views/home/system/userConfig/index.vue"),
    meta: {
      menuCode: "00202",
    },
  },
];
