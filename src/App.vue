<template>
  <Header />
  <div class="container">
    <!-- <Record /> -->
    <Table />
  </div>
</template>

<script>

import Header from '@/components/Header'
// import Record from '@/components/Record.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'App',
  components: {
    Header,
    // Record,
    Table
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
