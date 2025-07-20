<script setup>

import {useRoute, useRouter} from "vue-router";
import FeedPost from "@/pages/feed-components/Feed-Post.vue";
import {onMounted, ref} from "vue";
import CommentSection from "@/pages/feed-components/Comment-Section.vue";

const route = useRoute()
const router = useRouter()
const props = defineProps(["userID"])
const post = ref({})

console.log(route.params.statusID);

async function getPost (statusID) {
  const q = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + props.userID + "/statuses/" + statusID, {
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
  if (props.userID === -1) return;
  const m = await getPost(route.params.statusID)
  console.log(m)
  post.value = m;

});

</script>

<template>
<div>
  <FeedPost :post="post" :key="`status:${route.params.statusID}`"/>
  <CommentSection :user-i-d="$props.userID" :post-i-d="route.params.statusID"/>
</div>
</template>

<style scoped>

</style>