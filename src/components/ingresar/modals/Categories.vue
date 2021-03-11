<template>
<b-modal id="categories" title="Categorias" scrollable hide-footer>
    <b-container>
        <b-row class="m-b-15">
            <b-col>
                <b-card header="Agregar categoria" no-body>
                    <b-form-group
                    label="Nombre de la categoria"
                    label-for="category-name">
                        <b-form-input
                        type="text"
                        id="category-name"
                        v-model="category.name"
                        @keyup.enter="saveCategory"
                        autocomplete="off"
                        placeholder="Ingrese el nombre de la categoria"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-button 
                        variant="primary"
                        block
                        @click="saveCategory">
                            <i class="icon-check" v-show="!saving_category"></i>
                            <span class="spinner-border spinner-border-sm" v-show="saving_category"></span>
                            Guardar Categoria
                        </b-button>
                    </b-form-group>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Lista de categorias" no-body>
                    <b-list-group>
                        <b-list-group-item
                        v-for="category in categories"
                        :key="category.id">
                            {{ category.name }}
                            <span class="float-right">
                                <b-button
                                variant="danger"
                                size="sm"
                                @click="deleteCategory(category)">
                                    <i class="icon-trash-3"></i>
                                </b-button> 
                            </span>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
export default {
    computed: {
        categories() {
            return this.$store.state.categories.categories
        }
    },
    data() {
        return {
            category: {
                name: ''
            },
            saving_category: false,
            deleting_category: 0,
        }
    },
    methods: {
        saveCategory() {
            if (this.check()) {
                this.saving_category = true
                this.$api.post('/categories', this.category)
                .then(res => {
                    let category = res.data.category
                    this.saving_category = false
                    this.$toast.success('Categoria guardada')
                    this.$store.commit('categories/addCategory', category)
                    setTimeout(() => {
                        this.$emit('setArticleCategory', category)
                    }, 1000)
                    this.$bvModal.hide('categories')
                    this.clear()
                })
            }
        },
        check() {
            let ok = true
            if (this.category.name == '') {
                ok = false
                this.$toast.error('Ingrese un nombre para la nueva categoria')
            }
            return ok
        },
        clear() {
            this.category = {
                name: ''
            }
        },
        deleteCategory(category) {
            this.$store.commit('categories/setDelete', category)
            this.$bvModal.show('delete-category')
        }
    }
}
</script>
<style scoped>

</style>
