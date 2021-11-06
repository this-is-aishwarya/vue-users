.<template>
    <div>
        <p class="pagination-container">
            <i class="fas fa-angle-double-left" @click="changePage(0)" />
            <i class="fas fa-chevron-left" @click="changePage(-1)"/>
            <span class="inner-pagination-content">
                Page {{ page }} of {{ pages }}
                <span class="pagination-seperator">|</span>
            </span>
            <i class="fas fa-chevron-right" @click="changePage(1)"/>
            <i class="fas fa-angle-double-right" @click="changePage(pages)" />
        </p>
    </div>
</template>

<script>
    export default {
        props: ['totalRecords', 'perPageOptions'],
        data: function () {
        return {
            page: 1,
            perPage: this.perPageOptions[0]
        }
    },
    computed: {
        pages () {
            const remainder = this.totalRecords % this.perPage
            
            if (remainder > 0) {
                return Math.floor(this.totalRecords / this.perPage) + 1
            } else {
                return this.totalRecords / this.perPage
            }
        }
    },
    methods: {
        setPerPage(amount) {
            this.perPage = amount
            this.$emit('input', {page: this.page, perPage: amount})
        },
        changePage (val) {
            switch (val) {
                case 0: this.page = 1; break;
                case -1: this.page = this.page > 1 ? this.page - 1 : this.page; break;
                case 1: this.page = this.page < this.pages ? this.page + 1 : this.page; break;
                case this.pages: this.page = this.pages; break;
            }
            this.$emit('input', { page: this.page, perPage: this.perPage })
        }
    }
}
</script>

<style lang="scss" scoped>

    .pagination-container {
        display: flex;
        justify-content: flex-end;
        color: #444;
        margin-right: 20px;
    }

    .fas{
        width: 20px;
        text-align: center;
        cursor: pointer;
    }
</style>