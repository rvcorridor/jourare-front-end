<script setup>

const props=defineProps(["userID"])

import Status from "@/pages/feed-components/Status.vue";
</script>

<template>
  <div>
    <h1>Hey</h1>
    <RouterView :userID="$props.userID"/>
  </div>
</template>

<style scoped>

</style>