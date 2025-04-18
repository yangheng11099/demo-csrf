/*
 * @Author: yangheng 799644162@qq.com
 * @Date: 2025-04-18 16:25:32
 * @LastEditors: yangheng 799644162@qq.com
 * @LastEditTime: 2025-04-18 16:51:04
 * @FilePath: \vue3-api-demo\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../components/Login.vue';

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
