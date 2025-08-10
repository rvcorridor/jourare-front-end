<script setup>
import {ref} from "vue";
import router from "@/router.js";

const props=defineProps(['url'])
const post=ref("");

async function sendPost () {
  const query = await fetch(`${import.meta.env.VITE_BACKEND_URL}${props.url}`, {
    method : 'POST',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      postBody : post.value
    })

  })

  const a = await query.json()
  console.log(a);

  if (a.posted) {
    router.go();
  }
}

</script>

<template>
  <div id="feed-text-border">
    <form @submit.prevent="sendPost">
      <textarea id="feed-text-box" v-model="post"/>
      <input type="submit" />
    </form>
  </div>

</template>

<style scoped>

#feed-text-border {
  padding: 5px;
  border: 1px solid black;
  border-radius: 3px;
  width: 600px;
}

#feed-text-box {
  width: 598px;
  padding: 1px;
  min-height: 3em;
  max-height: 6em;
  resize: none;
  overflow: hidden scroll;
}

</style>