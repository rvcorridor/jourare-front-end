<script setup>
import {computed, onMounted, ref} from 'vue'

const currentUser = ref({
  loggedIn : false,
  username : undefined,
  userID : undefined
})

const currUserLink = computed(() => {
  return `/${currentUser.value.username}`;
})

async function fetchDetails () {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/session", {
    method : 'GET',
    credentials : 'include'
  })
  const responseJSON = await response.json()

  if (responseJSON.loggedIn) {
    currentUser.value.loggedIn = true
    currentUser.value.username = responseJSON.sessionDetails.username
    currentUser.value.userID = responseJSON.sessionDetails.user_id
  } else {
    // do nothing
  }
}

function login (n) {
  currentUser.value.username = n.username;
  currentUser.value.userID = n.response.info.user_id;
  currentUser.value.loggedIn = true;
}
async function logout() {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/session", {
    method : 'DELETE',
    credentials: 'include'
  })

  const responseJSON = await response.json()

  if (responseJSON.logout) {
    currentUser.value.username = undefined
    currentUser.value.userID = undefined
    currentUser.value.loggedIn = false
  }
}

onMounted(() => fetchDetails())

</script>

<template>
  <header>
    <div id="title-logo">
      <span id="jou-logo">Jourare.</span>
      <div id="tgl-logo">The journal to share.</div>
    </div>
    <div id="navigation">
      <RouterLink to="/">Home</RouterLink>&nbsp;
      <span v-if="currentUser.loggedIn">
        <RouterLink to="/feed">
          Your feed
        </RouterLink>&nbsp;
      </span>&nbsp;
      <RouterLink to="/options">
        Options
      </RouterLink>&nbsp;
      <span v-if="currentUser.loggedIn">
        <RouterLink v-bind:to="currUserLink">
          {{ currentUser.username }}
        </RouterLink>&nbsp;
        <a @click="logout">Log Out</a>
      </span>
      <RouterLink to="/login" v-else>
        Sign up / Log in
      </RouterLink>&nbsp;
    </div>
  </header>

  <main>
    <RouterView @login="login" v-bind="{viewer : currentUser.userID}"/>
  </main>
</template>

<style>
#title-logo {
  font-family: times new roman, serif;
  font-size: 36pt;
}

#tgl-logo {
  position: relative;
  left: 0.95em;
  top: -0.8em;
  font-size: 0.33em
}

header {
  display : grid;
  grid-template-columns: 250px auto;
}
#navigation {
  margin-top: 25px
}

a:visited {
  color : #0000EE;
}

a:active {
  color: inherit;
}
</style>
