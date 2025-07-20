<script setup>

const props = defineProps(['message'])

</script>

<template>
  <div>
    <router-link :to="{name : 'profile', params : { username : $props.message.username}}">
      <b> {{ $props.message.username }} </b>
    </router-link> said: <br>
    {{ $props.message.body }} <br>
    on {{ $props.message.dateSent.toDateString() }} <router-link :to="{name : 'thread', params : {username : props.message.username, threadID : props.message.threadID}}">(go to message)</router-link>
  </div>
</template>

<style scoped>

</style>