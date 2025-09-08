<script setup>
import {ref} from "vue";
import router from "@/router.js";

const props=defineProps(['url', 'option'])
const post=ref("");

async function sendPost () {
  let body={};
  if (props.option === "post") {
    body.postBody = post.value;
  } else if (props.option === "comment") {
    body.commentBody = post.value;

  }
  const query = await fetch(`${import.meta.env.VITE_BACKEND_URL}${props.url}`, {
    method : 'POST',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)

  })

  const a = await query.json()
  console.log(a);

  if (a.posted) {
    router.go();
  }
}

</script>

<template>
    <form @submit.prevent="sendPost">
      <textarea id="feed-text-box" v-model="post"/>
      <input type="submit" value="Post!"/>
    </form>

</template>

<style scoped>

#feed-text-box {
  width: 598px;
  padding: 1px;
  min-height: 3em;
  max-height: 6em;
  resize: none;
  overflow: hidden scroll;
}

</style>