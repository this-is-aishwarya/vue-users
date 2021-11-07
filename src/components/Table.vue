.<template>
    <div class="record-section">
        <input type="search" v-model="filter" placeholder="Enter ID or Name">
        <table id="dataTable">
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
            <tbody>
                <tr v-for="(user, index) in displayedUsers" :key="index">
                    <td>{{user.ID}}</td>
                    <td>{{user.JobTitle}}</td>
                    <td>{{user.EmailAddress}}</td>
                    <td>{{user.FirstNameLastName}}</td>
                    <td>{{user.Email}}</td>
                    <td>{{user.Phone}}</td>
                    <td>{{user.Company}}</td>
                </tr>
            </tbody>

        </table>

        <div class="navigation" aria-label="Page navigation">
            <ul>
                <li class="num">
                    <a href="#" @click="page = 1" aria-label="First">
                    <span class="control" aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="num">
                    <a href="#" v-if="page != 1" @click="page--" aria-label="Previous">
                    <span class="control" aria-hidden="true">&lsaquo;</span>
                    </a>
                </li>
                <li class="num" v-for="pageNumber in pages.slice(page-1, page+4)" :class="{'active': page === pageNumber}" :key="pageNumber"><a href="#" @click="page = pageNumber"><span>{{pageNumber}}</span></a></li>
                <li class="num">
                    <a href="#" @click="page++" v-if="page < pages.length" aria-label="Next">
                    <span class="control" aria-hidden="true">&rsaquo;</span>
                    </a>
                </li>
                <li class="num">
                    <a href="#" @click="page = pages.length" aria-label="Last">
                    <span class="control" aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                users: [],
                loading: true,
                errored: false,
                page: 1,
                perPage: 5,
                pages: [],
                filter: '',
            }
        },
        methods: {
            getUsers(){
                axios
                .get('data.json')
                .then(response => {
                    this.users = response.data.objects
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
            },

            setPages() {
                var numberOfPages = Math.ceil(this.users.length / this.perPage);
                for (var index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate(users) {
                var page = this.page;
                var perPage = this.perPage;
                var from = (page * perPage) - perPage;
                var to = (page * perPage);
                return users.slice(from, to);
            },
        },
        created() {
            this.getUsers();
        },
        watch: {
            users() {
                this.setPages();
            },
            filter() {
                console.log('reset to p1 due to filter');
                this.page = 1;
            }
        },
        computed: {
            filteredRecords() {
                return this.users.filter((user) => {
                    return user.ID == this.filter || user.FirstNameLastName.match(this.filter) ;
                });

                // return this.users.filter((user) =>{
                //     return user.ID == 11;
                // });                           
            },

            
            displayedUsers() {
                return this.paginate(this.filteredRecords);
            },
        },
        // filters: {
        //     lowercase(value) {
        //         return value.toLowerCase();
        //     },
        //     capitalize(value) {
        //         return value.charAt(0).toUpperCase() + value.slice(1);
        //     }
        // }
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
    input[type="search"]::placeholder {    
        text-align: center;
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

    .navigation {
        display: flex;
        justify-content: center;
        padding: 30px;
    }

    ul{
        list-style: none;
        display: inline-block;
    }

    .num {
        display: inline-block;
    }

    .control{
        padding: 10px 20px;
        background-color: #e91e62e1;
        color: #fff;
    }

    span {
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 60px;
        height: 60px;
        color: #333;
        box-shadow: 0 0 5px 1px #21212159;
        margin: 5px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        transition: 0.75s;
    }
</style>