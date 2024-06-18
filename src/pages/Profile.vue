<script setup>

import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {ref, computed, watch} from "vue";
const route = useRoute()

const userInformation = ref({
  username: route.params.username,
  displayName : "loading...",
  relationship: {
    'initiates' : 0, // status of logged in user Xs viewed
    'receives' : 0 // status of viewed Xs logged in user
  },
  userID : 0,
  tagline : '',
  joined : Date(),
  profilePicture : null
})

const threads = ref({
  page : 0,
  threads : []
})

const labels = computed(() => {
  return {
    'follow-button' : userInformation.value.relationship.initiates === 1 ? 'unfollow' : 'follow',
    'is-blocked' : !(userInformation.value.relationship.initiates === 2 || userInformation.value.relationship.receives === 2),
    'block-button' : userInformation.value.relationship.initiates === 2 ? 'unblock' : 'block',
    'relationship' : userInformation.value.relationship.receives === 1 ? 'follows you' : '',
    'show-profile-picture' : userInformation.value.profilePicture !== null
  }
})

const editingTagline = ref(false)

async function getProfile (username) {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + username, {
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return response.json();
}

async function updateProfile (response) {
  const details = response.details
  if (response.gotProfile) {
    userInformation.value.displayName = details.display_name
    userInformation.value.relationship.initiates = details.initiates
    userInformation.value.relationship.receives = details.receives
    userInformation.value.userID = details.user_id
    userInformation.value.tagline = details.tagline
    console.log(details.joined)
    userInformation.value.joined = new Date(details.date_of_creation)
    userInformation.value.profilePicture = typeof details.profile_picture === 'string' ? import.meta.env.VITE_BACKEND_URL + "/account/profile-picture/"+ details.profile_picture : null
  } else {
    throw Error('umm')
  }

}

getProfile(userInformation.value.username).then(response => updateProfile(response))

async function toggleFollow () {
  if (userInformation.value.relationship.initiates === 0 || userInformation.value.relationship.initiates === null) {
    await followPerson()
    userInformation.value.relationship.initiates = 1
  } else {
    await unfollowPerson()
    userInformation.value.relationship.initiates = 0
  }
}

async function followPerson () {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + userInformation.value.userID + "/followers", {
    method : "POST",
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

async function unfollowPerson () {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + userInformation.value.userID + "/followers", {
    method : "DELETE",
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

async function toggleBlock () {
  if (userInformation.value.relationship.initiates === 0 || userInformation.value.relationship.initiates === null ||
      userInformation.value.relationship.initiates === 1) {
    await blockPerson()
    userInformation.value.relationship.initiates = 2
    userInformation.value.relationship.receives = userInformation.value.relationship.receives === 1 ? 0 : userInformation.value.relationship.receives
  } else {
    await unblockPerson()
    userInformation.value.relationship.initiates = 0
  }
}

async function blockPerson () {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + userInformation.value.userID + "/blockers", {
    method : "POST",
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

async function unblockPerson () {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + userInformation.value.userID + "/blockers", {
    method : "DELETE",
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

async function updateThreads (query) {
  threads.value.threads = query.messages
}

watch(() => route.params.username, async (newU, oldU) => {
  const response = await getProfile(newU)
  await updateProfile(response)

})

</script>

<template>

  <img :src="userInformation.profilePicture" height = '50' v-if="labels['show-profile-picture']"/>
  <div><RouterLink :to="{name : 'profile'}"><b>{{ userInformation.displayName }}</b> ({{ $route.params.username }}) <span>{{ labels.relationship }}</span></RouterLink></div>
  <div> <span @click="toggleFollow" v-if="labels['is-blocked']">{{ labels["follow-button"] }} </span> || <span @click="toggleBlock">{{ labels["block-button"] }}</span> </div>

  <div>{{ userInformation.tagline }}</div>
  <div style="text-transform: capitalize">{{ `Joined on ${userInformation.joined.toString()}` }}</div>
  <div v-if="labels['is-blocked']">
    <RouterLink :to="{name : 'messages'}">Messages</RouterLink>&nbsp;
    <RouterLink :to="{name : 'journals'}">Journals</RouterLink>&nbsp;
    <RouterLink :to="{name : 'statuses'}">Statuses</RouterLink>&nbsp;
  </div>

  <RouterView :userID="userInformation.userID" :threads="threads.threads" @updateThreads="updateThreads"/>
</template>

<style scoped>

</style>