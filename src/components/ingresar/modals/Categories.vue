<template>
<div class="modal fade" id="categories" tabindex="-1" role="dialog" aria-labelledby="ventas-resumens" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5>
					Categorias
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i class="icon-cancel"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="row m-b-10">
                	<div class="col">
                		<div class="card">
                			<div class="card-header">
                				Agregar una categoria
                			</div>
                			<div class="card-body">
                				<div class="form-group m-0">
                					<label for="category-name">
                						Nombre para la categoria
                					</label>
                					<input type="text" 
											v-model="category.name"
											@keyup.enter="saveCategory"
											placeholder="Nombre de la nueva categoria" 
                							class="form-control">
                				</div>
                			</div>
                			<div class="card-footer">
                				<button class="btn btn-primary" @click="saveCategory">
                					<i class="icon-check" v-show="!saving_category"></i>
                					<span class="spinner-border spinner-border-sm" v-show="saving_category"></span>
                					Guardar
                				</button>
                			</div>
                		</div>
                	</div>
                </div>
                <div class="row">
                	<div class="col">
                		<div class="card">
                			<div class="card-header">
                				Mis categorias
                			</div>
                			<div class="card-body">
                				<ul class="list-group">
                					<li class="list-group-item" v-for="category in categories">
                						{{ category.name }}
                						<span class="float-right">
                							<button class="btn btn-danger btn-sm"
                									@click="deleteCategory(category)">
                								<i class="icon-trash-3" v-show="deleting_category != category.id"></i>
                								<span class="spinner-border spinner-border-sm" v-show="deleting_category == category.id"></span>
                							</button>
                						</span>
                					</li>
                				</ul>
                			</div>
                		</div>
                	</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['categories', 'article'],
    data() {
        return {
        	category: {
        		name: '',
        	},
        	saving_category: false,
        	deleting_category: 0,
        }
    },
    methods: {
    	saveCategory() {
    		if (this.category.name != '') {
	    		this.saving_category = true
	    		axios.post('categories', {
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
	    			$('#categories').modal('hide')
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
    		axios.delete('categories/'+category.id)
    		.then(res => {
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
