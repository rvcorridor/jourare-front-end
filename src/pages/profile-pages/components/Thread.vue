<script setup>

const props = defineProps(['username', 'profilePicture', 'body', 'dateSent', 'threadID'])

</script>

<template>
  <div>
    <router-link :to="{name : 'profile', params : { username : $props.username}}">
      <b> {{ $props.username }} </b>
    </router-link> said: <br>
    {{ $props.body }} <br>
    on {{ $props.dateSent.toDateString() }} <router-link :to="{name : 'thread', params : {username : $props.username, threadID : $props.threadID}}">(go to message)</router-link>
  </div>
</template>

<style scoped>

</style>