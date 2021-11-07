.<template>
    <div class="record-section">

        <!-- Search Input Field -->
        <div class="wrapper">
            <div class="input">
                <input type="search" v-model="filter" placeholder=" Enter ID or Name">
                <span class="bubble">Search</span>
            </div>
        </div>

        <!-- User List Table -->
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

        <!-- Pagination -->
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
                perPage: 100,
                pages: [],
                filter: '',
            }
        },
        methods: {

            // Rendering JSON data with Axios
            getUsers(){
                axios.get('data.json')
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
                console.log('Resetting to Page 1 due to filter');
                this.page = 1;
            }
        },

        computed: {
            filteredRecords() {
                return this.users.filter((user) => {
                    return user.ID == this.filter || user.FirstNameLastName.match(this.filter) ;
                });                          
            },
            
            displayedUsers() {
                return this.paginate(this.filteredRecords);
            },
        },
};
</script>

<style scoped>

    .record-table{
        overflow: auto;
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
        background-color: rgb(236, 170, 220);
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

    .wrapper{
        padding: 20px;
        margin: auto;
    }

    .input{
        position: relative;
        display: flex;
        height: 4rem;
        border: 0;
        border-radius: 4rem;
        background: rgb(247, 235, 244);
    }

    .bubble{
        position: absolute;
        top: 0.25rem;
        left: 0.5rem;
        display: grid;
        place-items: center;
        height: 3rem;
        width: 6rem;
        font-size: 0.875rem;
        border-radius: inherit;
        background: #363472;
        color: #fff;
        pointer-events: none;
        transition: all 0.35s;
        letter-spacing: 1px;
    }

    input {
        flex: 1 1 auto;
        padding-left: 6.5rem;
        height: inherit;
        border: 0;
        outline: none;
        background: transparent;
        font-size: 1rem;
        text-indent: 0.625rem;
        transition: all 0.35s;
    }

    input::placeholder {
        color: #9b9ba5;
    }

    input:focus {
        transform: translateX(-6rem);
    }

    input:focus ~ span {
        transform: translateY(-4rem);
    }
</style>