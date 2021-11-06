<template>
  <div id="app">
    <nav />
    <Pagination  v-if="tableData" :totalRecords="tableData.length" :perPageOptions="[20, 50, 100]" v-model="pagination"/>
    <Table v-if="tableData" :theData="computedTableData" :config="config" :style="{height: '600px'}"/>
  </div>
</template>

<script>
import Table from './components/Table'
import Pagination from './components/Pagination.vue'

const perPageOptions = [20, 50, 100]

export default {
  components: {
    Table,
    Pagination,
  },
  data: function() {
    return {
      perPageOptions,
      tableData: undefined,
      pagination: { page: 1, perPage: perPageOptions[0] },
      config: [
        {
          key: 'ID',
          title: 'ID'
        },
        {
          key: 'JobTitle',
          title: 'Job Title'
        },
        {
          key: 'EmailAddress',
          title: 'Email Address'
        },
        {
          key: 'FirstNameLastName',
          title: 'Name'
        },
        {
          key: 'Email',
          title: 'Email'
        },
        {
          key: 'Phone',
          title: 'Phone'
        },
        {
          key: 'Company',
          title: 'Company'
        }
      ]
  }},
  computed: {
    computedTableData () {
      if (!this.tableData) return []
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage
        const lastIndex = this.pagination.page * this.pagination.perPage
        return this.tableData.slice(firstIndex, lastIndex)
      }
    }
  },
    mounted () {
    this.$axios.get("data.json")
    .then(({data}) => {
      this.tableData = data.objects
    })
  }
}
    
</script>

<style>

  body {
    font-family: Mukta, sans-serif;
    margin: 0;
  }

  nav{
    height: 60px;
    background: #222;

  }
</style>
