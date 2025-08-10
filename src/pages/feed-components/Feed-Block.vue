<script setup>

import {computed, onMounted} from "vue";
import CommentSection from "@/pages/feed-components/Comment-Section.vue";

const props=defineProps(['post', 'option'])
const computedLink=computed(() => {
  if (props.option !== 'comment') {
    return {
      name : 'statusPost',
      params : {
        username : props.post.username,
        statusID : props.post.status_id
      }
    }
  } else return {
    name : "home"
  }
})

const pfpURL = computed(() => {
  return props.post.profile_picture ? import.meta.env.VITE_BACKEND_URL + "/account/profile-picture/" + props.post.profile_picture : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
})

</script>

<template>
  <div class="post">
    <img :src="pfpURL" width="40px" class="profile-picture">
      <RouterLink :to="{name : 'profile', params : { username : $props.post.username }}">
        {{ $props.post.display_name }} {{ $props.post.username }}
      </RouterLink>
    <div class="body">
      {{ $props.post.body }}
    </div>
    <div class="footer">
      <span>
        <RouterLink :to="computedLink">
          {{ (new Date(post.date_of_creation)).toLocaleString() }}
        </RouterLink>
      </span>
      <span class="stats">
        <span> comment {{$props.post.comments}} </span>&nbsp;
        <span> like {{$props.post.likes}} </span>
      </span>
    </div>

  </div>
</template>

<style scoped>

.profile-picture {
  float: left;
  margin: 10px
}

.post {
  min-height: 50px;
  margin: 10px 10px;
  width: 500px
}

.stats {
  float: right
}

.body {

}

.footer {
  opacity: 0.5
}

</style>