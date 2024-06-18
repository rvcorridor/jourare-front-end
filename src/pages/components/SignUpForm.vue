<script setup>
import {ref} from 'vue'
const emit = defineEmits(['login'])
import doLogIn from './login.js'


const signup = ref({
  username : '',
  displayName : '',
  DOB : '2000-01-01',
  password : '',
  error : ''
})

async function handleSignUp() {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/account", {
    method : 'POST',
    credentials : 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(signup.value)
  })
  const responseBody = await response.json()

  if (responseBody.signup) {
    const response = await doLogIn(signup.value.username, signup.value.password)
    emit('login', { username : signup.value.username, response : response })
  } else {
    signup.value.error = `ERROR: ${responseBody.error}`
  }


}

</script>

<template>
  <h1>Sign Up</h1>
  <div id="signup-error" class="error-box" v-show="signup.error.length !== 0">
    <div v-for="e in signup.error"> {{ e }} </div>
  </div>
  <form @submit.prevent="handleSignUp">
    <input type="text" v-model="signup.displayName" name="display-name" minlength="1"
           maxlength="30" placeholder="display name" required/><br>
    <input type="text" v-model="signup.username" autocomplete="username" minlength="5"
           maxlength="20" placeholder="username" required/><br>
    <input type="date" v-model="signup.DOB" name="date-of-birth" required/><br>
    <input type="password" v-model="signup.password" autocomplete="new-password" minlength="8"
           placeholder="password" required/><br>
    <input type="submit" />
  </form>
</template>

<style scoped>

</style>