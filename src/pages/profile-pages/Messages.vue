<script setup>
import {ref, watch, defineEmits, computed} from "vue";
import Thread from "@/pages/profile-pages/components/Thread.vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router"

const props = defineProps(['userID', 'threads'])
const emit = defineEmits(['updateThreads'])
const message = ref("")
const page = ref(0)
const route = useRoute()

async function getThreads (userID) {
  const messages = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + userID + "/threads", {
    method : "GET",
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return messages.json()
}

async function sendMessage () {

}

watch (() => props.userID, async (newVal, oldVal) => {
  const query = await getThreads(newVal)
  console.log(query)
  props.threads = query.messages
  emit("updateThreads", query)
})

onBeforeRouteUpdate(async () => {
  const query = await getThreads(props.userID)
  console.log('works!')
  props.threads = query.messages
  emit("updateThreads", query)
})

</script>

<template>
  <div id="send-message"><br>
    <form @submit.prevent="">
      <textarea v-model="message" id='message-area'></textarea><br>
      <input type="submit" />
    </form>
  </div>
  <div>
    <Thread v-for="t in $props.threads" v-bind="t"/>
  </div>

</template>

<style scoped>

#message-area {
  width : 100%;
  height: 100px
}

</style>