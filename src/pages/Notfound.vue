<!-- src/components/NotFound.vue -->
<template>
    <div class="not-found">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <router-link :to="redirectRoute">Go Back</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    computed: {
    redirectRoute() {
      return localStorage.getItem('authToken') ? '/dashboard' : '/login';
    }
  }
  };
  </script>
  
  <style scoped>
  .not-found {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f5f5f5; /* optional, for better visibility */
  }
  

  </style>
  