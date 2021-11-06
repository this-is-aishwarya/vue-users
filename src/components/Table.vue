<template>
    <div class="record-table">
        <table>
            <thead>
                <tr>
                    <th v-for="(obj, ind) in config" :key="ind">
                        {{ obj.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in theData" :key="index">
                    <td v-for="(obj, ind) in config" :key="ind">
                        {{row[obj.key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['theData', 'config'],
}
</script>

<style lang="scss">

    .record-table{
        overflow: auto;
        justify-content: center;
        align-items: center;
        color: #4f546c;
        background-color: #f9fbff;
        font-family: Mukta, sans-serif;
        
    }
    table {
        margin: 10px;
        margin-left: auto;  
        margin-right: auto;  
        border-collapse: collapse;
        box-shadow: 0 5px 10px #e1e5ee;
        background-color: white;
        text-align: left;
        width: 100%;
    }

    table thead {
        box-shadow: 0 5px 10px #e1e5ee;
        background-color: rgb(235, 188, 223);
        position: sticky;
        top: 0;
    }

    table thead tr{
        position: sticky;
        top: 0;
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