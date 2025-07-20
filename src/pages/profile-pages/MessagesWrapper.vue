<script setup>

const props=defineProps(['userID'])

</script>

<template>
  <RouterView :key="$route.fullPath" :userID="$props.userID"/>
</template>

<style scoped>

</style>