<script setup>

import FeedBlock from "@/pages/feed-components/Feed-Block.vue";
import CommentSection from "@/pages/feed-components/Comment-Section.vue";
import {computed} from "vue";

const props = defineProps(['post', 'comment-section']);
const showComments=computed(() => {
  if ("commentSection" in props) return props.commentSection;
  else return false;
})

</script>

<template>
  <Feed-Block :post="$props.post"/>
  <CommentSection :user-i-d="$props.post.poster" :post-i-d="$props.post.status_id" v-if="showComments"/>
</template>

<style scoped>

</style>