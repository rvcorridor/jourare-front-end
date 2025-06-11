<script setup>

import {useRoute, useRouter} from "vue-router";
import FeedPost from "@/pages/feed-components/Feed-Post.vue";
import {onMounted, ref} from "vue";

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
  <FeedPost :post="post"/>
</div>
</template>

<style scoped>

</style>