<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { user, logout } = useAuth();
</script>

<template>
  <div>
    <h1>Vicky</h1>
    <div v-if="user">
      <p>Welcome, {{ user.login }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
