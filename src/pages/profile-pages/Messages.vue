<script setup>
import {onMounted, watch, ref} from "vue";
import {useRouter} from "vue-router";
import Thread from "@/pages/profile-pages/components/Thread.vue";

const props = defineProps(['userID'])
const threads = ref([])
const router = useRouter()
const page = ref(0)

const draftThread = ref('');

async function getMessages (userID, newPage) {
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
  console.log(props.userID)
  try {
    const query = await getMessages(props.userID)
    console.log(query)
    if (threads.value !== undefined) {
      threads.value = query.messages;
    } else {
      threads.value = []
    }
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

    <div v-for="t in threads">
      <Thread :username="t.sender_username" :profile-picture="t.sender_profile_picture" :date-sent="new Date(t.date_of_creation)" :body="t.body" :thread-i-d="t.thread_id"/>
    </div>

    <br>

    <span v-if="page !== 0" @click="page--"> previous page </span> <span @click="page++" v-if="threads.length === 5">next page</span>
  </div>
</template>

<style scoped>

</style>