<script setup>

import {computed, onMounted, ref} from "vue";
import FeedPost from "@/pages/feed-components/Feed-Block.vue";
import FeedTextBox from "@/pages/feed-components/PlaintextInputBox.vue";
import {useRouter} from "vue-router";

const props=defineProps(['viewer', 'userID'])
const feed=ref([])
const currOffset=ref(5)
const morePosts = ref(true);
const router = useRouter();
const showTextBox = computed(() => {
  if (router.currentRoute.value.name === "feed") {
    return true;
  } else {
    return false;
  }

})

const source=computed(() => {
  if (router.currentRoute.value.name === "feed") {
    return "feed";
  } else {
    return `account/${props.userID}/statuses`;
  }
})


async function getFeed (offset, limit) {
  console.log(offset)
  const q = await fetch(import.meta.env.VITE_BACKEND_URL + `/${source.value}?` + new URLSearchParams({
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

  const query = await q.json()
  let array;

  if (router.currentRoute.value.name === "feed") {
    if (query.length === 0) morePosts.value = false;
    array = query;
  } else {
    if (query.statuses.length === 0) morePosts.value = false;
    array = query.statuses;
  }

  return array.map((x) => {
    return {
      post : x,
      showComments : false
    }
  });
}

onMounted(async () => {
  if (Number(props.userID) !== -1) {
    const query = await getFeed(0, 5)
    console.log(query);
    feed.value = query;
  }
})

async function loadMorePosts () {
  const query = await getFeed(currOffset.value, 5)
  currOffset.value += 5;
  feed.value = feed.value.concat(query)
  console.log(query);
}

</script>

<template>
  <div>
    <h1>Here are the latest posts...</h1>
    <FeedTextBox :url="`/account/${$props.viewer}/statuses/`" v-if="showTextBox" option="post"/>
    <div v-for="p in feed">
      <FeedPost :post="p.post" option="in-feed"/>
      <div v-if="p.showComments">

      </div>
    </div>

    <button @click="loadMorePosts" v-if="morePosts">Load more</button>
    <div v-else>No more posts</div>
  </div>


</template>

<style scoped>

</style>