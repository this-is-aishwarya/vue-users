<template>
  <Header />
  <div class="container">
    <Record />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Record from '@/components/Record.vue'
export default {
  name: 'App',
  components: {
    Header,
    Record,
  },
}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
