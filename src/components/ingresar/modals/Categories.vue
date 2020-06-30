<template>
<b-modal id="categories" title="Categorias" scrollable hide-footer>
    <b-container>
        <b-row class="m-b-15">
            <b-col>
                <b-card header="Agregar categoria" no-body>
                    <b-card-body>
                        <b-form-row class="m-0">
                            <b-col>
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
                            </b-col>
                        </b-form-row>
                    </b-card-body>
                    <template v-slot:footer>
                        <b-button 
                        variant="primary"
                        @click="saveCategory">
                            <i class="icon-check" v-show="!saving_category"></i>
                            <span class="spinner-border spinner-border-sm" v-show="saving_category"></span>
                            Guardar Categoria
                        </b-button>
                    </template>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Lista de categorias" no-body>
                    <b-card-body>
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
                                        <i class="icon-trash-3" v-show="!deleting_category"></i>
                                        <span class="spinner-border spinner-border-sm" v-show="deleting_category == category.id"></span>
                                        Eliminar
                                    </b-button> 
                                </span>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import toastr from 'toastr'
export default {
    props: ['categories', 'article'],
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
            if (this.category.name != '') {
                this.saving_category = true
                    this.$api.post('categories', {
                    name: this.category.name,
                })
                .then(res => {
                    this.saving_category = false
                    this.category.name = ''
                    toastr.success('Categoria creada correctamente')
                    setTimeout(() => {
                        this.article.category = res.data.id
                    }, 1000)
                    this.$emit('getCategories')
                    this.$bvModal.hide('categories')
                })
                .catch(err => {
                    this.saving_category = false
                    console.log(err)
                    toastr.error('Error al guardar categoria')
                })
            } else {
                toastr.error('Ingrese el nombre de la nueva categoria por favor')
            }
        },
        deleteCategory(category) {
            this.deleting_category = category.id
            this.$api.delete('categories/'+category.id)
            .then(() => {
                this.deleting_category = 0
                toastr.success('Categoria eliminada correctamente')
                this.$emit('getCategories')
            })
            .catch(err => {
                this.deleting_category = 0
                console.log(err)
                toastr.error('Error al eliminar categoria')
            })
        }
        }
}
</script>
<style scoped>

</style>
