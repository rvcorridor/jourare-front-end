<script setup>
const emit = defineEmits(['login'])

import LogInForm from "./components/LogInForm.vue";
import SignUpForm from "./components/SignUpForm.vue";

</script>

<template>
  <div id="sign-up-form">
    <SignUpForm @login="(n) => {$emit('login', n)}"/>
  </div>
  <div id="log-in-form">
    <LogInForm @login="(n) => {$emit('login', n)}"/>
  </div>
</template>

<style>
input {
  margin: 4px 0
}

.error-box {
  background-color: pink;
}
</style>