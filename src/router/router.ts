import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, Router } from "vue-router";
// import Layout from '@/layout/index.vue';
// 扩展继承属性
interface extendRoute {
    hidden?: boolean;
    isTop?: boolean;
}
//
// import gameRouter from './modules/game';
// import accountRouter from './modules/account';
// import cashRouter from './modules/cash';
// import rewardsRouter from './modules/rewards';
// import reportRouter from './modules/report';
// import systemRouter from './modules/system';

// // 异步组件
// export const asyncRoutes = [
//     ...gameRouter,
//     ...accountRouter,
//     ...cashRouter,
//     ...rewardsRouter,
//     ...reportRouter,
//     ...systemRouter
// ];

/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 * meta.activeMenu ==> 详情页的时候可以设置菜单高亮 ,高亮菜单的path
 */

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Index.vue"),
        meta: { title: "首頁" },
    },
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
    path: "/:pathMatch(.*)",
    name: "notFound",
    redirect: "/404",
};

const router = createRouter({
    history: createWebHistory(), // history 模式
    // history: createWebHashHistory(), // hash 模式
    routes: constantRoutes,
});

export default router;
