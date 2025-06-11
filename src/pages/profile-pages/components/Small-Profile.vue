<script setup>

const props=defineProps(['displayName', 'userID', 'username', 'profilePicture'])


</script>

<template>
  <img :src="`/${profilePicture}`" alt="Profile picture">
  <div>
    <RouterLink :to="`/${username}`">
      <b>{{ displayName }}</b>
      <span>{{ username }}</span>
    </RouterLink>
  </div>

</template>

<style scoped>

</style>