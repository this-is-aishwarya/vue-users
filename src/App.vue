<template>
  <Header />
  <div class="container">
    <Record />
  </div>
   <div v-observe-visibility="handleScrolledToBottom"></div>
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
  methods: {
            handleScrolledToBottom() {
                console.log("abc");
            }
        }
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
