<script setup>
import {onMounted, watch, ref, computed} from "vue";
import {useRouter} from "vue-router";
import Thread from "@/pages/profile-pages/components/Thread.vue";

const props = defineProps(['userID'])
const threads = ref([])
const threadsLoop = computed(() => {
  return threads.value.map((t) => {
    return {
      username : t.sender_username,
      body : t.body,
      dateSent : new Date(t.date_of_creation),
      threadID : t.thread_id
    }
  })
})
const router = useRouter()
const page = ref(0)

const draftThread = ref('');

async function getMessages (userID, newPage) {
  if (userID === -1) return;
  const q = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + props.userID + "/threads?" + new URLSearchParams({
    page : isNaN(newPage) ? 0 : newPage
  }), {
    method : 'GET',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return q.json();
}


onMounted(async () => {
  try {
    const query = await getMessages(props.userID)
    console.log(query)
    if (threads.value !== undefined) {
      threads.value = query.messages;
    } else {
      threads.value = []
    }
    console.log(threads.value)
    console.log(threadsLoop.value)
    //updateThreads(query.messages)
  } catch (e) {
    console.log(e)
    console.log('uh oh')
    // do nothing
  }
})

/*

watch(() => props.userID, async (newVal) => {
  const query = await getMessages(newVal)
  updateThreads(query.messages)
})*/

watch(() => page.value, async (newVal) => {
  const query = await getMessages(props.userID, newVal)
  threads.value = query.messages
  // updateThreads(query.messages)
})

async function sendMessage () {
  const q = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + props.userID + "/threads", {
    method : 'POST',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      body : draftThread.value
    })
  })

  const response = await q.json()

  console.log(response)

  if (response.created) {
    router.go()
  }
}



</script>

<template>
  <div>
    <form @submit.prevent="sendMessage">
      <textarea v-model="draftThread"></textarea>
      <input type="submit">
    </form>

    <div v-for="t in threadsLoop">
      <Thread :message="t"/>
    </div>

    <br>

    <span v-if="page !== 0" @click="page--"> previous page </span> <span @click="page++" v-if="threads.length === 5">next page</span>
  </div>
</template>

<style scoped>

</style>