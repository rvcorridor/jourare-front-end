<script setup>
import {computed, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import Follow from "@/pages/components/Follow.vue";

const route = useRoute()
const router = useRouter()
const props = defineProps(['viewer'])

const profile = ref({
  displayName : "",
  username : route.params.username,
  userID : -1,
  profilePicture : "",
  tagline : "",
  signedUp : new Date(),
  relationship : {}
})

const pfpURL = computed(() => {
  return import.meta.env.VITE_BACKEND_URL + "/account/profile-picture/" + profile.value.profilePicture
})

async function updateProfile (username) {
  const query = await fetch(import.meta.env.VITE_BACKEND_URL + "/account/" + username, {
    method : 'GET',
    credentials : 'include',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const q = await query.json()

  if (q.gotProfile) {
    let p = profile.value
    p.userID = q.details.user_id
    p.displayName = q.details.display_name
    p.signedUp = new Date(q.details.date_of_creation)
    p.tagline = q.details.tagline
    p.relationship = {
      initiates : q.details.initiates,
      receives : q.details.receives
    }
    p.profilePicture = q.details.profile_picture
  }
}

updateProfile(route.params.username)

watch(() => route.params.username, (newVal) => {
  profile.value.username = newVal
  console.log('hi')
  updateProfile(newVal)
})

function updateRelationship (changes) {
  changes.map(c => {
    profile.value.relationship[c[0]] = c[1]
  })
}


</script>

<template>
  <div>
    <div id="profile-header">
      <div id="profile-picture-box">
        <router-link :to="{name : 'profile', params : { username : profile.username}}">
      <img :src="pfpURL" alt="profile picture" width="50" v-if="profile.profilePicture"/>
        </router-link>
      </div>
      <div id="profile-name-box">
        <b>{{ profile.displayName }}</b> {{ (profile.username) }}
      </div>
    </div>

    <div id="follow">
      <Follow v-bind:initiates="profile.relationship.initiates" v-bind:receives="profile.relationship.receives"
              v-bind:userID="profile.userID" v-if="Number(profile.userID) !== Number($props.viewer)"
              @update-relationship="updateRelationship" class="button"/>
      <span v-else class="button">(your profile)</span>
    </div>

    <div>
      <div id="profile-tagline"> {{ profile.tagline }} </div>
      <div id="join-date"> Joined {{ profile.signedUp.toDateString() }} </div>
      <div id="profile-navigation">
        <router-link :to="{name : 'messages', params : { username : profile.username}}">Send message</router-link>&nbsp;
        <router-link :to="{name : 'journals', params : { username : profile.username}}">View journals</router-link>&nbsp;
        <router-link :to="{name : 'statuses', params : { username : profile.username}}">View statuses</router-link> &nbsp;
        <router-link :to="{name : 'followers', params : { username : profile.username}}">View followers</router-link>
      </div>

      <RouterView :key="profile.userID" :userID="profile.userID" v-slot="{ Component }">
      </RouterView>
    </div>
  </div>
</template>

<style scoped>

#profile-name-box {
  font-size: 24pt
}

#profile-tagline {
  font-size: 12pt
}

.button {
  opacity : 50%
}

.router-link-active {
  color: black;
}


</style>