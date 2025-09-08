<script setup>

import {computed, onMounted, ref} from "vue";
import Status from "@/pages/feed-components/Status.vue";
import FeedBlock from "@/pages/feed-components/Feed-Block.vue";
import PlaintextInputBox from "@/pages/feed-components/PlaintextInputBox.vue";

const props=defineProps(['userID', 'postID'])
const commentOffset=ref(0)
const comments=ref([])
const currTimeStamp=ref(new Date());
const endOfComments=ref(false);
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

async function loadMoreComments () {
  if (props.userID === -1 || props.userID === undefined) return;
  const m = await getComments(props.postID, commentOffset.value, 5);
  comments.value = comments.value.concat(m.comments);
  commentOffset.value += m.comments.length;
  console.log(commentOffset.value)

  if (m.comments.length < 5) {
    endOfComments.value = true;
  }
}

onMounted(async () => {
  if (props.userID === -1 || props.userID === undefined) return;
  const m = await getComments(props.postID, 0, 5)
  comments.value=m.comments;
  commentOffset.value += m.comments.length;
  console.log(commentOffset.value)
})

</script>

<template>
  <div>Comments</div>

  <div v-for="x in commentsAsPost">
    <FeedBlock :post="x" :option="'comment'"/>
  </div>
  <div v-if="!endOfComments">
    <button @click="loadMoreComments">Load more</button>
  </div>
  <PlaintextInputBox :url="`/account/${$props.userID}/statuses/${$props.postID}/comments`" option="comment"></PlaintextInputBox>
</template>

<style scoped>

</style>