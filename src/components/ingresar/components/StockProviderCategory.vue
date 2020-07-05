<template>
	<b-row>
		<b-col lg="4">
			<b-form-group
			label="Cantidad"
			label-for="article-stock">
				<b-form-input
				id="article-stock"
				type="number"
				placeholder="Ingresa la cantidad del producto"
				v-model="article.stock"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col lg="4">
			<b-form-group
			label="Proveedor"
			label-for="article-provider">
				<b-form-select
				id="article-provider"
				v-model="article.provider"
				:options="providers"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="4">
			<b-form-group
			label="Categoria"
			label-for="article-category">
				<b-form-select
				id="article-category"
				v-model="article.category"
				:options="categories"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col offset="4" class="j-start">
			<b-button 
			size="sm"
			variant="secondary"
			v-b-modal="'providers'">
				<i class="icon-user"></i>
				Proveedores
			</b-button>
		</b-col>
		<b-col class="j-start">
			<b-button 
			size="sm"
			variant="secondary"
			v-b-modal="'categories'">
				<i class="icon-user"></i>
				Categorias
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
export default {
	props: ['article', 'user', 'providers', 'categories'],
	data() {
		return {
			providers_options: [],
		}
	},
	methods: {
		showCategories() {
			this.$jQuery('#categories').modal('show')
		},
	},
}
</script>
<style scoped>
.input-uncontable-stock {
	width: 60%;
	display: inline-block;
}
	
</style>
