<template>
<b-modal id="add-category" title="Añadir categoria">
    <b-container>
        <b-row>
            <b-col>
                <b-form-group
                label="Seleccione la categoria"
                label-for="select-categories">
                    <b-form-select
                    id="select-categories"
                    v-model="category_id"
                    :options="options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button
        variant="primary"
        @click="addCategory">
            <i class="icon-check" v-show="!loading"></i>
            <span class="spinner-border spinner-border-sm" v-show="loading"></span>
            Agregar
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
    props: ['selected_articles', 'article', 'categories'],
    data() {
        return {
            loading: false,
            category_id: 0,
        }
    },
    computed: {
        options() {
            let options = []
            options.push({text: 'Seleccione la categoría', value: 0})
            this.categories.forEach(category => {
                options.push({text: category.name, value: category.id})
            })
            return options
        }
    },
    methods: {
        addCategory() {
            this.loading = true
            this.$api.post('articles/category', {
                category_id: this.category_id,
                articles_id: this.selected_articles.selected_articles,
            })
            .then(res => {
                console.log(res.data)
                this.loading = false
                this.$toast.success('Categoria agregada correctamente')
                this.$emit('updateArticlesList')
                this.$bvModal.hide('add-category')
            })
            .catch(err => {
                console.log(err)
                this.$toast.error('Error al agregar categoria')
                this.loading = false
            })
        },
    }
}
</script>
<style scoped>

</style>
