<script setup>

const props = defineProps(['sender', 'sender_username', 'thread_id', 'date_of_creation', 'sender_profile_picture', 'body'])


</script>

<template>
  <div><a :href="'/' + $props.sender_username">{{ $props.sender_username }}</a> {{$props.body}}</div>
</template>

<style scoped>

</style>