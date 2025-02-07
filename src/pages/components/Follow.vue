<script setup>

import {computed} from "vue";

const props = defineProps(['initiates', 'receives', 'userID'])
const emit = defineEmits(['updateRelationship'])


const labels = computed(() => {
  return {
    followButton: props.initiates === 1 ? 'unfollow' : 'follow',
    showFollow: props.initiates !== 2 || props.receives !== 2
  }
})

async function toggleFollow () {
  if (props.initiates === 1) {
    const a = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + props.userID + "/followers", {
      method : 'DELETE',
      credentials : 'include',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    emit("updateRelationship", [['initiates', 0]])
  } else {
    const a = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + props.userID + "/followers", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    emit("updateRelationship", [['initiates', 1]])
  }
}

</script>

<template>

  <span @click="toggleFollow"><span v-if="props.receives === 1">(follows you)</span> {{ labels.followButton }} </span>

</template>

<style scoped>

</style>