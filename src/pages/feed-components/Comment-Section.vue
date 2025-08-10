<script setup>

import {computed, onMounted, ref} from "vue";
import Status from "@/pages/feed-components/Status.vue";
import FeedBlock from "@/pages/feed-components/Feed-Block.vue";

const props=defineProps(['userID', 'postID'])
const commentOffset=ref(0)
const comments=ref([])
const currTimeStamp=ref(new Date());
const limit=5
const commentsAsPost=computed(() => {
  const arr = []
  for (const x of comments.value) {
    arr.push({
      display_name : x.display_name,
      profile_picture : x.profile_picture,
      body : x.body,
      date_of_creation : x.date_of_creation,
      username : x.username
    })
  }
  return arr
})

async function getComments(postID, offset, limit) {
  const query = await fetch( `${import.meta.env.VITE_BACKEND_URL}/account/${props.userID}/statuses/${postID}/comments?` + new URLSearchParams({
    "offset": offset,
    "limit" : limit
  }),{
    method: 'GET',
    credentials: "include",
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return query.json();
}

onMounted(async () => {
  if (props.userID === -1 || props.userID === undefined) return;
  const m = await getComments(props.postID, 0, 5)
  comments.value=m.comments;
})

</script>

<template>
  <div>Comments</div>
  <div v-for="x in commentsAsPost">
    <FeedBlock :post="x" :option="'comment'"/>
  </div>
</template>

<style scoped>

</style>