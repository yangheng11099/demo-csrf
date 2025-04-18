<template>
    <div class="login-container">
      <h1>用户登录</h1>
      {{ window }}

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">用户名</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login } from '../api';
import Cookies from 'js-cookie';
  
  // 定义响应式数据
  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const errorMessage = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      const response = await login({ email: email.value, password: password.value });      // 调用登录接口
      if (response.success) {
        router.push('/home');  // 跳转到主页  
      } else {
        errorMessage.value = response.message;  // 显示错误信息
      }
    } catch (error) {
      errorMessage.value = '登录失败，请稍后重试';  // 处理网络错误 
    }
     
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #dc3545;
    margin-top: 10px;
  }
  </style>