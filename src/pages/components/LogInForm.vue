<script setup>
import {ref} from 'vue'
import doLogIn from './login.js'

const emit = defineEmits(['login'])

const login = ref({
  username : '',
  password : '',
  error : []
})

async function handleLogIn () {
  const response = await doLogIn(login.value.username, login.value.password)
  if (response.login) {
    emit('login', { username : login.value.username, response : response })
  } else {
    login.value.error = [ response.error ]
  }
}



</script>

<template>
  <h1>Log In</h1>
  <div id="login-error" class="error-box" v-show="login.error.length !== 0">
    <span v-for="e in login.error"> {{ e }} </span>
  </div>
  <form @submit.prevent="handleLogIn">
    <input type="text" v-model="login.username" autocomplete="username"
           maxlength="20" placeholder="username" required/><br>
    <input type="password" v-model="login.password" autocomplete="current-password"
           placeholder="password" required/><br>
    <input type="submit" />
  </form>
</template>

<style scoped>

</style>