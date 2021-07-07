<template>
  <div class="about">
    <h1>This is an login page</h1>
    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <button type="button" @click="handleLogin">Logar</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    ...mapActions('authentication', ['requestLogin']),
    handleLogin() {
      const { email, password } = this
      this.requestLogin({email, password})
    }
  }
}
</script>