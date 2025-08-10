<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import StatusComponent from "@/pages/feed-components/Status-Component.vue";

const route = useRoute()
const router = useRouter()
const props = defineProps(["userID"])
const post = ref({})

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
  if (m.gotStatus === true)
  post.value = m.data;
});

</script>

<template>
<div>
  <Status-Component :post="post" :comment-section="true" :key="post.status_id"/>
</div>
</template>

<style scoped>

</style>