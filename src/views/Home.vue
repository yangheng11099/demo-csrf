<!--
 * @Author: yangheng 799644162@qq.com
 * @Date: 2025-04-18 16:24:26
 * @LastEditors: yangheng 799644162@qq.com
 * @LastEditTime: 2025-04-18 20:49:46
 * @FilePath: \vue3-api-demo\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <h1>Vue 3 API Demo</h1>
      <button @click="getBasicInfo">获取基本信息</button>
      <!-- <button @click="login">登录</button> -->
      <button @click="logout">登出</button>
      <button @click="getUserProfile">获取用户资料</button>
      <pre>{{ responseData }}</pre>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getBasicInfo, login, logout, getUserProfile } from '../api';
  
  export default {
    name: 'Home',
    setup() {
      const responseData = ref({});
  
      const fetchData = async (apiFunction) => {
        try {
          const data = await apiFunction();
          responseData.value = data;
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
  
      const getBasicInfoHandler = () => fetchData(getBasicInfo);
      const loginHandler = () => fetchData(() => login({ email: 'test@example.com', password: 'password' }));
      const logoutHandler = () => fetchData(logout);
      const getUserProfileHandler = () => fetchData(getUserProfile);
  
      return {
        responseData,
        getBasicInfo: getBasicInfoHandler,
        login: loginHandler,
        logout: logoutHandler,
        getUserProfile: getUserProfileHandler,
      };
    },
  };
  </script>