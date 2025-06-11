<script setup>

import {computed, onMounted, ref} from "vue";
import FeedPost from "@/pages/feed-components/Feed-Post.vue";

const props=defineProps(['userID'])
const feed=ref([])
const currOffset=ref(5)


async function getFeed (offset, limit) {
  const q = await fetch(import.meta.env.VITE_BACKEND_URL + "/feed?" + new URLSearchParams({
    "offset" : isNaN(offset) ? 0 : offset,
    "limit" : isNaN(limit) ? 5 : limit
  }), {
    method : 'GET',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return q.json()
}

onMounted(async () => {
  console.log(props.userID)
  const query = await getFeed(0, 5)
  console.log(query)
  feed.value=query;
  console.log(feed.value);

})

async function loadMorePosts () {
  const query = await getFeed(currOffset.value, 5)
  feed.value = feed.value.concat(query)
  currOffset.value += 5;
  console.log(feed.value);

}




</script>

<template>
  <div>
    <h1>Here are the latest posts...</h1>
    <div v-for="p in feed">
      <FeedPost :post="p" option="in-feed"/>
    </div>

    <button @click="loadMorePosts">Load more</button>
  </div>


</template>

<style scoped>

</style>