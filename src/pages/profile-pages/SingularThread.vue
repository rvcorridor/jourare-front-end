<script setup>

import Thread from "@/pages/profile-pages/components/Thread.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()
const props=defineProps(['userID'])

const computedMessage = ref({
  username : route.params.username,
  body : "",
  dateSent : new Date(),
  threadID : route.params.threadID
})

onMounted(async () => {
  if (props.userID == -1) return;
  const query = await fetch(`${import.meta.env.VITE_BACKEND_URL}/account/${props.userID}/threads/${route.params.threadID}`, {
    method : 'GET',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const a = await query.json()
  computedMessage.value.body = a.thread.body;
  computedMessage.value.dateSent = new Date(a.thread.date_of_creation);
})

</script>

<template>
  <Thread :message="computedMessage" v-if="body !== ''" />
</template>

<style scoped>

</style>