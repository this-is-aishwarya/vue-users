<template>
    <!-- <input type="text" v-model="search" placeholder="Enter ID or Name"> -->
    <div class="record-table">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Job Title</th>
                    <th>Email Address</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                </tr>
            </thead>
            
            <tr v-for="record in filteredRecords" :key="record.ID">
                <td>{{record.ID}}</td>
                <td>{{record.JobTitle}}</td>
                <td>{{record.EmailAddress}}</td>
                <td>{{record.FirstNameLastName}}</td>
                <td>{{record.Email}}</td>
                <td>{{record.Phone}}</td>
                <td>{{record.Company}}</td>
            </tr>
        </table>

        <div v-observe-visibility="handleScrolledToBottom">

        </div>
    </div>
    
</template>

<script>

import axios from 'axios';
// import { computed } from '@vue/reactivity';
    export default {
        name: "Record",
        data() {
            return{
                recordList: [],
                search: ''
            };
        },

        methods: {
            handleScrolledToBottom() {
                console.log("abc");
            }
        },

        computed: {
            filteredRecords: function(){
                return this.recordList.filter((record) => {
                    return record.ID.match(this.search) || record.FirstNameLastName.match(this.search);
                });
            }
        },

        async mounted(){
            // fetch("userdata.json").then(response => response.json()).then(data => (this.recordList = data));
            axios.get("userdata.json").then(response => {this.recordList = response.data.objects});
        }

};
</script>

<style scoped>

    .record-table{
        display: grid;
        justify-content: center;
        align-items: center;
        color: #4f546c;
        background-color: #f9fbff;
        font-family: Mukta, sans-serif;
    }
    table {
        border-collapse: collapse;
        box-shadow: 0 5px 10px #e1e5ee;
        background-color: white;
        text-align: left;
        overflow: hidden;
    }

    table thead {
        box-shadow: 0 5px 10px #e1e5ee;
        background-color: rgb(235, 188, 223);
    }

    table thead th {
        padding: 1rem 2rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        font-size: 0.7rem;
        font-weight: 900;
    }

  table td {
    padding: 1rem 2rem;
  } 
    
   table tr:nth-child(even) {
    background-color: #f4f6fb;
  }
</style>
